export function Process() {
  const steps = [
    {
      number: "01",
      title: "Discover & Scope",
      description:
        "Define requirements, system boundaries, user workflows, and technical constraints before writing production code.",
    },
    {
      number: "02",
      title: "Build & Iterate",
      description:
        "Implement features incrementally with clean architecture, typed interfaces, and continuous stakeholder review.",
    },
    {
      number: "03",
      title: "Deploy & Handoff",
      description:
        "Configure production hosting, verify security and performance, and deliver clear operational documentation.",
    },
  ];

  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="max-w-xl">
          <p className="eyebrow">Methodology</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            A disciplined engineering process
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            From problem discovery to deployed delivery, ensuring transparency and technical rigor at
            every step.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-sm transition-colors dark:border-zinc-800/80 dark:bg-surface"
            >
              <div>
                <span className="font-mono text-sm font-semibold text-signal">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
