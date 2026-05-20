# ADR 0001: Migrate to Cloudflare Pages for Clean Routing & Edge SEO

## Status
Accepted

## Date
2026-05-20

## Context
The portfolio site was originally built with Astro, but subsequently migrated to a single-page React application built with Vite and React Router (`react-router-dom`). The website’s core dynamic sections (writings and projects) fetch content from the public Craft CMS API at client-side runtime.

Because GitHub Pages acts as a pure static host, directly reloading path-routed pages (e.g., `/writing/my-first-post`) resulted in a `404 Not Found` response. To solve this, a query-redirect hack was implemented using `public/404.html` and an inline script in `public/index.html` to convert the URL into a hash route (`/#/writing/my-first-post`), which was managed by `<HashRouter>`.

This setup suffered from two severe flaws:
1. **Broken Social Sharing Previews (Open Graph / Twitter Cards):** When sharing article or project links on Slack, Discord, LinkedIn, or Twitter, the crawlers (which do not execute JavaScript) fetched the path, received the static `404.html` or the raw shell `index.html`, and displayed either a generic title or a "404 - Wrong turn" preview.
2. **SEO Indexation Limitations:** Search engine bots that lack high-fidelity JS engines struggled to crawl or index deep writing pages, seeing only a 404 or a blank app shell.
3. **UX Flash:** Direct entries on routes experienced a brief 120ms flash of the custom 404 redirect screen before React hydrated and fetched the content.

## Decision
We decided to migrate the hosting platform from **GitHub Pages to Cloudflare Pages (Free Tier)** and restructure the application to support edge-rendered dynamic search metadata:

1. **Switch to clean browser routing:** Replaced `HashRouter` with `BrowserRouter` in `src/App.tsx` and configured `public/_redirects` to natively rewrite all fallback SPA routes to `index.html` on the Cloudflare CDN edge.
2. **Introduce Edge Middleware (Cloudflare Pages Functions):** Added a `/functions` folder containing dynamic middleware handlers:
   - `/functions/writing/[slug].ts`
   - `/functions/projects/[slug].ts`
   These functions run on the Cloudflare global network. When a search crawler or user visits a deep post/project path, the function performs a lightweight sub-request to the Craft API to retrieve the article title and preview. It then reads the static built `index.html` shell and dynamically injects `og:title`, `og:description`, and standard SEO metadata using Cloudflare’s fast native C++ `HTMLRewriter` before sending the HTML to the client.
3. **Decommission Redirect Hack:** Removed the query-string rewriting from `public/404.html` and kept `404.html` purely as a static, beautiful styling fallback for offline/hard network edge errors.
4. **Introduce React Error Boundary:** Implemented a styled `src/components/ErrorBoundary.tsx` component to handle runtime API errors or layout crashes inside React, giving users troubleshooting resources (clearing cache, checking Craft API status) instead of a broken screen.

## Consequences
* **Beautiful Clean Paths:** URLs are now clear and readable (e.g., `/writing/my-first-post`). There is no hash character (`#`) or brief redirect flash on load.
* **Flawless Link Previews:** Pasting portfolio posts or projects on Slack, iMessage, LinkedIn, or Discord now unfurls gorgeous cards with accurate custom titles, reading times, summaries, and tags.
* **Seamless Maintenance:** Cloudflare Pages connects directly to our GitHub repository. Pushing to `main` automatically builds and deploys both static files and edge functions without needing complex GitHub Action scripts.
* **Wrangler for Local Testing:** Developers must use the Wrangler CLI (`npx wrangler pages dev dist --port 8080`) to test the Edge Functions locally. Standard Vite dev server (`npm run dev`) will work for UI building but will not invoke the edge functions.
* **Graceful Runtime Fallbacks:** If the remote Craft CMS API encounters downtime, both the React client (via the Query boundaries) and the Edge Middleware safely fall back to the default homepage branding shells.
