// Single module owning SEO/OG/Twitter tag injection for edge functions.
// Consumed by: functions/writing/[slug].ts, functions/projects/[slug].ts,
// and the per-route static functions + sitemap generator.
//
// Contract: index.html carries the full baseline tag STRUCTURE. injectMeta
// REWRITES those tags in place (setAttribute/setInnerContent) — it never
// appends duplicates. The one exception is the optional JSON-LD <script>
// block, which has no baseline placeholder to rewrite and is therefore
// appended.

import { SITE_URL, GITHUB_URL, LINKEDIN_URL } from "../content/links";

// HTMLRewriter is a Cloudflare Workers runtime global (edge-only). This file
// is imported from both src/ (typechecked against DOM lib) and functions/
// (untyped, esbuild-transpiled) — declare it minimally here rather than pull
// in @cloudflare/workers-types.
interface RewriterElement {
  setAttribute(name: string, value: string): void;
  setInnerContent(content: string, options?: { html?: boolean }): void;
  append(content: string, options?: { html?: boolean }): void;
  remove(): void;
}

declare class HTMLRewriter {
  on(selector: string, handlers: { element?(el: RewriterElement): void }): HTMLRewriter;
  transform(response: Response): Response;
}

export { SITE_URL };
export const SITE_NAME = "aycarl.";
export const FULL_NAME = "Carl Yao Agbenyega";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;
export const DEFAULT_OG_IMAGE_WIDTH = "1200";
export const DEFAULT_OG_IMAGE_HEIGHT = "630";
export const DEFAULT_TITLE = "aycarl. — Full-Stack Software Developer & AI Engineer";
export const DEFAULT_DESCRIPTION =
  "I'm a Full-Stack Software Developer & AI Engineer. I help teams figure out where AI can genuinely make their work easier, then I build it.";

export interface RouteMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

// Single source of truth for static-route meta, consumed by both the
// per-route edge functions (functions/*.ts) and the client-side usePageMeta
// hook, so server- and client-rendered titles/descriptions never diverge.
export const ROUTE_META: Record<string, RouteMeta> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/about": {
    title: "About — aycarl.",
    description: `${FULL_NAME} — Full-Stack Software Developer & AI Engineer. Background, approach, and how to get in touch.`,
  },
  "/experience": {
    title: "Experience — aycarl.",
    description: "A timeline of roles, projects, and growth across design, engineering, and leadership.",
  },
  "/links": {
    title: "Links — aycarl.",
    description: "CV, LinkedIn, GitHub, and email — quick links for Carl, Full-Stack Software Developer & AI Engineer.",
    noindex: true, // thin QR-code destination page duplicating primary nav — not worth indexing separately
  },
  "/writing": {
    title: "Writing — aycarl.",
    description: "Notes on building useful things with AI, software, and a bit of common sense.",
  },
  "/writing/archive": {
    title: "Archive — Writing — aycarl.",
    description: "The full archive of every post, filterable by title or tag.",
  },
  "/writing/search": {
    title: "Search — Writing — aycarl.",
    description: "Search across all posts on aycarl.",
    noindex: true, // parametric ?q= results — no unique canonical value to index
  },
  "/projects": {
    title: "Projects — aycarl.",
    description: "Selected work across systems design, infrastructure, and platform engineering.",
  },
};

// Static routes worth listing in sitemap.xml — mirrors the literal-path
// routes in src/App.tsx, minus noindex-marked entries above (/links, /writing/search).
export const STATIC_ROUTES = ["/", "/writing", "/writing/archive", "/projects", "/about", "/experience"] as const;

export const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const canonicalFor = (path: string): string => {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return clean === "" ? SITE_URL : `${SITE_URL}${clean}`;
};

export interface InjectMetaOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Absolute https URL; omit to use DEFAULT_OG_IMAGE. */
  image?: string;
  imageAlt?: string;
  /** ISO date string; not yet emitted as a meta tag — reserved for JSON-LD datePublished. */
  publishedTime?: string;
  jsonLd?: object[];
  noindex?: boolean;
}

export function injectMeta(response: Response, opts: InjectMetaOptions): Response {
  const title = (opts.title || "").trim() || DEFAULT_TITLE;
  const description = ((opts.description || "").trim() || DEFAULT_DESCRIPTION).slice(0, 300);
  const url = canonicalFor(opts.path);
  const type = opts.type ?? "website";
  const usingDefaultImage = !opts.image;
  const image = opts.image || DEFAULT_OG_IMAGE;
  const imageAlt = opts.imageAlt || title;

  let rewriter = new HTMLRewriter()
    .on("title", {
      element(el: RewriterElement) {
        el.setInnerContent(title);
      },
    })
    .on('meta[name="description"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[name="robots"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", opts.noindex ? "noindex, follow" : "index, follow");
      },
    })
    .on('link[rel="canonical"]', {
      element(el: RewriterElement) {
        el.setAttribute("href", url);
      },
    })
    .on('meta[property="og:type"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", type);
      },
    })
    .on('meta[property="og:title"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", title);
      },
    })
    .on('meta[property="og:description"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[property="og:url"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", url);
      },
    })
    .on('meta[property="og:image"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", image);
      },
    })
    .on('meta[property="og:image:alt"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", imageAlt);
      },
    })
    .on('meta[name="twitter:title"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", title);
      },
    })
    .on('meta[name="twitter:description"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", description);
      },
    })
    .on('meta[name="twitter:image"]', {
      element(el: RewriterElement) {
        el.setAttribute("content", image);
      },
    });
  // og:site_name and twitter:card are static (SITE_NAME, "summary_large_image")
  // and already correct in the index.html baseline — no rewrite needed.

  rewriter = usingDefaultImage
    ? rewriter
        .on('meta[property="og:image:width"]', {
          element(el: RewriterElement) {
            el.setAttribute("content", DEFAULT_OG_IMAGE_WIDTH);
          },
        })
        .on('meta[property="og:image:height"]', {
          element(el: RewriterElement) {
            el.setAttribute("content", DEFAULT_OG_IMAGE_HEIGHT);
          },
        })
    : // Custom per-post image (forward-compat "ogImage" hook) has unknown
      // real dimensions — drop the hard-coded 1200x630 hint rather than lie.
      rewriter
        .on('meta[property="og:image:width"]', {
          element(el: RewriterElement) {
            el.remove();
          },
        })
        .on('meta[property="og:image:height"]', {
          element(el: RewriterElement) {
            el.remove();
          },
        });

  if (opts.jsonLd?.length) {
    // The only append in this function: there's no baseline <script type=ld+json>
    // placeholder to rewrite (index.html has none — JSON-LD is optional per-page).
    // "<" is escaped to prevent premature </script> breakout.
    const json = opts.jsonLd.map((obj) => JSON.stringify(obj).replace(/</g, "\\u003c")).join("\n");
    rewriter = rewriter.on("head", {
      element(el: RewriterElement) {
        el.append(`<script type="application/ld+json">${json}</script>`, { html: true });
      },
    });
  }

  return rewriter.transform(response);
}

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
}

const escapeXml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function buildSitemapXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const lastmod = u.lastmod ? `<lastmod>${escapeXml(u.lastmod)}</lastmod>` : "";
      return `  <url><loc>${escapeXml(u.loc)}</loc>${lastmod}</url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

// ---------- JSON-LD structured data ----------
// Consumed via injectMeta's `jsonLd` option (appended as a single <script>
// block per response — see the jsonLd branch in injectMeta above).

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FULL_NAME,
    alternateName: SITE_NAME,
    url: SITE_URL,
    jobTitle: "Full-Stack Software Developer",
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/writing/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BlogPostingInput {
  title: string;
  slug: string;
  date?: string;
  excerpt: string;
}

export function blogPostingJsonLd(post: BlogPostingInput) {
  const url = `${SITE_URL}/writing/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url,
    // Craft only exposes a single "date" property (no separate "last updated"
    // field), so datePublished/dateModified are always identical.
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    author: { "@type": "Person", name: FULL_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
