# Sunbrick G2 — Software Documentation

Customer-facing documentation site for the Sunbrick G2 GUI software, built with [Docusaurus v3](https://docusaurus.io/).

## Prerequisites

- Node.js ≥ 18 (use `nvm use` if you have nvm installed — `.nvmrc` pins Node 20)
- npm

## Local development

```bash
npm install
npm start
```

Opens `http://localhost:3000`.

## Build

```bash
npm run build
npm run serve   # preview the production build locally
```

## Versioning

Docs versioning is enabled. The current in-progress version lives in `docs/`. Released versions are snapshotted into `versioned_docs/`.

To cut a new version at GUI release time:

```bash
npm run docusaurus docs:version <X.Y.Z>
```

## Type-check

```bash
npm run typecheck
```
