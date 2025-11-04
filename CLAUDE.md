# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for www.aycarl.com built with **Astro** and **TailwindCSS**, deployed via GitHub Pages. The site has been migrated from Create React App to Astro for better performance and modern development experience.

### Branch Structure

- **astro-revamp**: Active development branch with Astro source code
- **master**: Production deployment branch (will contain compiled artifacts)
- **gh-pages**: GitHub Pages deployment branch (compiled artifacts)

**Important**: Always work on the `astro-revamp` branch for development. The deployment branches contain only build output.

## Development Commands

### Setup
```bash
# Install dependencies
npm install
# or
yarn install
```

### Development
```bash
# Start Astro development server at http://localhost:4321
npm run astro:dev

# Hot reload is enabled - changes will reflect immediately
# Much faster than the old React dev server
```

### Building
```bash
# Create production build in /dist directory
npm run astro:build

# Build output is optimized static HTML with minimal JavaScript
```

### Preview
```bash
# Preview production build locally
npm run astro:preview
```

### Deployment
```bash
# Build and deploy to GitHub Pages
npm run astro:deploy

# This runs astro:build then deploys dist/ folder to gh-pages
```

### Legacy React Commands (Deprecated)
The old React commands are still available but should not be used:
- `npm start` - Old Create React App server
- `npm run build` - Old React build
- `npm run deploy` - Old deployment to build/ folder

## Architecture

### Tech Stack
- **Framework**: Astro 5.15.3 (Static Site Generator)
- **Styling**: TailwindCSS 4.1.16 + Component-level CSS files
- **Routing**: File-based routing (Astro pages)
- **Deployment**: GitHub Pages via gh-pages package
- **Package Manager**: npm/yarn

### Application Structure

```
src/
├── pages/                   # File-based routing (Astro convention)
│   ├── index.astro         # Home page with all sections
│   ├── about.astro         # About page (optional)
│   └── projects.astro      # Projects page (optional)
├── layouts/
│   └── BaseLayout.astro    # Base HTML with dark mode support
├── components/             # Modern Tailwind components
│   ├── NewHeader.astro     # Fixed header with social icons & theme toggle
│   ├── NewFooter.astro     # Footer with navigation links
│   ├── Hero.astro          # Hero section with CTA
│   ├── Experience.astro    # Vertical timeline for work history
│   ├── Education.astro     # Education cards
│   ├── NewSkills.astro     # Skills grid with categories
│   ├── NewProjects.astro   # Project cards with hover effects
│   ├── ThemeToggle.astro   # Dark/light mode switcher
│   └── icons/              # SVG icon components
│       ├── GitHub.astro
│       ├── LinkedIn.astro
│       ├── Behance.astro
│       ├── Email.astro
│       ├── Sun.astro
│       ├── Moon.astro
│       ├── Briefcase.astro
│       └── AcademicCap.astro
├── styles/
│   └── global.css          # Tailwind imports only
└── assets/
    ├── img/                # Images
    └── docs/               # Resume PDF
```

### Routing Configuration

Astro uses **file-based routing** - no router library needed:

- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/projects.astro` → `/projects`

URLs use clean paths: `https://www.aycarl.com/about` (no hash)

### Component Patterns

- **Astro components**: All components use `.astro` file extension
- **Zero JS by default**: Components render to static HTML
- **Props-based**: Components receive data via `Astro.props`
- **Scoped styles**: Each component imports its CSS file

### Styling Approach

**Complete Tailwind CSS implementation** - All styling now uses Tailwind utility classes:
- Responsive layouts with mobile-first approach
- Dark mode support with `dark:` variants
- Modern gradients and shadows
- Smooth transitions and hover effects
- Clean, professional design inspired by modern portfolio templates

**No custom CSS files** - Everything is done with Tailwind utilities for maintainability and consistency.

## Key Files

- **astro.config.mjs**: Astro configuration (site URL, build output, Tailwind)
- **package.json**: Dependencies and scripts
- **public/**: Static assets (favicon, manifest, robots.txt)
- **src/layouts/BaseLayout.astro**: Base HTML template for all pages
- **src/styles/global.css**: Tailwind CSS imports
- **CNAME**: Custom domain configuration (www.aycarl.com)

## Development Workflow

1. **Make changes** on `astro-revamp` branch in `src/` directory
2. **Test locally** with `npm run astro:dev` (http://localhost:4321)
3. **Build** with `npm run astro:build` to verify production build works
4. **Preview** with `npm run astro:preview` to test production build locally
5. **Deploy** with `npm run astro:deploy` to publish to GitHub Pages
6. **Commit** source changes to `astro-revamp`

The `npm run astro:deploy` command automatically:
- Runs `astro build` (outputs to `dist/` directory)
- Pushes build artifacts to `gh-pages` branch
- Triggers GitHub Pages deployment

## Important Notes

### Dark Mode Implementation
- **Class-based dark mode**: Uses Tailwind's `dark:` variant with class strategy
- **Persistent**: Theme preference saved to localStorage
- **System preference detection**: Respects user's OS dark mode setting on first visit
- **No flash**: Theme applied before page render using inline script
- **Toggle button**: Sun/Moon icon in header switches between themes

To use dark mode in components:
```astro
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content that adapts to theme
</div>
```

### Modern Design Features
- **Fixed header**: Sticky navigation with blur backdrop effect
- **Social icons**: SVG icons for GitHub, LinkedIn, Behance, Email in header
- **Gradient accents**: Blue-to-purple gradients for visual interest
- **Vertical timeline**: Alternating layout for work experience
- **Hover effects**: Cards lift and change on hover for interactivity
- **Responsive**: Mobile-first design that scales to all screen sizes
- **Smooth scrolling**: Anchor links scroll smoothly to sections

### Static Site Generation
- Astro pre-renders all pages to static HTML at build time
- Zero JavaScript by default (only theme toggle requires JS)
- Perfect for content-focused sites like portfolios

### GitHub Pages Setup
- Custom domain: www.aycarl.com (via CNAME file in public/)
- Clean URLs (no hash routing needed with static HTML)
- Build output goes to `dist/` directory

### Asset Management
- Logo and images in `src/assets/img/`
- Resume PDF in `public/` directory (accessible at `/Resume-CYA-all_related_experience.pdf`)
- SVG icons as Astro components for reusability
- Profile image loaded from GitHub avatar URL

## Common Tasks

### Adding a New Page
1. Create new `.astro` file in `src/pages/` (e.g., `src/pages/contact.astro`)
2. Use BaseLayout and import needed components
3. Update footer/navigation to link to new page

### Adding a Project
- Edit `src/components/Projects.astro`
- Add new `<ProjectCard>` component with project details

### Modifying Styles
- **Component-specific**: Edit CSS files in `src/styles/components/`
- **Tailwind utilities**: Add classes directly in component markup
- **Global styles**: Edit `src/layouts/BaseLayout.astro` or `src/styles/global.css`

### Updating Social Links
- Modify `src/components/SocialMediaLinks.astro`

### Adding Tailwind Utilities
- Use Tailwind classes directly in Astro components
- Common patterns already in use: `flex`, `grid`, `gap-*`, `md:*`, `hover:*`
