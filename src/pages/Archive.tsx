import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { fetchPosts } from "@/lib/craft";
import { Input } from "@/components/ui/input";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const yearOf = (d: string) => (d ? new Date(d).getFullYear() : 0);

const Archive = () => {
  const { data: posts, isLoading, error } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.excerpt.toLowerCase().includes(q),
    );
  }, [posts, filter]);

  // Group by year for the editorial feel.
  const grouped = useMemo(() => {
    const map = new Map<number, typeof filtered>();
    for (const p of filtered) {
      const y = yearOf(p.date);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(p);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 max-w-4xl">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-widest text-foreground/60 mb-3">Archive</p>
            <h1 className="wordmark text-5xl md:text-7xl">
              Everything written<span className="text-sky">.</span>
            </h1>
          </div>
          <Link to="/writing/search" className="text-sm text-foreground/65 hover:text-foreground underline underline-offset-4">
            Full-text search →
          </Link>
        </div>

        <div className="mt-10 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by title or tag…"
            className="pl-10 rounded-full bg-background"
          />
        </div>

        {isLoading && <p className="mt-12 text-muted-foreground">Loading archive…</p>}
        {error && <p className="mt-12 text-destructive">Couldn't load posts.</p>}

        <div className="mt-16 space-y-16">
          {grouped.map(([year, items]) => (
            <div key={year}>
              <div className="flex items-baseline gap-6 mb-6">
                <h2 className="wordmark text-3xl md:text-4xl text-foreground/30">{year || "—"}</h2>
                <span className="text-xs text-muted-foreground">{items.length} {items.length === 1 ? "post" : "posts"}</span>
              </div>
              <ul className="divide-y divide-border border-t border-border">
                {items.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/writing/${p.slug}`}
                      className="group grid grid-cols-12 gap-4 py-5 items-baseline hover:bg-secondary/40 -mx-4 px-4 rounded-lg transition-colors"
                    >
                      <div className="col-span-3 md:col-span-2 text-sm text-muted-foreground tabular-nums">
                        {p.date ? formatDate(p.date).replace(`, ${year}`, "") : "—"}
                      </div>
                      <div className="col-span-9 md:col-span-8 text-base md:text-lg font-light tracking-tight">
                        {p.title}
                      </div>
                      <div className="hidden md:block col-span-2 text-right text-xs text-muted-foreground">
                        {p.readingTime} min
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filtered.length === 0 && posts && !isLoading && (
            <p className="text-muted-foreground">Nothing matches "{filter}".</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default Archive;
