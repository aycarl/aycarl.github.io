# Development Workflow

This document explains how to run, validate, deploy, and troubleshoot the application.

## 1. Local development setup

### Prerequisites

- Node.js 22 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The local app runs on `http://localhost:8080`.

That port comes from `vite.config.ts`.

## 2. Available scripts

The main scripts in `package.json` are:

- `npm run dev` starts Vite in development mode
- `npm run build` creates a production build in `dist/`
- `npm run build:dev` builds using Vite's development mode
- `npm run preview` serves the production build locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest once
- `npm run test:watch` runs Vitest in watch mode
- `npm run deps:audit` runs the custom dependency audit script in `scripts/audit-deps.mjs`

## 3. Linting and testing

### ESLint

Lint rules are defined in `eslint.config.js`.

The configuration focuses on:

- standard JavaScript recommendations
- TypeScript recommendations
- React hooks rules
- React refresh safety rules

### Vitest

Tests are configured with a minimal setup in `src/test/setup.ts`.

Right now the repository includes only a placeholder example test in `src/test/example.test.ts`. That means the testing foundation exists, but the app is still lightly tested.

For maintainers, the practical rule is:

- use `npm run lint` on nearly every change
- use `npm run build` to catch route and type-level regressions
- add focused Vitest tests when you introduce real logic that can regress

## 4. Deployment flow

Deployment is defined in `.github/workflows/deploy.yml`.

On every push to `main`, GitHub Actions:

1. checks out the repository
2. installs dependencies with npm
3. builds the app with Vite
4. uploads the `dist/` output
5. deploys that build to GitHub Pages

The public site also relies on:

- `public/CNAME` for the custom domain
- `public/404.html` for GitHub Pages fallback behavior

## 5. Path aliases and imports

The project uses the `@` alias for imports from `src/`.

Examples:

- `@/components/SiteLayout`
- `@/content/projects`
- `@/lib/craft`

This alias is defined in two places and both matter:

- `vite.config.ts` for runtime and dev-server resolution
- `tsconfig.json` for TypeScript resolution

If imports using `@/` stop working, check both files.

## 6. Styling and theme notes

The design system is defined in `src/index.css` and mapped into Tailwind through `tailwind.config.ts`.

Important facts for maintainers:

- the current visual language is light-first and brand-driven
- semantic colors such as `background`, `foreground`, and `border` come from CSS variables
- prose styling for Markdown is centralized in `.prose-aycarl`
- decorative blob motion respects reduced-motion preferences

## 7. Common troubleshooting

### The app runs, but writing pages are empty or failing

Check `src/lib/craft.ts` first.

Likely causes:

- Craft API is unavailable
- the hard-coded document or collection IDs changed
- the browser cannot reach the public endpoint

The same checks apply to project pages because they now use the same Craft API client.

### A route exists but the link is missing from navigation

The route table and the nav links are maintained separately.

Check:

- `src/App.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`

### Styling changes do not behave as expected

Check whether the issue belongs in:

- the page component's Tailwind classes
- `src/index.css`
- `tailwind.config.ts`

### The app builds locally but behaves differently on GitHub Pages

Check for:

- route fallback issues related to SPA hosting
- content depending on external services
- accidental assumptions about server-side routing

## 8. Recommended maintenance rhythm

For most changes, this sequence is enough:

1. run `npm run dev`
2. make the smallest relevant code or content change
3. run `npm run lint`
4. run `npm run build` for anything that affects routing, structure, or shared UI
5. manually click through the affected route or content path

That workflow is simple, fast, and appropriate for this repository.
