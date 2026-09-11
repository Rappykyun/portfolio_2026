type Step = {
  title: string;
  period: string;
  role: string;
  description: string;
};

const steps: readonly Step[] = [
  {
    title: "Freelance Developer",
    period: "Aug 2025 – Present",
    role: "Independent Contractor",
    description:
      "Build full-stack web platforms, mobile dispatch applications, and thesis systems for clients and researchers.",
  },
  {
    title: "Full-stack Developer Intern",
    period: "Jun – Jul 2025",
    role: "CHED Regional Office XII",
    description:
      "Built an e-library and access control system with Laravel, React, Inertia.js, and MySQL for regional schools.",
  },
];

export function Experiences() {
  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Experience
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Freelance development and public-sector project work.
          </p>
        </div>

        <ol className="mx-auto mt-10 max-w-3xl divide-y divide-zinc-800 border-y border-zinc-800">
          {steps.map((step) => (
            <li key={step.title} className="py-8 text-center">
              <h3 className="font-display text-lg font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-signal">{step.role}</p>
              <time className="mt-2 block font-mono text-xs text-zinc-400">{step.period}</time>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experiences;
