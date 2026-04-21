export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  year: number;
  accent: "sky" | "green" | "yellow" | "pink" | "orange";
  links?: ProjectLink[];
  body: string;
}

export const projects: Project[] = [
  {
    slug: "edge-platform",
    title: "Edge platform for low-latency APIs",
    summary:
      "Designed a multi-region edge platform serving sub-50ms responses across three continents.",
    role: "Lead Solutions Architect",
    stack: ["AWS", "Cloudflare Workers", "Terraform", "Postgres", "Redis"],
    year: 2024,
    accent: "sky",
    links: [{ label: "Write-up", href: "#" }],
    body: `
## Problem

A consumer-facing API was struggling with tail latency in EU and APAC regions. P99 response times exceeded 800ms, and customer churn correlated strongly with response times.

## Architecture

We split read and write paths. Writes terminated at a primary region with logical replication to two read replicas. Reads were served from regional caches at the edge with TTL invalidation via a pub/sub fan-out.

- Edge cache layer (Cloudflare Workers + KV)
- Origin shielding via regional Postgres read replicas
- Cache invalidation via Redis Streams + a small fan-out worker

## Decisions

We chose **stale-while-revalidate** at the edge over strict consistency. The product team aligned on a 30s freshness budget for non-transactional reads, which let us collapse 90%+ of origin traffic.

## Outcome

P99 latency dropped from 820ms to 140ms globally. Origin RPS fell by 11x. Infrastructure cost decreased by 38%.
`.trim(),
  },
  {
    slug: "infra-as-product",
    title: "Infrastructure as an internal product",
    summary:
      "Built a self-service platform that let 40+ engineers ship services without touching cloud consoles.",
    role: "Platform Architect",
    stack: ["Kubernetes", "Backstage", "Terraform", "Argo CD", "OpenTelemetry"],
    year: 2023,
    accent: "green",
    body: `
## Problem

Service onboarding took 2-3 weeks of cross-team coordination. Tribal knowledge lived in Slack threads and tribal memory.

## Approach

Treat infrastructure like a product. Define golden paths, document them, and make the happy path the easiest path.

## What we built

- A Backstage portal with templates for the three most common service shapes
- Terraform modules wrapping cloud primitives behind opinionated defaults
- A continuous delivery pipeline that ran from PR open to production in under 12 minutes

## Outcome

Time to first deploy dropped from weeks to under an hour. Platform NPS hit 62 within two quarters.
`.trim(),
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
