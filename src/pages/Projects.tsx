import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { projects } from "@/content/projects";

const accentDot: Record<string, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

const Projects = () => {
  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">Projects</p>
        <h1 className="wordmark text-6xl md:text-8xl mb-4">
          Things I've built<span className="text-green">.</span>
        </h1>
        <p className="max-w-2xl text-lg text-foreground/70">
          Selected work across systems design, infrastructure, and platform engineering.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group relative rounded-3xl border border-border p-8 bg-card hover:bg-secondary transition-colors overflow-hidden"
            >
              <span className={`absolute -top-16 -right-16 h-56 w-56 rounded-full ${accentDot[p.accent]} opacity-70 blur-3xl group-hover:scale-110 transition-transform`} />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                  <span className={`h-2 w-2 rounded-full ${accentDot[p.accent]}`} />
                  {p.year} · {p.role}
                </div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">{p.title}</h2>
                <p className="mt-3 text-foreground/70">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-background/70 border border-border text-foreground/70">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Projects;
