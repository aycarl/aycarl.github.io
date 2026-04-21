import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const links = [
  { to: "/writing", label: "Writing" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
];

export const Wordmark = ({ className }: { className?: string }) => (
  <Link to="/" className={cn("wordmark text-2xl tracking-tight inline-flex items-baseline", className)} aria-label="aycarl home">
    <span>aycarl</span>
    <span className="text-orange">.</span>
  </Link>
);

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className="text-foreground/65 hover:text-foreground transition-colors"
              activeClassName="text-foreground"
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/writing/search"
            aria-label="Search writing"
            className="text-foreground/65 hover:text-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>
        </nav>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 -mr-2" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="mt-12 flex flex-col gap-6 text-2xl wordmark">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-foreground/70"
                    activeClassName="text-foreground"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
