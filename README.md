# Slipstream

The smoothest, most transparent flight tracker you can talk to.

Slipstream is a TypeScript monorepo with separate backend, frontend, and shared
code workspaces.

## Prerequisites

- Node.js 24 LTS
- pnpm 11 (managed through Corepack)

## Getting started

```bash
corepack enable
pnpm install
pnpm check
```

Run the applications in separate terminals:

```bash
pnpm dev:web
pnpm dev:ingest
```

The web app runs at <http://localhost:3000>. The ingest workspace currently
contains only a minimal entry point, ready for you to implement.

## Workspace

```text
apps/web                   Next.js web application
apps/ingest                ADS-B polling and normalization
packages/shared            TypeScript shared by multiple applications
packages/typescript-config Shared strict TypeScript configuration
```

## Commands

- `pnpm check` — lint, typecheck, and test
- `pnpm build` — build all workspace packages
- `pnpm format` — format source and configuration files

## Data policy

Slipstream displays public aircraft data neutrally. It does not provide
military-specific detection, filtering, or analysis features.
