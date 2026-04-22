# aycarl.github.io

Portfolio site for [www.aycarl.com](https://www.aycarl.com), built as a React single-page application with Vite, TypeScript, React Router, Tailwind CSS, and a small shadcn/ui component layer.

This repository is no longer an Astro site. The current application is a client-rendered portfolio with three main content areas:

- a home page that highlights writing and selected projects
- a writing section backed by the public Craft API
- a projects section backed by the same Craft API
- locally maintained experience, education, and skills content stored in TypeScript modules

## Stack at a glance

- React 18 + TypeScript
- Vite 5 for local development and production builds
- React Router for route handling
- TanStack Query for remote writing data fetching and caching
- Tailwind CSS for styling, plus a small generated shadcn/ui surface
- Vitest + Testing Library setup for tests
- GitHub Actions + GitHub Pages for deployment

## Quick start

### Prerequisites

- Node.js 22 or newer is the safest match for CI
- npm

### Install and run

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:8080`.

### Other useful scripts

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint       # run ESLint
npm run test       # run Vitest once
npm run test:watch # run Vitest in watch mode
```

## How the app is organized

```text
src/
├── main.tsx                 # Vite entry point; mounts the React app
├── App.tsx                  # Providers + route table
├── pages/                   # Route-level screens
├── components/              # Shared layout, markdown, navigation, visual pieces
├── components/ui/           # shadcn/ui generated primitives
├── content/                 # Local portfolio data for projects, experience, education, skills
├── lib/                     # Shared utilities and Craft API client
├── hooks/                   # Shared hooks
├── test/                    # Test setup and examples
└── index.css                # Tailwind layers, design tokens, prose styling, motion utilities
public/
├── 404.html                 # Static fallback for GitHub Pages
├── CNAME                    # Custom domain mapping
└── robots.txt
docs/
└── index.md                 # Documentation entry point
```

## Route summary

The route table lives in `src/App.tsx`.

- `/` landing page
- `/writing` writing index
- `/writing/archive` archive with client-side filtering
- `/writing/search` full-text search over Craft-backed posts
- `/writing/tag/:tag` tag filter page
- `/writing/:slug` individual post page
- `/projects` project list
- `/projects/:slug` individual project page
- `/about` biography page
- `/experience` work history, education, and skills page
- `*` catch-all 404 page

## Content model

There are two content sources in this repo.

### 1. Remote writing content

The writing section uses `src/lib/craft.ts` to call a public Craft API endpoint. Post lists, post detail pages, and search results all depend on that service being reachable from the browser.

### 2. Local portfolio content

Experience, education, and skills live in these files:

- `src/content/experience.ts`
- `src/content/education.ts`
- `src/content/skills.ts`

Projects are fetched from Craft through `src/lib/craft.ts`.

## Deployment

Deployment is handled by GitHub Actions in `.github/workflows/deploy.yml`.

On every push to `main`, the workflow:

1. installs dependencies with npm
2. builds the site with Vite
3. uploads `dist/`
4. deploys the build to GitHub Pages

No manual publish step or `gh-pages` branch workflow is required.

## Documentation

The README is intentionally short. Detailed maintenance documentation lives in `docs/`.

- Start with `docs/index.md`
- Use `docs/architecture.md` for application structure
- Use `docs/content-and-maintenance.md` for editing content and common changes
- Use `docs/development-workflow.md` for setup, testing, deployment, and troubleshooting
