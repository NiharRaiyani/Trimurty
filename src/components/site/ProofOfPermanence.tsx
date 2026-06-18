import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aerial from "@/assets/aerial-protected.jpg";
import wall from "@/assets/wall-cinematic.jpg";
import boundary from "@/assets/boundary.jpg";
import { ContourBackdrop } from "./ContourBackdrop";

const stats = [
  { v: 500, suf: "+", l: "Plots Protected" },
  { v: 250, suf: "+ KM", l: "Walls Installed" },
  { v: 15, suf: "+ YRS", l: "Field Experience" },
  { v: 100, suf: "%", l: "On-time Delivery" },
];

const projects = [
  { place: "Dadri, Gautam Buddh Nagar", title: "2.4 KM Compound Wall", days: "Completed in 12 days", img: wall },
  { place: "Greater Noida", title: "Industrial Plot Protection", days: "Completed in 9 days", img: aerial },
  { place: "Noida Extension", title: "Farmhouse Boundary", days: "Ready in 7 days", img: boundary },
];

export function ProofOfPermanence() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.v);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => (el.textContent = Math.floor(obj.v).toString()),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proof" ref={root} className="relative bg-background py-24 md:py-32 overflow-hidden">
      <ContourBackdrop variant="dawn" grid={false} particles={10} />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="eyebrow"><span className="text-highlight">04 /</span> Proof of Permanence</p>
        <h2 className="h-display mt-4 text-[36px] md:text-[68px] max-w-3xl">
          Real land. <br className="hidden md:block" />Real walls. <span className="text-highlight">Real outcomes.</span>
        </h2>

        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <article key={p.title} className="group">
              <div className="relative aspect-[4/3] overflow-hidden border border-border">
                <img src={p.img} alt={p.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{p.place}</div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-highlight">↗</div>
                </div>
              </div>
              <h3 className="mt-4 text-xl md:text-2xl font-display tracking-tight">{p.title}</h3>
              <div className="mt-1 font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">{p.days}</div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-border">
          {stats.map((s) => (
            <div key={s.l} className="p-6 md:p-8 border-r border-border last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <div className="flex items-baseline gap-1 h-display text-[44px] md:text-[72px] text-foreground">
                <span className="count" data-v={s.v}>0</span>
                <span className="text-highlight text-[24px] md:text-[36px]">{s.suf}</span>
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
