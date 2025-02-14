import { RepositoryIcon } from '@/components/icons'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ projectId: string; repoId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId, repoId } = await params

  const project = await prisma.project.findFirstOrThrow({
    where: {
      id: Number(projectId)
    },
    include: { repositories: { where: { id: Number(repoId) } } }
  })

  const repo = project.repositories[0]

  return {
    title: `${project.name}-${project.number}/${repo.name}`
  }
}

/**
 * Generates the FastTrack Resository Detail Page
 *
 * @returns FastTrack Repository Detail Page
 */
export default async function Page({ params }: Props) {
  console.log(await params)
  const { projectId, repoId } = await params

  const project = await prisma.project.findFirstOrThrow({
    where: {
      id: Number(projectId)
    },
    include: { repositories: { where: { id: Number(repoId) } } }
  })

  const repo = project.repositories[0]

  return (
    <main className="flex flex-col items-start justify-items-center place-content-start min-h-screen p-8 pb-10 gap-16 sm:p-10">
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex items-center gap-2 border-b-2 w-full pb-2 mb-5">
          <RepositoryIcon />
          <span className="text-3xl font-bold">{repo.name}</span>
        </div>

        <RepoDetail
          title="Project"
          value={`${project.name}-${project.number}`}
        />
        <RepoDetail title="Type" value={repo.type} />
        <RepoDetail title="Visibility" value={repo.visibility} />
        <RepoDetail title="Template" value={repo.template} />
        <RepoDetail title="Management Group" value={repo.managementGroup} />
      </div>
    </main>
  )

  function RepoDetail({ title, value }: { title: string; value: string }) {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground">{title}</span>
        <span className="font-mono text-sm">{value}</span>
      </div>
    )
  }
}
