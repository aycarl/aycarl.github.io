export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  year?: number;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    title: "Founder & Full-Stack Developer",
    company: "Calafold Inc. ",
    location: "Toronto, Ontario (Remote)",
    period: "Jul 2026 – Present",
    year: 2026,
    responsibilities: [
      "Designed and built a hazardous-waste classification and EHS compliance platform, Hazmind (hazmind.com), from product scoping through production, with domain input from a U.S. Certified Safety Professional (CSP)",
      "Shipped a lab management system, safety review tool, inspection tool, and a free hazard categorization tool; live with a founding university client and in active evaluation with additional universities",
      "Architected a serverless, cloud-native stack on Cloudflare Workers with SvelteKit, TypeScript, and Tailwind, using D1, R2, Browser Rendering, Email, and Cron bindings; Firebase Auth with JWT verification and role-based access",
      "Established CI/CD with GitHub Actions, automated releases and staged deploys, test-driven development (Vitest, Playwright), and ADR-driven design decisions",
      "Prototyping AI-assisted corrective-action suggestions and deterministic compliance guidance with Cloudflare Workers AI and CLEF"
    ]
  },
  {
    title: "Software Developer",
    company: "Merit Network",
    location: "Ann Arbor, Michigan",
    period: "Jul 2022 – Jun 2026",
    year: 2022,
    responsibilities: [
      "Architected and executed the migration of Merit's in-house Single Sign-On to Auth0 for 35,000+ user accounts across 100+ client organizations: the only developer alongside the team lead in vendor evaluation, authored the implementation plan and agile timeline, built Oracle SQL views for user extraction, wrote the Celery orchestrator for provisioning, deprovisioning, and reconciliation (phased dual-run for internal users, big-bang cutover for the Client Portal), and implemented OAuth authentication with a new multi-organization membership and RBAC system",
      "Led discovery and delivery of a fibre-cable document management system for the Outside Plant Department, replacing a manual SharePoint process with a Django pipeline ingesting ~500 documents via legacy SharePoint APIs, served through a REST microservice and a role-based CRUD editor in an internal React + Django app; interviewed technical writers and network/field engineers for requirements and planned the path to production in under two months",
      "UI/UX lead and developer for all front-end and accessibility work: built React and TypeScript interfaces for RADb and the Merit Client Portal, implemented the Managed Firewall Service feature, audited accessibility with browser tooling and screen readers, and authored WCAG VPAT documentation for both products",
      "Ported custom SSO authentication logic from the Perl/Mojolicious RADb codebase into a Python/Django REST Framework microservice; maintained Perl network-monitoring modules in Zenoss",
      "Re-architected deployment automation with Docker, Ansible (vault-based secrets injection), and Jenkins across Linux staging and production, including an automated Pytest CI pipeline for the security team's Nessus server upgrade",
      "Built network observability with Prometheus and Grafana, pulling from Uptime Kuma instances for six major Michigan universities and surfacing uptime and usage for 24/7 network support staff; caught multiple outages and provider connection drops (Microsoft, AT&T, AWS, Merit data centres)",
      "Worked extensively with Oracle databases: complex SQL, materialized views, indexing, and troubleshooting inconsistent data across schemas",
      "Became the team's subject-matter expert for AI tooling and integration, observability, deployment automation, and containerization; guided the production deployment of an LLM knowledge-base chatbot for RADb (Dockerization, Linux deployment, reverse proxy and certificates, PR review)",
      "Ran AI knowledge and advisory sessions for the entire IT organization (developers, DBAs, business and data analysts, PMs); required PR reviewer on every project I led; wrote quarterly Confluence technical articles on new tooling and patterns; supervised an intern producing the Managed Firewall Service user guide",
      "Embedded Claude Code, GitHub Copilot, and Atlassian Rovo AI into daily development workflow while maintaining rigorous code review and security standards"
    ]
  },
  {
    title: "Software Developer",
    company: "Institute for Research on Innovation & Science (IRIS) — University of Michigan",
    location: "Ann Arbor, Michigan",
    period: "Mar 2021 – Jun 2022",
    year: 2021,
    responsibilities: [
      "Owned development and data consistency for IRIS member reports on a two-person team, shipping every release during the lead developer's extended leave for roughly three-quarters of my tenure",
      "Maintained and built new D3.js visualizations across all member reports (Spending, Congressional District, Employee, Vendor Profile) using React, Redux, and TypeScript, translating terabyte-scale research datasets into clear, accessible dashboards used by 17+ member universities",
      "Designed and implemented C# .NET Core RESTful microservices over database-team views, handling data fetching, processing, and the representation layer with secure authentication and validation",
      "Authored API, codebase, and database documentation and standardized unit and integration testing workflows, improving onboarding and reliability across multi-tier client portals"
    ]
  },
  {
    title: "Applications Developer Intern",
    company: "United Shore (United Wholesale Mortgage)",
    location: "Pontiac, Michigan",
    period: "May 2019 – Aug 2019",
    year: 2019,
    responsibilities: [
      "Built C# .NET Core RESTful APIs and refactored internal reporting applications (MVC, SQL Server); participated in code reviews and unit-test coverage",
      "Led a UX overhaul of an internal executive reporting platform using Adobe XD prototypes, delivering front-end changes aligned with stakeholder feedback"
    ]
  },
  {
    title: "Graduate Assistant — Web Development & Media",
    company: "University of New Mexico — Africana Studies Program",
    location: "Albuquerque, New Mexico",
    period: "Aug 2018 – Aug 2020",
    year: 2018,
    responsibilities: [
      "Administered and built front-end enhancements for the program website within the university CMS, using JavaScript, HTML, and modern CSS to improve accessibility, responsiveness, and content authoring workflows",
      "Implemented lightweight interactive components (tabs, accordions, media galleries) and streamlined content templates for faculty and staff, reducing publishing friction",
      "Produced digital media (graphics/video), optimized assets for the web, and established simple governance for content updates and versioning"
    ]
  },
  {
    title: "Design Making Coordinator — Ashesi Design Lab (D-Lab)",
    company: "Ashesi University",
    location: "Berekuso, Ghana",
    period: "Aug 2016 – Jul 2017",
    year: 2016,
    responsibilities: [
      "Led UX research and design consulting projects for startups and tech organizations (e.g., FundraisingAfrica), conducting contextual inquiries, journey mapping, and moderated usability testing with real users",
      "Translated findings into actionable design requirements, low-/high-fidelity prototypes, and design systems; partnered with client engineers to implement UI patterns and accessibility fixes",
      "Facilitated stakeholder workshops to align business goals with user needs; created service blueprints and KPI-aligned dashboards to track adoption and feature usability",
      "Outcomes included clearer information architecture, reduced onboarding friction, more discoverable calls-to-action, and increased feature utilization following iterative releases"
    ]
  },
  {
    title: "Faculty Intern — Computer Science",
    company: "Ashesi University",
    location: "Berekuso, Ghana",
    period: "Sep 2015 – Aug 2016",
    year: 2015,
    responsibilities: [
      "Co-taught Computer Programming for Engineering (Python) and Advanced Database Systems; ran programming labs emphasizing algorithmic thinking, data structures, and relational data design",
      "Mentored student capstones on web application architecture and data modeling; evaluated code quality and documentation practices"
    ]
  }
];
