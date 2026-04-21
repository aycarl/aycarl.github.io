import { SiteLayout } from "@/components/SiteLayout";
import { Blob } from "@/components/Blob";
import { Github, Linkedin, Mail } from "lucide-react";

const About = () => {
  return (
    <SiteLayout>
      <section className="container py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <p className="text-sm uppercase tracking-widest text-foreground/60 mb-4">About</p>
          <h1 className="wordmark text-6xl md:text-8xl mb-8">
            Hi, I'm aycarl<span className="text-yellow">.</span>
          </h1>
          <div className="space-y-5 text-lg text-foreground/80">
            <p>
              I'm a software engineer and solutions architect. I spend my time on the
              boundary between product and infrastructure — designing systems that earn
              their complexity and shipping the smallest version that proves the idea.
            </p>
            <p>
              These days I focus on three things: <strong>systems design</strong> for
              high-throughput services, <strong>infrastructure</strong> as a product the
              rest of the team actually wants to use, and <strong>solutions architecture</strong>{" "}
              for organizations navigating cloud, data, and platform decisions.
            </p>
            <p>
              Outside of work I sketch, garden, and read more than I write. The colored dot
              after the wordmark is on purpose — small punctuation, big personality.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="mailto:hello@aycarl.dev" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm">
              <Mail className="h-4 w-4" /> Get in touch
            </a>
            <a href="https://github.com/aycarl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:bg-secondary transition-colors">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-square rounded-3xl border border-border overflow-hidden bg-card">
            <Blob color="sky"    size={260} top="-10%"  left="-10%" drift={1} />
            <Blob color="green"  size={220} top="20%"   left="35%"  drift={2} />
            <Blob color="yellow" size={180} bottom="-5%" right="20%" drift={3} />
            <Blob color="pink"   size={200} bottom="10%" left="-5%" drift={1} />
            <Blob color="orange" size={160} top="5%"    right="-5%" drift={2} />
          </div>
          <div className="mt-6 rounded-2xl border border-border p-5 bg-card">
            <h3 className="text-sm uppercase tracking-widest text-foreground/60 mb-3">Currently</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sky mt-2" /> Edge platforms & global read paths</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green mt-2" /> Internal developer platforms</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-pink mt-2" /> Writing here, more often</li>
            </ul>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
