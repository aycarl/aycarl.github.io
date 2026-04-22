# Documentation Index

This documentation set explains how the portfolio application is structured, where content lives, and how to make safe changes without having to rediscover the app from scratch.

If you are new to the repository, read the documents in this order:

1. [README.md](../README.md) for the quick project overview and local setup
2. [architecture.md](./architecture.md) for how the application boots, routes, and renders
3. [content-and-maintenance.md](./content-and-maintenance.md) for where portfolio content lives and how to update it
4. [development-workflow.md](./development-workflow.md) for linting, testing, deployment, and troubleshooting

## What this application is

This repository powers a personal portfolio site built as a React single-page application.

The site has three main responsibilities:

- present a strong landing page and personal brand
- publish writing fetched from Craft through a public API
- display project, experience, education, and skills content stored locally in the codebase

## Mental model

The easiest way to understand the app is to follow the request path from top to bottom:

1. Vite serves `index.html`
2. `src/main.tsx` mounts the React app
3. `src/App.tsx` wraps the app in providers and defines the routes
4. each route renders a page component from `src/pages/`
5. most pages render inside `SiteLayout`, which adds the shared header and footer
6. pages either read local content from `src/content/` or remote writing data through `src/lib/craft.ts`

## Where to go for common tasks

- Add or edit a project: [content-and-maintenance.md](./content-and-maintenance.md)
- Update biography, links, or navigation: [content-and-maintenance.md](./content-and-maintenance.md)
- Understand why a writing page is failing: [development-workflow.md](./development-workflow.md)
- Change routing or add a new page: [architecture.md](./architecture.md)
- Run the app, tests, or production build: [development-workflow.md](./development-workflow.md)

## Source-of-truth files

These are the files a maintainer will touch most often:

- `src/App.tsx` for routes and application-level providers
- `src/components/SiteLayout.tsx` for shared page chrome
- `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx` for global navigation and footer links
- `src/pages/` for route-level UI
- `src/content/` for locally authored portfolio data
- `src/lib/craft.ts` for remote writing data and search behavior
- `src/index.css` for design tokens, typography, prose styles, and motion helpers

## What to ignore at first

The `src/components/ui/` directory is a generated shadcn/ui component library. Only a small subset is used directly by the current site, so a beginner usually does not need to understand every file in that folder before making normal content or layout changes.
