import { injectMeta, ROUTE_META } from "../../src/lib/seo";

export async function onRequest(context: { next: () => Promise<Response> }) {
  const response = await context.next();
  return injectMeta(response, { ...ROUTE_META["/writing/archive"], path: "/writing/archive", type: "website" });
}
