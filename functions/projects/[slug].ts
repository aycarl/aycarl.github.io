import { fetchPublishedProjects } from "../../src/lib/craft-edge";
import { injectMeta } from "../../src/lib/seo";

export async function onRequest(context: any) {
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
    });
  } catch (err) {
    console.error("projects/[slug] edge meta error:", err);
    return next();
  }
}
