'use client'

import RepositoryForm from '@/app/(fast-track-layout)/projects/[projectId]/repos/new/form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

/**
 * Generates the FastTrack Project Request Page
 *
 * @returns FastTrack Project Request Page
 */
export default function Page({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = React.use(params)

  return (
    <main className="flex flex-col items-center justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="max-w-lg">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <RepositoryForm projectId={projectId} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
