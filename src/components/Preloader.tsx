import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".preload-word",
        { opacity: 0, filter: "blur(14px)", y: 24 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "power3.out" },
      )
        .to(
          ".progress-bar",
          { width: "100%", duration: 2, ease: "power2.out" },
          0.2,
        )
        .to(
          counter,
          {
            v: 100,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (pctRef.current)
                pctRef.current.textContent = `${Math.round(counter.v)}%`;
            },
          },
          0.2,
        )
        .to(".progress-shell", { opacity: 0, duration: 0.4 })
        .to(root.current, {
          opacity: 0,
          scale: 0.92,
          filter: "blur(10px)",
          duration: 0.9,
          ease: "power2.inOut",
          onComplete: onDone,
        });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="pointer-events-none absolute inset-0 aurora opacity-80" />
      <div className="pointer-events-none absolute inset-0 starfield opacity-50" />
      <p className="preload-word glow-text relative text-5xl font-light tracking-tight sm:text-7xl">
        IRENEX
      </p>
      <div className="progress-shell relative mt-10 w-56 sm:w-72">
        <div className="h-px w-full overflow-hidden bg-border">
          <div
            className="progress-bar h-px w-0"
            style={{ background: "var(--gradient-cta)" }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
          <span>Loading</span>
          <span ref={pctRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
