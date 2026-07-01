import { Award, ExternalLink } from "lucide-react";

type Certificate = {
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  summary: string;
  credentialUrl: string;
};

const certificates: Certificate[] = [
  {
    title: "Data Engineer Associate",
    issuer: "DataCamp",
    issued: "27 March 2026",
    expires: "26 March 2028",
    summary: "Certified in associate-level data engineering skills, including data workflows, data management, and analytics-ready pipelines.",
    credentialUrl: "https://www.datacamp.com/certificate/DEA0018866705032",
  },
];

type CertificatesProps = {
  compact?: boolean;
};

export function Certificates({ compact = false }: CertificatesProps) {
  const sectionClassName = compact ? "py-0" : "py-12 md:py-16 lg:py-24";
  const containerClassName = compact ? "w-full" : "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8";

  return (
    <section className={sectionClassName}>
      <p className="pb-3 font-incognito text-xl font-bold sm:text-2xl lg:text-3xl">
        Certificates
      </p>
      <div className={containerClassName}>
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((certificate) => (
            <article
              key={`${certificate.title}-${certificate.issued}`}
              className="group flex h-full flex-col rounded-xl border border-zinc-200/80 bg-white/60 p-4 transition-colors hover:border-zinc-300 hover:bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-950/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-950/50"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground shadow-sm">
                  <Award className="size-5" aria-hidden="true" />
                </div>
                <span className="rounded-full border border-zinc-200 px-2.5 py-1 font-mono text-[11px] text-muted-foreground dark:border-zinc-800">
                  {certificate.issued}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-base font-semibold leading-snug sm:text-lg">{certificate.title}</h3>
                <p className="font-mono text-xs text-muted-foreground">{certificate.issuer}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  Issued {certificate.issued}
                  {certificate.expires ? ` · Expires ${certificate.expires}` : ""}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">{certificate.summary}</p>
              </div>

              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-xs font-medium transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-zinc-800 dark:hover:bg-zinc-900"
              >
                View Certificate
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
