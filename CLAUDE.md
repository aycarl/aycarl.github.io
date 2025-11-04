# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal portfolio website for www.aycarl.com built with Create React App and deployed via GitHub Pages. The repository contains both **source code** (in branches like `astro-revamp`) and **compiled build artifacts** (in `master` and `gh-pages` branches).

### Branch Structure

- **astro-revamp**: Active development branch with full React source code
- **master**: Production deployment branch (compiled artifacts only)
- **gh-pages**: GitHub Pages deployment branch (compiled artifacts only)

**Important**: Always work on the `astro-revamp` branch for development. The `master` and `gh-pages` branches contain only build output.

## Development Commands

### Setup
```bash
# Install dependencies
yarn install
# or
npm install
```

### Development
```bash
# Start development server at http://localhost:3000
yarn start

# Hot reload is enabled - changes will reflect immediately
```

### Testing
```bash
# Run tests in interactive watch mode
yarn test

# Run tests with coverage
yarn test --coverage
```

### Building
```bash
# Create production build in /build directory
yarn build

# Build output is minified and optimized for deployment
```

### Deployment
```bash
# Build and deploy to GitHub Pages
yarn deploy

# This runs predeploy (yarn build) then gh-pages deployment
# Deploys to gh-pages branch automatically
```

## Architecture

### Tech Stack
- **Framework**: React 16.13.1 (Create React App)
- **Routing**: React Router v5 (HashRouter)
- **Styling**: Component-level CSS files
- **Deployment**: GitHub Pages via gh-pages package
- **Package Manager**: Yarn (lockfile present)

### Application Structure

```
src/
├── App.js                    # Main app component with routing
├── index.js                  # Entry point with HashRouter
├── components/
│   ├── header/              # Site header with logo and social links
│   ├── Footer/              # Site footer with menu items
│   ├── pages/               # Route-level page components
│   │   ├── homepage.component.jsx
│   │   ├── about-me.component.jsx
│   │   └── projects.component.js
│   ├── jumbotron/           # Hero section component
│   ├── projects/            # Project display components
│   │   ├── projects.components.jsx
│   │   └── project-card.components.jsx
│   └── skills/              # Skills display component
└── assets/
    ├── img/                 # Images (including logo)
    └── docs/                # Documents/PDFs
```

### Routing Configuration

The app uses **HashRouter** (not BrowserRouter) for GitHub Pages compatibility:

- `/` → HomePage
- `/about` → AboutPage
- `/projects` → ProjectsPage

URLs will have the format: `https://www.aycarl.com/#/about`

### Component Patterns

- **Functional components**: All components use React functional component syntax
- **Props-based**: Components receive data via props
- **Separate styles**: Each component has its own `.styles.css` file
- **Mixed file extensions**: Some use `.jsx`, others `.js` (both work)

### Styling Approach

- Component-scoped CSS files (e.g., `header.styles.css`)
- Global styles in `App.css` and `index.css`
- No CSS preprocessors or CSS-in-JS libraries
- Class-based styling (not inline styles)

## Key Files

- **package.json**: Dependencies and scripts
- **public/index.html**: HTML template with root div
- **public/manifest.json**: PWA configuration
- **src/serviceWorker.js**: PWA service worker (currently unregistered)
- **CNAME**: Custom domain configuration (www.aycarl.com)

## Development Workflow

1. **Make changes** on `astro-revamp` branch in `src/` directory
2. **Test locally** with `yarn start`
3. **Run tests** with `yarn test` if applicable
4. **Build** with `yarn build` to verify production build works
5. **Deploy** with `yarn deploy` to publish to GitHub Pages
6. **Commit** source changes to `astro-revamp`

The `yarn deploy` command automatically:
- Runs `yarn build` (via predeploy script)
- Pushes build artifacts to `gh-pages` branch
- Triggers GitHub Pages deployment

## Important Notes

### PWA Configuration
- Service worker is present but **unregistered** in `index.js`
- To enable PWA features, change `serviceWorker.unregister()` to `serviceWorker.register()`

### GitHub Pages Setup
- Custom domain: www.aycarl.com (via CNAME file)
- HashRouter is required (not BrowserRouter) for client-side routing to work on GitHub Pages
- Build artifacts should not be committed to development branches

### Asset Management
- Logo and images are stored in `src/assets/img/`
- Import images directly in components (webpack handles bundling)
- Public folder assets are available at root URL

## Common Tasks

### Adding a New Page
1. Create component in `src/components/pages/`
2. Add route in `src/App.js` Switch component
3. Update footer/navigation to link to new page

### Adding a Project
- Update the projects data/component in `src/components/projects/`
- Projects component handles display logic

### Modifying Styles
- Edit component-specific CSS files in component directories
- Global styles go in `App.css` or `index.css`

### Updating Social Links
- Modify `src/components/header/social-media-links.components.jsx`
