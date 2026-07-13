import { fetchPublishedProjects, fetchBlockMarkdown } from "../../src/lib/craft-edge";
import { injectMeta, SITE_URL, breadcrumbJsonLd } from "../../src/lib/seo";
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
    const projects = await fetchPublishedProjects();
    const project = projects.find((p) => p.slug === slug);
    if (!project) return next();

    let response = await next();
    response = injectMeta(response, {
      title: `${project.title} — aycarl.`,
      description: `${project.year} · ${project.role} — ${project.summary}`,
      path: `/projects/${slug}`,
      type: "article",
      image: project.ogImage,
      publishedTime: project.date || undefined,
      jsonLd: [
        breadcrumbJsonLd([
          { name: "Projects", url: `${SITE_URL}/projects` },
          { name: project.title, url: `${SITE_URL}/projects/${slug}` },
        ]),
      ],
    });

    if (isBotUserAgent(request.headers.get("User-Agent"))) {
      try {
        const markdown = await fetchBlockMarkdown(project.id);
        const bodyHtml = markdownToHtml(markdown);
        const shell = buildArticleShell({
          title: project.title,
          meta: `${project.year} · ${project.role}`,
          bodyHtml,
        });
        response = injectArticleBody(response, shell);
      } catch (err) {
        console.error("projects/[slug] article-body injection error:", err);
      }
    }

    return response;
  } catch (err) {
    console.error("projects/[slug] edge meta error:", err);
    return next();
  }
}
