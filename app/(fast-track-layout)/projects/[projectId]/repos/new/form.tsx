'use client'

import { FastTrackRepositorySchema } from '@/app/(fast-track-layout)/projects/[projectId]/repos/schema'
import {
  RepositoryTemplateNames,
  RepositoryTypeNames,
  RepositoryVisibilityNames
} from '@/app/enums'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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
import {
  RepositoryTemplate,
  RepositoryType,
  RepositoryVisibility
} from '@prisma/client'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Provision } from './provision'

/**
 * Generates the FastTrack Repository Request Form
 *
 * @returns FastTrack Request Form
 */
export default function RepositoryForm({ projectId }: { projectId: string }) {
  const form = useForm<z.infer<typeof FastTrackRepositorySchema>>({
    resolver: zodResolver(FastTrackRepositorySchema)
  })
  form.setValue('projectId', projectId)

  const { debugMode } = useSidebar()

  async function onSubmit(data: z.infer<typeof FastTrackRepositorySchema>) {
    // This function is invoked on the server.
    const res = await Provision(data)
    const toaster = res.success ? toast.success : toast.error
    toaster(res.message)
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
                form.setValue('name', 'FAST')
                form.setValue('type', RepositoryType.APP)
                form.setValue('visibility', RepositoryVisibility.PRIVATE)
                form.setValue('template', RepositoryTemplate.APP_NODE_EXPRESS)
                form.setValue('managementGroup', 'fast-track-app')
              }}>
              Test Data
            </Button>
            <Button
              variant={'ghost'}
              className="w-1/4"
              onClick={(e) => {
                e.preventDefault()
                const res = FastTrackRepositorySchema.safeParse(
                  form.getValues()
                )

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
            {/*
              TODO: Add a project selection input.
            */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Name</FormLabel>
                  <FormDescription>Your repository's name</FormDescription>
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
          {/*
            TODO: When an option is selected, the friendly name should be
            displayed on the form.
          */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Type</FormLabel>
                  <FormDescription>Your repository's type</FormDescription>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {field.value ?? 'Select Type'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Select a Repository Type
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {Object.values(RepositoryType).map((type) => (
                            <DropdownMenuItem
                              key={type}
                              onClick={() => form.setValue(field.name, type)}>
                              {RepositoryTypeNames[type]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/*
            TODO: When an option is selected, the friendly name should be
            displayed on the form.
          */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Visibility</FormLabel>
                  <FormDescription>
                    Your repository's visibility
                  </FormDescription>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {field.value ?? 'Select Visibility'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Select a Repository Visibility
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {Object.values(RepositoryVisibility).map(
                            (visibility) => (
                              <DropdownMenuItem
                                key={visibility}
                                onClick={() =>
                                  form.setValue(field.name, visibility)
                                }>
                                {RepositoryVisibilityNames[visibility]}
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/*
            TODO: The Template field should only show the template names for the
            corresponding repository type.

            TODO: When an option is selected, the friendly name should be
            displayed on the form.
          */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Template</FormLabel>
                  <FormDescription>Your repository's template</FormDescription>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {field.value ?? 'Select Template'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>
                          Select a Repository Template
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          {Object.values(RepositoryTemplate).map((template) => (
                            <DropdownMenuItem
                              key={template}
                              onClick={() =>
                                form.setValue(field.name, template)
                              }>
                              {RepositoryTemplateNames[template]}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="managementGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Management Group</FormLabel>
                  <FormDescription>
                    This IdP group is granted write access to this repository.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="FAST_TRACK_APP_<name>"
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
          <div className="flex gap-x-2">
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
