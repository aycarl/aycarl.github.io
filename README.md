# aycarl.

Portfolio site for [aycarl.com](https://aycarl.com), built as a React single-page application with Vite, TypeScript, React Router, Tailwind CSS, and a small shadcn/ui component layer, hosted on Cloudflare Pages.

The application is a client-rendered portfolio with four main content areas:

- a home page that highlights writing and selected projects
- a writing section backed by the public Craft API
- a projects section backed by the same Craft API
- locally maintained experience, education, and skills content stored in TypeScript modules

## Stack at a glance

- React 18 + TypeScript
- Vite 6 for local development and production builds
- React Router for route handling
- TanStack Query for remote writing data fetching and caching
- Tailwind CSS for styling, plus a small generated shadcn/ui surface
- Vitest + Testing Library setup for tests
- Cloudflare Pages for hosting, with edge functions for SEO metadata injection

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
npm run build      # production build into dist/ (also generates dist/feed.xml RSS feed)
npm run build:dev  # build using Vite's development mode
npm run preview    # serve the production build locally
npm run lint       # run ESLint
npm run test       # run Vitest once
npm run test:watch # run Vitest in watch mode
npm run deps:audit # run the custom dependency audit script
```

## How the app is organized

```text
src/
├── main.tsx                 # Vite entry point; mounts the React app
├── App.tsx                  # Providers + route table
├── pages/                   # Route-level screens
├── components/              # Shared layout, markdown, navigation, visual pieces
├── components/ui/           # shadcn/ui generated primitives
├── content/                 # Local portfolio data for experience, education, skills
├── lib/                     # Shared utilities and Craft API client
├── hooks/                   # Shared hooks
├── test/                    # Test setup and examples
└── index.css                # Tailwind layers, design tokens, prose styling, motion utilities
functions/
├── writing/[slug].ts        # Edge function: SEO metadata for /writing/:slug
└── projects/[slug].ts       # Edge function: SEO metadata for /projects/:slug
scripts/
├── generate-rss.mjs         # RSS feed generation (runs during npm run build)
└── audit-deps.mjs           # Dependency audit script
public/
├── 404.html                 # Static hard fallback page
├── CNAME                    # GitHub Pages leftover; domain is managed in Cloudflare
└── robots.txt
docs/
├── index.md                 # Documentation entry point
└── adr/                     # Architectural decision records
wrangler.json                # Cloudflare assets config + SPA fallback handling
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

Deployment is handled by Cloudflare Pages' native GitHub integration — there is no GitHub Actions deploy workflow.

On every push to `main`, Cloudflare:

1. pulls the repository and installs dependencies with npm
2. builds the site with `npm run build`
3. compiles the `/functions` directory into edge workers
4. serves the result globally across the Cloudflare CDN

Branch pushes and pull requests automatically get isolated preview URLs (e.g. `branch-name.aycarl.pages.dev`). SPA route fallback is configured in `wrangler.json` (`"not_found_handling": "single-page-application"`).

To test edge functions locally, build first and then run `npx wrangler pages dev dist --port 8080` — the standard dev server does not execute them.

## Documentation

The README is intentionally short. Detailed maintenance documentation lives in `docs/`.

- Start with `docs/index.md`
- Use `docs/architecture.md` for application structure
- Use `docs/content-and-maintenance.md` for editing content and common changes
- Use `docs/development-workflow.md` for setup, testing, deployment, and troubleshooting
