export async function onRequest(context: any) {
  const { request, params, next } = context;
  const slug = params.slug;

  try {
    // 1. Fetch metadata from the Craft Writing Collection (maxDepth=0 is lightweight)
    const craftRes = await fetch(
      "https://connect.craft.do/links/4GBve1yOGzU/api/v1/collections/769CD161-FC8A-4B52-83AA-36A192AF9FCA/items?maxDepth=0"
    );
    if (!craftRes.ok) return next(); // Fallback to default index.html if Craft is down

    const data: any = await craftRes.json();

    // Helper to slugify (must exactly match src/lib/craft.ts)
    const slugify = (s: string): string =>
      s
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80);

    // Locate the matching post
    const post = data.items.find((item: any) => {
      const title = item.title || "Untitled";
      return (slugify(title) || item.id.toLowerCase()) === slug;
    });

    if (!post) return next(); // Fallback if no matching post is published

    // Formulate SEO title and descriptive excerpt
    const title = post.title || "Writing";
    const excerpt = post.contentPreviewMd
      ? post.contentPreviewMd
          .replace(/`{1,3}[^`]*`{1,3}/g, "")
          .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
          .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
          .replace(/<[^>]+>/g, "")
          .replace(/[*_~>#]/g, "")
          .replace(/\s+/g, " ")
          .replace(/\.\.\.and \d+ more blocks?$/i, "")
          .trim()
          .slice(0, 150) + "..."
      : "Read this writing on aycarl.";

    // 2. Fetch the actual built index.html from static assets
    const response = await next();

    // 3. Inject Open Graph and Twitter Card tags dynamically
    return new HTMLRewriter()
      .on("title", {
        element(el) {
          el.setInnerContent(`${title} — aycarl.`);
        },
      })
      .on("head", {
        element(el) {
          el.append(`<meta property="og:title" content="${title} — aycarl." />`, { html: true });
          el.append(`<meta property="og:description" content="${excerpt}" />`, { html: true });
          el.append(`<meta property="og:type" content="article" />`, { html: true });
          el.append(`<meta name="description" content="${excerpt}" />`, { html: true });
          el.append(`<meta name="twitter:card" content="summary" />`, { html: true });
          el.append(`<meta name="twitter:title" content="${title} — aycarl." />`, { html: true });
          el.append(`<meta name="twitter:description" content="${excerpt}" />`, { html: true });
        },
      })
      .transform(response);
  } catch (err) {
    console.error("Cloudflare writings middleware error:", err);
    return next(); // Always fallback gracefully to default index.html on error
  }
}
