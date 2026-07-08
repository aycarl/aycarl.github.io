import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { Markdown } from "@/components/Markdown";
import { resolveHref } from "@/lib/urls";

const render = (md: string) =>
  renderToString(
    <MemoryRouter>
      <Markdown>{md}</Markdown>
    </MemoryRouter>
  );

describe("resolveHref", () => {
  it("normalizes protocol-less www domains to https and marks them external", () => {
    expect(resolveHref("www.tackshare.com")).toEqual({
      kind: "external",
      href: "https://www.tackshare.com",
    });
  });

  it("normalizes bare domains with paths and queries", () => {
    expect(resolveHref("tackshare.com/pricing?x=1")).toEqual({
      kind: "external",
      href: "https://tackshare.com/pricing?x=1",
    });
  });

  it("leaves absolute http/https URLs unchanged", () => {
    expect(resolveHref("http://example.com")).toEqual({ kind: "external", href: "http://example.com" });
    expect(resolveHref("https://example.com")).toEqual({ kind: "external", href: "https://example.com" });
    expect(resolveHref("HTTPS://EXAMPLE.COM")).toEqual({ kind: "external", href: "HTTPS://EXAMPLE.COM" });
  });

  it("upgrades protocol-relative URLs to https", () => {
    expect(resolveHref("//cdn.example.com/a.js")).toEqual({
      kind: "external",
      href: "https://cdn.example.com/a.js",
    });
  });

  it("classifies site-relative paths as internal", () => {
    expect(resolveHref("/writing/some-post")).toEqual({ kind: "internal", href: "/writing/some-post" });
  });

  it("passes anchors, mailto, and tel through unchanged", () => {
    expect(resolveHref("#section-2")).toEqual({ kind: "plain", href: "#section-2" });
    expect(resolveHref("mailto:hi@example.com")).toEqual({ kind: "plain", href: "mailto:hi@example.com" });
    expect(resolveHref("MAILTO:HI@X.COM")).toEqual({ kind: "plain", href: "MAILTO:HI@X.COM" });
    expect(resolveHref("tel:+441234567")).toEqual({ kind: "plain", href: "tel:+441234567" });
  });

  it("treats empty or missing hrefs as plain", () => {
    expect(resolveHref("")).toEqual({ kind: "plain", href: "" });
    expect(resolveHref(undefined)).toEqual({ kind: "plain", href: "" });
  });
});

describe("Markdown link rendering", () => {
  it("renders Craft-authored protocol-less links as external (the tackshare bug)", () => {
    const html = render("[TackShare](www.tackshare.com)");
    expect(html).toContain('href="https://www.tackshare.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("renders absolute URLs as external with the href unchanged", () => {
    const html = render("[abs](https://example.com/x)");
    expect(html).toContain('href="https://example.com/x"');
    expect(html).toContain('target="_blank"');
  });

  it("renders anchors without target=_blank", () => {
    const html = render("[anchor](#notes)");
    expect(html).toContain('href="#notes"');
    expect(html).not.toContain('target="_blank"');
  });

  it("renders mailto links without target=_blank", () => {
    const html = render("[mail](mailto:hi@example.com)");
    expect(html).toContain('href="mailto:hi@example.com"');
    expect(html).not.toContain('target="_blank"');
  });

  it("renders internal paths as same-tab router links", () => {
    const html = render("[post](/writing/foo)");
    expect(html).toContain('href="/writing/foo"');
    expect(html).not.toContain('target="_blank"');
  });

  it("still autolinks bare www text via remark-gfm", () => {
    const html = render("visit www.tackshare.com today");
    expect(html).toContain('href="http://www.tackshare.com"');
    expect(html).toContain('target="_blank"');
  });
});
