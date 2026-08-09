# ADR 0002: Deployment is a Cloudflare Worker with static assets, not Cloudflare Pages — routing restored via `worker/index.ts`

## Status
Accepted

## Date
2026-08-08

## Context
ADR 0001 documented a migration to Cloudflare Pages, with `/functions` auto-compiled into edge routes by Pages' Git integration. At some point after that ADR was written, the project's `wrangler.json` (added in commit `668c8d0`, "fix Cloudflare unified asset hosting and SPA routing") took the minimal shape of a plain Workers-with-static-assets config — `assets.directory` + `not_found_handling`, no `main`, no `pages_build_output_dir`. Combined with Cloudflare's dashboard project being a source-connected **Worker** (Workers Builds), not a Pages project, this meant:

- `wrangler pages project list` returns no projects on the account
- `aycarl.com` is bound to a Worker named `aycarl` via a Cloudflare Custom Domain (confirmed via the Workers domains API), not a Pages custom domain
- Deployments fire on every push to `main` (matching Workers Builds' behavior), but through a plain Worker deploy — which has no concept of the `/functions` directory convention; that auto-compilation is Pages-only

The practical effect, confirmed against production on 2026-08-08: **every handler in `/functions` was dead code.** `/sitemap.xml` served the SPA HTML shell instead of XML, `/cv` returned 200 instead of a 302 redirect, and every route (including dynamic `/writing/:slug` and `/projects/:slug` pages) served the identical default homepage `<title>` and OG tags. This silently broke the acceptance criteria of two shipped-and-merged features (issues #51 and #52 — social share cards and sitemap/JSON-LD/AI-crawler visibility) despite their PRs being merged and presumably tested locally against `wrangler pages dev`, which does still honor `/functions`.

## Decision
Rather than migrate the Cloudflare project back to Pages (an account/dashboard change, out of scope for a code change), keep the Worker-with-assets deployment and make it actually run the existing `/functions` logic:

1. Add `worker/index.ts` as the Worker's `main` entry point. It manually dispatches known paths to the corresponding `/functions/*.ts` handlers (calling them directly with a hand-built `{ request, params, next }` context — the same shape Pages Functions would have passed), and falls back to `env.ASSETS.fetch(request)` for everything else.
2. Add `"main": "./worker/index.ts"` and `"assets": { "binding": "ASSETS", "run_worker_first": [...] }` to `wrangler.json`. `run_worker_first` is an explicit glob allowlist (`/sitemap.xml`, `/cv`, `/about`, `/experience`, `/links`, `/projects`, `/projects/*`, `/writing`, `/writing/*`) so only routes that need custom logic invoke the Worker — static assets and the bare `/` continue to serve directly from the assets binding, unchanged from prior behavior.
3. `/functions/*.ts` files are left in place and unchanged; they're now regular (if unusually-invoked) TypeScript modules imported by `worker/index.ts`, not a Pages-native convention.

## Consequences
* Sitemap, per-route SEO meta, JSON-LD, the `/cv` redirect, and AI-crawler article-body injection now actually execute in production — verified locally via `npx wrangler dev` against every route in `/functions`.
* Local edge-routing testing changes from `npx wrangler pages dev dist --port 8080` to `npm run build && npx wrangler dev` (a real Worker, not a Pages dev server).
* `docs/architecture.md`, `docs/development-workflow.md`, and `docs/index.md` describe a Pages deployment model that no longer matches reality; they should be read with this ADR as the correction until they're rewritten.
* If a future change ever needs Pages-specific features (e.g. preview URLs per PR at `<branch>.pages.dev`), that would require actually recreating a Pages project and re-pointing the custom domain — a dashboard/account change, not a code change.
