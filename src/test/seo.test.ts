import { describe, it, expect } from "vitest";
import { ROUTE_META, STATIC_ROUTES, buildSitemapXml, canonicalFor, SITE_URL } from "@/lib/seo";

describe("ROUTE_META coverage", () => {
  it("has an entry for every static route", () => {
    for (const path of STATIC_ROUTES) {
      expect(ROUTE_META[path], `missing ROUTE_META entry for ${path}`).toBeDefined();
      expect(ROUTE_META[path].title.length).toBeGreaterThan(0);
      expect(ROUTE_META[path].description.length).toBeGreaterThan(0);
    }
  });

  it("marks /writing/search and /links as noindex", () => {
    expect(ROUTE_META["/writing/search"]?.noindex).toBe(true);
    expect(ROUTE_META["/links"]?.noindex).toBe(true);
  });

  it("does not list noindex routes in the sitemap's static route list", () => {
    expect(STATIC_ROUTES).not.toContain("/links");
    expect(STATIC_ROUTES).not.toContain("/writing/search");
  });
});

describe("buildSitemapXml", () => {
  it("escapes & in URLs", () => {
    const xml = buildSitemapXml([{ loc: `${SITE_URL}/writing/foo-&-bar` }]);
    expect(xml).toContain("foo-&amp;-bar");
    expect(xml).not.toContain("foo-&-bar<");
  });

  it("includes lastmod only when provided", () => {
    const xml = buildSitemapXml([{ loc: SITE_URL, lastmod: "2026-01-01" }, { loc: `${SITE_URL}/about` }]);
    expect(xml).toContain("<lastmod>2026-01-01</lastmod>");
    expect(xml).toContain(`<url><loc>${SITE_URL}/about</loc></url>`);
  });
});

describe("canonicalFor", () => {
  it("builds an absolute canonical URL", () => {
    expect(canonicalFor("/writing/my-post")).toBe(`${SITE_URL}/writing/my-post`);
  });

  it("strips query strings, hashes, and trailing slashes", () => {
    expect(canonicalFor("/about/?x=1#y")).toBe(`${SITE_URL}/about`);
    expect(canonicalFor("/")).toBe(SITE_URL);
  });
});
