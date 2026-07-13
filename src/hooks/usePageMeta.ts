import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "@/lib/seo";

interface PageMetaOptions {
  title: string;
  description: string;
  noindex?: boolean;
  /** Defaults to the current location's pathname. */
  canonicalPath?: string;
}

function upsertMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

// Client-side counterpart to src/lib/seo.ts#injectMeta: keeps document.title,
// the description meta, and the canonical link in sync on SPA navigation
// (the edge-injected tags only apply to the first, server-rendered load).
export function usePageMeta({ title, description, noindex, canonicalPath }: PageMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    upsertMeta("description", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${canonicalPath ?? location.pathname}`);

    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      upsertMeta("robots", "noindex, follow");
    } else if (robots) {
      robots.setAttribute("content", "index, follow");
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title, description, noindex, canonicalPath, location.pathname]);
}
