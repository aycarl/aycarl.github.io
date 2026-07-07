import { describe, it, expect } from "vitest";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import Links from "@/pages/Links";
import { GITHUB_URL, LINKEDIN_URL, CONTACT_EMAIL } from "@/content/links";

// /links is the printed QR code destination — it must always render with every link intact.
describe("Links page", () => {
  it("renders the CV, LinkedIn, GitHub, and email links", () => {
    const html = renderToString(
      <MemoryRouter>
        <Links />
      </MemoryRouter>
    );

    expect(html).toContain('href="/cv"');
    expect(html).toContain(`href="${LINKEDIN_URL}"`);
    expect(html).toContain(`href="${GITHUB_URL}"`);
    expect(html).toContain(`href="mailto:${CONTACT_EMAIL}"`);
  });
});
