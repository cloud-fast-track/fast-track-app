'use server'

import { ClientSecretCredential } from '@azure/identity'
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import type { Group } from '@microsoft/microsoft-graph-types'
import 'isomorphic-fetch'

// Create the Microsoft Graph client.
const graphClient = Client.initWithMiddleware({
  debugLogging: true,
  authProvider: new TokenCredentialAuthenticationProvider(
    new ClientSecretCredential(
      process.env.ARM_TENANT_ID as string,
      process.env.ARM_CLIENT_ID as string,
      process.env.ARM_CLIENT_SECRET as string
    ),
    {
      scopes: ['https://graph.microsoft.com/.default']
    }
  )
})

/**
 * Checks if an Azure group exists.
 *
 * In this validator, it doesn't matter if the GitHub Team exists yet, since it
 * can be created as part of the FastTrack request.
 *
 * @param value The group name.
 */
export async function getGroup(name: string): Promise<{
  id: string
  name: string
  description?: string
}> {
  console.log(`Getting Azure Entra Group: '${name}'`)

  // Get the Azure Entra groups, filtering by the onPremisesSamAccountName.
  // See: https://learn.microsoft.com/en-us/graph/api/group-list
  // Getting a specific group requires the object ID, which we do not have.
  // See: https://learn.microsoft.com/en-us/graph/api/group-get
  const response: { value: Group[] } = (await graphClient
    .api('/groups')
    .count(true)
    .header('ConsistencyLevel', 'eventual')
    .filter(
      `onPremisesSamAccountName eq '${name.toUpperCase()}' or displayName eq '${name.toUpperCase()}'`
    )
    .select('description,displayName,id,onPremisesSamAccountName')
    .get()) as { value: Group[] }

  if (response.value.length === 0)
    throw new Error(
      `Azure Entra Group Does Not Exist (Empty Response): '${name}'`
    )

  // At least one of onPremisesSamAccountName or displayName must exist.
  if (
    !response.value[0].onPremisesSamAccountName &&
    !response.value[0].displayName
  )
    throw new Error(
      `Azure Entra Group Does Not Exist (No Valid Name): '${name}'`
    )

  console.log(`Found Azure Entra Group: '${name}'`)
  return {
    id: response.value[0].id as string,
    // Prefer onPremisesSamAccountName over displayName.
    name: (response.value[0].onPremisesSamAccountName ??
      response.value[0].displayName) as string,
    description: response.value[0].description ?? undefined
  }
}
