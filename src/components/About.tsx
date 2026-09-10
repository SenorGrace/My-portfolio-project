import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FileHtml,
  FileCss,
  FileJs,
  Atom,
  Lightning,
  Cube,
} from "@phosphor-icons/react";
import profile from "@/assets/profile.jpg";

const skills = [
  { icon: FileHtml, label: "HTML" },
  { icon: FileCss, label: "CSS" },
  { icon: FileJs, label: "JavaScript" },
  { icon: Atom, label: "React" },
  { icon: Lightning, label: "GSAP" },
  { icon: Cube, label: "Spline" },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0.2, filter: "blur(12px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".about-photo",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".skill-chip",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".skill-grid", start: "top 85%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:py-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="about-photo group relative mx-auto">
          <div className="absolute -inset-6 rounded-full bg-[var(--glow)] opacity-15 blur-[60px]" />
          <div className="relative size-56 overflow-hidden rounded-full border border-[color-mix(in_oklab,var(--glow)_30%,transparent)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3 sm:size-72 [box-shadow:var(--shadow-glow)]">
            <img
              src={profile}
              alt="Portrait of IRENEX, web developer"
              className="size-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
            About
          </p>
          <h2 className="glow-text mt-4 text-3xl font-light sm:text-5xl">
            Designing motion-first web experiences
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            I&apos;m a frontend developer focused on immersive interfaces — 3D scenes,
            scroll-driven storytelling and interaction detail that makes a product feel
            alive. I care about performance as much as polish: every animation ships
            smooth on a phone, not just a workstation.
          </p>

          <div className="skill-grid mt-9 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {skills.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="skill-chip glass flex flex-col items-center gap-2 rounded-2xl px-2 py-4 transition-shadow hover:[box-shadow:var(--shadow-glow)]"
              >
                <Icon weight="light" size={26} />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
