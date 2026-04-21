import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const dots = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/writing", label: "Writing" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
];

export const SiteFooter = () => {
  return (
    <footer className="mt-32 border-t border-border/60">
      <div className="container py-12 md:py-16">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-foreground/65 hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-1.5 mb-4" aria-hidden>
              {dots.map((c, i) => (
                <span key={i} className={`h-2 w-2 rounded-full ${c}`} />
              ))}
            </div>
            <p className="wordmark text-3xl">aycarl<span className="text-orange">.</span></p>
            <p className="mt-2 text-sm text-muted-foreground">
              © {new Date().getFullYear()} — built with care.
            </p>
          </div>
          <div className="flex items-center gap-5 text-foreground/70">
            <a href="https://github.com/aycarl" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/aycarl" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:hello@aycarl.dev" aria-label="Email" className="hover:text-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
