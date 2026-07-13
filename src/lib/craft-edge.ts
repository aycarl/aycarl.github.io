// Shared Craft API helpers for Cloudflare Pages edge functions
// (functions/writing/[slug].ts, functions/projects/[slug].ts, and the
// sitemap generator). Reuses the canonical string-processing logic from
// src/lib/craft.ts (the client data layer) rather than re-duplicating it;
// adds edge-only concerns: request caching and og-image extraction.

import {
  slugify,
  stripMarkdown,
  parsePublished,
  POSTS_COLLECTION_ID,
  PROJECTS_COLLECTION_ID,
  type CraftBlock,
  type CraftCollectionItem,
  type CraftCollectionItemsResponse,
} from "./craft";

const BASE = "https://connect.craft.do/links/4GBve1yOGzU/api/v1";

// Crawler/unfurl traffic hits this on every share/crawl; a short cache keeps
// Craft origin load down without meaningfully delaying "just published" shares.
const CRAFT_EDGE_CACHE_TTL_SECONDS = 300;

async function craftGetEdge<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    // `cf` is a Cloudflare Workers-only fetch extension; not covered by the
    // DOM lib's RequestInit, and this project has no @cloudflare/workers-types
    // dependency — cast rather than add one, matching the existing untyped
    // convention in /functions.
    cf: { cacheTtl: CRAFT_EDGE_CACHE_TTL_SECONDS, cacheEverything: true },
  } as RequestInit);
  if (!res.ok) throw new Error(`Craft API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

const CRAFT_PREVIEW_SUFFIX = /\.\.\.and \d+ more blocks?$/i;

export function buildExcerpt(md: string | undefined, maxLen = 150): string {
  if (!md) return "Read this on aycarl.";
  const clean = stripMarkdown(md).replace(CRAFT_PREVIEW_SUFFIX, "").trim();
  return clean.length > maxLen ? `${clean.slice(0, maxLen)}...` : clean;
}

export function extractOgImage(properties: CraftCollectionItem["properties"] | undefined): string | undefined {
  // Forward-compatible hook: the live API exposes no image fields today
  // (verified 2026-07-13 against both collections). Adding a text property
  // named "ogImage" (an https URL) to a Craft item lights this up with zero
  // code changes on this side.
  const raw = properties?.ogImage;
  return typeof raw === "string" && /^https:\/\//.test(raw.trim()) ? raw.trim() : undefined;
}

export interface EdgePostSummary {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  ogImage?: string;
}

export async function fetchPublishedPosts(): Promise<EdgePostSummary[]> {
  const res = await craftGetEdge<CraftCollectionItemsResponse>(`/collections/${POSTS_COLLECTION_ID}/items`, {
    maxDepth: 0,
  });
  return res.items
    .filter((item) => parsePublished(item.properties?.published))
    .map((item) => {
      const title = item.title || "Untitled";
      return {
        id: item.id,
        slug: slugify(title) || item.id.toLowerCase(),
        title,
        date: (item.properties?.date as string) ?? "",
        excerpt: buildExcerpt(item.contentPreviewMd),
        ogImage: extractOgImage(item.properties),
      };
    });
}

export interface EdgeProjectSummary {
  id: string;
  slug: string;
  title: string;
  date: string;
  year: number;
  role: string;
  summary: string;
  ogImage?: string;
}

export async function fetchPublishedProjects(): Promise<EdgeProjectSummary[]> {
  const res = await craftGetEdge<CraftCollectionItemsResponse>(`/collections/${PROJECTS_COLLECTION_ID}/items`, {
    maxDepth: 0,
  });
  return res.items
    .filter((item) => parsePublished(item.properties?.published, false))
    .map((item) => {
      const title = item.title || "Untitled project";
      const relationProject = item.properties?.project;
      const role =
        (item.properties?.role as string) ||
        (Array.isArray(relationProject) ? relationProject[0] : typeof relationProject === "string" ? relationProject : "Project");
      const yearProp = Number.parseInt(String(item.properties?.year ?? ""), 10);
      const dateStr = (item.properties?.date as string) ?? "";
      const yearFromDate = dateStr ? Number.parseInt(dateStr.slice(0, 4), 10) : Number.NaN;
      const year = Number.isFinite(yearProp) ? yearProp : Number.isFinite(yearFromDate) ? yearFromDate : new Date().getFullYear();
      const firstSentence = stripMarkdown(item.contentPreviewMd ?? "").split(/(?<=[.!?])\s+/)[0]?.trim();
      return {
        id: item.id,
        slug: slugify(title) || item.id.toLowerCase(),
        title,
        date: dateStr,
        year,
        role,
        summary: firstSentence || "Project details coming soon.",
        ogImage: extractOgImage(item.properties),
      };
    });
}

/** Fetches and flattens a Craft item's full block tree to markdown (the same call fetchPostBySlug/fetchProjectBySlug make client-side). */
export async function fetchBlockMarkdown(id: string): Promise<string> {
  const block = await craftGetEdge<CraftBlock>("/blocks", { id });
  return (block.content ?? [])
    .map((b) => b.markdown ?? "")
    .filter(Boolean)
    .join("\n\n");
}
