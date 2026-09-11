import { Award, ExternalLink } from "lucide-react";

export function Certificates() {
  const certificate = {
    title: "Data Engineer Associate",
    issuer: "DataCamp",
    issued: "27 March 2026",
    expires: "26 March 2028",
    summary:
      "Certified in associate-level data engineering skills, including data workflows, data management, and analytics-ready pipelines.",
    credentialUrl: "https://www.datacamp.com/certificate/DEA0018866705032",
  };

  return (
    <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <div className="site-container">
        <div className="max-w-xl">
          <p className="eyebrow">Credentials</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Verified certification
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            Professional verification in modern data engineering and pipeline workflows.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-sm dark:border-zinc-800/80 dark:bg-surface">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 bg-background text-signal shadow-sm dark:border-zinc-800/80">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {certificate.title}
                  </h3>
                  <span className="font-mono text-xs text-signal">
                    {certificate.issuer}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  Issued {certificate.issued} · Valid until {certificate.expires}
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {certificate.summary}
                </p>
              </div>
            </div>

            <div className="shrink-0 sm:self-center">
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200/80 bg-background px-4 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-signal hover:text-signal dark:border-zinc-800/80"
              >
                Verify credential
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
