import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Fires a GA4 page_view on SPA navigation. gtag.js in index.html is configured
// with send_page_view: false since a single document load spans many routes.
export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    window.gtag?.("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);
}
