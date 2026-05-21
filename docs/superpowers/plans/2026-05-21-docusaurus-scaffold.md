# Docusaurus Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a local Docusaurus v3 site at `/Users/stanleyyao/Documents/code/DOC-SBG2-Software` with versioning, local search, Sunbrick brand colors, stub IA, and a passing `npm run build`.

**Architecture:** Single Docusaurus v3 site (TypeScript config) using `@docusaurus/preset-classic` (docs only, blog disabled), with `@easyops-cn/docusaurus-search-local` for offline search and docs versioning enabled from day one (initial version `1.0.0`). All content pages are stubs; real content migration is out of scope.

**Tech Stack:** Node ≥ 18, npm, Docusaurus v3, TypeScript, React 18 (Docusaurus transitive), `@easyops-cn/docusaurus-search-local`.

**Spec:** [`docs/superpowers/specs/2026-05-21-docusaurus-site-design.md`](../specs/2026-05-21-docusaurus-site-design.md)

**Working directory for every task:** `/Users/stanleyyao/Documents/code/DOC-SBG2-Software`

---

## File Structure

After this plan completes, the repo will contain:

```
DOC-SBG2-Software/
├── .gitignore
├── .nvmrc
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── docusaurus.config.ts
├── sidebars.ts
├── docs/
│   ├── intro.md
│   ├── getting-started/
│   │   ├── _category_.json
│   │   ├── system-requirements.md
│   │   ├── installation-windows.md
│   │   ├── installation-macos.md
│   │   ├── installation-linux.md
│   │   └── first-launch.md
│   ├── user-guide/
│   │   ├── _category_.json
│   │   ├── connecting-to-sunbrick.md
│   │   ├── network-setup.md
│   │   ├── running-a-measurement.md
│   │   ├── spectral-reports.md
│   │   └── calibration.md
│   ├── troubleshooting/
│   │   ├── _category_.json
│   │   └── index.md
│   └── release-notes/
│       ├── _category_.json
│       └── index.md
├── versioned_docs/version-1.0.0/      (created by Task 9)
├── versioned_sidebars/                 (created by Task 9)
├── versions.json                       (created by Task 9)
├── src/
│   └── css/custom.css
└── static/
    └── img/
        ├── logo.svg
        ├── logo.png
        └── favicon.ico
```

**Note for executing engineer:** This project does NOT use traditional unit tests. Validation is via:
- `npm run build` (no errors, no broken-link warnings)
- `npm start` (visual check that the dev server boots and renders)
- `npm run typecheck`

Each task ends with a build/typecheck command serving as the test, and a commit.

---

### Task 1: Initialize repo skeleton (gitignore, nvmrc, README)

**Files:**
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `README.md`

Note: The repo was already `git init`-ed during brainstorming and contains one prior commit with the design spec. Do not re-init.

- [ ] **Step 1: Create `.gitignore`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/.gitignore`

```gitignore
# Dependencies
/node_modules

# Production build
/build

# Docusaurus cache
.docusaurus
.cache-loader

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
*.swp
```

- [ ] **Step 2: Create `.nvmrc`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/.nvmrc`

```
20
```

- [ ] **Step 3: Create `README.md`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/README.md`

```markdown
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
```

- [ ] **Step 4: Verify and commit**

Run: `cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && ls -la`
Expected: `.gitignore`, `.nvmrc`, `README.md`, and the existing `docs/` directory present.

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add .gitignore .nvmrc README.md
git commit -m "chore: add gitignore, nvmrc, and README"
```

---

### Task 2: Create `package.json` with Docusaurus dependencies

**Files:**
- Create: `package.json`

- [ ] **Step 1: Create `package.json`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/package.json`

```json
{
  "name": "doc-sbg2-software",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "clear": "docusaurus clear",
    "version": "docusaurus docs:version",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@docusaurus/core": "^3.6.0",
    "@docusaurus/preset-classic": "^3.6.0",
    "@easyops-cn/docusaurus-search-local": "^0.46.1",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.1.1",
    "prism-react-renderer": "^2.4.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.6.0",
    "@docusaurus/tsconfig": "^3.6.0",
    "@docusaurus/types": "^3.6.0",
    "typescript": "~5.6.0"
  },
  "browserslist": {
    "production": [">0.5%", "not dead", "not op_mini all"],
    "development": [
      "last 3 chrome version",
      "last 3 firefox version",
      "last 3 safari version"
    ]
  },
  "engines": {
    "node": ">=18.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
npm install
```

Expected: install completes without errors. A `node_modules/` directory and `package-lock.json` are created. Warnings about deprecated transitive deps are acceptable.

If install fails because the search-local plugin version doesn't exist for Docusaurus 3.6, install the latest compatible version with:
```bash
npm install @easyops-cn/docusaurus-search-local@latest
```

- [ ] **Step 3: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add package.json package-lock.json
git commit -m "chore: add package.json with Docusaurus v3 dependencies"
```

---

### Task 3: Create `tsconfig.json`

**Files:**
- Create: `tsconfig.json`

- [ ] **Step 1: Create `tsconfig.json`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/tsconfig.json`

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/", "docusaurus.config.ts", "sidebars.ts"]
}
```

- [ ] **Step 2: Run typecheck**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
npm run typecheck
```
Expected: command succeeds with no output (zero errors). It is fine if it reports no input files at this point because `src/` doesn't exist yet — that is acceptable. If it fails because `src/` is missing, that's expected and will be resolved in Task 5.

- [ ] **Step 3: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add tsconfig.json
git commit -m "chore: add tsconfig extending Docusaurus base config"
```

---

### Task 4: Create `docusaurus.config.ts` and `sidebars.ts`

**Files:**
- Create: `docusaurus.config.ts`
- Create: `sidebars.ts`

- [ ] **Step 1: Create `docusaurus.config.ts`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/docusaurus.config.ts`

```typescript
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Sunbrick G2 — Software Documentation',
  tagline: 'User manual and release notes for the Sunbrick G2 GUI',
  favicon: 'img/favicon.ico',

  url: 'https://example.com',
  baseUrl: '/',

  organizationName: 'g2v-optics',
  projectName: 'DOC-SBG2-Software',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      title: 'Sunbrick G2 Docs',
      logo: {
        alt: 'Sunbrick G2 Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} G2V Optics Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],
};

export default config;
```

- [ ] **Step 2: Create `sidebars.ts`**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/sidebars.ts`

```typescript
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      link: { type: 'generated-index' },
      items: [
        'getting-started/system-requirements',
        'getting-started/installation-windows',
        'getting-started/installation-macos',
        'getting-started/installation-linux',
        'getting-started/first-launch',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      link: { type: 'generated-index' },
      items: [
        'user-guide/connecting-to-sunbrick',
        'user-guide/network-setup',
        'user-guide/running-a-measurement',
        'user-guide/spectral-reports',
        'user-guide/calibration',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: { type: 'generated-index' },
      items: ['troubleshooting/index'],
    },
    {
      type: 'category',
      label: 'Release Notes',
      link: { type: 'generated-index' },
      items: ['release-notes/index'],
    },
  ],
};

export default sidebars;
```

- [ ] **Step 3: Commit (do not build yet — content files don't exist)**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add docusaurus.config.ts sidebars.ts
git commit -m "feat: add Docusaurus config and sidebar definition"
```

---

### Task 5: Add brand CSS and copy logo/favicon assets

**Files:**
- Create: `src/css/custom.css`
- Create: `static/img/logo.svg` (copy)
- Create: `static/img/logo.png` (copy)
- Create: `static/img/favicon.ico` (copy)

- [ ] **Step 1: Copy logo and favicon from the CODE repo**

Run:
```bash
mkdir -p /Users/stanleyyao/Documents/code/DOC-SBG2-Software/static/img
cp /Users/stanleyyao/Documents/code/CODE-60237-SBG2-GUID/assets/icon.svg /Users/stanleyyao/Documents/code/DOC-SBG2-Software/static/img/logo.svg
cp /Users/stanleyyao/Documents/code/CODE-60237-SBG2-GUID/assets/icon.png /Users/stanleyyao/Documents/code/DOC-SBG2-Software/static/img/logo.png
cp /Users/stanleyyao/Documents/code/CODE-60237-SBG2-GUID/assets/icon.ico /Users/stanleyyao/Documents/code/DOC-SBG2-Software/static/img/favicon.ico
```

Expected: three files now exist under `static/img/`.

- [ ] **Step 2: Create `src/css/custom.css` with Sunbrick brand yellow**

File: `/Users/stanleyyao/Documents/code/DOC-SBG2-Software/src/css/custom.css`

Brand primary `#f9ba3f` (light mode), `#f9c852` (dark mode). The Infima palette below was derived by darkening/lightening the primary in ~8% steps.

```css
/**
 * Sunbrick G2 brand palette
 * Primary: #f9ba3f (from CODE-60237-SBG2-GUID FigmaTokens.ts)
 */

:root {
  --ifm-color-primary: #f9ba3f;
  --ifm-color-primary-dark: #f8ae1e;
  --ifm-color-primary-darker: #f7a80f;
  --ifm-color-primary-darkest: #d18a06;
  --ifm-color-primary-light: #fac660;
  --ifm-color-primary-lighter: #facc71;
  --ifm-color-primary-lightest: #fddca0;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

[data-theme='dark'] {
  --ifm-color-primary: #f9c852;
  --ifm-color-primary-dark: #f8be31;
  --ifm-color-primary-darker: #f7b921;
  --ifm-color-primary-darkest: #d19b09;
  --ifm-color-primary-light: #fad273;
  --ifm-color-primary-lighter: #fad784;
  --ifm-color-primary-lightest: #fde3ad;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add static/img/logo.svg static/img/logo.png static/img/favicon.ico src/css/custom.css
git commit -m "feat: add brand CSS palette and copy Sunbrick logo/favicon"
```

---

### Task 6: Create stub doc pages — landing + Getting Started

**Files:**
- Create: `docs/intro.md`
- Create: `docs/getting-started/_category_.json`
- Create: `docs/getting-started/system-requirements.md`
- Create: `docs/getting-started/installation-windows.md`
- Create: `docs/getting-started/installation-macos.md`
- Create: `docs/getting-started/installation-linux.md`
- Create: `docs/getting-started/first-launch.md`

- [ ] **Step 1: Create `docs/intro.md`**

```markdown
---
id: intro
title: Sunbrick G2 Software Documentation
sidebar_position: 1
slug: /
---

# Sunbrick G2 Software Documentation

Welcome to the user manual for the Sunbrick G2 GUI software.

:::note Placeholder
This is a stub landing page. Real content to be authored.
:::

## What you'll find here

- **Getting Started** — install the software and connect to your first Sunbrick.
- **User Guide** — day-to-day operation: running measurements, generating reports, calibration.
- **Troubleshooting** — common issues and their resolutions.
- **Release Notes** — version history and changes.
```

- [ ] **Step 2: Create `docs/getting-started/_category_.json`**

```json
{
  "label": "Getting Started",
  "position": 2,
  "link": { "type": "generated-index" }
}
```

- [ ] **Step 3: Create `docs/getting-started/system-requirements.md`**

```markdown
---
id: system-requirements
title: System Requirements
sidebar_position: 1
---

# System Requirements

:::note Placeholder
Stub page. Migrate content from `CODE-60237-SBG2-GUID/README.md` (System Requirements section).
:::

## TODO

- [ ] Supported operating systems
- [ ] Hardware requirements (single unit)
- [ ] Hardware requirements (array configurations)
- [ ] Network requirements
```

- [ ] **Step 4: Create `docs/getting-started/installation-windows.md`**

```markdown
---
id: installation-windows
title: Install on Windows
sidebar_position: 2
---

# Install on Windows

:::note Placeholder
Stub page. Author install steps for Windows 10 / 11.
:::

## TODO

- [ ] Download the installer
- [ ] Run the installer
- [ ] First launch & permissions
- [ ] Uninstall
```

- [ ] **Step 5: Create `docs/getting-started/installation-macos.md`**

```markdown
---
id: installation-macos
title: Install on macOS
sidebar_position: 3
---

# Install on macOS

:::note Placeholder
Stub page. Author install steps for macOS 12+ (Intel & Apple Silicon).
:::

## TODO

- [ ] Download the .dmg
- [ ] Drag to Applications
- [ ] Gatekeeper / notarization notes
- [ ] First launch
```

- [ ] **Step 6: Create `docs/getting-started/installation-linux.md`**

```markdown
---
id: installation-linux
title: Install on Linux
sidebar_position: 4
---

# Install on Linux

:::note Placeholder
Stub page. Migrate content from `CODE-60237-SBG2-GUID/docs/LINUX_INSTALLATION_GUIDE.md`.
:::

## TODO

- [ ] Supported distributions
- [ ] Install via .AppImage / .deb
- [ ] Permissions / udev rules
```

- [ ] **Step 7: Create `docs/getting-started/first-launch.md`**

```markdown
---
id: first-launch
title: First Launch
sidebar_position: 5
---

# First Launch

:::note Placeholder
Stub page. Author the first-run experience.
:::

## TODO

- [ ] Application overview tour
- [ ] Initial configuration
- [ ] Connecting your first Sunbrick
```

- [ ] **Step 8: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add docs/intro.md docs/getting-started/
git commit -m "docs: add landing page and Getting Started stubs"
```

---

### Task 7: Create stub doc pages — User Guide, Troubleshooting, Release Notes

**Files:**
- Create: `docs/user-guide/_category_.json`
- Create: `docs/user-guide/connecting-to-sunbrick.md`
- Create: `docs/user-guide/network-setup.md`
- Create: `docs/user-guide/running-a-measurement.md`
- Create: `docs/user-guide/spectral-reports.md`
- Create: `docs/user-guide/calibration.md`
- Create: `docs/troubleshooting/_category_.json`
- Create: `docs/troubleshooting/index.md`
- Create: `docs/release-notes/_category_.json`
- Create: `docs/release-notes/index.md`

- [ ] **Step 1: Create `docs/user-guide/_category_.json`**

```json
{
  "label": "User Guide",
  "position": 3,
  "link": { "type": "generated-index" }
}
```

- [ ] **Step 2: Create `docs/user-guide/connecting-to-sunbrick.md`**

```markdown
---
id: connecting-to-sunbrick
title: Connecting to a Sunbrick
sidebar_position: 1
---

# Connecting to a Sunbrick

:::note Placeholder
Stub page.
:::

## TODO

- [ ] Discovering units on the network
- [ ] Pairing & authentication
- [ ] Single-unit vs array mode
```

- [ ] **Step 3: Create `docs/user-guide/network-setup.md`**

```markdown
---
id: network-setup
title: Network Setup
sidebar_position: 2
---

# Network Setup

:::note Placeholder
Stub page. Migrate content from `CODE-60237-SBG2-GUID/docs/NETWORK_CONNECTION_GUIDE.md`.
:::

## TODO

- [ ] DHCP mode
- [ ] Bridge mode
- [ ] Static IP
- [ ] Troubleshooting connectivity
```

- [ ] **Step 4: Create `docs/user-guide/running-a-measurement.md`**

```markdown
---
id: running-a-measurement
title: Running a Measurement
sidebar_position: 3
---

# Running a Measurement

:::note Placeholder
Stub page.
:::

## TODO

- [ ] Selecting a preset
- [ ] Configuring spectrum / IV
- [ ] Starting & stopping a measurement
- [ ] Interpreting live charts
```

- [ ] **Step 5: Create `docs/user-guide/spectral-reports.md`**

```markdown
---
id: spectral-reports
title: Spectral Reports
sidebar_position: 4
---

# Spectral Reports

:::note Placeholder
Stub page.
:::

## TODO

- [ ] Report types
- [ ] Generating a PDF report
- [ ] Exporting raw data
```

- [ ] **Step 6: Create `docs/user-guide/calibration.md`**

```markdown
---
id: calibration
title: Calibration
sidebar_position: 5
---

# Calibration

:::note Placeholder
Stub page.
:::

## TODO

- [ ] Loading calibration files
- [ ] Verifying calibration
- [ ] When to recalibrate
```

- [ ] **Step 7: Create `docs/troubleshooting/_category_.json`**

```json
{
  "label": "Troubleshooting",
  "position": 4,
  "link": { "type": "generated-index" }
}
```

- [ ] **Step 8: Create `docs/troubleshooting/index.md`**

```markdown
---
id: index
title: Troubleshooting
sidebar_position: 1
slug: /troubleshooting
---

# Troubleshooting

:::note Placeholder
Stub page. Common issues and their resolutions will live here.
:::

## TODO

- [ ] Cannot find Sunbrick on the network
- [ ] Measurement fails to start
- [ ] PDF report generation hangs
- [ ] Calibration file rejected
```

- [ ] **Step 9: Create `docs/release-notes/_category_.json`**

```json
{
  "label": "Release Notes",
  "position": 5,
  "link": { "type": "generated-index" }
}
```

- [ ] **Step 10: Create `docs/release-notes/index.md`**

```markdown
---
id: index
title: Release Notes
sidebar_position: 1
slug: /release-notes
---

# Release Notes

:::note Placeholder
Stub page. Seed from `CODE-60237-SBG2-GUID/CHANGELOG.md`.
:::

## TODO

- [ ] Decide format (one page with H2 per version, or one page per version)
- [ ] Backfill from CHANGELOG.md
```

- [ ] **Step 11: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add docs/user-guide/ docs/troubleshooting/ docs/release-notes/
git commit -m "docs: add User Guide, Troubleshooting, and Release Notes stubs"
```

---

### Task 8: Verify dev server and production build

**Files:** (none modified)

- [ ] **Step 1: Run the dev server in the background**

Run (use `run_in_background: true`):
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm start
```
Expected: server starts, log shows `[SUCCESS] Docusaurus website is running at: http://localhost:3000/`. Note the background process ID.

- [ ] **Step 2: Stop the dev server**

Kill the background process started in Step 1.

- [ ] **Step 3: Run typecheck**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm run typecheck
```
Expected: exits 0, no errors.

- [ ] **Step 4: Run production build**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm run build
```
Expected:
- Exits 0
- `[SUCCESS] Generated static files in "build".`
- **No `[WARNING] Broken link` lines** — `onBrokenLinks: 'throw'` will fail the build if any exist
- Search index built (the search-local plugin logs about indexing)

If the build fails on a broken link, fix the link in the offending markdown file (most likely cause: a stub page references a not-yet-created sibling).

- [ ] **Step 5: No commit (verification step only)**

Nothing was changed. Proceed to Task 9.

---

### Task 9: Cut initial version `1.0.0`

**Files (auto-generated by Docusaurus):**
- Create: `versioned_docs/version-1.0.0/` (full snapshot of `docs/`)
- Create: `versioned_sidebars/version-1.0.0-sidebars.json`
- Create: `versions.json`

- [ ] **Step 1: Run the version command**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm run version 1.0.0
```
Expected: `[SUCCESS] [docs]: version 1.0.0 created!`

- [ ] **Step 2: Verify the snapshot**

Run:
```bash
ls /Users/stanleyyao/Documents/code/DOC-SBG2-Software/versioned_docs/version-1.0.0 && cat /Users/stanleyyao/Documents/code/DOC-SBG2-Software/versions.json
```
Expected:
- `versioned_docs/version-1.0.0/` contains the same folder structure as `docs/`
- `versions.json` contains `["1.0.0"]`

- [ ] **Step 3: Re-run the build to confirm versioning works**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm run build
```
Expected: build succeeds. The build output will now include a version selector (visible in the navbar at runtime).

- [ ] **Step 4: Commit**

```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software
git add versioned_docs versioned_sidebars versions.json
git commit -m "feat: cut initial docs version 1.0.0"
```

---

### Task 10: Final smoke test and wrap-up commit

**Files:** (none modified)

- [ ] **Step 1: Clean build directories and re-run the full build from scratch**

Run:
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm run clear && npm run build
```
Expected: build succeeds end-to-end with no broken-link errors and no TypeScript errors.

- [ ] **Step 2: Start the dev server and visually verify in a browser**

Run (`run_in_background: true`):
```bash
cd /Users/stanleyyao/Documents/code/DOC-SBG2-Software && npm start
```

Open `http://localhost:3000` and confirm:
- Landing page (`intro.md`) renders
- Navbar shows "Sunbrick G2 Docs" with the Sunbrick logo
- Navbar shows the **version dropdown** (right side) with "1.0.0"
- Sidebar shows all 5 sections (Intro is implicit landing; Getting Started, User Guide, Troubleshooting, Release Notes)
- Primary color is the Sunbrick yellow `#f9ba3f` (visible on links and active sidebar item)
- The search box (top-right) opens a search panel and finds e.g. "calibration"

Stop the dev server.

- [ ] **Step 3: No final commit needed**

If anything was changed during smoke testing, commit it with an appropriate message. Otherwise the scaffold is complete.

---

## Done

The repo now contains a buildable Docusaurus v3 site with versioning enabled, Sunbrick branding, local search, and stub pages for the MVP IA. Content migration is a separate follow-up task and is intentionally not part of this plan.
