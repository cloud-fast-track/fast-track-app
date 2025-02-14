# FastTrack

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a `.env.local` file in the root of the project by copying
[`.env.example`](./.env.example).

Then, run the development database:

```bash
docker compose up
```

Lastly, run the development server:

```bash
npm run next:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Database

When you run `docker compose up`, a PostgreSQL database is created for local
development and testing. When making changes to the schema, you will need to do
the following.

1. Update the schema in [`prisma/schema.prisma`](./prisma/schema.prisma)
1. Set the `DATABASE_URL` environment variable

   ```bash
   export DB_HOST=localhost
   export DB_URL=postgresql://postgres:postgres@$DB_HOST:5432/postgres
   ```

1. Update the local database

   ```bash
   npm run prisma:push
   ```

1. Update the Prisma client

   ```bash
   npx prisma generate
   ```

1. View the database in a GUI and add seed data

   ```bash
   npx prisma studio
   ```

1. Once your changes are ready for a PR, make sure to generate the migration.

   ```bash
   npm run prisma:migrate
   ```

## Auth

Enable authentication using the GitHub authentication provider.

1. Click `New GitHub App` from your
   [GitHub apps](https://github.com/settings/apps) page.
1. For Hompage URL, use `http://localhost:3000`.
1. Add the following callback URLs:
   `http://localhost:3000/api/auth/callback/github`, `http://localhost:3000/`.
1. Click `Create GitHub App`.
1. Add the App ID from the GitHub App to the `.env.local` file as
   `GITHUB_APP_ID`.
1. Add the Client ID from the GitHub App to the `.env.local` file as
   `GITHUB_APP_CLIENT_ID`.
1. Add the Client Secret from the GitHub App to the `.env.local` file as
   `GITHUB_APP_CLIENT_SECRET`.
1. `Generate a private key` and set the contents of the private key to the
   `.env.local` file as `GITHUB_APP_PRIVATE_KEY`.

<!-- TODO: Migrations Documentation -->

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!
