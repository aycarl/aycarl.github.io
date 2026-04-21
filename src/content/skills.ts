export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: ["React", "Redux", "TypeScript", "JavaScript (ES2023)", "D3.js", "HTML5", "CSS3", "Responsive Design", "WCAG Accessibility"]
  },
  {
    title: "Backend & APIs",
    skills: ["Python", "Django/DRF", "C#", ".NET Core", "REST API Design", "Authentication", "JSON/CSV Pipelines"]
  },
  {
    title: "Data & Databases",
    skills: ["SQL", "PostgreSQL", "MySQL", "Oracle", "Schema Design", "Query Optimization", "Data Visualization"]
  },
  {
    title: "Dev Practices & Tools",
    skills: ["Git/GitHub", "Docker", "CI/CD", "Agile/Iterative Delivery", "Code Reviews", "Documentation", "Testing"]
  },
  {
    title: "Design & Research",
    skills: ["Figma", "Adobe XD", "Adobe Illustrator", "Information Architecture", "Prototyping", "Usability Testing", "Design Systems"]
  }
];
