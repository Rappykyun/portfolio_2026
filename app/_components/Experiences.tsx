type Step = {
  title: string;
  period: string;
  role: string;
  description: string;
};

const steps: readonly Step[] = [
  {
    title: "Freelance Software Developer",
    period: "Aug 2025 – Present",
    role: "Independent Contractor",
    description:
      "Design and deliver full-stack web platforms, mobile dispatch solutions, and thesis engineering systems for clients and academic researchers.",
  },
  {
    title: "Fullstack Developer Intern",
    period: "Jun – Jul 2025",
    role: "CHED Regional Office XII",
    description:
      "Engineered an e-library digital catalogue and access control system using Laravel, React, Inertia.js, and MySQL for regional educational institutions.",
  },
];

export function Experiences() {
  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="max-w-xl">
          <p className="eyebrow">Track Record</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Experience and work history
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Professional background combining public agency development and independent software delivery.
          </p>
        </div>

        <div className="mt-10">
          <ol className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-8">
            {steps.map((step) => (
              <li key={step.title} className="relative pl-6">
                {/* Node dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background bg-signal ring-2 ring-signal/20"
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {step.title}
                  </h3>
                  <time className="font-mono text-xs text-zinc-500 dark:text-zinc-400 shrink-0">
                    {step.period}
                  </time>
                </div>

                <p className="mt-0.5 font-mono text-xs text-signal">
                  {step.role}
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
