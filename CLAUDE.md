# CLAUDE.md

This file provides guidance when working with code in this repository.

## Repository Overview

Personal portfolio site for aycarl.com built as a **React single-page application** with **Vite**, **TypeScript**, **React Router**, **TanStack Query**, and **Tailwind CSS** (plus a generated shadcn/ui component layer). Writing and project content is fetched at runtime from a public Craft CMS API; experience, education, and skills content lives in local TypeScript modules.

Hosted on **Cloudflare Workers with static assets** (a plain Worker bound to the custom domain, *not* Cloudflare Pages — see `docs/adr/0002-actual-deployment-is-workers-with-assets.md`) with edge-side SEO metadata injection routed through `worker/index.ts` (see `docs/adr/0001-migrate-to-cloudflare-pages-for-edge-seo.md` for the original edge-SEO design).

## Development Workflow

- **Default branch**: `main`
- **Feature work**: use the current working branch for changes
- **Package manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

# Start local dev server at http://localhost:8080 (port set in vite.config.ts)
npm run dev

# Build for production into /dist (also generates dist/feed.xml via scripts/generate-rss.mjs)
npm run build

# Build in Vite development mode
npm run build:dev

# Preview production build locally
npm run preview

# Lint
npm run lint

# Run tests once / in watch mode
npm run test
npm run test:watch

# Audit dependencies with the custom script
npm run deps:audit
```

### Testing edge routing locally

`npm run dev` does **not** execute the routing logic in `worker/index.ts` / `/functions`. To test it:

```bash
npm run build
npx wrangler dev
```

This is a real Worker (not `wrangler pages dev`) — see `docs/adr/0002-actual-deployment-is-workers-with-assets.md`.

## Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript, built with Vite 6
- **Routing**: React Router v6 (`BrowserRouter`), route table in `src/App.tsx`
- **Data fetching**: TanStack Query + Craft CMS API client in `src/lib/craft.ts`
- **Styling**: Tailwind CSS v3, light theme only; design tokens in `src/index.css`
- **UI primitives**: shadcn/ui (Radix) in `src/components/ui/` — only a small subset is used (input, sheet, toaster, sonner, tooltip)
- **Testing**: Vitest + Testing Library (minimal coverage currently)
- **Hosting**: Cloudflare Worker with static assets (`wrangler.json` `main` + `assets`), custom-domain-bound; not Cloudflare Pages

### Application Structure

```text
worker/
└── index.ts                 # Worker fetch handler: dispatches specific paths to /functions
                              # handlers (see wrangler.json's assets.run_worker_first for which
                              # paths reach it), falls back to env.ASSETS.fetch() otherwise
src/
├── main.tsx                 # Entry point; mounts the React app
├── App.tsx                  # Providers + route table
├── pages/                   # Route-level screens (Index, Writing, Post, Projects, ...)
├── components/              # SiteLayout, SiteHeader, SiteFooter, Markdown, ErrorBoundary, ...
├── components/ui/           # shadcn/ui generated primitives (mostly unused scaffolding)
├── content/                 # Local data: experience.ts, education.ts, skills.ts
├── lib/                     # craft.ts (Craft API client), utils.ts
├── hooks/                   # Shared hooks
├── test/                    # Vitest setup and example test
└── index.css                # Tailwind layers, design tokens, prose styles, motion utilities
functions/                   # Route handlers, dispatched manually by worker/index.ts (NOT
                              # auto-compiled — that's a Pages-only convention this project no
                              # longer uses)
├── writing/[slug].ts        # Injects OG/SEO meta for /writing/:slug
├── projects/[slug].ts       # Injects OG/SEO meta for /projects/:slug
└── cv.ts                    # 302 from /cv to the hosted CV (URL in src/content/links.ts)
scripts/
├── generate-rss.mjs         # Runs during npm run build; writes dist/feed.xml
└── audit-deps.mjs           # npm run deps:audit
public/
├── 404.html                 # Static hard fallback (no redirect logic)
├── CNAME                    # GitHub Pages leftover; harmless, domain is managed in Cloudflare
├── favicon.ico
└── robots.txt
wrangler.json                # Cloudflare assets config + SPA fallback handling
```

### Routing

Routes are defined in `src/App.tsx`:

- `/` → `src/pages/Index.tsx`
- `/writing` → `Writing.tsx`
- `/writing/archive` → `Archive.tsx`
- `/writing/search` → `SearchPage.tsx`
- `/writing/tag/:tag` → `Tag.tsx`
- `/writing/:slug` → `Post.tsx`
- `/projects` → `Projects.tsx`
- `/projects/:slug` → `Project.tsx`
- `/about` → `About.tsx`
- `/experience` → `Experience.tsx`
- `/links` → `Links.tsx` (printed QR code destination — keep this route stable)
- `/cv` → `CvRedirect.tsx` (dev fallback; in production `worker/index.ts` routes to `functions/cv.ts`, which redirects first)
- `*` → `NotFound.tsx` (keep custom routes above the catch-all)

SPA fallback on Cloudflare is handled by `wrangler.json` (`"not_found_handling": "single-page-application"`). There is no `_redirects` file. Only the paths listed in `wrangler.json`'s `assets.run_worker_first` ever reach `worker/index.ts`; everything else (including `/`) is served straight from static assets/SPA fallback.

### Content Model

Two separate content layers:

1. **Local content** (`src/content/`): experience, education, skills, and contact/profile links (`links.ts`, including the Google Drive CV URL) — edited directly in the repo.
2. **Remote content** (Craft CMS via `src/lib/craft.ts`): writing posts and projects, fetched client-side at runtime. Slugs are derived from titles; unpublished items are filtered out.

If writing or project pages break, check `src/lib/craft.ts` and Craft API availability before touching page components.

### Path Alias

`@` maps to `src/` — defined in both `vite.config.ts` and `tsconfig.json`. If `@/` imports break, check both files.

## Common Tasks

### Adding a new page
1. Create a component in `src/pages/`
2. Wrap it in `SiteLayout` unless it deliberately needs a different shell
3. Register the route in `src/App.tsx` (above the `*` catch-all)
4. Add navigation links in `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx` if discoverable; check both desktop and mobile menus

### Modifying styles
- Add Tailwind classes directly in component JSX
- Use `src/index.css` only for design tokens, shared prose rules (`.prose-aycarl`), reusable helpers (`.wordmark`, `.blob`), or motion utilities
- Do not introduce `dark:` variants unless the theme model changes intentionally

### Updating contact or social links
- Edit `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx`
- The About page (`src/pages/About.tsx`) also carries contact buttons

## Deployment Notes

Deployment uses **Cloudflare Workers Builds** (source-connected to GitHub, configured in the Cloudflare dashboard) — there is no GitHub Actions deploy workflow. This is a plain Worker deployment (`wrangler deploy` semantics), not Cloudflare Pages:

1. Every push to `main` triggers a build on Cloudflare (npm install + `npm run build`, then a Worker deploy using `wrangler.json`)
2. `worker/index.ts` (the `main` entry point) manually dispatches the routes listed in `wrangler.json`'s `assets.run_worker_first` to their `/functions` handlers — there is no automatic `/functions`-directory compilation; that convention is Pages-only and does not apply here
3. The custom domain (`aycarl.com`) is bound to the Worker via a Cloudflare Custom Domain, not a Pages project — see `docs/adr/0002-actual-deployment-is-workers-with-assets.md`

`wrangler.json` configures the static asset directory (`./dist`), the `ASSETS` binding, SPA fallback, and the `run_worker_first` route list.

## Detailed Documentation

The `docs/` directory holds the maintainer guides — start with `docs/index.md`, then `docs/architecture.md`, `docs/content-and-maintenance.md`, and `docs/development-workflow.md`. Architectural decisions are logged in `docs/adr/`.
