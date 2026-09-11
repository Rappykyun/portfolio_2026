"use client";

import MagicBento, { type BentoCardData } from "./MagicBento/MagicBento";

const services: readonly BentoCardData[] = [
  {
    label: "01",
    title: "Web applications",
    description: "Portals, inventory systems, dashboards, and operational tools.",
  },
  {
    label: "02",
    title: "Mobile applications",
    description: "Cross-platform workflows with realtime data, maps, and notifications.",
  },
  {
    label: "03",
    title: "Data and ML",
    description: "Forecasting, dashboards, data preparation, and decision-support systems.",
  },
  {
    label: "04",
    title: "IoT systems",
    description: "Connected prototypes that combine embedded control, sensors, and offline operation.",
  },
] as const;

export function Services() {
  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="mb-10 max-w-xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Software solutions built around the problem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Focused on functional outcomes, clear domain architecture, and sustainable codebases
            across four key technical categories.
          </p>
        </div>

        <MagicBento
          cards={services}
          glowColor="34, 197, 94"
          enableSpotlight={true}
          enableBorderGlow={true}
          enableStars={false}
          enableTilt={true}
          clickEffect={false}
          enableMagnetism={false}
        />
      </div>
    </section>
  );
}

export default Services;
