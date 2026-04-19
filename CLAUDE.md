# CLAUDE.md

This file provides guidance when working with code in this repository.

## Repository Overview

Personal portfolio site for www.aycarl.com built with **Astro** and **TailwindCSS**.

## Development Workflow

- **Default branch**: `main`
- **Feature work**: use the current working branch for changes
- **Package manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

# Start local dev server at http://localhost:4321
npm run dev

# Build for production into /dist
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: Astro (Static Site Generator)
- **Styling**: TailwindCSS v4, light theme only
- **Output**: static site built into `dist/`

### Application Structure

```text
src/
├── assets/
│   ├── docs/            # Legacy document assets not linked from current pages
│   └── img/             # Local image assets
├── components/
│   ├── NewHeader.astro
│   ├── NewFooter.astro
│   ├── Hero.astro
│   ├── Experience.astro
│   ├── Education.astro
│   ├── NewSkills.astro
│   └── icons/           # SVG icon components
├── layouts/
│   └── BaseLayout.astro # Base HTML template for all pages
├── pages/
│   ├── index.astro      # Home page with portfolio sections
│   ├── about.astro      # Static placeholder page
│   ├── projects.astro   # Static placeholder page
│   ├── blog.astro       # Placeholder page for future writing
│   └── docs.astro       # Placeholder page for future project documentation
└── styles/
    └── global.css       # Tailwind import and global resets
public/
├── favicon.ico
└── robots.txt
```

### Routing

Astro uses file-based routing:
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/projects.astro` → `/projects`
- `src/pages/blog.astro` → `/blog`
- `src/pages/docs.astro` → `/docs`

### Component Patterns

- **Astro components**: all active UI components use `.astro`
- **Mostly static rendering**: no client-side framework runtime in active pages
- **Props-based layout**: page metadata flows through `BaseLayout`

### Styling

The site uses a **single light theme**. Tailwind utility classes live directly in component markup, and global resets are limited to `src/styles/global.css`.

## Content Roadmap

`/blog` and `/docs` are currently placeholders. The likely next step is Astro Content Collections:

```text
src/content/
├── blog/
└── docs/
```

When content is added, pair those collections with matching dynamic routes such as `src/pages/blog/[...slug].astro` and `src/pages/docs/[...slug].astro`.

## Key Files

- **astro.config.mjs**: site URL, output directory, Tailwind Vite plugin
- **package.json**: npm scripts and current dependencies
- **src/layouts/BaseLayout.astro**: shared HTML shell and page metadata
- **src/styles/global.css**: Tailwind import and minimal global styles
- **src/components/NewHeader.astro**: top navigation, blog/docs links, contact email
- **src/components/NewFooter.astro**: footer navigation and social links

## Common Tasks

### Adding a new page
1. Create `src/pages/my-page.astro`
2. Wrap the page in `<BaseLayout>`
3. Add navigation if the page should be discoverable

### Preparing blog/docs content
1. Add `src/content/blog/` or `src/content/docs/`
2. Add matching dynamic routes
3. Replace placeholder copy in `src/pages/blog.astro` and `src/pages/docs.astro`

### Modifying styles
- Add Tailwind classes directly in component markup
- Keep `src/styles/global.css` minimal
- Do not introduce `dark:` variants unless the theme model changes intentionally

### Updating contact or social links
- Edit `src/components/NewHeader.astro` and `src/components/NewFooter.astro`
- Prefer external resume/profile URLs over committed downloadable files

## Deployment Notes

Deployment is handled through GitHub Actions rather than a manual local publish step.

There is currently **no committed workflow file under `.github/workflows/`** in this repository snapshot, so deployment automation is managed outside the source tree as it exists here.

`package.json` still contains a legacy `gh-pages` dependency and `npm run deploy` script. Treat those as leftover configuration unless deployment is intentionally moved back to `gh-pages`.
