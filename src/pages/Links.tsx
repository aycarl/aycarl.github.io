import { Link } from "react-router-dom";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BrandGithub, BrandLinkedin } from "@/components/icons/BrandIcons";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/content/links";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ROUTE_META } from "@/lib/seo";

const dots = ["bg-sky", "bg-green", "bg-yellow", "bg-pink", "bg-orange"];

const linkItemClass =
  "inline-flex w-full items-center gap-3 rounded-full border border-border px-6 py-4 text-sm hover:bg-secondary transition-colors";

const Links = () => {
  usePageMeta(ROUTE_META["/links"]);

  return (
    <SiteLayout>
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex items-center gap-1.5" aria-hidden>
            {dots.map((c, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${c}`} />
            ))}
          </div>
          <h1 className="wordmark text-5xl md:text-6xl mb-3">
            Carl<span className="text-yellow">.</span>
          </h1>
          <p className="text-foreground/70 mb-10">
            AI solutions engineer &amp; full-stack developer.
          </p>

          <nav className="flex flex-col gap-3" aria-label="Contact and profile links">
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center gap-3 rounded-full bg-foreground text-background px-6 py-4 text-sm"
            >
              <FileText className="h-4 w-4" /> Download CV
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkItemClass}>
              <BrandLinkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkItemClass}>
              <BrandGithub className="h-4 w-4" /> GitHub
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkItemClass}>
              <Mail className="h-4 w-4" /> Email me
            </a>
            <Link to="/" className={linkItemClass}>
              <ArrowRight className="h-4 w-4" /> Explore aycarl.com
            </Link>
          </nav>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Links;
