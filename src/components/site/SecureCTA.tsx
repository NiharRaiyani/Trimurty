import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContourBackdrop } from "./ContourBackdrop";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

export function SecureCTA() {
  const root = useRef<HTMLDivElement>(null);
  const waRef = useMagnetic<HTMLAnchorElement>(0.3);
  const callRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cta-line", {
        yPercent: 110, stagger: 0.1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".cta-btn", {
        opacity: 0, y: 24, stagger: 0.1, duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      // Full-screen atmospheric expansion as user scrolls into the section
      gsap.fromTo(".cta-expand",
        { scale: 0.4, opacity: 0 },
        {
          scale: 1.4, opacity: 1, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: 1 },
        });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={root} className="relative bg-background py-32 md:py-48 overflow-hidden noise">
      {/* Atmospheric expansion + contour atmosphere */}
      <div className="cta-expand absolute inset-0 bg-atmos-expand origin-center" />
      <ContourBackdrop variant="none" contour grid particles={20} />
      <div className="absolute inset-x-0 top-0 h-px accent-rule" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 text-center">
        <p className="eyebrow"><span className="text-highlight">06 /</span> Secure Your Plot</p>
        <h2 className="h-display mt-6 text-[44px] sm:text-[72px] md:text-[128px] leading-[0.92]">
          <span className="block overflow-hidden"><span className="cta-line inline-block">Don't wait for</span></span>
          <span className="block overflow-hidden"><span className="cta-line inline-block text-accent">disputes to begin.</span></span>
          <span className="block overflow-hidden"><span className="cta-line inline-block">Secure your plot <span className="text-highlight">today.</span></span></span>
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a ref={waRef} href="https://wa.me/917987674523"
            className="cta-btn btn-magnetic group inline-flex items-center gap-3 bg-highlight text-background px-7 py-5 font-mono text-[12px] tracking-[0.24em] uppercase">
            ◉ Protect My Plot (WhatsApp)
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a ref={callRef} href="tel:+917987674523"
            className="cta-btn btn-magnetic inline-flex items-center gap-3 border border-foreground/40 hover:border-highlight hover:text-highlight px-7 py-5 font-mono text-[12px] tracking-[0.24em] uppercase transition-colors">
            Call Divyesh · 79876 74523
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          {[
            { l: "Divyesh", n: "+91 79876 74523" },
            { l: "Bhautik", n: "+91 97232 26674" },
            { l: "Rahul", n: "+91 96874 42410" },
          ].map((p) => (
            <div key={p.l} className="border border-border bg-background/30 backdrop-blur-sm p-5">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{p.l}</div>
              <div className="mt-1 font-display text-lg">{p.n}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
