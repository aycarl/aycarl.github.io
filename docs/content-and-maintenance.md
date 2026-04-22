# Content and Maintenance Guide

This document is for day-to-day edits: changing copy, adding content, updating navigation, and making small structural changes safely.

## 1. Where content lives

The portfolio content is split into two categories.

### Local content in the repository

These files are edited directly in the codebase:

- `src/content/experience.ts`
- `src/content/education.ts`
- `src/content/skills.ts`

Use these files for structured content that is part of the portfolio itself.

### Remote writing and project content in Craft

Writing and project content are not stored under `src/content/`. They are fetched at runtime from the Craft API through `src/lib/craft.ts`.

Use Craft for essays, notes, and project case studies.

## 2. How to edit projects

Projects are fetched from Craft through `src/lib/craft.ts`.

Each project includes:

- `slug` for the project URL
- `title` and `summary`
- `role` (or project label fallback)
- `stack` from tags
- `year` from explicit year or project date
- `accent` for visual styling (explicit or generated fallback)
- optional external `links`
- `body` markdown assembled from Craft blocks

### To add a new project

1. add or edit an item in the Craft Projects collection
2. use a clear title because the URL slug is derived from title text
3. keep the lead paragraph concise because summaries are generated from preview content
4. set tags for stack chips and set `published` when you want the project visible
5. run the app and check both `/projects` and `/projects/:slug`

### To remove or rename a project

Because slugs are generated from titles, changing a project title changes the route. Update any internal links pointing to the old slug.

## 3. How to edit experience, education, and skills

The `/experience` page is composed from three local modules:

- `src/content/experience.ts`
- `src/content/education.ts`
- `src/content/skills.ts`

The page itself is `src/pages/Experience.tsx`.

That page does not contain much content logic. It mainly maps those arrays into cards and accent treatments.

As a result, most changes should happen in the content files first, not in the page component.

## 4. How to edit the About page

The About page is mostly inline JSX in `src/pages/About.tsx`.

Use that file for:

- introductory copy
- current focus areas
- contact button labels and links

If you only need to update social URLs used in the global footer, also check `src/components/SiteFooter.tsx`.

## 5. How to edit navigation

Global navigation is split across two files:

- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`

If you add a route that should be discoverable, update both components unless there is a deliberate reason not to.

The header also contains the mobile menu, so a navigation change should always be checked on both desktop and narrow layouts.

## 6. How the writing section works

The writing and projects pages depend on `src/lib/craft.ts`.

That file is responsible for:

- calling the Craft API
- converting Craft collection items into the local `Post` type
- deriving slugs from titles
- filtering unpublished posts
- estimating reading time
- building search results and post detail payloads

### Important consequence

If the writing or projects sections break, the problem may not be in the page components. It may be caused by:

- the Craft API being unavailable
- changed document IDs or collection IDs
- changed Craft block structure
- unexpected post metadata values

Beginner maintainers should check `src/lib/craft.ts` before rewriting UI code.

## 7. Adding a new page

To add a new route-backed page:

1. create a new file in `src/pages/`
2. wrap the page in `SiteLayout` unless it intentionally needs a different shell
3. add the route to `src/App.tsx`
4. add navigation links if appropriate
5. run the app and test the route directly

## 8. Changing styles safely

There are two common places to style things.

### Most page-level changes

Use Tailwind classes directly in the component markup.

### Shared design rules

Use `src/index.css` when you are changing:

- design tokens such as colors or semantic variables
- shared prose styles
- reusable helper classes such as `.wordmark`
- shared animation helpers

If you find yourself repeating the same long set of classes across several pages, that is usually the point where a shared helper or component becomes useful.

## 9. Understanding the UI folder

`src/components/ui/` contains many reusable shadcn/ui primitives. Beginners often assume all of them are deeply connected to the site. They are not.

For the current app, the most relevant ones are the small subset actually imported by route or layout components, especially:

- `input.tsx`
- `sheet.tsx`
- `tooltip.tsx`
- `toaster.tsx`
- `sonner.tsx`

You can usually ignore the rest unless you are introducing a new interaction pattern.

## 10. Safe editing checklist

Before you finish a content or layout change:

1. verify the route still renders
2. verify desktop and mobile navigation if links changed
3. verify the footer and header still agree on major site sections
4. run lint
5. run a production build for larger edits

This small checklist catches most beginner mistakes in this repository.
