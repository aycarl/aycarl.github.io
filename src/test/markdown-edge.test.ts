import { describe, it, expect } from "vitest";
import { markdownToHtml } from "@/lib/markdown-edge";

describe("markdownToHtml", () => {
  it("renders headings, paragraphs, bold, italic, and inline code", () => {
    const html = markdownToHtml(
      "## A heading\n\nA paragraph with **bold**, *italic*, and `inline code`.",
    );
    expect(html).toContain("<h2>A heading</h2>");
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
    expect(html).toContain("<code>inline code</code>");
  });

  it("does not let a code span immediately followed by punctuation break the placeholder", () => {
    const html = markdownToHtml("Use `AGENTS.md`.");
    expect(html).toBe("<p>Use <code>AGENTS.md</code>.</p>");
  });

  it("does not mistake a bare number in prose for a code-span placeholder", () => {
    const html = markdownToHtml("There are 4 items in `the list`.");
    expect(html).toContain("There are 4 items in");
    expect(html).toContain("<code>the list</code>");
  });

  it("merges consecutive blank-line-separated list items into one list (Craft's loose-list block shape)", () => {
    // Craft emits each list item as its own block; fetchBlockMarkdown joins
    // them with blank lines, exactly like this real sample from
    // "How I Use AI: A Documentation-Driven Approach".
    const markdown = [
      "Here is how I break it down:",
      '- **The "What & Why"**: My `PRODUCT.md` file serves as a living spec.',
      "- **The \"How & Rules\"**: Inside `docs/architecture/`, I keep ADRs.",
      "- **The \"Action\"**: Numbered markdown files.",
    ].join("\n\n");
    const html = markdownToHtml(markdown);
    expect(html.match(/<ul>/g)).toHaveLength(1);
    expect(html.match(/<li>/g)).toHaveLength(3);
    expect(html).toContain("</ul>");
  });

  it("renders ordered lists distinctly from unordered lists", () => {
    const html = markdownToHtml("1. First\n\n2. Second");
    expect(html).toContain("<ol>");
    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  it("classifies an internal link and an external bare-domain link like the client renderer", () => {
    const html = markdownToHtml("See [Tackshare](tackshare.com) and [the archive](/writing/archive).");
    expect(html).toContain('<a href="https://tackshare.com" target="_blank" rel="noopener noreferrer">Tackshare</a>');
    expect(html).toContain('<a href="/writing/archive">the archive</a>');
  });

  it("escapes HTML in plain text so it can't be mistaken for markup", () => {
    const html = markdownToHtml("A <script>alert(1)</script> in prose.");
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("renders a fenced code block without syntax-highlight markup", () => {
    const html = markdownToHtml("```\nconst x = 1;\n```");
    expect(html).toBe("<pre><code>const x = 1;</code></pre>");
  });

  it("renders a blockquote", () => {
    const html = markdownToHtml("> A quoted line.");
    expect(html).toBe("<blockquote><p>A quoted line.</p></blockquote>");
  });
});
