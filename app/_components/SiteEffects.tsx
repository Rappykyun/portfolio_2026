"use client";

import Noise from "./Noise/Noise";

export function SiteEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      <Noise patternRefreshInterval={3} patternAlpha={14} />
    </div>
  );
}

export default SiteEffects;
