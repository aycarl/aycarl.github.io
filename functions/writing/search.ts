import { injectMeta, ROUTE_META } from "../../src/lib/seo";

export async function onRequest(context: { next: () => Promise<Response> }) {
  const response = await context.next();
  const meta = ROUTE_META["/writing/search"];
  return injectMeta(response, { ...meta, path: "/writing/search", type: "website", noindex: meta.noindex });
}
