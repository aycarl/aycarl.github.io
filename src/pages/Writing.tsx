import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { fetchPosts } from "@/lib/craft";
import { PostListSkeleton } from "@/components/PostListSkeleton";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const dotColors = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const Writing = () => {
  const { data: posts, isLoading, error } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const recent = posts?.slice(0, 3) ?? [];

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">Writing</p>
        <h1 className="wordmark text-6xl md:text-8xl mb-6">
          Notes &amp; essays<span className="text-pink">.</span>
        </h1>
        <p className="max-w-2xl text-lg text-foreground/70">
          Working notes on systems design, infrastructure, and the craft of being a solutions architect.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/writing/search"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground/75 hover:bg-secondary transition-colors"
          >
            <Search className="h-3.5 w-3.5" /> Search the archive
          </Link>
          <Link
            to="/writing/archive"
            className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground underline underline-offset-4"
          >
            View full archive
          </Link>
        </div>

        <div className="mt-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-sm uppercase tracking-widest text-foreground/60">Recent</h2>
            <span className="text-xs text-muted-foreground">{posts ? `${posts.length} post${posts.length === 1 ? "" : "s"}` : ""}</span>
          </div>

          {isLoading && <PostListSkeleton count={3} />}
          {error && <p className="py-8 text-sm text-destructive">Couldn't load posts. Try again in a moment.</p>}
          {posts && posts.length === 0 && (
            <p className="py-8 text-muted-foreground">No published posts yet.</p>
          )}

          <ul className="divide-y divide-border">
            {recent.map((p) => (
              <li key={p.id}>
                <Link to={`/writing/${p.slug}`} className="group grid grid-cols-12 gap-6 py-8 items-baseline">
                  <div className="col-span-12 md:col-span-3 text-sm text-muted-foreground tabular-nums">
                    {p.date && formatDate(p.date)}
                    <div className="text-xs text-muted-foreground/70 mt-1">{p.readingTime} min read</div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-foreground/70 transition-colors">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-3 text-foreground/65 leading-relaxed line-clamp-2">{p.excerpt}</p>
                    )}
                    {p.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {p.tags.slice(0, 4).map((t, i) => (
                          <Link
                            key={t}
                            to={`/writing/tag/${encodeURIComponent(t)}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs text-foreground/55 hover:text-foreground transition-colors"
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % 5]}`} />
                            {t}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {posts && posts.length > 3 && (
            <Link
              to="/writing/archive"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all"
            >
              Read the full archive <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Writing;
