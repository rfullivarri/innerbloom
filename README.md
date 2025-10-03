# Innerbloom Monorepo

A minimal npm workspace for the Innerbloom gamification MVP. It ships with a TypeScript Express API and a Vite + React client that share linting, formatting, and TypeScript foundations.

## Prerequisites

- Node.js 20 LTS (`nvm use` with the provided `.nvmrc`)
- npm 10+

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment templates and adjust as needed:
   ```bash
   cp apps/api/.env.example apps/api/.env
   cp apps/web/.env.example apps/web/.env
   ```
3. Start both apps with one command:
   ```bash
   npm run dev local
   ```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev local` | Runs API and web app together with live reload. |
| `npm run build` | Builds every workspace package and app in topological order. |
| `npm run lint` | Lints all workspaces with the shared ESLint rules. |
| `npm run format` | Checks formatting via Prettier across the repo. |
| `npm run test` | Executes Vitest suites in every workspace. |

Each workspace also exposes local scripts (e.g. `npm run lint --workspace @innerbloom/api`).

## Environment Variables

### API (`apps/api/.env`)

- `PORT` (default `4000`)
- `API_CORS_ORIGIN` (default `http://localhost:5173`)
- `NODE_ENV` (`development` by default)

### Web (`apps/web/.env`)

- `VITE_API_BASE_URL` (default `http://localhost:4000`)

## Project Layout

```
apps/
  api/   Express REST API with Swagger docs at /docs
  web/   Vite + React dashboard with responsive navigation
packages/
  config/    Shared ESLint + Prettier presets
  tsconfig/  Strict TypeScript base configuration
  shared/    Typed utilities shared between API and web
```

## Tooling Highlights

- Shared ESLint and Prettier presets keep code style aligned.
- Strict TypeScript configuration (NodeNext module resolution) across all workspaces.
- Vitest powers fast unit testing for both server and client.
- GitHub Actions workflow validates lint and build on every push or PR.

## License

[MIT](./LICENSE)
