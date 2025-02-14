'use client'

import { FastTrackProjectSchema } from '@/app/(fast-track-layout)/projects/schema'
import { CloudProviderNames } from '@/app/enums'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSidebar } from '@/components/ui/sidebar'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloudProvider } from '@prisma/client'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Provision } from './provision'

/**
 * Generates the FastTrack Project Request Form
 *
 * @returns FastTrack Request Form
 */
export default function ProjectForm() {
  const form = useForm<z.infer<typeof FastTrackProjectSchema>>({
    resolver: zodResolver(FastTrackProjectSchema)
  })

  const { debugMode } = useSidebar()

  async function onSubmit(data: z.infer<typeof FastTrackProjectSchema>) {
    // This function is invoked on the server.
    const res = await Provision(data)
    const toaster = res.success ? toast.success : toast.error
    toaster(res.message)

    // Redirect to the new project's page.
    if (res.success) redirect(`/projects/${res.data.id}`)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Form {...form}>
        {debugMode && (
          <div className="flex justify-end">
            <Button
              variant={'outline'}
              className="w-1/4"
              onClick={(e) => {
                e.preventDefault()
                form.setValue('number', 9999)
                form.setValue('name', 'FAST')
                form.setValue('readGroup', 'fast-track-read')
                form.setValue('writeGroup', 'fast-track-write')
                form.setValue('deployGroup', 'fast-track-deploy')
                form.setValue('clouds', [CloudProvider.AZURE])
              }}>
              Test Data
            </Button>
            <Button
              variant={'ghost'}
              className="w-1/4"
              onClick={(e) => {
                e.preventDefault()
                const res = FastTrackProjectSchema.safeParse(form.getValues())

                if (res.success) {
                  toast.success('Validation successful')
                  return
                }

                const errorSummary = Object.entries(
                  res.error.flatten().fieldErrors
                )
                  .map(([field, errors]) => {
                    return `${field}: ${errors.join(', ')}`
                  })
                  .join('\n')

                toast.error(`Validation failed:\n ${errorSummary}`)

                console.log(res.error?.flatten())
              }}>
              Validate
            </Button>
          </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Number</FormLabel>
                  <FormDescription>
                    Your project's number (default: 9999)
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? 9999}
                      onChange={(e) =>
                        form.setValue(field.name, parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormDescription>Your project's name</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="FAST"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        form.setValue(field.name, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="readGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Read Group</FormLabel>
                  <FormDescription>
                    This IdP group is granted read-only access to all
                    repositories in this project.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="FAST_TRACK_READ_<acronym>"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        form.setValue(field.name, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="writeGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Write Group</FormLabel>
                  <FormDescription>
                    This IdP group is granted write access to all repositories
                    in this project.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="FAST_TRACK_WRITE_<acronym>"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        form.setValue(field.name, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="deployGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Deployment Group</FormLabel>
                  <FormDescription>
                    This IdP group is granted write access to this project's
                    deployment repository, as well as the ability to perform
                    application deployments.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="FAST_TRACK_DEPLOY_<acronym>"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) =>
                        form.setValue(field.name, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="clouds"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Provider(s)</FormLabel>
                  <FormDescription>
                    The cloud provider(s) you will be deploying infrastructure
                    into.
                  </FormDescription>
                  {Object.keys(CloudProvider).map((cloud) => (
                    <FormField
                      key={cloud}
                      control={form.control}
                      name="clouds"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={cloud}
                            className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                checked={field.value?.includes(cloud as any)}
                                onCheckedChange={(checked) => {
                                  if (form.getValues().clouds === undefined)
                                    form.setValue('clouds', [])

                                  if (
                                    checked &&
                                    !form
                                      .getValues()
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      .clouds.includes(cloud as any)
                                  ) {
                                    form.setValue('clouds', [
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      ...(form.getValues().clouds as any[]),
                                      cloud
                                    ])
                                  }

                                  if (
                                    !checked &&
                                    form
                                      .getValues()
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      .clouds.includes(cloud as any)
                                  ) {
                                    form.setValue(
                                      'clouds',
                                      form
                                        .getValues()
                                        .clouds.filter((c) => c !== cloud)
                                    )
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {
                                CloudProviderNames[
                                  cloud as keyof typeof CloudProviderNames
                                ]
                              }
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-x-2">
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
