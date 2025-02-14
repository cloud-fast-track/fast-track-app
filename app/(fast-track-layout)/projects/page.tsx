import { ProjectIcon } from '@/components/icons'
import { ProjectsDataTable } from '@/components/ui/projects-data-table'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'View Projects'
}

export default async function Projects() {
  const projects = await prisma.project.findMany()

  return (
    <main className="flex flex-col items-center justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="mt-8 gap-3 flex justify-center">
        <Link
          prefetch={true}
          href="/projects/new"
          className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4">
          <ProjectIcon />
          Create a Project
        </Link>
      </div>
      <ProjectsDataTable projects={projects} />
    </main>
  )
}
