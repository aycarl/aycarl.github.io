import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Markdown } from "@/components/Markdown";
import { fetchPostBySlug } from "@/lib/craft";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const dotColors = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPostBySlug(slug!),
    enabled: !!slug,
  });

  useEffect(() => {
    if (data?.post) document.title = `${data.post.title} — aycarl.`;
    return () => {
      document.title = "aycarl. — solutions architect";
    };
  }, [data]);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="container py-24 max-w-3xl">
          <div className="h-4 w-32 bg-secondary rounded animate-pulse mb-6" />
          <div className="h-12 w-3/4 bg-secondary rounded animate-pulse mb-4" />
          <div className="h-12 w-1/2 bg-secondary rounded animate-pulse mb-12" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-secondary rounded animate-pulse" style={{ width: `${85 + (i % 3) * 5}%` }} />
            ))}
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (error || !data) {
    return (
      <SiteLayout>
        <div className="container py-24 max-w-3xl">
          <p className="text-muted-foreground mb-4">Post not found.</p>
          <Link to="/writing" className="underline">Back to writing</Link>
        </div>
      </SiteLayout>
    );
  }

  const { post, prev, next } = data;

  return (
    <SiteLayout>
      <article className="container py-16 md:py-24 max-w-3xl">
        <Link
          to="/writing"
          className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <header className="mb-12">
          <div className="text-sm text-muted-foreground mb-4 tabular-nums">
            {post.date && formatDate(post.date)} · {post.readingTime} min read
          </div>
          <h1 className="wordmark text-4xl md:text-6xl mb-6 leading-[1.05]">{post.title}</h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {post.tags.map((t, i) => (
                <Link
                  key={t}
                  to={`/writing/tag/${encodeURIComponent(t)}`}
                  className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${dotColors[i % 5]}`} />
                  {t}
                </Link>
              ))}
            </div>
          )}
        </header>

        <Markdown>{post.markdown}</Markdown>

        <nav className="mt-24 pt-12 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
          {prev ? (
            <Link
              to={`/writing/${prev.slug}`}
              className="group flex flex-col gap-2 p-5 -m-5 rounded-2xl hover:bg-secondary/50 transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <ArrowLeft className="h-3 w-3" /> Previous
              </span>
              <span className="text-lg font-light tracking-tight group-hover:text-foreground/70 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/writing/${next.slug}`}
              className="group flex flex-col gap-2 p-5 -m-5 rounded-2xl md:text-right hover:bg-secondary/50 transition-colors"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground md:justify-end">
                Next <ArrowRight className="h-3 w-3" />
              </span>
              <span className="text-lg font-light tracking-tight group-hover:text-foreground/70 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </SiteLayout>
  );
};

export default Post;
