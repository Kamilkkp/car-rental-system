# CarRentalSystem

## Run tasks

To run the dev server for your app, use:

```sh
docker-compose -f 'docker-compose.yml' up -d --build 'mongodb'
npx nx serve server
```

To run the dev client for your app, use:

```sh
npx nx serve client
```

To create a production bundle:

```sh
npx nx build server
npx nx build client
```

To see all available targets to run for a project, run:

```sh
npx nx show project server
npx nx show project server
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.