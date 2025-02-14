'use server'

import { FastTrackProjectSchema } from '@/app/(fast-track-layout)/projects/schema'
import { getGroup } from '@/lib/azure'
import { createTeam, teamExists } from '@/lib/github'
import prisma from '@/lib/prisma'
import { azureGroupExists } from '@/lib/refinements'
import { revalidateTag } from 'next/cache'
import * as z from 'zod'

type Response = {
  success: boolean
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

/**
 * FastTrack Project Schema (with Server-Side Validation)
 */
const ServerSideSchema = FastTrackProjectSchema.extend({
  readGroup: z
    .string({
      required_error: 'Missing Required Field: Read Group'
    })
    .refine(azureGroupExists, (value) => ({
      message: `Invalid IdP Group: ${value}`
    })),
  writeGroup: z
    .string({
      required_error: 'Missing Required Field: Write Group'
    })
    .refine(azureGroupExists, (value) => ({
      message: `Invalid IdP Group: ${value}`
    })),
  deployGroup: z
    .string({
      required_error: 'Missing Required Field: Deploy Group'
    })
    .refine(azureGroupExists, (value) => ({
      message: `Invalid IdP Group: ${value}`
    }))
}).superRefine(async (data, ctx) => {
  // A project cannot exist with the same number and name.
  const project = await prisma.project.findFirst({
    where: {
      number: data.number,
      name: data.name
    }
  })

  if (project !== null) {
    console.error(`Project Already Exists: ${data.number}-${data.name}`)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Project Already Exists: ${data.number}-${data.name}`
    })
  }

  // Read and write groups cannot be the same.
  if (data.readGroup === data.writeGroup) {
    console.error(`Read and Write Groups Cannot Match: ${data.readGroup}`)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Read and Write Groups Cannot Match: ${data.readGroup}`
    })
  }
})

/**
 * Provisions a new FastTrack Project
 *
 * @param request FastTrack Project Request
 * @returns FastTrack Project Provisioning Response
 */
export async function Provision(
  request: z.infer<typeof ServerSideSchema>
): Promise<Response> {
  console.log(`Creating Project: ${request.number}-${request.name}`)

  const { data, error, success } =
    await ServerSideSchema.safeParseAsync(request)

  // Fail early if the payload doesn't validate
  if (!success) {
    const errors = [
      ...error.flatten().formErrors,
      ...Object.entries(error.flatten().fieldErrors).map(([field, errors]) => {
        return `${field}: ${errors.join(', ')}`
      })
    ].join('\n')

    return {
      success: false,
      message: `Validation Error(s): ${errors}`,
      data: error.flatten().fieldErrors
    }
  }

  console.log('Payload:', data)

  // Create the GitHub teams if they do not exist yet.
  for (const team of [data.readGroup, data.writeGroup, data.deployGroup]) {
    if (!(await teamExists(team))) {
      const { id, name, description } = await getGroup(team)
      createTeam(id, name, description)
    }
  }

  try {
    // Create a new Project resource
    const record = await prisma.project.create({
      data
    })

    revalidateTag('projects')

    console.log('Project Created:', record.id)

    return {
      success: true,
      message: `FastTrack Project ${record.id} Created!`,
      data: record
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error Creating Project:', error.message)
    console.error(error.stack)

    return {
      success: false,
      message: 'Error Creating Project',
      data: {}
    }
  }
}
