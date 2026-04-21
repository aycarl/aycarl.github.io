import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { searchPosts } from "@/lib/craft";
import { Input } from "@/components/ui/input";

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

const useDebounced = <T,>(value: T, delay = 300): T => {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
};

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark key={i} className="bg-yellow/40 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const initial = params.get("q") ?? "";
  const [input, setInput] = useState(initial);
  const debounced = useDebounced(input, 350);

  useEffect(() => {
    if (debounced) setParams({ q: debounced }, { replace: true });
    else setParams({}, { replace: true });
  }, [debounced, setParams]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => searchPosts(debounced),
    enabled: debounced.trim().length > 0,
  });

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 max-w-4xl">
        <Link to="/writing" className="inline-flex items-center gap-2 text-sm text-foreground/65 hover:text-foreground mb-10">
          <ArrowLeft className="h-4 w-4" /> All writing
        </Link>

        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-3">Search</p>
        <h1 className="wordmark text-5xl md:text-7xl mb-10">
          Find a thought<span className="text-orange">.</span>
        </h1>

        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search across all posts…"
            className="h-14 pl-12 text-lg rounded-full bg-background border-2"
          />
        </div>

        <div className="mt-12">
          {!debounced && <p className="text-muted-foreground">Type to search the archive.</p>}
          {debounced && isFetching && <p className="text-muted-foreground">Searching…</p>}
          {error && <p className="text-destructive">Search failed. Try again.</p>}
          {data && data.length === 0 && !isFetching && (
            <p className="text-muted-foreground">No matches for "{debounced}".</p>
          )}

          {data && data.length > 0 && (
            <>
              <p className="text-xs uppercase tracking-widest text-foreground/50 mb-6">
                {data.length} {data.length === 1 ? "result" : "results"}
              </p>
              <ul className="divide-y divide-border">
                {data.map((p) => (
                  <li key={p.id}>
                    <Link to={`/writing/${p.slug}`} className="group block py-6">
                      <div className="text-xs text-muted-foreground tabular-nums mb-2">
                        {p.date && formatDate(p.date)}
                      </div>
                      <h3 className="text-xl md:text-2xl font-light tracking-tight group-hover:text-foreground/70 transition-colors">
                        <Highlight text={p.title} query={debounced} />
                      </h3>
                      {p.snippet && (
                        <p className="mt-2 text-foreground/65 leading-relaxed line-clamp-2">
                          <Highlight text={p.snippet} query={debounced} />
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
};

export default SearchPage;
