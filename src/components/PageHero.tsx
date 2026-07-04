import { ReactNode } from "react";

const accentText: Record<string, string> = {
  sky: "text-sky",
  green: "text-green",
  yellow: "text-yellow",
  pink: "text-pink",
  orange: "text-orange",
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: keyof typeof accentText;
  description?: string;
  size?: "lg" | "md";
  children?: ReactNode;
};

export const PageHero = ({ eyebrow, title, accent = "pink", description, size = "lg", children }: PageHeroProps) => (
  <>
    <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">{eyebrow}</p>
    <h1 className={`wordmark ${size === "lg" ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"} mb-4`}>
      {title}
      <span className={accentText[accent]}>.</span>
    </h1>
    {description && <p className="max-w-2xl text-lg text-foreground/70">{description}</p>}
    {children}
  </>
);
