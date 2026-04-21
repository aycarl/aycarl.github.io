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
    title: "Software Developer",
    company: "Merit Network",
    location: "Ann Arbor, Michigan",
    period: "Jul 2022 – Present",
    year: 2022,
    responsibilities: [
      "Build and maintain web applications and internal tools that support networking, security, and community services for higher-ed and public-sector partners",
      "Implement features across React front-ends and Python/Django back-ends; design REST endpoints, optimize queries, and improve reliability with tests and documentation",
      "Integrate with external services and data sources via APIs; contribute to modernizing legacy utilities and improving operational workflows",
      "Partner with internal customers to gather requirements, iterate on UI/UX prototypes, and deliver accessible, maintainable solutions"
    ]
  },
  {
    title: "Application Programmer",
    company: "Institute for Research on Innovation & Science (IRIS) — University of Michigan",
    location: "Ann Arbor, Michigan",
    period: "Mar 2021 – Jun 2022",
    year: 2021,
    responsibilities: [
      "Delivered interactive research reports and data visualizations using React/Redux and D3.js, translating complex datasets into intuitive, accessible interfaces for researchers",
      "Designed and implemented RESTful APIs with C#/.NET Core, enabling secure, performant data delivery to front-end clients and member portals",
      "Authored and organized codebase and database documentation, improving onboarding speed and cross-team knowledge sharing",
      "Collaborated with the Lead Developer and research staff to scope features, balance priorities, and ship high-quality releases"
    ]
  },
  {
    title: "Applications Developer Intern",
    company: "United Shore (United Wholesale Mortgage)",
    location: "Pontiac, Michigan",
    period: "May 2019 – Aug 2019",
    year: 2019,
    responsibilities: [
      "Refactored and extended internal reporting applications using C# .NET (MVC); participated in code reviews and unit-test coverage for reliability",
      "Led UX refresh of a leadership reporting tool using Adobe XD prototypes; delivered front-end changes aligned with stakeholder feedback"
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
