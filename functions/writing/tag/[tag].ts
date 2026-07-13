import { injectMeta } from "../../../src/lib/seo";

export async function onRequest(context: { params: Record<string, string>; next: () => Promise<Response> }) {
  const { params, next } = context;
  const tag = decodeURIComponent((params.tag as string) || "");
  const response = await next();
  if (!tag) return response;
  return injectMeta(response, {
    title: `#${tag} — Writing — aycarl.`,
    description: `Posts tagged #${tag} on aycarl.`,
    path: `/writing/tag/${encodeURIComponent(tag)}`,
    type: "website",
  });
}
