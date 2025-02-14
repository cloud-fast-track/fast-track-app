'use server'

import { FastTrackRepositorySchema } from '@/app/(fast-track-layout)/projects/[projectId]/repos/schema'
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
 * FastTrack Repository Schema (with Server-Side Validation)
 */
const ServerSideSchema = FastTrackRepositorySchema.extend({
  managementGroup: z
    .string({
      required_error: 'Missing Required Field: Management Group'
    })
    .refine(azureGroupExists, (value) => ({
      message: `Invalid IdP Group: ${value}`
    }))
})

/**
 * Provisions a new FastTrack Repository
 *
 * @param request FastTrack Repository Request
 * @returns FastTrack Repository Provisioning Response
 */
export async function Provision(
  request: z.infer<typeof ServerSideSchema>
): Promise<Response> {
  console.log('Provisioning FastTrack Repository...')

  const { data, error, success } =
    await ServerSideSchema.safeParseAsync(request)

  // Fail early if the payload doesn't validate
  if (!success) {
    console.log(error.flatten().fieldErrors)

    const errors = Object.entries(error.flatten().fieldErrors)
      .map(([field, errors]) => {
        return `${field}: ${errors.join(', ')}`
      })
      .join('\n')

    return {
      success: false,
      message: `Validation error: ${errors}`,
      data: error.flatten().fieldErrors
    }
  }

  console.log('Payload:', data)

  try {
    // Create a new Repository resource
    const record = await prisma.repository.create({
      data
    })

    revalidateTag('repositories')

    console.log('Repository Created:', record.id)

    return {
      success: true,
      message: `FastTrack Repository ${record.id} Created!`,
      data: record
    }
  } catch (error) {
    console.error('Error Creating Repository:', error)

    return {
      success: false,
      message: 'Error Creating Repository',
      data: {}
    }
  }
}
