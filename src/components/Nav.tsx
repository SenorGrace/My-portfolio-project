import { useState } from "react";
import {
  List,
  X,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: GithubLogo, label: "GitHub" },
  { icon: LinkedinLogo, label: "LinkedIn" },
  { icon: WhatsappLogo, label: "WhatsApp" },
  { icon: InstagramLogo, label: "Instagram" },
  { icon: TwitterLogo, label: "Twitter" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <a href="#home" className="text-sm tracking-[0.35em] text-foreground uppercase">
          IRENEX
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 text-muted-foreground">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#contact"
                aria-label={label}
                className="transition-colors hover:text-[var(--glow)]"
              >
                <Icon weight="light" size={20} />
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="glass rounded-full px-5 py-2 text-sm transition-shadow hover:[box-shadow:var(--shadow-glow)]"
          >
            Hire me
          </a>
        </div>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="glass grid size-10 place-items-center rounded-full md:hidden"
        >
          <List weight="light" size={20} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 flex animate-fade-in flex-col bg-background/95 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <span className="text-sm tracking-[0.35em] uppercase">IRENEX</span>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="glass grid size-10 place-items-center rounded-full"
            >
              <X weight="light" size={20} />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-6 px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="glow-text text-4xl font-light"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex gap-4 px-8 pb-12 text-muted-foreground">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#contact"
                aria-label={label}
                className="transition-colors hover:text-[var(--glow)]"
              >
                <Icon weight="light" size={26} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
