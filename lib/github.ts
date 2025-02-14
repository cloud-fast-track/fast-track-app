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
  console.log(`Checking if GitHub Team Exists: '${team}'`)

  try {
    await octokit.rest.teams.getByName({
      org: process.env.GITHUB_OWNER as string,
      team_slug: team
    })

    console.log(`GitHub Team Exists: '${team}'`)
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status === 404) {
      console.log(`GitHub Team Does Not Exist: '${team}'`)
      return false
    }

    throw error
  }
}

/**
 * Creates a GitHub team.
 *
 * @param id Team ID (Slug)
 * @param name Team Name
 * @param description Team Description
 */
export async function createTeam(
  id: string,
  name: string,
  description?: string
): Promise<void> {
  console.log(`Creating GitHub Team: '${name}'`)

  await octokit.rest.teams.create({
    org: process.env.GITHUB_OWNER as string,
    name,
    privacy: 'closed'
  })

  // If team sync is enabled, create the connection.
  // Note: There isn't a built-in method for this in octokit.
  if (process.env.GITHUB_TEAM_SYNC_ENABLED === 'true') {
    console.log(`Creating GitHub Team Sync Mapping: '${name}'`)

    await octokit.request(
      'PATCH /orgs/{org}/teams/{team_slug}/team-sync/group-mappings',
      {
        org: process.env.GITHUB_OWNER as string,
        team_slug: name,
        groups: [
          {
            group_id: id,
            group_name: name,
            group_description: description
          }
        ]
      }
    )

    console.log(`Created GitHub Team Sync Mapping: '${name}'`)
  }

  console.log(`Created GitHub Team: '${name}'`)
}
