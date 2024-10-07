# Pathfinder

Full-stack application skeleton powered by Nest.js, Postgres, and Angular.

<img src="https://i.imgur.com/WVkQ5wK.png"> </img>

<a alt="" href="https://pathfind3r.netlify.app/" target="_blank" rel="noreferrer">See live</a>

✨ Features ✨

## Utilizes monorepo architecture using NX.

You'll be able to easily integrate new services, reuse configs and tools that are already in place, speed up your project's builds and tests, and much more.

## Nest Node.js server

  - Postgres DB with TypeORM integration with a Docker container for local development.
  - Redis used in Cache Module and minimal RedisIO integration with a basic CRUD service and a Docker container for local development
  - Clerk auth with a Webhook
  - Sentry configuration for error reporting

## Angular client 
  - Utilizes both modules for integral parts of the app and standalone components where needed
  - Tailwind UI
  - NGRX store configured with example usage shown in `./apps/pathfinder-client/src/app/feature/auth/data-access/store`
  - Auth system implemented with Clerk and integrated with DB using a webhook
  - Sentry configuration for error reporting
  - Internalization with ngx-translate
  - Handy universal components: nav, notification, empty-state implemented

## Set up

1. Clone the application
2. Install docker
3. Run `docker-compose up` from the app directory
4. Start the server `nx run pathfinder:serve`
5. Start the client `nx run pathfinder-client:serve`
6. Go to `localhost:4200`

## Run tasks

To create a production bundle:

```sh
npx nx build pathfinder
```

To see all available targets to run for a project, run:

```sh
npx nx show project pathfinder
```
        
These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/node:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

