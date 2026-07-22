import { useEffect, useRef, type ReactNode } from "react";

interface ScrollCinematicProps {
  children: ReactNode;
  className?: string;
}

/**
 * Curtain-reveal scroll animation.
 *
 * Two dark panels start covering the image and slide apart horizontally
 * as the section scrolls into view. The image behind them slowly zooms
 * out (Ken Burns), and a thin taxi-yellow seam flashes at the split
 * during the reveal. After the reveal completes the panels stay off,
 * and continued scroll produces a gentle vertical parallax on the image.
 */
export function ScrollCinematic({ children, className }: ScrollCinematicProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.style.setProperty("--cv-panel", "0%");
      wrap.style.setProperty("--cv-seam", "0");
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Overall progress across the whole pass (for parallax)
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));

      // Reveal progress: 0 when top edge hits bottom of viewport,
      // 1 when the section is ~40% up the viewport
      const revealStart = vh;
      const revealEnd = vh * 0.4;
      const rp = Math.max(
        0,
        Math.min(1, (revealStart - rect.top) / (revealStart - revealEnd)),
      );
      const eased = 1 - Math.pow(1 - rp, 3); // easeOutCubic

      // Panels slide from 50% (fully closed) to 0% (fully open)
      const panel = (1 - eased) * 50;

      // Seam glow peaks mid-reveal
      const seam = Math.sin(Math.PI * rp);

      // Image zooms from 1.18 -> 1 across the reveal, then parallaxes
      const imgScale = 1.18 - eased * 0.18;
      const imgY = (p - 0.5) * -40;

      wrap.style.setProperty("--cv-panel", `${panel}%`);
      wrap.style.setProperty("--cv-seam", `${seam}`);
      wrap.style.setProperty("--cv-img-scale", `${imgScale}`);
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
      {/* image + overlays layer */}
      <div
        style={
          {
            transform:
              "translate3d(0, var(--cv-img-y, 0px), 0) scale(var(--cv-img-scale, 1.18))",
            transition: "transform 140ms linear",
            willChange: "transform",
            height: "100%",
          } as React.CSSProperties
        }
      >
        {children}
      </div>

      {/* Left curtain panel */}
      <div
        aria-hidden
        style={
          {
            position: "absolute",
            inset: 0,
            right: "auto",
            width: "var(--cv-panel, 50%)",
            background:
              "linear-gradient(90deg, #0b0b0c 0%, #14141a 60%, #1a1a20 100%)",
            transition: "width 140ms linear",
            willChange: "width",
          } as React.CSSProperties
        }
      />
      {/* Right curtain panel */}
      <div
        aria-hidden
        style={
          {
            position: "absolute",
            inset: 0,
            left: "auto",
            width: "var(--cv-panel, 50%)",
            background:
              "linear-gradient(270deg, #0b0b0c 0%, #14141a 60%, #1a1a20 100%)",
            transition: "width 140ms linear",
            willChange: "width",
          } as React.CSSProperties
        }
      />
      {/* Center seam glow */}
      <div
        aria-hidden
        style={
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "2px",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(180deg, transparent 0%, #f5c518 50%, transparent 100%)",
            opacity: "var(--cv-seam, 0)",
            filter: "blur(1px)",
            transition: "opacity 140ms linear",
            pointerEvents: "none",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
