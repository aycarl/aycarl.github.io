import { SiteLayout } from "@/components/SiteLayout";
import { Blob } from "@/components/Blob";
import { FileText, Mail } from "lucide-react";
import { BrandGithub, BrandLinkedin } from "@/components/icons/BrandIcons";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/content/links";

const About = () => {
  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">About</p>
          <h1 className="wordmark text-6xl md:text-8xl mb-8">
            Hi, I'm Carl<span className="text-yellow">.</span>
          </h1>
          <div className="space-y-5 text-lg text-foreground/80">
            <p>
              I'm an AI solutions engineer and full-stack developer. I help teams figure out
              where AI can genuinely make their work easier, then I build it — from the first
              rough demo to something people rely on every day. I like starting small, proving
              an idea works, and only adding complexity when it earns its keep.
            </p>
            <p>
              Outside of work, and in no particular order, I practice Japanese and Zulu on Duolingo,
              walk, play chess, experience the Tao, and read more than I write.
              The colored dot after the wordmark is on purpose — small punctuation, simple, straight-forward.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm">
              <Mail className="h-4 w-4" /> Get in touch
            </a>
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors">
              <FileText className="h-4 w-4" /> Download CV
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors">
              <BrandGithub className="h-4 w-4" /> GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors">
              <BrandLinkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-square rounded-3xl border border-border overflow-hidden bg-card">
            <Blob color="sky" className="-left-[10%] -top-[10%] h-[260px] w-[260px]" drift={1} />
            <Blob color="green" className="left-[35%] top-[20%] h-[220px] w-[220px]" drift={2} />
            <Blob color="yellow" className="right-[20%] -bottom-[5%] h-[180px] w-[180px]" drift={3} />
            <Blob color="pink" className="-left-[5%] bottom-[10%] h-[200px] w-[200px]" drift={1} />
            <Blob color="orange" className="-right-[5%] top-[5%] h-[160px] w-[160px]" drift={2} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
