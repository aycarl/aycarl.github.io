import { fetchPublishedPosts } from "../../src/lib/craft-edge";
import { injectMeta, SITE_URL, blogPostingJsonLd, breadcrumbJsonLd } from "../../src/lib/seo";

export async function onRequest(context: { params: Record<string, string>; next: () => Promise<Response> }) {
  const { params, next } = context;
  const slug = params.slug as string;

  try {
    const posts = await fetchPublishedPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return next(); // no matching published post — default shell

    const response = await next();
    return injectMeta(response, {
      title: `${post.title} — aycarl.`,
      description: post.excerpt,
      path: `/writing/${slug}`,
      type: "article",
      image: post.ogImage, // undefined today — injectMeta falls back to the default OG image
      publishedTime: post.date || undefined,
      jsonLd: [
        blogPostingJsonLd({ title: post.title, slug, date: post.date, excerpt: post.excerpt }),
        breadcrumbJsonLd([
          { name: "Writing", url: `${SITE_URL}/writing` },
          { name: post.title, url: `${SITE_URL}/writing/${slug}` },
        ]),
      ],
    });
  } catch (err) {
    console.error("writing/[slug] edge meta error:", err);
    return next(); // always fall back gracefully
  }
}
