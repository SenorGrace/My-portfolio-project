import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  InstagramLogo,
  TwitterLogo,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { toast } from "sonner";

const socials = [
  { icon: GithubLogo, label: "GitHub" },
  { icon: LinkedinLogo, label: "LinkedIn" },
  { icon: WhatsappLogo, label: "WhatsApp" },
  { icon: InstagramLogo, label: "Instagram" },
  { icon: TwitterLogo, label: "Twitter" },
];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-field",
        { opacity: 0, x: -50, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        },
      );
      gsap.to(".contact-submit", {
        boxShadow: "0 0 42px color-mix(in oklab, var(--glow) 55%, transparent)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 starfield opacity-50" />
      <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
            Contact
          </p>
          <h2 className="glow-text mt-4 text-3xl font-light sm:text-5xl">
            Let&apos;s build something luminous
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
            Have a project in mind, or just want to say hello? Drop a message and
            I&apos;ll get back within a day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#contact"
                aria-label={label}
                className="glass grid size-11 place-items-center rounded-full text-muted-foreground transition-all hover:text-foreground hover:[box-shadow:var(--shadow-glow)]"
              >
                <Icon weight="light" size={20} />
              </a>
            ))}
          </div>
        </div>

        <form
          className="glass rounded-3xl p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — talk soon.");
            gsap.fromTo(
              ".contact-submit",
              { scale: 0.94 },
              { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" },
            );
          }}
        >
          <div className="grid gap-4">
            <input
              required
              placeholder="Your name"
              className="contact-field w-full rounded-xl border bg-[var(--input)] px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:[box-shadow:var(--shadow-glow)]"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="contact-field w-full rounded-xl border bg-[var(--input)] px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:[box-shadow:var(--shadow-glow)]"
            />
            <textarea
              required
              rows={5}
              placeholder="Your message"
              className="contact-field w-full resize-none rounded-xl border bg-[var(--input)] px-4 py-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:[box-shadow:var(--shadow-glow)]"
            />
            <button
              type="submit"
              className="contact-submit mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-primary-foreground [background:var(--gradient-cta)]"
            >
              {sent ? "Sent" : "Send message"}
              <PaperPlaneTilt weight="light" size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
