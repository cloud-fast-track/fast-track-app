import { ProjectIcon, RepositoryIcon } from '@/components/icons'
import { ReposDataTable } from '@/components/ui/repos-data-table'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: Promise<{ projectId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const projectId = (await params).projectId

  const project = await prisma.project.findFirstOrThrow({
    where: {
      id: Number(projectId)
    }
  })

  return {
    title: `${project.name}-${project.number}`
  }
}

/**
 * Generates the FastTrack Project Detail Page
 *
 * @returns FastTrack Project Detail Page
 */
export default async function Page({ params }: Props) {
  console.log(await params)
  const { projectId } = await params

  const project = await prisma.project.findFirstOrThrow({
    where: {
      id: Number(projectId)
    }
  })

  const repos = await prisma.repository.findMany({
    where: {
      projectId: project.id
    }
  })

  return (
    <main className="flex flex-col items-start justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex items-center gap-2 border-b-2 w-full pb-2 mb-5">
          <ProjectIcon />
          <span className="text-3xl font-bold">
            {project.name}-{project.number}
          </span>
        </div>

        <ProjectDetail title="Read Group" value={project.readGroup} />
        <ProjectDetail title="Write Group" value={project.writeGroup} />
        <ProjectDetail title="Deploy Group" value={project.deployGroup} />
        <ProjectDetail
          title="Cloud Provider(s)"
          value={project.clouds.join(',')}
        />

        <div className="pt-2 flex flex-col items-end">
          <Link
            prefetch={true}
            href={`/projects/${projectId}/repos/new`}
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4">
            <RepositoryIcon />
            Create Repository
          </Link>
        </div>

        <h2 className="text-2xl font-bold">Repositories</h2>
        <ReposDataTable repos={repos} />
      </div>
    </main>
  )

  function ProjectDetail({ title, value }: { title: string; value: string }) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground">{title}</span>
        <span className="font-mono text-sm">{value}</span>
      </div>
    )
  }
}
