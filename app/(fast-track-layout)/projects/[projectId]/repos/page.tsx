'use server'

import { ProjectIcon } from '@/components/icons'
import { ReposDataTable } from '@/components/ui/repos-data-table'
import prisma from '@/lib/prisma'
import Link from 'next/link'

export default async function Repos({
  params
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  const repos = await prisma.repository.findMany({
    where: {
      projectId: Number(projectId)
    }
  })

  return (
    <main className="flex flex-col items-center justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="mt-8 gap-3 flex justify-center">
        <Link
          prefetch={true}
          href={`/projects/${projectId}/repos/new`}
          className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4">
          <ProjectIcon />
          Create a Repository
        </Link>
      </div>
      <ReposDataTable repos={repos} />
    </main>
  )
}
