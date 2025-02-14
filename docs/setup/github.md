# GitHub Setup

The following steps should be completed in the organization where you would like
to deploy and administer the FastTrack application.

## Repository Properties

1. Create the following custom
   [repository properties](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)
   for your organization

   | Name                        | Type          | Options                |
   | --------------------------- | ------------- | ---------------------- |
   | `fast-track-project-numebr` | String        |                        |
   | `fast-track-project-name`   | String        |                        |
   | `fast-track-repo-type`      | Single select | `app`, `iac`, `deploy` |
   | `fast-track-repo-aws`       | True/false    |                        |
   | `fast-track-repo-azure`     | True/false    |                        |
   | `fast-track-repo-gcp`       | True/false    |                        |

## Fork the Repository

1. Fork this repository into your organization
1. Clone your forked repository to your local machine or create a GitHub
   Codespace

## Create a GitHub App

1. Follow the instructions in the GitHub documentation to create a new
   [GitHub app](https://docs.github.com/en/apps/creating-github-apps)
1. Set the following permissions:

   | Group        | Type                            | Permission     |
   | ------------ | ------------------------------- | -------------- |
   | Repository   | Actions                         | Read and write |
   | Repository   | Administration                  | Read and write |
   | Repository   | Codespaces secrets              | Read and write |
   | Repository   | Contents                        | Read and write |
   | Repository   | Custom properties               | Read and write |
   | Repository   | Dependabot secrets              | Read and write |
   | Repository   | Environments                    | Read and write |
   | Repository   | Issues                          | Read and write |
   | Repository   | Packages                        | Read and write |
   | Repository   | Pull Requests                   | Read and write |
   | Repository   | Secrets                         | Read and write |
   | Repository   | Variables                       | Read and write |
   | Repository   | Workflows                       | Read and write |
   | Organization | Administration                  | Read and write |
   | Organization | Custom properties               | Read and write |
   | Organization | Members                         | Read and write |
   | Organization | Organization codespaces secrets | Read and write |
   | Organization | Organization dependabot secrets | Read and write |
   | Organization | Organization private registries | Read and write |
   | Organization | Secrets                         | Read and write |
   | Organization | Variables                       | Read and write |

1. Install the app in your organization
1. Make sure to generate and save the following information:

   - App ID
   - App Installation ID
   - Client ID
   - Client Secret
   - Private Key
