import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContourBackdrop } from "./ContourBackdrop";


const steps = [
  { n: "01", title: "Site Visit", body: "We map your plot, take measurements and understand access." },
  { n: "02", title: "Design & Plan", body: "Panel layout, post spacing and corner detailing on blueprint." },
  { n: "03", title: "Manufacturing", body: "RCC panels and posts cast at our Dadri facility, cured to spec." },
  { n: "04", title: "Installation", body: "Foundation, posts, panels — installed and sealed on site." },
];

export function ProtectionProcess() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const path = root.current!.querySelector<SVGPathElement>(".proc-line");
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = `${len}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: true },
        });
      }
      gsap.from(".proc-step", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <ContourBackdrop variant="deep" particles={12} />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="eyebrow"><span className="text-highlight">05 /</span> The Protection Process</p>
        <h2 className="h-display mt-4 text-[36px] md:text-[68px] max-w-3xl">
          From site visit to <br className="hidden md:block"/>permanent <span className="text-highlight">protection.</span>
        </h2>

        <div className="mt-16 md:mt-24 relative">
          {/* SVG line (desktop) */}
          <svg className="hidden md:block absolute left-0 right-0 top-12 h-12 w-full pointer-events-none" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path className="proc-line" d="M 40 20 L 1160 20" fill="none" stroke="var(--color-highlight)" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="proc-step relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-8 w-8 border border-highlight">
                    <div className="absolute inset-1 bg-highlight" />
                  </div>
                  <div className="font-mono text-highlight text-[12px] tracking-[0.3em]">{s.n}</div>
                </div>
                <h3 className="h-display text-[28px] md:text-[36px]">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
