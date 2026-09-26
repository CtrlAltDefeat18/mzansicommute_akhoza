"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "./SmoothScroll";
import { usePerfTier } from "./PerfProvider";

export default function RouteLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const taxiRef = useRef<SVGGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const tier = usePerfTier();

  useEffect(() => {
    if (tier !== "full") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!pathRef.current || !taxiRef.current || !wrapRef.current) return;

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
      if (lenis.current) lenis.current.on("scroll", ScrollTrigger.update);

      ctx = gsap.context(() => {
        const motionCfg = {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5] as [number, number],
        };
        gsap.set(taxiRef.current, { motionPath: { ...motionCfg, end: 0 } });
        gsap.to(taxiRef.current, {
          motionPath: { ...motionCfg, start: 0, end: 1 },
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 80%",
            end: "bottom 35%",
            scrub: 0.8,
          },
        });
        gsap.fromTo(
          pathRef.current,
          { strokeDashoffset: 1200 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top 80%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          }
        );
      }, wrapRef);
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, [tier]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="routeLineWrap" ref={wrapRef} aria-hidden="true">
      <svg className="routeLineSvg" viewBox="0 0 1200 160" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d="M0,130 C200,130 240,30 460,30 C680,30 720,140 960,140 C1060,140 1120,80 1200,70"
          fill="none"
          stroke="rgb(21 33 29 / 20%)"
          strokeWidth="3"
          strokeDasharray="1200"
          strokeLinecap="round"
        />
        <g ref={taxiRef} transform="translate(0,130)">
          <rect x="-18" y="-10" width="36" height="20" rx="5" fill="#15211d"/>
          <rect x="-14" y="-17" width="28" height="10" rx="3" fill="#15211d"/>
          <rect x="-12" y="-16" width="24" height="8" rx="2" fill="#e6ff47"/>
        </g>
      </svg>
    </div>
  );
}
