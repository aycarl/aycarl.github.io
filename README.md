# aycarl.github.io

Personal portfolio site for [www.aycarl.com](https://www.aycarl.com), built with [Astro](https://astro.build) and [TailwindCSS](https://tailwindcss.com), deployed via GitHub Pages.

## Tech Stack

- **Framework**: Astro (static site generator)
- **Styling**: TailwindCSS v4
- **Deployment**: GitHub Pages via `gh-pages`

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

# Build and deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── pages/             # File-based routing
│   ├── index.astro    # Home (all portfolio sections)
│   ├── about.astro
│   ├── projects.astro
│   ├── blog.astro     # Blog placeholder
│   └── docs.astro     # Project documentation placeholder
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── Hero.astro
│   ├── Experience.astro
│   ├── Education.astro
│   ├── NewSkills.astro
│   ├── NewHeader.astro
│   ├── NewFooter.astro
│   └── icons/
└── styles/
    └── global.css
public/
├── favicon.ico
└── robots.txt
```

## Deployment

```bash
npm run deploy
```

Builds to `dist/` and pushes the artifacts to the `gh-pages` branch, which GitHub Pages serves at `www.aycarl.com`.
