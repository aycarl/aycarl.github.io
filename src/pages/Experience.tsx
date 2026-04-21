import { SiteLayout } from "@/components/SiteLayout";
import { experiences } from "@/content/experience";
import { education } from "@/content/education";
import { skillCategories } from "@/content/skills";

const accentDot: Record<string, string> = {
  sky: "bg-sky",
  green: "bg-green",
  yellow: "bg-yellow",
  pink: "bg-pink",
  orange: "bg-orange",
};

// Color rotation for accent blobs
const getAccentColor = (index: number): keyof typeof accentDot => {
  const colors: (keyof typeof accentDot)[] = ["sky", "green", "yellow", "pink", "orange"];
  return colors[index % colors.length];
};

const Experience = () => {
  return (
    <SiteLayout>
      {/* Header */}
      <section className="container py-16 md:py-24">
        <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">Career</p>
        <h1 className="wordmark text-6xl md:text-8xl mb-4">
          Work experience<span className="text-pink">.</span>
        </h1>
        <p className="max-w-2xl text-lg text-foreground/70">
          A timeline of roles, projects, and growth across design, engineering, and leadership.
        </p>
      </section>

      {/* Experience Section */}
      <section className="container py-12 md:py-20">
        <div className="mb-12">
          <h2 className="wordmark text-4xl md:text-5xl mb-2">Experience<span className="text-sky">.</span></h2>
          <p className="text-foreground/60">Positions and responsibilities</p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {experiences.map((exp, index) => {
            const accent = getAccentColor(index);
            return (
              <div
                key={`${exp.company}-${exp.period}`}
                className="group relative rounded-3xl border border-border p-6 md:p-8 bg-card hover:bg-secondary transition-colors overflow-hidden"
              >
                <span
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full ${accentDot[accent]} opacity-70 blur-2xl group-hover:scale-110 transition-transform`}
                />
                <div className="relative">
                  {/* Header with year and period */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 md:mb-0">
                      <span className={`h-2 w-2 rounded-full ${accentDot[accent]}`} />
                      {exp.period}
                    </div>
                  </div>

                  {/* Title and company */}
                  <h3 className="text-xl md:text-2xl font-light tracking-tight mb-1">{exp.title}</h3>
                  <p className="text-foreground/70 font-medium mb-1">{exp.company}</p>
                  <p className="text-xs md:text-sm text-foreground/60 mb-5">{exp.location}</p>

                  {/* Responsibilities */}
                  <ul className="space-y-2 text-sm text-foreground/70">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className={`h-1.5 w-1.5 rounded-full ${accentDot[accent]} mt-1.5 flex-shrink-0`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Education Section */}
      <section className="container py-12 md:py-20">
        <div className="mb-12">
          <h2 className="wordmark text-4xl md:text-5xl mb-2">Education<span className="text-green">.</span></h2>
          <p className="text-foreground/60">Degrees and academic background</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.map((edu, index) => {
            const accent = getAccentColor(index + experiences.length);
            return (
              <div
                key={`${edu.degree}-${edu.period}`}
                className="group relative rounded-3xl border border-border p-6 md:p-8 bg-card hover:bg-secondary transition-colors overflow-hidden"
              >
                <span
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full ${accentDot[accent]} opacity-70 blur-2xl group-hover:scale-110 transition-transform`}
                />
                <div className="relative">
                  {/* Period and location */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <span className={`h-2 w-2 rounded-full ${accentDot[accent]}`} />
                    {edu.period}
                  </div>

                  {/* Degree */}
                  <h3 className="text-xl md:text-2xl font-light tracking-tight mb-1">{edu.degree}</h3>
                  <p className="text-foreground/70 font-medium mb-1">{edu.school}</p>
                  <p className="text-xs md:text-sm text-foreground/60 mb-5">{edu.location}</p>

                  {/* Courses */}
                  <div>
                    <p className="text-xs font-semibold text-foreground/70 mb-3 uppercase tracking-wide">Relevant Courses</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course) => (
                        <span
                          key={course}
                          className="text-xs px-2.5 py-1 rounded-full bg-background/70 border border-border text-foreground/70"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      <section className="container py-12 md:py-20">
        <div className="mb-12">
          <h2 className="wordmark text-4xl md:text-5xl mb-2">Skills & Expertise<span className="text-orange">.</span></h2>
          <p className="text-foreground/60">Technologies and tools I work with</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => {
            const accent = getAccentColor(index + experiences.length + education.length);
            return (
              <div
                key={category.title}
                className="group relative rounded-3xl border border-border p-6 md:p-8 bg-card hover:bg-secondary transition-colors overflow-hidden"
              >
                <span
                  className={`absolute -top-12 -right-12 h-40 w-40 rounded-full ${accentDot[accent]} opacity-70 blur-2xl group-hover:scale-110 transition-transform`}
                />
                <div className="relative">
                  {/* Category title */}
                  <h3 className="text-lg md:text-xl font-light tracking-tight mb-1">{category.title}</h3>

                  {/* Skills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full bg-background/70 border border-border text-foreground/70 hover:bg-secondary transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Spacing */}
      <div className="h-12 md:h-20" />
    </SiteLayout>
  );
};

export default Experience;
