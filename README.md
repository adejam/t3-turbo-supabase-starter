# T3 SUPABASE MONOREPO STARTER

T3 Supabase Monorepo, a unified workspace containing various packages, apps, and tools to streamline development and collaboration using T3stack, supabase, drizzle and shadcn ui.

## Table of Contents

- [T3 SUPABASE MONOREPO STARTER](#t3-supabase-monorepo-starter)
  - [Table of Contents](#table-of-contents)
  - [1. Overview](#1-overview)
  - [2. Directory Structure](#2-directory-structure)
  - [3. Apps, Packages, and Tooling](#3-apps-packages-and-tooling)
    - [Apps](#apps)
    - [Packages](#packages)
    - [Tooling](#tooling)
  - [4. Utilities](#4-utilities)
  - [5. Build and Development](#5-build-and-development)
  - [6. Running Apps](#6-running-apps)
    - [List of apps and their respective ports](#list-of-apps-and-their-respective-ports)
  - [7. Running Linters](#7-running-linters)
  - [8. Remote Caching](#8-remote-caching)
  - [9 Migrations](#9-migrations)
  - [10. Useful Links](#10-useful-links)
  - [Coming soon](#coming-soon)

## 1. Overview

This monorepo is powered by [Turborepo](https://turbo.build/) and utilizes [PNPM Workspaces](https://pnpm.io/workspaces) to manage dependencies and streamline development workflows. It incorporates TypeScript for static type checking, ESLint for code linting, and Prettier for code formatting.

## 2. Directory Structure

The monorepo is organized into the following sections:

- **Apps, Packages, and Tooling:** Contains various applications, shared packages, and development tools.
- **Utilities:** Additional tools and configurations for TypeScript, ESLint, and Prettier.

## 3. Apps, Packages, and Tooling

### Apps

- **`nextjs`**: Next.js app.

### Packages

- **`@acme/db`**: Drizzle library shared by all applications for accessing the database.
- **`@acme/ui`**: Stub React component library shared by all applications.
- **`@acme/auth`**: Supabase auth to be shared by nextjs apps.
- **`@acme/validators`**: Where all validation schema lives.
- **`@acme/api`**: Trpc api routes.

### Tooling

- **`@acme/eslint-config`**: Shared, fine-grained ESLint presets.
- **`@acme/prettier-config`**: Shared Prettier configuration.
- **`@acme/stylelint-config`**: Shared Stylelint configuration.
- **`@acme/tailwind-config`**: Shared Tailwind configuration.
- **`@acme/tsconfig`**: Shared tsconfig you can extend from.

## 4. Utilities

This monorepo incorporates TypeScript for static type checking, ESLint for code linting, and Prettier for code formatting.

## 5. Build and Development

To build all apps and packages, use the following command:

```bash
pnpm build
```

To develop all apps and packages, navigate to the root directory and run:

```bash
cd my-turborepo
pnpm dev
```

## 6. Running Apps

To run dev server for all the apps using the command:

```
pnpm dev
```

You can use the turbo filtering feature run the dev server to specific app, for example, to run only `@acme/nextjs`, run:

```
pnpm dev --filter=@acme/nextjs
```

Learn more on [Turbo Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)

Each app can also be run individually with the following commands:

- **`nextjs`**: Run the nextjs app on a unique port:

  ```bash
  pnpm dev:auto-landing
  ```

### List of apps and their respective ports

| App    | Command           | Port |
| ------ | ----------------- | ---- |
| nextjs | `pnpm dev:nextjs` | 4500 |

## 7. Running Linters

To run eslint for the whole workspace, run the following command

```
pnpm lint
```

to have it fix eslint errors, run

```
pnpm lint:fix
```

To run prettier, run the command

```
pnpm format
```

to have it auto fix auto-fixable errors, run

```
pnpm format:fix
```

To run styelint, run

```
pnpm stylelint
```

run the below to auto fix stylelint errors

```
pnpm stylelint:fix
```

You can run these linter for individual packages/apps using the filter flag with turbo or by using pnpm workspace. For example to run an `lint` script in @acme/nextjs use:

```
pnpm workspace @acme/nextjs run lint
```

See [PNPM Workspace](https://pnpm.io/workspaces) for more details and other useful commands.

## 8. Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable remote caching:

1. Create a Vercel account [here](https://vercel.com/signup) if you done have already.
2. Authenticate the Turborepo CLI with your Vercel account:

   ```bash
   npx turbo login
   ```

3. Link your Turborepo to your Remote Cache:

   ```bash
   npx turbo link
   ```

## 9 Migrations

Migration is being handled using [Laravel migrations](https://laravel.com/docs/10.x/migrations). Migrations can be done by following the steps and rules below:

1. Create a migration file running the command below in your terminal in migrations folder path.

```bash
php artisan make:migration <MigrationName>
```

2. Ensure migration name is in pascal case.
3. Ensure to use one migration file per table e.g let's say we want to add a column to two different tables, instead of adding one migration file to handle both, we want to handle each migrations separately.
4. Ensure to add the data to reverse the migration in the down function.
5. If migration is intended to create a new table, ensure to add an sql code to enable role level security in the `up` function, also ensure to add the corresponding disable command in the down function.
6. Once migration file is created, run the migration with the command below:

```bash
  php artisan migrate
```

7. To revert a migration, we can use the command:

```bash
  php artisan migrate:rollback
```

8. After migration is successful. we need to ensure that migrations are in sync with drizzle data for data fetching and type safety purpose... for this we need to go to `packages/db` folder and run the follwing command:

```bash
  pnpm pull
```

## 10. Useful Links

- [PNPM Workspace](https://pnpm.io/workspaces)
- [Turbo Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Turbo Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Turbo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Turbo Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Turbo Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [Turbo CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
- [Laravel migrations](https://laravel.com/docs/10.x/migrations)

## Coming soon

1. Package generator and guide
2. Component generator guide for the ui package
