import { useEffect, useRef, type ReactNode } from "react";

interface ScrollCinematicProps {
  children: ReactNode;
  className?: string;
}

/**
 * Cinematic scroll reveal for a hero/banner block.
 *
 * As the section passes through the viewport:
 *  - the frame expands from a narrow letterbox to full width (clip-path + scale)
 *  - its corner radius eases from very large to compact
 *  - the inner image parallaxes upward (Ken Burns feel)
 *  - a subtle brightness lift happens at the "sweet spot"
 *
 * Uses a single rAF-throttled scroll listener and CSS variables so the
 * transforms stay on the compositor.
 */
export function ScrollCinematic({ children, className }: ScrollCinematicProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total)); // 0..1

      // Ease progress (easeInOutCubic) for buttery motion
      const eased =
        p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      // Frame: narrow letterbox -> full, big radius -> small
      const inset = Math.max(0, (1 - eased) * 14); // % horizontal inset
      const scale = 0.94 + eased * 0.06;
      const radius = 48 - eased * 24; // px

      // Parallax: image drifts up as we scroll past
      const imgY = (p - 0.5) * -80; // px
      const imgScale = 1.12 - eased * 0.08;

      // Brightness peaks near center
      const bright = 0.85 + (1 - Math.abs(p - 0.55) * 2) * 0.2;

      wrap.style.setProperty("--sc-inset", `${inset}%`);
      wrap.style.setProperty("--sc-scale", `${scale}`);
      wrap.style.setProperty("--sc-radius", `${radius}px`);
      wrap.style.setProperty("--sc-img-y", `${imgY}px`);
      wrap.style.setProperty("--sc-img-scale", `${imgScale}`);
      wrap.style.setProperty("--sc-bright", `${bright}`);
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
      style={
        {
          transform:
            "translate3d(0,0,0) scale(var(--sc-scale, 0.94))",
          borderRadius: "var(--sc-radius, 48px)",
          clipPath:
            "inset(0 var(--sc-inset, 14%) 0 var(--sc-inset, 14%) round var(--sc-radius, 48px))",
          transition: "transform 120ms linear, border-radius 120ms linear",
          willChange: "transform, clip-path",
        } as React.CSSProperties
      }
    >
      <div
        style={
          {
            transform:
              "translate3d(0, var(--sc-img-y, 0px), 0) scale(var(--sc-img-scale, 1.12))",
            filter: "brightness(var(--sc-bright, 1))",
            transition: "transform 120ms linear, filter 200ms linear",
            willChange: "transform, filter",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
