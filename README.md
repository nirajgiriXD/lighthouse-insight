# Lighthouse Insight

Lighthouse Insight is a Next.js application for generating and comparing Google Lighthouse reports. Give it one URL or a whole list, and it runs the Lighthouse CLI locally, streams each report back as it finishes, and charts any two pages against each other.

## Features

- **Single page audits** — run one audit and read the complete Lighthouse HTML report full screen.
- **Batch audits** — queue a list of URLs; the viewer opens immediately and each page becomes selectable the moment its audit lands.
- **Score comparison** — chart two audited pages side by side across performance, accessibility, best practices and SEO, with the exact numbers and their difference available as a table.
- **Runs stay local** — audits are executed by the Lighthouse CLI in headless Chrome on your own machine, and reports are written to the local `reports/` folder. Nothing is sent to a third party.
- **Light and dark themes** — follows the system setting by default, with an explicit override that persists.

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- A Chrome or Chromium installation for Lighthouse to drive
- npm (or another package manager of your choice)

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/nirajgiriXD/lighthouse-insight.git
cd lighthouse-insight
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Configuration

| Variable                | Default                 | Purpose                                                            |
| ----------------------- | ----------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`  | `http://localhost:3000` | Absolute origin used for canonical URLs, Open Graph and the sitemap. |
| `LIGHTHOUSE_TIMEOUT_MS` | `240000`                | How long a single Lighthouse run may take before it is abandoned.   |

### Scripts

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Start the development server.                    |
| `npm run build`     | Produce a production build.                      |
| `npm start`         | Serve the production build.                      |
| `npm run lint`      | Run ESLint across the project.                   |
| `npm run typecheck` | Type-check without emitting output.              |

## Project structure

```
app/          Routes. (site) carries the app chrome; (viewer) is full-bleed report viewers.
components/   UI primitives (components/UI) and feature components, one folder each.
contexts/     Session-scoped report state and the theme provider.
hooks/        Audit orchestration shared between the tools.
utils/        URL parsing, Lighthouse score helpers, site configuration.
styles/       Design tokens and global styles.
```

Reports produced by a run are written to `reports/` and are git-ignored.

## Contribute

We welcome contributions from the community! Whether you're a developer, designer or user your input is valuable.

- If you'd like to contribute, fork the repository, make your changes, and create a pull request. See [WORKFLOW.md](WORKFLOW.md) for branch naming and review conventions.

- If you have any ideas or suggestions, feel free to share them in the [discussions](https://github.com/nirajgiriXD/lighthouse-insight/discussions) section. We appreciate your feedback and are open to collaborative discussions to enhance the project!
