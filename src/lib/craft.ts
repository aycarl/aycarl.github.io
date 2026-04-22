// Craft Multi-Document API client.
// Base URL is a public link-scoped endpoint; CORS is permitted for our origins.
// We do not mock data — all calls hit the real API.

const BASE = "https://connect.craft.do/links/4GBve1yOGzU/api/v1";

// Known IDs discovered via GET /documents and GET /collections.
// The "Notes & Essays" document holds a single collection named "Posts".
export const POSTS_DOCUMENT_ID = "015067C7-3B65-47CE-A5FC-E09D9CC2CAC9";
export const POSTS_COLLECTION_ID = "769CD161-FC8A-4B52-83AA-36A192AF9FCA";
export const PROJECTS_DOCUMENT_ID = "56C11230-3499-4495-91F3-86EE5259482F";
export const PROJECTS_COLLECTION_ID = "D2F0B707-C91B-437B-829A-CBAA614963A2";

export interface CraftBlock {
  id: string;
  type: string;
  textStyle?: string;
  markdown?: string;
  content?: CraftBlock[];
  items?: CraftCollectionItem[];
}

export interface CraftCollectionItem {
  id: string;
  title: string;
  properties: Record<string, string | boolean | string[] | undefined>;
  contentPreviewMd?: string;
  content?: CraftBlock[];
}

export interface CraftCollectionItemsResponse {
  items: CraftCollectionItem[];
}

export interface CraftSearchHit {
  documentId: string;
  markdown: string;
  blockIds: string[];
}

export interface CraftSearchResponse {
  items: CraftSearchHit[];
}

async function craftGet<T>(path: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Craft API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// ---------- Post model ----------

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  published: boolean;
  excerpt: string;
  readingTime: number;
}

export interface FullPost extends Post {
  blocks: CraftBlock[];
  markdown: string;
}

export const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const parseTags = (raw: unknown): string[] => {
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(/[\s,]+/)
    .map((t) => t.replace(/^#/, "").trim())
    .filter(Boolean);
};

const parsePublished = (raw: unknown, fallback = false): boolean => {
  if (raw === undefined || raw === null || raw === "") return fallback;
  if (raw === true) return true;
  if (raw === false) return false;
  if (typeof raw === "string") return raw.toLowerCase() === "true";
  return fallback;
};

const parseStringArray = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.map((v) => String(v).trim()).filter(Boolean);
  if (typeof raw !== "string") return [];
  return raw
    .split(/[\n,]+/)
    .map((v) => v.trim())
    .filter(Boolean);
};

const stripMarkdown = (md: string): string =>
  md
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const readingTime = (md: string): number => {
  const words = stripMarkdown(md).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const itemToPost = (item: CraftCollectionItem): Post => {
  const title = item.title || "Untitled";
  const dateStr = (item.properties?.date as string) ?? "";
  return {
    id: item.id,
    title,
    slug: slugify(title) || item.id.toLowerCase(),
    date: dateStr,
    tags: parseTags(item.properties?.tags),
    published: parsePublished(item.properties?.published),
    excerpt: item.contentPreviewMd ? stripMarkdown(item.contentPreviewMd).replace(/\.\.\.and \d+ more blocks?$/i, "").trim() : "",
    readingTime: readingTime(item.contentPreviewMd ?? ""),
  };
};

const sortByDateDesc = (a: Post, b: Post): number => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return a.date < b.date ? 1 : -1;
};

const accentPalette = ["sky", "green", "yellow", "pink", "orange"] as const;
type Accent = (typeof accentPalette)[number];

const isAccent = (v: string): v is Accent => accentPalette.includes(v as Accent);

const hashToAccent = (seed: string): Accent => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return accentPalette[Math.abs(hash) % accentPalette.length];
};

const firstLine = (md: string): string => {
  const clean = stripMarkdown(md);
  if (!clean) return "";
  const sentence = clean.split(/(?<=[.!?])\s+/)[0]?.trim();
  return sentence && sentence.length > 0 ? sentence : clean;
};

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  year: number;
  accent: Accent;
  links?: ProjectLink[];
  published: boolean;
  date: string;
}

export interface FullProject extends Project {
  blocks: CraftBlock[];
  body: string;
}

const parseProjectLinks = (raw: unknown): ProjectLink[] => {
  if (typeof raw !== "string") return [];
  const links: ProjectLink[] = [];
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let match: RegExpExecArray | null = markdownLinkRegex.exec(raw);
  while (match) {
    links.push({ label: match[1].trim(), href: match[2].trim() });
    match = markdownLinkRegex.exec(raw);
  }
  if (links.length > 0) return links;

  const urls = raw.match(/https?:\/\/\S+/g) ?? [];
  return urls.map((href, i) => ({ label: `Link ${i + 1}`, href }));
};

const itemToProject = (item: CraftCollectionItem): Project => {
  const title = item.title || "Untitled project";
  const date = (item.properties?.date as string) ?? "";
  const summary = item.contentPreviewMd ? firstLine(item.contentPreviewMd) : "Project details coming soon.";
  const relationProject = parseStringArray(item.properties?.project)[0];
  const role = (item.properties?.role as string) || relationProject || "Project";
  const accentRaw = String(item.properties?.accent ?? "").trim().toLowerCase();
  const accent = isAccent(accentRaw) ? accentRaw : hashToAccent(title);
  const yearFromProperty = Number.parseInt(String(item.properties?.year ?? ""), 10);
  const yearFromDate = date ? Number.parseInt(date.slice(0, 4), 10) : Number.NaN;

  return {
    id: item.id,
    slug: slugify(title) || item.id.toLowerCase(),
    title,
    summary,
    role,
    stack: parseTags(item.properties?.tags),
    year: Number.isFinite(yearFromProperty)
      ? yearFromProperty
      : Number.isFinite(yearFromDate)
        ? yearFromDate
        : new Date().getFullYear(),
    accent,
    links: parseProjectLinks(item.properties?.links),
    published: parsePublished(item.properties?.published, false),
    date,
  };
};

const sortProjects = (a: Project, b: Project): number => {
  if (a.year !== b.year) return b.year - a.year;
  if (!a.date && !b.date) return a.title.localeCompare(b.title);
  if (!a.date) return 1;
  if (!b.date) return -1;
  return a.date < b.date ? 1 : -1;
};

// ---------- Public queries ----------

export async function fetchPosts(): Promise<Post[]> {
  // maxDepth=0 returns just titles + properties + previews — perfect for listing.
  const res = await craftGet<CraftCollectionItemsResponse>(`/collections/${POSTS_COLLECTION_ID}/items`, { maxDepth: 0 });
  return res.items
    .map(itemToPost)
    .filter((p) => p.published)
    .sort(sortByDateDesc);
}

export async function fetchPostBySlug(slug: string): Promise<{ post: FullPost; prev: Post | null; next: Post | null } | null> {
  const all = await fetchPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  const meta = all[idx];

  const block = await craftGet<CraftBlock>(`/blocks`, { id: meta.id });
  const blocks = block.content ?? [];
  const markdown = blocks
    .map((b) => b.markdown ?? "")
    .filter(Boolean)
    .join("\n\n");

  const post: FullPost = {
    ...meta,
    blocks,
    markdown,
    readingTime: readingTime(markdown) || meta.readingTime,
  };

  return {
    post,
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export async function searchPosts(query: string): Promise<Array<Post & { snippet: string }>> {
  const q = query.trim();
  if (!q) return [];
  const res = await craftGet<CraftSearchResponse>(`/documents/search`, {
    include: q,
    documentIds: POSTS_DOCUMENT_ID,
  });
  const posts = await fetchPosts();
  // Map hits back to posts by walking the document tree once via /blocks.
  const root = await craftGet<CraftBlock>(`/blocks`, { id: POSTS_DOCUMENT_ID });
  const blockToPostId = new Map<string, string>();
  const walk = (block: CraftBlock, currentPostId: string | null) => {
    const isItem = block.type === "collectionItem";
    const postId = isItem ? block.id : currentPostId;
    if (postId) blockToPostId.set(block.id, postId);
    block.content?.forEach((c) => walk(c, postId));
    block.items?.forEach((c) => walk(c as unknown as CraftBlock, postId));
  };
  walk(root, null);

  const seen = new Map<string, string>();
  for (const hit of res.items) {
    for (const bid of hit.blockIds) {
      const postId = blockToPostId.get(bid);
      if (postId && !seen.has(postId)) seen.set(postId, hit.markdown);
    }
  }

  return posts
    .filter((p) => seen.has(p.id))
    .map((p) => ({ ...p, snippet: stripMarkdown(seen.get(p.id) ?? "") }));
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await craftGet<CraftCollectionItemsResponse>(`/collections/${PROJECTS_COLLECTION_ID}/items`, { maxDepth: 0 });
  return res.items
    .map(itemToProject)
    .filter((p) => p.published)
    .sort(sortProjects);
}

export async function fetchProjectBySlug(slug: string): Promise<FullProject | null> {
  const all = await fetchProjects();
  const meta = all.find((p) => p.slug === slug);
  if (!meta) return null;

  const block = await craftGet<CraftBlock>(`/blocks`, { id: meta.id });
  const blocks = block.content ?? [];
  const body = blocks
    .map((b) => b.markdown ?? "")
    .filter(Boolean)
    .join("\n\n");

  return {
    ...meta,
    blocks,
    body,
    summary: meta.summary || firstLine(body) || "Project details coming soon.",
  };
}
