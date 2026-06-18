import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  { label: "Story", href: "#story" },
  { label: "Systems", href: "#systems" },
  { label: "Proof", href: "#proof" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // GSAP open choreography (mobile only)
  useEffect(() => {
    if (!panelRef.current) return;
    const root = panelRef.current;
    if (!open) return;

    const items = root.querySelectorAll<HTMLElement>(".mnav-item");
    const numbers = root.querySelectorAll<HTMLElement>(".mnav-num");
    const lines = root.querySelectorAll<HTMLElement>(".mnav-line");
    const cta = root.querySelector<HTMLElement>(".mnav-cta");
    const meta = root.querySelectorAll<HTMLElement>(".mnav-meta");

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      root,
      { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 }
    )
      .fromTo(
        lines,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, stagger: 0.05 },
        0.15
      )
      .fromTo(
        numbers,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.45, stagger: 0.06 },
        0.2
      )
      .fromTo(
        items,
        { yPercent: 110, opacity: 0, rotate: 4 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "expo.out",
        },
        0.2
      )
      .fromTo(
        cta,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.5
      )
      .fromTo(
        meta,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        0.6
      );

    return () => {
      tl.kill();
    };
  }, [open]);


  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "backdrop-blur-md bg-background/70 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex items-center gap-2.5 relative z-[60]">
          <span className="inline-block h-7 w-7 border border-foreground/60 relative">
            <span className="absolute inset-1 bg-highlight" />
          </span>
          <span className="font-mono text-[11px] leading-tight tracking-[0.18em] uppercase">
            Trimurti
            <br />
            <span className="text-muted-foreground">Cement Article</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/917987674523"
          className="hidden md:inline-flex items-center gap-2 border border-foreground/30 hover:border-highlight hover:text-highlight px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase transition-colors"
        >
          Protect My Plot →
        </a>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 relative z-[60]"
        >
          <span className={`block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>
    </header>

    {/* Mobile fullscreen panel — rendered outside header to escape backdrop-filter containing block */}
    {open && (
      <div
        ref={panelRef}
        className="md:hidden fixed inset-0 z-[45] bg-background overflow-y-auto"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        {/* Backdrop grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-highlight/20 blur-[100px] pointer-events-none" />

        <div className="relative min-h-full pt-24 pb-10 px-6 flex flex-col">
          <div className="mnav-meta font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
            Menu / Navigate the Story
          </div>

          <nav className="flex-1 flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="group relative block py-3 overflow-hidden"
              >
                <span className="mnav-line absolute bottom-0 left-0 h-px w-full bg-border" />
                <div className="flex items-baseline gap-5">
                  <span className="mnav-num font-mono text-[10px] tracking-[0.3em] uppercase text-highlight w-6">
                    0{i + 1}
                  </span>
                  <span className="overflow-hidden">
                    <span className="mnav-item inline-block font-display text-4xl uppercase tracking-tight leading-[1.05] transition-colors group-hover:text-highlight">
                      {l.label}
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </nav>

          <div className="mt-8 space-y-5">
            <a
              href="https://wa.me/917987674523"
              onClick={() => setOpen(false)}
              className="mnav-cta inline-flex w-full items-center justify-between gap-2 bg-highlight text-background px-5 py-4 font-mono text-[11px] tracking-[0.22em] uppercase"
            >
              <span>Protect My Plot</span>
              <span>→</span>
            </a>
            <div className="mnav-meta flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              <span>Est. Permanence</span>
              <span>+91 79876 74523</span>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

