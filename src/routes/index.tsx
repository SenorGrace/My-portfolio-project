import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IRENEX — Web Developer & Motion-First Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of IRENEX, a web developer building immersive 3D, scroll-driven and high-performance interfaces with React, GSAP and Spline.",
      },
      { property: "og:title", content: "IRENEX — Web Developer & Motion-First Portfolio" },
      {
        property: "og:description",
        content:
          "Immersive 3D and scroll-driven web experiences built with React, GSAP and Spline.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    let instance: { destroy: () => void } | undefined;
    let cancelled = false;
    if (window.matchMedia("(min-width: 768px)").matches) {
      import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
        if (cancelled) return;
        instance = new LocomotiveScroll({ lenisOptions: { lerp: 0.09 } });
      });
    }
    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={done} />}
      {!loading && (
        <div className="animate-fade-in">
          <Nav />
          <main>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
      <Toaster position="top-center" theme="dark" />
    </>
  );
}
