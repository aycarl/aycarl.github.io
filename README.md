# aycarl.github.io

Personal portfolio site for [www.aycarl.com](https://www.aycarl.com), built with [Astro](https://astro.build) and [TailwindCSS](https://tailwindcss.com).

## Current State

- **Framework**: Astro 5
- **Styling**: TailwindCSS v4, single light theme
- **Package manager**: npm
- **Routing**: file-based Astro pages
- **Deployment**: GitHub Actions driven

This repo currently contains placeholder pages for `/blog` and `/docs`, plus lightweight static pages for `/about` and `/projects`.

## Development

```bash
# Install dependencies
npm install

# Start local dev server at http://localhost:4321
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```text
src/
├── assets/
│   ├── docs/          # Legacy document assets not linked from the live site
│   └── img/           # Local image assets
├── components/
│   ├── Hero.astro
│   ├── Experience.astro
│   ├── Education.astro
│   ├── NewSkills.astro
│   ├── NewHeader.astro
│   ├── NewFooter.astro
│   └── icons/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro    # Home page
│   ├── about.astro    # Static placeholder page
│   ├── projects.astro # Static placeholder page
│   ├── blog.astro     # Blog placeholder page
│   └── docs.astro     # Documentation placeholder page
└── styles/
    └── global.css
public/
├── favicon.ico
└── robots.txt
```

## Routes

- `/` home page with experience, education, and skills sections
- `/about` static placeholder page
- `/projects` static placeholder page
- `/blog` placeholder page for future writing
- `/docs` placeholder page for future project documentation

## Deployment Notes

Deployment is handled through GitHub Actions. The workflow at `.github/workflows/astro.yml` runs on every push to `main`, builds the site, and publishes it directly to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`. No `gh-pages` branch or local publish step is involved.

This repository does not currently include a `public/CNAME` file; if a custom domain is in use, it should be configured in GitHub Pages settings unless a `public/CNAME` file is added later.

## Future Content

When blog posts and project documentation are ready, the next step is to add Astro Content Collections under `src/content/blog/` and `src/content/docs/`, then introduce matching dynamic routes.
