import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import boundary from "@/assets/boundary.jpg";
import { ContourBackdrop } from "./ContourBackdrop";

gsap.registerPlugin(ScrollTrigger);

export function SignatureScene() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const path = root.current!.querySelector<SVGPathElement>(".sig-path");
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", scrub: 1, pin: true },
      });
      tl.to(".sig-coord", { opacity: 1, y: 0, stagger: 0.05, duration: 1 })
        .to(".sig-path", { strokeDashoffset: 0, duration: 4 }, "<")
        .to(".sig-wall", { opacity: 0.55, scale: 1, duration: 3 }, "<+1")
        .to(".sig-pulse", { opacity: 1, scale: 1.4, duration: 1.5 }, "<+0.4")
        .to(".sig-pulse", { opacity: 0, scale: 2.4, duration: 1.5 }, ">")
        .to(".sig-word", { yPercent: 0, opacity: 1, stagger: 0.15, duration: 2 }, "<-1.5")
        .to(".sig-grid", { opacity: 0.15, duration: 2 }, "<");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden bg-background noise">
      <img src={boundary} alt="" className="sig-wall absolute inset-0 h-full w-full object-cover opacity-0 scale-110" />
      <div className="absolute inset-0 bg-background/70" />
      <ContourBackdrop variant="deep" grid={false} particles={10} className="sig-grid" />

      {/* Terracotta energy pulse — locks at center as wall snaps into place */}
      <div className="sig-pulse pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vmin] w-[40vmin] rounded-full bg-atmos-pulse opacity-0" />

      <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path className="sig-path" d="M 200 600 L 200 250 L 1000 250 L 1000 600 L 200 600 Z"
          fill="none" stroke="var(--color-highlight)" strokeWidth="1.5" />
        <circle cx="200" cy="250" r="4" fill="var(--color-highlight)" />
        <circle cx="1000" cy="250" r="4" fill="var(--color-highlight)" />
        <circle cx="1000" cy="600" r="4" fill="var(--color-highlight)" />
        <circle cx="200" cy="600" r="4" fill="var(--color-highlight)" />
      </svg>

      <div className="sig-coord absolute top-24 left-5 md:top-32 md:left-10 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground opacity-0 translate-y-2">
        SURVEY REF: TCA / DDR / 2025-1408
      </div>
      <div className="sig-coord absolute top-24 right-5 md:top-32 md:right-10 text-right font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground opacity-0 translate-y-2">
        BEARING N 28.59 / E 77.44<br />PERIMETER 184 M
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-center px-5 md:px-10">
        <h2 className="h-display text-[44px] sm:text-[72px] md:text-[120px] lg:text-[160px] leading-[0.9] max-w-6xl">
          <span className="block overflow-hidden"><span className="sig-word inline-block translate-y-full opacity-0">Ownership</span></span>
          <span className="block overflow-hidden"><span className="sig-word inline-block translate-y-full opacity-0">isn't real</span></span>
          <span className="block overflow-hidden"><span className="sig-word inline-block translate-y-full opacity-0">until it has</span></span>
          <span className="block overflow-hidden"><span className="sig-word inline-block translate-y-full opacity-0 text-highlight">an edge.</span></span>
        </h2>
      </div>
    </section>
  );
}
