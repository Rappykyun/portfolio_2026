import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Code,
  ExternalLink,
  Github,
  Image as ImageIcon,
  KeyRound,
  Users,
} from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";

const sectionClass =
  "rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProjectBySlug(projectId);

  if (!project) notFound();

  const caseStudy = project.caseStudy;
  const demoLabel = project.status === "Deployed" ? "Live Site" : "Demo";

  return (
    <main className="max-w-5xl mx-auto md:px-12 px-5 lg:mt-12 mt-8 mb-16">
      <div className="flex flex-col gap-5 sm:gap-6">
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 dark:text-zinc-400 dark:hover:text-green-400"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to Projects
        </Link>

        <section className={sectionClass}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-50/80 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-400/20 dark:bg-amber-950/40 dark:text-amber-300">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-amber-400"
                  />
                  {project.status}
                </span>
              </div>
              <h1 className="font-incognito text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.name}
              </h1>
              <p className="text-base text-zinc-500 dark:text-zinc-400 sm:text-lg">
                {project.tagline}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  {demoLabel}
                </a>
              )}
              {project.links.sourceCode && (
                <a
                  href={project.links.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-200"
                >
                  <Github aria-hidden="true" className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-200/70 pt-5 sm:grid-cols-3 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <Calendar
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
              />
              <div>
                <dt className="text-xs text-zinc-400 dark:text-zinc-500">
                  Timeline
                </dt>
                <dd className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {project.timeline}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Users
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
              />
              <div>
                <dt className="text-xs text-zinc-400 dark:text-zinc-500">Role</dt>
                <dd className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {project.role}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Code
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
              />
              <div>
                <dt className="text-xs text-zinc-400 dark:text-zinc-500">Status</dt>
                <dd className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {project.status}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        <section className={sectionClass} aria-labelledby="context-heading">
          <h2
            id="context-heading"
            className="font-incognito text-xl font-bold sm:text-2xl"
          >
            {caseStudy ? "Context" : "About"}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {caseStudy?.context ?? project.description}
          </p>
        </section>

        {caseStudy && (
          <>
            <section className={sectionClass} aria-labelledby="built-heading">
              <h2
                id="built-heading"
                className="font-incognito text-xl font-bold sm:text-2xl"
              >
                What I built
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {caseStudy.whatWasBuilt}
              </p>
            </section>

            <section
              className={sectionClass}
              aria-labelledby="demonstrates-heading"
            >
              <h2
                id="demonstrates-heading"
                className="font-incognito text-xl font-bold sm:text-2xl"
              >
                What it demonstrates
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {caseStudy.demonstrates}
              </p>
            </section>

            <section className={sectionClass} aria-labelledby="screenshot-heading">
              <h2
                id="screenshot-heading"
                className="font-incognito text-xl font-bold sm:text-2xl"
              >
                Project screenshot
              </h2>
              <figure className="mt-4">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-100/80 dark:border-zinc-700 dark:bg-zinc-900/60">
                  {caseStudy.screenshotPath ? (
                    <Image
                      src={caseStudy.screenshotPath}
                      alt={caseStudy.screenshotAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 px-5 text-center text-zinc-500 dark:text-zinc-400">
                      <ImageIcon
                        aria-hidden="true"
                        className="h-8 w-8 text-zinc-400 dark:text-zinc-500"
                      />
                      <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                        Screenshot coming soon
                      </p>
                      <p className="max-w-md text-sm">
                        A real screenshot will replace this temporary placeholder.
                      </p>
                    </div>
                  )}
                </div>
                <figcaption className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {caseStudy.screenshotPath
                    ? caseStudy.screenshotAlt
                    : "Temporary screenshot placeholder. Final screenshot is still pending."}
                </figcaption>
              </figure>
            </section>
          </>
        )}

        <section className={sectionClass}>
          <h2 className="font-incognito text-xl font-bold sm:text-2xl">Tech Stack</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {project.technology.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30"
              >
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className="font-incognito text-xl font-bold sm:text-2xl">Features</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/30"
              >
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {project.demoCredentials && (
          <section className={sectionClass}>
            <div className="mb-4 flex items-center gap-2">
              <KeyRound
                aria-hidden="true"
                className="h-4 w-4 text-green-600 dark:text-green-400"
              />
              <h2 className="font-incognito text-xl font-bold sm:text-2xl">
                Try it out
              </h2>
            </div>
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Use these credentials to log in and explore the admin dashboard.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Email
                </p>
                <p className="mt-0.5 select-all font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {project.demoCredentials.email}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/30">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  Password
                </p>
                <p className="mt-0.5 select-all font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {project.demoCredentials.password}
                </p>
              </div>
            </div>
            {project.credentialsNote && (
              <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
                {project.credentialsNote}
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
