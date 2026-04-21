import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { fetchPosts } from "@/lib/craft";
import { PostListSkeleton } from "@/components/PostListSkeleton";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const dotColors = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const Tag = () => {
  const { tag } = useParams<{ tag: string }>();
  const decoded = tag ? decodeURIComponent(tag) : "";
  const { data: posts, isLoading, error } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  const filtered = posts?.filter((p) => p.tags.some((t) => t.toLowerCase() === decoded.toLowerCase())) ?? [];

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 max-w-4xl">
        <Link to="/writing" className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground mb-10">
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-3">Tag</p>
        <h1 className="wordmark text-5xl md:text-7xl mb-3">
          <span className="inline-flex items-center gap-4">
            <span className="h-3 w-3 rounded-full bg-yellow inline-block" />
            #{decoded}
          </span>
        </h1>
        {posts && (
          <p className="text-foreground/60">
            {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          </p>
        )}

        <div className="mt-16">
          {isLoading && <PostListSkeleton count={4} />}
          {error && <p className="text-destructive">Couldn't load posts.</p>}
          {posts && filtered.length === 0 && (
            <p className="text-muted-foreground">No posts tagged with #{decoded}.</p>
          )}

          <ul className="divide-y divide-border">
            {filtered.map((p) => (
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
                    {p.excerpt && <p className="mt-3 text-foreground/65 leading-relaxed line-clamp-2">{p.excerpt}</p>}
                    {p.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {p.tags.slice(0, 4).map((t, i) => (
                          <span
                            key={t}
                            className={`inline-flex items-center gap-1.5 text-xs ${
                              t.toLowerCase() === decoded.toLowerCase() ? "text-foreground" : "text-foreground/55"
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % 5]}`} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Tag;
