"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "./useReducedMotion";

const DarkVeil = dynamic(() => import("./DarkVeil/DarkVeil"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-zinc-950" />,
});

export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {reduced ? (
        <div className="h-full w-full bg-zinc-950" />
      ) : (
        <DarkVeil
          hueShift={115}
          speed={0.25}
          warpAmount={0.15}
          resolutionScale={0.7}
        />
      )}
      {/* Subtle bottom fade so content transitions into the page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}

export default HeroVisual;
