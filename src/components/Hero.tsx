import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        ".hero-line",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-spline",
          { opacity: 0, x: 120, filter: "blur(16px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out" },
          "-=1.1",
        );

      gsap.to(".glow-orb", {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.6,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 aurora" />
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="pointer-events-none absolute inset-0 starfield opacity-70" />
      <div className="glow-orb pointer-events-none absolute top-24 -left-16 size-64 rounded-full bg-[var(--glow)] opacity-15 blur-[90px]" />
      <div className="glow-orb pointer-events-none absolute right-0 bottom-10 size-80 rounded-full bg-[var(--violet)] opacity-20 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="hero-line text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
            Introducing
          </p>
          <h1 className="hero-line glow-text mt-5 text-[2.6rem] leading-[1.05] font-light sm:text-6xl lg:text-7xl">
            Hi, I&apos;m IRENEX
            <span className="block text-muted-foreground">Web Developer</span>
          </h1>
          <p className="hero-line mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            I build immersive, high-performance interfaces where motion, depth and
            precision meet — crafted for products that need to feel premium.
          </p>
          <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, { scale: 1.06, duration: 0.3, ease: "power2.out" })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })
              }
              className="rounded-full px-7 py-3 text-sm font-medium text-primary-foreground [background:var(--gradient-cta)] [box-shadow:var(--shadow-glow)]"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View work <ArrowDown weight="light" size={16} />
            </a>
          </div>
        </div>

        <div className="hero-spline relative aspect-square w-full overflow-hidden rounded-[2rem]">
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] [box-shadow:var(--shadow-violet)]" />
          <iframe
            title="3D orb"
            src="https://my.spline.design/orb-94z7hakwurDwcliZcLQ93mpk/"
            className="size-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
