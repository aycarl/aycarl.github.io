import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { PostListItem } from "@/components/PostListItem";
import { fetchPosts } from "@/lib/craft";
import { PostListSkeleton } from "@/components/PostListSkeleton";

const Writing = () => {
  const { data: posts, isLoading, error } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const recent = posts?.slice(0, 3) ?? [];

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
        <PageHero
          eyebrow="Writing"
          title="Notes & essays"
          accent="pink"
          description="Notes on building useful things with AI, software, and a bit of common sense."
        />

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
              <PostListItem key={p.id} post={p} />
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
