'use server'

import { FastTrackProjectSchema } from '@/app/(fast-track-layout)/projects/schema'
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
    console.error(`Project '${data.number}: ${data.name}' already exists`)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Project '${data.number}: ${data.name}' already exists`
    })
  }

  // Read and write groups cannot be the same.
  if (data.readGroup === data.writeGroup) {
    console.error(`Read and Write Groups cannot be the same: ${data.readGroup}`)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Read and Write Groups cannot be the same: ${data.readGroup}`
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
  console.log('Provisioning FastTrack Project...')

  const { data, error, success } =
    await ServerSideSchema.safeParseAsync(request)

  // Fail early if the payload doesn't validate
  if (!success) {
    console.log('Validation Error:', error.flatten().fieldErrors)

    const errors = Object.entries(error.flatten().fieldErrors)
      .map(([field, errors]) => {
        return `${field}: ${errors.join(', ')}`
      })
      .join('\n')

    return {
      success: false,
      message: `Validation Error: ${errors}`,
      data: error.flatten().fieldErrors
    }
  }

  console.log('Payload:', data)

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
