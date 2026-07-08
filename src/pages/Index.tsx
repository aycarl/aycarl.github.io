import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroBlobField } from "@/components/Blob";
import { PostListItem } from "@/components/PostListItem";
import { fetchPosts, fetchProjects } from "@/lib/craft";
import { ArrowUpRight } from "lucide-react";

const accentDot: Record<string, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

const Index = () => {
  const { data: allPosts } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const { data: allProjects } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const posts = (allPosts ?? []).slice(0, 3);
  const featured = (allProjects ?? []).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary/70">
        <HeroBlobField />
        <div className="container relative pt-20 md:pt-32 pb-24 md:pb-40">
          <div className="max-w-4xl">
            <p className="text-sm tracking-widest uppercase text-foreground/60 mb-6 animate-fade-up">
              AI Solutions Engineer · Full-stack Developer
            </p>
            <h1 className="wordmark text-[18vw] md:text-[12rem] leading-[0.85] animate-fade-up">
              aycarl<span className="text-orange">.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-xl md:text-2xl font-light text-foreground/80 animate-fade-up">
              I design systems that hold up under real load, and write about the messy middle
              between requirements, runtime and real life.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up">
              <Link
                to="/writing"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Read the writing <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              >
                See the projects
              </Link>
              <Link
                to="/experience"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
              >
                View experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest writing */}
      <section className="container py-20 md:py-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="wordmark text-4xl md:text-5xl">Latest writing<span className="text-pink">.</span></h2>
          <Link to="/writing" className="text-sm text-foreground/65 hover:text-foreground underline underline-offset-4">
            All posts
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {allPosts && posts.length === 0 && (
            <li className="py-8 text-muted-foreground">No published posts yet.</li>
          )}
          {posts.map((p) => (
            <PostListItem key={p.id} post={p} />
          ))}
        </ul>
      </section>

      {/* Selected projects */}
      <section className="container pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-10">
          <h2 className="wordmark text-4xl md:text-5xl">Selected projects<span className="text-green">.</span></h2>
          <Link to="/projects" className="text-sm text-foreground/65 hover:text-foreground underline underline-offset-4">
            All projects
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="group relative rounded-3xl border border-border p-6 bg-card hover:bg-secondary transition-colors overflow-hidden"
            >
              <span className={`absolute -top-12 -right-12 h-40 w-40 rounded-full ${accentDot[p.accent]} opacity-70 blur-2xl group-hover:scale-110 transition-transform`} />
              <div className="relative">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className={`h-2 w-2 rounded-full ${accentDot[p.accent]}`} />
                  {p.year} · {p.role}
                </div>
                <h3 className="text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
