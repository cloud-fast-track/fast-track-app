import {
  RepositoryTemplate,
  RepositoryType,
  RepositoryVisibility
} from '@prisma/client'
import * as z from 'zod'

/**
 * FastTrack Repository Schema
 */
export const FastTrackRepositorySchema = z.object({
  name: z
    .string({
      required_error: 'Missing Required Field: Name'
    })
    .describe('Repository Name')
    .min(3, {
      message: 'Repository name must be at least 3 characters.'
    }),
  projectId: z.coerce.number({
    required_error: 'Missing Required Field: Project ID'
  }),
  type: z.nativeEnum(RepositoryType).describe('Repository Type'),
  visibility: z
    .nativeEnum(RepositoryVisibility)
    .describe('Repository Visibility'),
  template: z.nativeEnum(RepositoryTemplate).describe('Repository Template'),
  managementGroup: z.string({
    required_error: 'Missing Required Field: Management Group'
  })
})
