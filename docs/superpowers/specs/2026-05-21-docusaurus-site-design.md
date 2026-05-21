# Sunbrick G2 Software Docs — Docusaurus Site Design

**Date:** 2026-05-21
**Status:** Approved for implementation planning
**Owner:** Stanley Yao

## Goal

Stand up a customer-facing Docusaurus documentation site for the Sunbrick G2 GUI software (Electron app from `CODE-60237-SBG2-GUID`). MVP is a local-dev scaffold with placeholder content; deploy target and content migration are out of scope.

## Audience & scope

**MVP (in scope):**
- End-user manual: install, setup, operating the GUI, troubleshooting
- Release notes / changelog

**Post-MVP (explicitly out of scope for this spec):**
- Hardware integration guides (network setup, bridge mode, calibration loading)
- Developer / API reference docs
- Python SDK reference docs, and future multi-language SDK docs (Ruby, Go, Java, C#)
- Confluence / Google Drive / GitHub ingestion pipeline (release-triggered, manually invoked)
- Deploy / hosting / custom domain / CI

**Never in scope:**
- Internal-only design docs (app init flow, chart data flow, test plans) — these stay in the code repo

## Source-of-truth strategy

For MVP, **the docs repo is canonical**. Existing Confluence / Drive / GitHub content is *referenced* (manually copied) when authoring pages, not auto-synced. A release-triggered ingestion pipeline is planned post-MVP; the site's content layout (predictable folders, consistent frontmatter) is designed to be pipeline-friendly so generated markdown can be written into deterministic paths later without rework.

## Repo & tooling

- **Location:** new repo at `/Users/stanleyyao/Documents/code/DOC-SBG2-Software` (local only, pushed to GitHub later)
- **Generator:** Docusaurus v3 (latest stable)
- **Config language:** TypeScript (`docusaurus.config.ts`, `sidebars.ts`)
- **Package manager:** npm
- **Node:** require Node ≥ 18 (Docusaurus v3 requirement); pin via `.nvmrc`
- **Git:** init repo with `.gitignore` excluding `node_modules/`, `build/`, `.docusaurus/`

## Site architecture

- **Preset:** `@docusaurus/preset-classic` with `docs` enabled, `blog` disabled
- **Versioning:** Docusaurus docs versioning **enabled from day one**
  - Initial version: `1.0.0` (placeholder; will be aligned with the GUI's actual shipping version before first public deploy)
  - New versions cut at each GUI release via `npm run docusaurus docs:version <X.Y.Z>`
- **Search:** `@easyops-cn/docusaurus-search-local` (offline, no external service, no signup)
- **Mermaid:** disabled for MVP (can be enabled later via `@docusaurus/theme-mermaid`)

## Information architecture (MVP placeholders)

```
docs/
├── intro.md                          (landing page)
├── getting-started/
│   ├── system-requirements.md        (will port from CODE repo README)
│   ├── installation-windows.md
│   ├── installation-macos.md
│   ├── installation-linux.md         (will port from LINUX_INSTALLATION_GUIDE.md)
│   └── first-launch.md
├── user-guide/
│   ├── connecting-to-sunbrick.md
│   ├── network-setup.md              (will port from NETWORK_CONNECTION_GUIDE.md)
│   ├── running-a-measurement.md
│   ├── spectral-reports.md
│   └── calibration.md
├── troubleshooting/
│   └── index.md
└── release-notes/
    └── index.md                      (will seed from CHANGELOG.md)
```

All pages start as **stubs** with a `:::note Placeholder` admonition and a TODO list of what to write. Actual content migration is a follow-up task, not part of the scaffold.

Frontmatter convention for every page:
```yaml
---
id: <kebab-case-id>
title: <Display Title>
sidebar_position: <int>
---
```

## Branding

- **Primary color:** `#f9ba3f` (from `CODE-60237-SBG2-GUID/src/renderer/Components/Shared/Styles/FigmaTokens.ts`)
- **Dark-mode primary:** `#f9c852` (brighter yellow for contrast on dark)
- **Logo:** copy `assets/icon.svg` and `assets/icon.png` from the CODE repo into `static/img/` as `logo.svg` and `logo.png`; favicon from `assets/icon.ico`
- **Site title:** "Sunbrick G2 — Software Documentation"
- **Tagline:** "User manual and release notes for the Sunbrick G2 GUI"
- **Custom CSS:** `src/css/custom.css` overriding the Infima `--ifm-color-primary-*` palette derived from `#f9ba3f`

## Repo layout

```
DOC-SBG2-Software/
├── .gitignore
├── .nvmrc
├── README.md                         (contributor-facing: how to run/build/version)
├── package.json
├── tsconfig.json
├── docusaurus.config.ts
├── sidebars.ts
├── docs/                             (current/unreleased docs)
├── versioned_docs/                   (created on first `docs:version` cut)
├── versioned_sidebars/
├── versions.json
├── src/
│   └── css/custom.css
└── static/
    └── img/                          (logo, favicon)
```

## npm scripts (`package.json`)

- `start` — `docusaurus start`
- `build` — `docusaurus build`
- `serve` — `docusaurus serve`
- `clear` — `docusaurus clear`
- `version` — `docusaurus docs:version` (used at GUI release time)
- `typecheck` — `tsc --noEmit`

## Out of scope (MVP)

- Hardware integration guides
- API / developer docs
- Python SDK reference, and future multi-language SDK bindings (Ruby, Go, Java, C#) — likely a separate Docusaurus plugin instance or sibling site so SDK docs can version independently from the GUI app
- Deploy / CI configuration
- Custom domain
- i18n / translations
- Confluence / Google Drive / GitHub ingestion pipeline
- Content migration from existing markdown files

## Future-friendly notes

- The sidebar is structured so a sibling `sdk/` section can be added later, with sub-sections per language (`sdk/python/`, `sdk/go/`, etc.). When SDK docs grow, they likely become a **separate Docusaurus plugin instance** (so they can version on a different cadence than the GUI app).
- Predictable content folders + consistent frontmatter (`id`, `title`, `sidebar_position`) keep the future ingestion pipeline simple: generated markdown can be written into deterministic paths.
- TypeScript config makes it easy to add plugins later (Algolia search, Mermaid, OpenAPI for SDK reference) without rewrites.

## Success criteria

- `npm install && npm start` from a fresh clone serves the site at `http://localhost:3000` with no errors
- `npm run build` produces a static site in `build/` with no errors or broken-link warnings
- Sidebar shows the IA above with stub pages rendering correctly
- Local search box works against the stub content
- Brand yellow `#f9ba3f` visible in navbar, links, and primary buttons
- Version dropdown shows `1.0.0` (Current/Next versioning behaviour wired correctly)
