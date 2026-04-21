import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Markdown } from "@/components/Markdown";
import { getProjectBySlug } from "@/content/projects";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const accentDot: Record<string, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

const Project = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    if (project) document.title = `${project.title} — aycarl.`;
  }, [project]);

  if (!project) {
    return (
      <SiteLayout>
        <div className="container py-24">
          <p className="text-muted-foreground mb-4">Project not found.</p>
          <Link to="/projects" className="underline">Back to projects</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="container py-16 md:py-24 max-w-3xl">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground mb-10">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className={`h-2 w-2 rounded-full ${accentDot[project.accent]}`} />
            {project.year} · {project.role}
          </div>
          <h1 className="wordmark text-5xl md:text-6xl mb-4">{project.title}</h1>
          <p className="text-xl text-foreground/70">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary border border-border text-foreground/70">
                {s}
              </span>
            ))}
          </div>
          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm underline underline-offset-4"
                >
                  {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}
        </header>
        <Markdown>{project.body}</Markdown>
      </article>
    </SiteLayout>
  );
};

export default Project;
