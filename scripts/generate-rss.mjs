/**
 * Build-time RSS feed generator for the Writing / Posts section.
 *
 * Fetches published posts from the Craft Multi-Document API (the same
 * endpoint used by the client-side React app) and writes a valid RSS 2.0
 * feed to dist/feed.xml.  Run this after `vite build` so the dist directory
 * already exists.
 *
 * Usage (automatic via package.json build script):
 *   node scripts/generate-rss.mjs
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Craft API config — mirrors src/lib/craft.ts
// ---------------------------------------------------------------------------
const BASE = "https://connect.craft.do/links/4GBve1yOGzU/api/v1";
const POSTS_COLLECTION_ID = "769CD161-FC8A-4B52-83AA-36A192AF9FCA";

const SITE_URL = "https://www.aycarl.com";
const FEED_PATH = path.resolve(process.cwd(), "dist", "feed.xml");

// ---------------------------------------------------------------------------
// Helpers — mirrors the parsing logic in src/lib/craft.ts
// ---------------------------------------------------------------------------

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseTags(raw) {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(/[\s,]+/)
    .map((t) => t.replace(/^#/, "").trim())
    .filter(Boolean);
}

function parsePublished(raw, fallback = false) {
  if (raw === undefined || raw === null || raw === "") return fallback;
  if (raw === true) return true;
  if (raw === false) return false;
  if (typeof raw === "string") return raw.toLowerCase() === "true";
  return fallback;
}

function stripMarkdown(md) {
  return md
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function itemToPost(item) {
  const title = item.title || "Untitled";
  const dateStr = (item.properties?.date) ?? "";
  return {
    id: item.id,
    title,
    slug: slugify(title) || item.id.toLowerCase(),
    date: dateStr,
    tags: parseTags(item.properties?.tags),
    published: parsePublished(item.properties?.published),
    excerpt: item.contentPreviewMd
      ? stripMarkdown(item.contentPreviewMd).replace(/\.\.\.and \d+ more blocks?$/i, "").trim()
      : "",
  };
}

function sortByDateDesc(a, b) {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return a.date < b.date ? 1 : -1;
}

// ---------------------------------------------------------------------------
// Craft API fetch
// ---------------------------------------------------------------------------

async function craftGet(path, params = {}) {
  const url = new URL(`${BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Craft API ${path} failed: ${res.status}`);
  return res.json();
}

async function fetchPosts() {
  const res = await craftGet(`/collections/${POSTS_COLLECTION_ID}/items`, { maxDepth: 0 });
  return res.items
    .map(itemToPost)
    .filter((p) => p.published)
    .sort(sortByDateDesc);
}

// ---------------------------------------------------------------------------
// XML helpers
// ---------------------------------------------------------------------------

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toUTCString();
}

// ---------------------------------------------------------------------------
// RSS generation
// ---------------------------------------------------------------------------

function buildFeed(posts) {
  const now = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/writing/${p.slug}`;
      const pubDate = toRfc822(p.date);
      const categories = p.tags.map((t) => `    <category>${escapeXml(t)}</category>`).join("\n");
      return [
        "  <item>",
        `    <title>${escapeXml(p.title)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        pubDate ? `    <pubDate>${pubDate}</pubDate>` : "",
        p.excerpt ? `    <description>${escapeXml(p.excerpt)}</description>` : "",
        categories,
        "  </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>aycarl — Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>Notes and essays on systems design, infrastructure, and the craft of being a solutions architect.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Fetching posts from Craft API…");
  let posts;
  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error("Failed to fetch posts:", err.message);
    console.warn("Generating empty RSS feed.");
    posts = [];
  }

  console.log(`  Found ${posts.length} published post(s).`);

  const xml = buildFeed(posts);

  const dir = path.dirname(FEED_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(FEED_PATH, xml, "utf8");
  console.log(`RSS feed written to ${path.relative(process.cwd(), FEED_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
