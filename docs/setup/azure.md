# Azure Setup

The Azure tenant is a core piece of the FastTrack application. It is used to
manage the application and its users. The following steps should be completed in
the tenant.

## Enterprise Application

1. Create a new
   [app registration](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application)
   in your tenant
1. Assign the following API permissions

   | API Name        | Permission Type | Permission     |
   | --------------- | --------------- | -------------- |
   | Microsoft Graph | Application     | Group.Read.All |
   | Microsoft Graph | Application     | User.Read.All  |

1. Generate a client secret for the application
1. Make note of the following information

   - Application (Client) ID
   - Subscription ID
   - Directory (Tenant) ID
   - Client Secret
