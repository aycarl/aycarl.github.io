// Dependency-free markdown -> HTML conversion for edge-side crawler
// visibility (see functions/writing/[slug].ts, functions/projects/[slug].ts).
//
// This targets the actual feature surface Craft content uses today
// (headings, paragraphs, bold/italic, inline code, fenced code blocks,
// blockquotes, lists - including "loose" lists, since Craft emits each list
// item as its own block, joined with blank lines by fetchBlockMarkdown),
// not full CommonMark/GFM. Unknown constructs degrade to escaped plain
// text - never to broken or unbalanced HTML. This is a strictly smaller
// feature set than src/components/Markdown.tsx (react-markdown + remark-gfm);
// the goal is crawler-readable text, not pixel parity with the client render.

import { resolveHref } from "./urls";

// HTMLRewriter is a Cloudflare Workers runtime global (edge-only) - declared
// locally the same way src/lib/seo.ts does, since ambient declarations in a
// module file are file-scoped, not global.
interface RewriterElement {
  setInnerContent(content: string, options?: { html?: boolean }): void;
}

declare class HTMLRewriter {
  on(selector: string, handlers: { element?(el: RewriterElement): void }): HTMLRewriter;
  transform(response: Response): Response;
}

const escapeHtml = (s: string): string => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s: string): string => escapeHtml(s).replace(/"/g, "&quot;");

// Marker template for stashing code-span HTML during inline processing.
// Uses an unlikely-to-collide ASCII token (not plain digits/whitespace) so a
// bare number in prose, or a code span immediately followed by punctuation
// (e.g. "`code`."), can't be mistaken for or break the placeholder.
const codeSpanToken = (i: number): string => `@@CODESPAN${i}@@`;
const CODE_SPAN_MARKER = /@@CODESPAN(\d+)@@/g;

// Inline spans: code > images > links > bold > italic, so `**not bold**`
// inside `inline code` is left alone and image syntax isn't half-eaten by
// the link matcher.
function inline(text: string): string {
  const codeSpans: string[] = [];
  let out = text.replace(/`([^`]+)`/g, (_match, code: string) => {
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return codeSpanToken(codeSpans.length - 1);
  });

  out = escapeHtml(out);

  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt: string, src: string) => {
    return `<img alt="${escapeAttr(alt)}" src="${escapeAttr(src)}" loading="lazy" />`;
  });

  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
    const link = resolveHref(href);
    const attrs = link.kind === "external" ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeAttr(link.href)}"${attrs}>${label}</a>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  out = out.replace(CODE_SPAN_MARKER, (_match, i: string) => codeSpans[Number(i)]);
  return out;
}

const LIST_ITEM = /^\s*(?:[-*+]|\d+\.)\s+/;

export function markdownToHtml(markdown: string): string {
  const blocks = markdown.trim().split(/\n{2,}/).filter(Boolean);
  const html: string[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const fence = /^```[^\n]*\n([\s\S]*?)\n?```$/.exec(block);
    const heading = /^(#{1,6})\s+(.*)$/.exec(block);

    if (fence) {
      html.push(`<pre><code>${escapeHtml(fence[1])}</code></pre>`);
      i += 1;
    } else if (heading) {
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      i += 1;
    } else if (/^>\s?/.test(block)) {
      html.push(`<blockquote><p>${inline(block.replace(/^>\s?/gm, ""))}</p></blockquote>`);
      i += 1;
    } else if (LIST_ITEM.test(block)) {
      // Craft emits each list item as its own block, joined with blank lines
      // by fetchBlockMarkdown/fetchPublishedPosts - merge consecutive
      // list-item blocks into a single list rather than fragmenting them.
      const ordered = /^\s*\d+\.\s/.test(block);
      const items: string[] = [];
      while (i < blocks.length && LIST_ITEM.test(blocks[i])) {
        items.push(`<li>${inline(blocks[i].replace(LIST_ITEM, ""))}</li>`);
        i += 1;
      }
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}>${items.join("")}</${tag}>`);
    } else {
      html.push(`<p>${inline(block)}</p>`);
      i += 1;
    }
  }

  return html.join("\n");
}

export function buildArticleShell(opts: { title: string; meta?: string; bodyHtml: string }): string {
  const metaLine = opts.meta ? `<p>${escapeHtml(opts.meta)}</p>` : "";
  return `<article><h1>${escapeHtml(opts.title)}</h1>${metaLine}${opts.bodyHtml}</article>`;
}

export function injectArticleBody(response: Response, articleHtml: string): Response {
  return new HTMLRewriter()
    .on("#root", {
      element(el: RewriterElement) {
        el.setInnerContent(articleHtml, { html: true });
      },
    })
    .transform(response);
}
