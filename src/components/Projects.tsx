import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.png";
import p4 from "@/assets/project-4.png";
import p5 from "@/assets/project-5.png";
import p6 from "@/assets/project-6.png";

const projects = [
  {
    img: p1,
    title: "3D Interactive Web",
    desc: "A dark, cinematic product page with a Spline robot scene and scroll-reactive lighting.",
    stack: ["React", "Tailwind", "Spline"],
  },
  {
    img: p2,
    title: "Next-Level Gaming UI",
    desc: "Fighter selection, stat bars and an NFT arena dashboard built for speed.",
    stack: ["React", "Tailwind", "Spline"],
  },
  {
    img: p3,
    title: "3D Developer Portfolio",
    desc: "Particle globe hero, bento about grid and a glassmorphic contact surface.",
    stack: ["HTML", "CSS", "JS"],
  },
  {
    img: p4,
    title: "Gaming Website",
    desc: "Vivid character showcase with layered depth cards and gesture-friendly nav.",
    stack: ["HTML", "CSS", "JS"],
  },
  {
    img: p5,
    title: "Motion Studio Landing",
    desc: "Animation-led landing page pairing GSAP timelines with a Spline sphere.",
    stack: ["React", "GSAP", "Spline"],
  },
  {
    img: p6,
    title: "Animated Portfolio",
    desc: "Dual-theme personal site with an illustrated hero and smooth section reveals.",
    stack: ["CSS", "JS", "GSAP"],
  },
];

export function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, scale: 0.96, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".project-rail", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 aurora opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
          Selected work
        </p>
        <h2 className="glow-text mt-4 text-3xl font-light sm:text-5xl">Projects</h2>
      </div>

      <div className="project-rail relative mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:mx-auto sm:max-w-6xl">
        {projects.map((p) => (
          <article
            key={p.title}
            className="project-card glass group w-[82vw] shrink-0 snap-center overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:[box-shadow:var(--shadow-glow)] sm:w-[380px]"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={p.img}
                alt={`${p.title} project preview`}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--glow)]"
              >
                View case <ArrowUpRight weight="light" size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
