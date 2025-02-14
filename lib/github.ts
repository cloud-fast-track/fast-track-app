'use server'

import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

/**
 * Checks if a team exists in GitHub.
 *
 * @param team Team slug.
 * @returns True if the team exists, false otherwise.
 */
export async function teamExists(team: string): Promise<boolean> {
  try {
    await octokit.rest.teams.getByName({
      org: process.env.GITHUB_OWNER as string,
      team_slug: team
    })

    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) return false

    throw error
  }
}
