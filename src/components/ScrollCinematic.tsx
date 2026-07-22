import { useEffect, useRef, type ReactNode } from "react";

interface ScrollCinematicProps {
  children: ReactNode;
  className?: string;
}

/**
 * Horizontal blinds / slats reveal.
 *
 * Six horizontal slats cover the image and peel away one-by-one in a
 * staggered sweep as the section enters the viewport. The image behind
 * them starts slightly zoomed and desaturated, then resolves to full
 * color and 1x scale. After the reveal, continued scroll drives a soft
 * vertical parallax.
 */
export function ScrollCinematic({ children, className }: ScrollCinematicProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const SLATS = 6;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let i = 0; i < SLATS; i++) {
        wrap.style.setProperty(`--sl-${i}`, "0");
      }
      wrap.style.setProperty("--cv-img-scale", "1");
      wrap.style.setProperty("--cv-img-sat", "1");
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));

      // Reveal window
      const revealStart = vh;
      const revealEnd = vh * 0.35;
      const rp = Math.max(
        0,
        Math.min(1, (revealStart - rect.top) / (revealStart - revealEnd)),
      );

      // Staggered per-slat progress
      const stagger = 0.35; // overlap window
      for (let i = 0; i < SLATS; i++) {
        const start = (i / SLATS) * (1 - stagger);
        const end = start + stagger;
        const local = Math.max(0, Math.min(1, (rp - start) / (end - start)));
        const eased = 1 - Math.pow(1 - local, 3);
        // 100% = fully covering, 0% = gone
        wrap.style.setProperty(`--sl-${i}`, `${(1 - eased) * 100}%`);
      }

      const eased = 1 - Math.pow(1 - rp, 3);
      const imgScale = 1.15 - eased * 0.15;
      const imgSat = 0.4 + eased * 0.6;
      const imgY = (p - 0.5) * -40;

      wrap.style.setProperty("--cv-img-scale", `${imgScale}`);
      wrap.style.setProperty("--cv-img-sat", `${imgSat}`);
      wrap.style.setProperty("--cv-img-y", `${imgY}px`);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", borderRadius: 24 }}
    >
      {/* image layer */}
      <div
        style={
          {
            transform:
              "translate3d(0, var(--cv-img-y, 0px), 0) scale(var(--cv-img-scale, 1.15))",
            filter:
              "saturate(var(--cv-img-sat, 0.4)) contrast(calc(0.9 + 0.1 * var(--cv-img-sat, 0.4)))",
            transition: "transform 140ms linear, filter 140ms linear",
            willChange: "transform, filter",
            height: "100%",
          } as React.CSSProperties
        }
      >
        {children}
      </div>

      {/* Slats */}
      {Array.from({ length: SLATS }).map((_, i) => {
        const top = (i / SLATS) * 100;
        const height = 100 / SLATS;
        const fromLeft = i % 2 === 0;
        return (
          <div
            key={i}
            aria-hidden
            style={
              {
                position: "absolute",
                top: `${top}%`,
                height: `calc(${height}% + 1px)`,
                left: fromLeft ? 0 : "auto",
                right: fromLeft ? "auto" : 0,
                width: `var(--sl-${i}, 100%)`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(90deg, #0b0b0c 0%, #17171d 100%)"
                    : "linear-gradient(270deg, #0b0b0c 0%, #17171d 100%)",
                transition: "width 160ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "width",
                boxShadow:
                  "0 1px 0 rgba(245,197,24,0.08), 0 -1px 0 rgba(245,197,24,0.08)",
              } as React.CSSProperties
            }
          />
        );
      })}

      {/* Faint scanline sheen */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
