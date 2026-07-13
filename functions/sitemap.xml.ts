import { fetchPublishedPosts, fetchPublishedProjects } from "../src/lib/craft-edge";
import { SITE_URL, STATIC_ROUTES, buildSitemapXml, type SitemapUrl } from "../src/lib/seo";

export async function onRequest(): Promise<Response> {
  const urls: SitemapUrl[] = STATIC_ROUTES.map((path) => ({ loc: path === "/" ? SITE_URL : `${SITE_URL}${path}` }));

  try {
    const [posts, projects] = await Promise.all([fetchPublishedPosts(), fetchPublishedProjects()]);
    for (const p of posts) urls.push({ loc: `${SITE_URL}/writing/${p.slug}`, lastmod: p.date || undefined });
    for (const p of projects) urls.push({ loc: `${SITE_URL}/projects/${p.slug}`, lastmod: p.date || undefined });
  } catch (err) {
    console.error("sitemap.xml: Craft fetch failed, serving static routes only:", err);
    // Deliberately no throw — degrade to a static-only sitemap rather than 500.
  }

  return new Response(buildSitemapXml(urls), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
