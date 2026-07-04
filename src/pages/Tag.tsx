import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PostListItem } from "@/components/PostListItem";
import { fetchPosts } from "@/lib/craft";
import { PostListSkeleton } from "@/components/PostListSkeleton";

const Tag = () => {
  const { tag } = useParams<{ tag: string }>();
  const decoded = tag ? decodeURIComponent(tag) : "";
  const { data: posts, isLoading, error } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });

  const filtered = posts?.filter((p) => p.tags.some((t) => t.toLowerCase() === decoded.toLowerCase())) ?? [];

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
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
              <PostListItem key={p.id} post={p} activeTag={decoded} />
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Tag;
