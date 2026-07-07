import { CV_URL } from "../src/content/links";

// Server-side redirect so the printed /cv link resolves instantly without
// loading the SPA. The target URL lives in src/content/links.ts.
export function onRequest(): Response {
  return Response.redirect(CV_URL, 302);
}
