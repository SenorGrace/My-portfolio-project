import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-inner",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 95%" },
        },
      );
      gsap.to(".footer-particle", {
        y: -24,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.4,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="relative overflow-hidden border-t">
      <div className="pointer-events-none absolute inset-0 starfield opacity-60" />
      <div className="footer-particle pointer-events-none absolute -bottom-16 left-1/4 size-56 rounded-full bg-[var(--violet)] opacity-20 blur-[90px]" />
      <div className="footer-particle pointer-events-none absolute -bottom-20 right-1/5 size-64 rounded-full bg-[var(--glow)] opacity-12 blur-[100px]" />

      <div className="footer-inner relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:flex-row sm:justify-center sm:gap-8">
        <span className="text-sm tracking-[0.35em] uppercase">IRENEX</span>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <a href="#home" className="hover:text-foreground">Home</a>
          <a href="#about" className="hover:text-foreground">About</a>
          <a href="#projects" className="hover:text-foreground">Projects</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex gap-3 text-muted-foreground">
          <a href="#contact" aria-label="GitHub" className="transition-colors hover:text-[var(--glow)]">
            <GithubLogo weight="light" size={22} />
          </a>
          <a href="#contact" aria-label="LinkedIn" className="transition-colors hover:text-[var(--glow)]">
            <LinkedinLogo weight="light" size={22} />
          </a>
          <a href="#contact" aria-label="WhatsApp" className="transition-colors hover:text-[var(--glow)]">
            <WhatsappLogo weight="light" size={22} />
          </a>
          <a href="#contact" aria-label="Instagram" className="transition-colors hover:text-[var(--glow)]">
            <InstagramLogo weight="light" size={22} />
          </a>
          <a href="#contact" aria-label="Twitter" className="transition-colors hover:text-[var(--glow)]">
            <TwitterLogo weight="light" size={22} />
          </a>
        </div>
      </div>
      <p className="relative pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} IRENEX. Crafted with motion.
      </p>
    </footer>
  );
}
