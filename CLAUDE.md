# CLAUDE.md

This file provides guidance when working with code in this repository.

## Repository Overview

Personal portfolio site for www.aycarl.com built with **Astro** and **TailwindCSS**, deployed via GitHub Pages.

### Branch Structure

- **main**: Primary development branch. All source changes go here.
- **gh-pages**: Auto-generated deployment branch (build artifacts only — do not edit directly).

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

# Build and deploy to GitHub Pages
npm run deploy
```

## Architecture

### Tech Stack
- **Framework**: Astro (Static Site Generator)
- **Styling**: TailwindCSS v4 (light theme only)
- **Deployment**: GitHub Pages via gh-pages package

### Application Structure

```
src/
├── pages/               # File-based routing (Astro convention)
│   ├── index.astro      # Home page with all portfolio sections
│   ├── about.astro
│   ├── projects.astro
│   ├── blog.astro       # Placeholder — expand with content collections
│   └── docs.astro       # Placeholder — expand with content collections
├── layouts/
│   └── BaseLayout.astro # Base HTML template for all pages
├── components/
│   ├── NewHeader.astro
│   ├── NewFooter.astro
│   ├── Hero.astro
│   ├── Experience.astro
│   ├── Education.astro
│   ├── NewSkills.astro
│   └── icons/           # SVG icon components
├── styles/
│   └── global.css       # Tailwind import and global resets
└── assets/
    └── img/             # Local image assets
public/
├── favicon.ico
└── robots.txt
```

### Routing

Astro uses file-based routing — no router library needed:
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/projects.astro` → `/projects`
- `src/pages/blog.astro` → `/blog`
- `src/pages/docs.astro` → `/docs`

### Component Patterns

- **Astro components**: All components use `.astro` extension
- **Zero JS by default**: Components render to static HTML
- **Props-based**: Components receive data via `Astro.props`

### Styling

**Single light theme** — no dark mode. Everything uses Tailwind utility classes directly in component markup. No component-level CSS files. No `dark:` variants.

## Content Sections (Future)

Blog and project documentation placeholders are in `src/pages/blog.astro` and `src/pages/docs.astro`. When ready to expand, use **Astro Content Collections**:

```
src/content/
├── blog/           # Markdown/MDX posts
│   └── first-post.md
└── docs/           # Markdown/MDX documentation
    └── getting-started.md
```

Add corresponding `[...slug].astro` routes in `src/pages/blog/` and `src/pages/docs/` to generate routes from content.

## Key Files

- **astro.config.mjs**: Site URL, build output, Tailwind vite plugin
- **package.json**: Astro-only dependencies and scripts
- **src/layouts/BaseLayout.astro**: Base HTML — SEO meta, font, skip link
- **src/styles/global.css**: Tailwind import + global resets
- **public/**: Static assets served at root (favicon, robots.txt)

## Common Tasks

### Adding a new page
1. Create `src/pages/my-page.astro`
2. Wrap content in `<BaseLayout>`
3. Add a link in `NewHeader.astro` and `NewFooter.astro`

### Adding a blog post (future)
1. Add markdown file to `src/content/blog/`
2. Ensure `src/pages/blog/[...slug].astro` exists and renders the entry

### Modifying styles
- Add Tailwind utility classes directly to component markup
- Global resets live in `src/styles/global.css`
- No `dark:` variants — site is light-theme only

### Updating contact/social links
- Edit `src/components/NewHeader.astro` and `src/components/NewFooter.astro` directly
- Resume links should point to external URLs, not local files

## Deployment

`npm run deploy` runs `astro build` then pushes `dist/` to the `gh-pages` branch. GitHub Pages serves from that branch at `www.aycarl.com`.

CNAME file must exist in `public/` for the custom domain to work.
