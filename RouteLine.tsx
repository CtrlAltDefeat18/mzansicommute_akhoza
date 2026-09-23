"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "./SmoothScroll";

/**
 * A single orchestrated scroll moment: a taxi travels a drawn route
 * from the hero into the pilot-scorecard section, then the animation
 * is done — it does not follow the user for the rest of the page.
 *
 * Deliberately SVG + GSAP MotionPath instead of a 3D model: no asset
 * to source or ship, and the total added weight (gsap + ScrollTrigger
 * + MotionPathPlugin) is roughly 40KB gzipped versus several hundred
 * KB for a Three.js/Spline scene — meaningful on the mobile data
 * budgets of the people this site is actually for.
 *
 * Renders a static (unanimated) route line for prefers-reduced-motion.
 */
export default function RouteLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const taxiRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!pathRef.current || !taxiRef.current || !containerRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { MotionPathPlugin }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/MotionPathPlugin"),
        ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

      if (lenis.current) {
        lenis.current.on("scroll", ScrollTrigger.update);
      }

      ctx = gsap.context(() => {
        gsap.set(taxiRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            start: 0,
          },
        });

        gsap.to(taxiRef.current, {
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 40%",
            scrub: 0.6,
          },
        });

        gsap.fromTo(
          pathRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.6,
            },
          }
        );
      }, containerRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="routeLine-wrap" ref={containerRef} aria-hidden="true">
      <svg
        className="routeLine-svg"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          ref={pathRef}
          d="M0,180 C220,180 260,40 480,40 C700,40 740,190 980,190 C1080,190 1120,120 1200,110"
          fill="none"
          stroke="rgb(21 33 29 / 30%)"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeLinecap="round"
        />
        <g ref={taxiRef}>
          <rect x="-16" y="-9" width="32" height="18" rx="4" fill="#15211d" />
          <rect x="-11" y="-14" width="22" height="9" rx="3" fill="#15211d" />
          <rect x="-9" y="-13" width="18" height="7" fill="#e6ff47" />
        </g>
      </svg>
    </div>
  );
}
