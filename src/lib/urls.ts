export type ResolvedLink =
  | { kind: "internal"; href: string } // rendered as a React Router <Link>
  | { kind: "external"; href: string } // rendered with target="_blank" and safe rel
  | { kind: "plain"; href: string }; // rendered as-is: #anchor, mailto:, tel:, etc.

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const HTTP = /^https?:\/\//i;
const BARE_DOMAIN = /^(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/?#]|$)/i;

// Craft-authored links often omit the protocol ("www.tackshare.com"), which the
// browser would resolve relative to the current origin. Classify each href so the
// Markdown renderer can normalize external destinations and keep internal ones
// on client-side routing.
export function resolveHref(raw: string | undefined | null): ResolvedLink {
  const href = (raw ?? "").trim();
  if (!href || href.startsWith("#")) return { kind: "plain", href };
  if (href.startsWith("//")) return { kind: "external", href: `https:${href}` };
  if (href.startsWith("/")) return { kind: "internal", href };
  if (HTTP.test(href)) return { kind: "external", href };
  if (SCHEME.test(href)) return { kind: "plain", href };
  if (BARE_DOMAIN.test(href)) return { kind: "external", href: `https://${href}` };
  return { kind: "plain", href };
}
