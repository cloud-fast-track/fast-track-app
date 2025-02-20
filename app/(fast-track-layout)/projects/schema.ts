import { CloudProvider } from '@prisma/client'
import * as z from 'zod'

/**
 * FastTrack Project Schema
 */
export const FastTrackProjectSchema = z.object({
  // TODO: Add validation to check if the number/name combination is unique.
  number: z.coerce
    .number({
      required_error: 'Missing Required Field: Number'
    })
    .default(9999)
    .describe('Project Number'),
  name: z
    .string({
      required_error: 'Missing Required Field: Name'
    })
    .describe('Project Name')
    .min(3, {
      message: 'Invalid Field: Name (Length Must 3+ Characters)'
    }),
  readGroup: z.string({
    required_error: 'Missing Required Field: Read Group'
  }),
  writeGroup: z.string({
    required_error: 'Missing Required Field: Write Group'
  }),
  deployGroup: z.string({
    required_error: 'Missing Required Field: Deploy Group'
  }),
  clouds: z
    .array(z.nativeEnum(CloudProvider).describe('Cloud Provider(s)'))
    .default([])
    .refine((value) => value.length > 0, {
      message: 'Missing Required Field: Cloud Provider(s)'
    })
    .describe('Cloud Provider(s)')
})
