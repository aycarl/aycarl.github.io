import { fetchPublishedPosts, fetchBlockMarkdown } from "../../src/lib/craft-edge";
import { injectMeta, SITE_URL, blogPostingJsonLd, breadcrumbJsonLd } from "../../src/lib/seo";
import { markdownToHtml, buildArticleShell, injectArticleBody } from "../../src/lib/markdown-edge";
import { isBotUserAgent } from "../../src/lib/crawler-ua";

export async function onRequest(context: {
  request: Request;
  params: Record<string, string>;
  next: () => Promise<Response>;
}) {
  const { request, params, next } = context;
  const slug = params.slug as string;

  try {
    const posts = await fetchPublishedPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) return next(); // no matching published post — default shell

    let response = await next();
    response = injectMeta(response, {
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

    // Non-JS-executing crawlers (GPTBot, ClaudeBot, link unfurlers, ...) get
    // the article body pre-rendered into #root; humans get the unchanged
    // client-rendered app. See src/lib/crawler-ua.ts for why this is gated
    // rather than always-on.
    if (isBotUserAgent(request.headers.get("User-Agent"))) {
      try {
        const markdown = await fetchBlockMarkdown(post.id);
        const bodyHtml = markdownToHtml(markdown);
        const shell = buildArticleShell({ title: post.title, meta: post.date || undefined, bodyHtml });
        response = injectArticleBody(response, shell);
      } catch (err) {
        console.error("writing/[slug] article-body injection error:", err);
        // Meta-only response (already built above) is still correct.
      }
    }

    return response;
  } catch (err) {
    console.error("writing/[slug] edge meta error:", err);
    return next(); // always fall back gracefully
  }
}
