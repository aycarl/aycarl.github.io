# Carl Yao Agbenyega - Portfolio Website

Personal portfolio website showcasing my professional experience, education, and technical skills as a Full-Stack Software Engineer & UX Practitioner.

🌐 **Live Site:** [www.aycarl.com](https://www.aycarl.com)

## Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **GitHub Pages** - Hosting and deployment

## Features

- 🎨 Modern, clean design with responsive layout
- 🌓 Dark/light mode toggle with localStorage persistence
- ♿ WCAG 2.x accessibility compliant
- 📱 Mobile-first responsive design
- ⚡ Blazing fast static site generation
- 🔍 SEO optimized

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/aycarl/aycarl.github.io.git
cd aycarl.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run astro:dev
```

Open [http://localhost:4321](http://localhost:4321) to view it in the browser. The page will hot-reload when you make changes.

## Available Scripts

### `npm run astro:dev`
Starts the Astro development server at `http://localhost:4321`

### `npm run astro:build`
Builds the site for production to the `dist/` folder. The build is optimized and ready for deployment.

### `npm run astro:preview`
Preview the production build locally before deploying.

## Project Structure

```
/
├── public/              # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/         # Images and documents
│   ├── components/     # Astro components
│   │   ├── icons/      # SVG icon components
│   │   ├── Hero.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   ├── NewSkills.astro
│   │   ├── NewHeader.astro
│   │   ├── NewFooter.astro
│   │   └── ThemeToggle.astro
│   ├── layouts/        # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/          # File-based routing
│   │   └── index.astro
│   └── styles/         # Global styles
│       └── global.css
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json
```

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `master` branch.

### Manual Deployment

1. Build the site:
```bash
npm run astro:build
```

2. The built files in `dist/` are ready to be deployed to any static hosting service.

## Sections

- **Hero** - Introduction and quick stats
- **Experience** - Professional work history with detailed responsibilities
- **Education** - Academic background and relevant coursework
- **Skills** - Technical skills organized by category

## Customization

### Updating Content

- **Work Experience:** Edit `src/components/Experience.astro`
- **Education:** Edit `src/components/Education.astro`
- **Skills:** Edit `src/components/NewSkills.astro`
- **Resume:** Replace `public/Resume-CYA-all_related_experience.pdf`

### Styling

The site uses TailwindCSS for styling. Global styles are in `src/styles/global.css`.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Email:** aycarl@hotmail.com
- **LinkedIn:** [linkedin.com/in/aycarl](https://linkedin.com/in/aycarl)
- **GitHub:** [github.com/aycarl](https://github.com/aycarl)
- **Behance:** [behance.net/aycarl](https://behance.net/aycarl)
