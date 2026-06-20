import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";

type Step = {
  title: string;
  period: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Freelance Developer",
    period: "Aug 2025 – Present",
    description:
      "Build full-stack web applications for clients, including capstone and thesis projects for students.",
  },
  {
    title: "Fullstack Developer Intern — CHED Regional Office XII",
    period: "Jun – Jul 2025",
    description:
      "Built an e-library / library management system using Laravel and React.",
  },
];

type ExperiencesProps = {
  compact?: boolean;
};

export function Experiences({ compact = false }: ExperiencesProps) {
  const sectionClassName = compact ? "py-0" : "py-12 md:py-16 lg:py-24";
  const containerClassName = compact ? "w-full" : "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8";

  return (
    <section className={sectionClassName}>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold pb-3 font-incognito">Experiences</p>
      <div className={containerClassName}>
        <div className="relative">
          {/* Vertical timeline rail */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-border"
          />

          <div className="flex flex-col gap-5">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex gap-6">
                {/* Timeline node */}
                <div className="relative z-10 flex shrink-0 items-start">
                  <div className="flex size-8 items-center justify-center rounded-full border bg-background text-sm font-semibold text-foreground shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg">{step.title}</CardTitle>
                    <p className="text-xs font-mono text-muted-foreground">{step.period}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
