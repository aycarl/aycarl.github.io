# Application Architecture

This document explains how the application fits together from boot to page render.

## 1. Boot sequence

The application starts in `index.html`, which provides the root DOM node used by Vite.

From there:

1. `src/main.tsx` imports global styles from `src/index.css`
2. `src/main.tsx` mounts `App` with `createRoot`
3. `src/App.tsx` creates the application shell

`src/App.tsx` is the first important file for maintainers because it wires together both providers and routes.

## 2. Global providers

`src/App.tsx` wraps the route tree with a few application-wide providers:

- `QueryClientProvider` from TanStack Query
- `TooltipProvider`
- two toast systems: the Radix-based toaster and Sonner
- `BrowserRouter`

In practice, the most important one is TanStack Query. It handles browser-side caching for the writing section so list pages, post pages, tag pages, and search do not all need to implement their own fetch lifecycle.

## 3. Routing model

This is a client-side routed application using React Router.

The route table currently defines these page groups:

### Core portfolio pages

- `/` renders `src/pages/Index.tsx`
- `/projects` renders `src/pages/Projects.tsx`
- `/projects/:slug` renders `src/pages/Project.tsx`
- `/about` renders `src/pages/About.tsx`
- `/experience` renders `src/pages/Experience.tsx`

### Writing pages

- `/writing` renders `src/pages/Writing.tsx`
- `/writing/archive` renders `src/pages/Archive.tsx`
- `/writing/search` renders `src/pages/SearchPage.tsx`
- `/writing/tag/:tag` renders `src/pages/Tag.tsx`
- `/writing/:slug` renders `src/pages/Post.tsx`

### Fallback page

- `*` renders `src/pages/NotFound.tsx`

If you add a new page, you will usually do two things:

1. create a component in `src/pages/`
2. register a new route in `src/App.tsx`

If the page should appear in site navigation, also update `src/components/SiteHeader.tsx` and possibly `src/components/SiteFooter.tsx`.

## 4. Shared layout and page chrome

Most route components render inside `src/components/SiteLayout.tsx`.

`SiteLayout` is intentionally simple:

- it creates a full-height page wrapper
- it inserts `SiteHeader`
- it renders the page body inside `main`
- it inserts `SiteFooter`

This means page components can focus on their section-specific content while the header, footer, and top-level spacing remain consistent.

### Header behavior

`src/components/SiteHeader.tsx` handles:

- the wordmark link back to the home page
- desktop navigation links
- the writing search icon link
- a mobile menu using the shadcn/ui sheet component

### Footer behavior

`src/components/SiteFooter.tsx` handles:

- repeated site navigation links
- social/profile links
- contact email
- a small brand treatment at the bottom of every page

## 5. Page composition patterns

The app uses a small number of repeatable patterns.

### Static or mostly static pages

Pages such as `About` and `Experience` mostly render local content or inline text. They are straightforward React components with Tailwind classes applied directly in JSX.

### Data-backed pages

Pages in the writing and projects sections use TanStack Query to fetch data from Craft. They usually implement three states:

- loading
- error or missing content
- successful render

That pattern is visible in `Writing.tsx`, `Post.tsx`, `Archive.tsx`, `Tag.tsx`, `SearchPage.tsx`, `Projects.tsx`, and `Project.tsx`.

### Markdown-backed pages

Two areas render Markdown:

- project detail pages render local Markdown stored in `src/content/projects.ts`
- writing detail pages render Markdown assembled from Craft blocks

Both writing and projects now assemble detail page markdown from Craft blocks.

Both use `src/components/Markdown.tsx`, which wraps `react-markdown` with GitHub Flavored Markdown support and syntax highlighting.

## 6. Content layers

There are two separate content systems in the app.

### Local content modules

The `src/content/` folder stores TypeScript arrays and helper functions for:

- experience
- education
- skills

This content is versioned with the codebase and deployed as part of the built app.

### Remote writing and project content

The writing and project systems are implemented in `src/lib/craft.ts`.

That file does several jobs:

- defines the Craft API base URL and collection IDs
- fetches post lists and project lists
- fetches a full post and full project by slug
- calculates reading time
- normalizes tags and publication status
- performs search across the Craft document
- maps raw Craft responses into a smaller internal `Post` shape

This split is important for maintenance:

- local portfolio experience content can be changed with a code edit only
- writing and project content depend on the external Craft service being available and returning the expected document structure

## 7. Styling system

The styling stack is Tailwind CSS with a small custom design system defined in `src/index.css`.

That file contains four important layers:

### Design tokens

CSS custom properties define the paper/ink palette, accent colors, border colors, and shadcn semantic tokens.

### Base rules

Global resets and default typography live here.

### Component-level utility classes

Reusable classes such as `.wordmark`, `.blob`, and `.prose-aycarl` are defined in CSS and then reused across JSX.

### Motion utilities

Blob drift animations and reduced-motion handling are defined here.

For beginners, the key rule is simple: start with the JSX Tailwind classes, then move to `src/index.css` only if you need a token, prose rule, or reusable visual pattern.

## 8. Visual helper components

The app uses a few small shared helpers to keep pages clean:

- `src/components/Blob.tsx` provides animated decorative background shapes
- `src/components/NavLink.tsx` handles active nav link styling
- `src/components/PostListSkeleton.tsx` renders loading placeholders for writing pages
- `src/components/Markdown.tsx` centralizes Markdown rendering

These are not abstract frameworks. They are small convenience components that reduce repeated JSX.

## 9. UI primitives

The `src/components/ui/` directory contains many shadcn/ui-generated primitives.

Only a small subset is part of the current user experience, including:

- input
- sheet
- toaster
- tooltip

The rest of the folder is still useful scaffolding, but it is not the best place to start if you are learning the app. Treat it as a shared UI toolbox, not the primary source of business logic.

## 10. Configuration surface

These config files matter most during maintenance:

- `vite.config.ts` sets the dev server port to `8080` and defines the `@` alias to `src`
- `tsconfig.json` defines the same `@/*` path alias for TypeScript
- `tailwind.config.ts` maps the custom CSS variables into Tailwind theme colors and animations
- `eslint.config.js` defines linting behavior for TypeScript and React hooks

## 11. Beginner maintenance workflow

When you need to change something, use this order of operations:

1. identify the route in `src/App.tsx`
2. open the matching page in `src/pages/`
3. check whether the page uses `src/content/` or `src/lib/craft.ts`
4. update the local content, JSX, or helper component as needed
5. run lint and the relevant build or test command

That path will solve most normal maintenance tasks without needing to inspect the entire repository.
