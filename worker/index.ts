// Worker entry point.
//
// This project is deployed as a plain Cloudflare Worker with static assets
// (wrangler.json `assets` + `main`), not Cloudflare Pages — despite
// docs/adr/0001 describing a Pages deployment. Pages auto-compiles the
// /functions directory into routes; a Worker-with-assets deployment does not,
// so every handler in /functions was silently dead code in production (every
// route served the raw SPA shell — verified against aycarl.com 2026-08-08:
// /sitemap.xml returned HTML, /cv didn't redirect, every page shared one
// <title>). This file restores that routing by dispatching to the same
// /functions handlers directly. See wrangler.json's `assets.run_worker_first`
// for the route list that reaches this fetch handler at all — everything
// else (JS/CSS bundles, images, robots.txt, and "/") is served straight from
// static assets, matching prior behavior.
import { onRequest as sitemapHandler } from "../functions/sitemap.xml";
import { onRequest as cvHandler } from "../functions/cv";
import { onRequest as aboutHandler } from "../functions/about";
import { onRequest as experienceHandler } from "../functions/experience";
import { onRequest as linksHandler } from "../functions/links";
import { onRequest as projectsIndexHandler } from "../functions/projects/index";
import { onRequest as projectSlugHandler } from "../functions/projects/[slug]";
import { onRequest as writingIndexHandler } from "../functions/writing/index";
import { onRequest as writingSearchHandler } from "../functions/writing/search";
import { onRequest as writingArchiveHandler } from "../functions/writing/archive";
import { onRequest as writingTagHandler } from "../functions/writing/tag/[tag]";
import { onRequest as writingSlugHandler } from "../functions/writing/[slug]";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";
    const next = () => env.ASSETS.fetch(request);

    if (path === "/sitemap.xml") return sitemapHandler();
    if (path === "/cv") return cvHandler();
    if (path === "/about") return aboutHandler({ next });
    if (path === "/experience") return experienceHandler({ next });
    if (path === "/links") return linksHandler({ next });
    if (path === "/projects") return projectsIndexHandler({ next });
    if (path === "/writing") return writingIndexHandler({ next });
    if (path === "/writing/search") return writingSearchHandler({ next });
    if (path === "/writing/archive") return writingArchiveHandler({ next });

    const tagMatch = path.match(/^\/writing\/tag\/([^/]+)$/);
    if (tagMatch) return writingTagHandler({ params: { tag: tagMatch[1] }, next });

    const projectMatch = path.match(/^\/projects\/([^/]+)$/);
    if (projectMatch) return projectSlugHandler({ request, params: { slug: projectMatch[1] }, next });

    const writingMatch = path.match(/^\/writing\/([^/]+)$/);
    if (writingMatch) return writingSlugHandler({ request, params: { slug: writingMatch[1] }, next });

    return next();
  },
};
