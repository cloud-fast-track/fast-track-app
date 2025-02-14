import ProjectForm from '@/app/(fast-track-layout)/projects/new/form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Project'
}

/**
 * Generates the FastTrack Project Request Page
 *
 * @returns FastTrack Project Request Page
 */
export default async function Page() {
  // TODO: Redirect to the project detail page after the project is created

  return (
    <main className="flex flex-col items-center justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="max-w-lg">
        <Card>
          <CardHeader />
          <CardContent>
            <ProjectForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
