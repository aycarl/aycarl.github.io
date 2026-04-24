import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

const exploreLinks = [
  { to: "/", label: "Go home", description: "Start from the landing page." },
  { to: "/writing", label: "Browse writing", description: "Recent essays, notes, and search." },
  { to: "/projects", label: "See projects", description: "Selected work and build notes." },
  { to: "/experience", label: "View experience", description: "Roles, education, and skills." },
  { to: "/about", label: "Read about", description: "Background, approach, and contact." },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 — aycarl.";
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-secondary/70">
        <div className="absolute left-[8%] top-16 h-28 w-28 rounded-full bg-sky/55 blur-3xl" aria-hidden />
        <div className="absolute right-[10%] top-24 h-32 w-32 rounded-full bg-pink/50 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-yellow/60 blur-3xl" aria-hidden />
        <div className="container relative py-20 md:py-28">
          <p className="mb-5 text-sm uppercase tracking-[0.24em] text-foreground/55">404 · page not found</p>
          <h1 className="wordmark text-6xl md:text-8xl leading-[0.88]">
            Wrong turn<span className="text-orange">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-2xl font-light text-foreground/78">
            The route <span className="font-medium text-foreground">{location.pathname}</span> does not exist in this build.
            Try one of the main sections instead.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Go home <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/writing/search"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Search writing
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="wordmark text-4xl md:text-5xl">
            Explore instead<span className="text-green">.</span>
          </h2>
          <p className="max-w-xl text-sm text-foreground/60 md:text-base">
            These routes are stable entry points and are available from the main site navigation.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exploreLinks.map((link, index) => {
            const accents = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors hover:bg-secondary"
              >
                <span
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full ${accents[index % accents.length]} opacity-65 blur-2xl transition-transform group-hover:scale-110`}
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.18em] text-foreground/45">Explore</p>
                  <h3 className="mt-3 text-2xl font-light tracking-tight">{link.label}</h3>
                  <p className="mt-2 text-sm text-foreground/68">{link.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4">
                    Open route <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
