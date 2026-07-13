import { fetchPublishedProjects } from "../../src/lib/craft-edge";
import { injectMeta, SITE_URL, breadcrumbJsonLd } from "../../src/lib/seo";

export async function onRequest(context: { params: Record<string, string>; next: () => Promise<Response> }) {
  const { params, next } = context;
  const slug = params.slug as string;

  try {
    const projects = await fetchPublishedProjects();
    const project = projects.find((p) => p.slug === slug);
    if (!project) return next();

    const response = await next();
    return injectMeta(response, {
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
  } catch (err) {
    console.error("projects/[slug] edge meta error:", err);
    return next();
  }
}
