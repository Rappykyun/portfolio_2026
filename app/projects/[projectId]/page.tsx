import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Activity,
  KeyRound,
} from "lucide-react";
import { projects, getProject, projectParams } from "@/lib/projects";
import InquiryBanner from "@/app/_components/InquiryBanner";

export function generateStaticParams() {
  return projectParams;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = getProject(projectId);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main>
      {/* Header & Metadata */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <Link
            href="/projects"
            className="focus-ring mb-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-signal transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all projects
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-signal">
                {project.category}
              </span>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Status: {project.status}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>

            <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
              {project.tagline}
            </p>

            {/* Quick Metadata Rail */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b border-zinc-200/80 py-4 font-mono text-xs sm:grid-cols-3 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <User className="h-4 w-4 text-signal shrink-0" />
                <span className="truncate">{project.role}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Calendar className="h-4 w-4 text-signal shrink-0" />
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 col-span-2 sm:col-span-1">
                <Activity className="h-4 w-4 text-signal shrink-0" />
                <span>{project.status} Phase</span>
              </div>
            </div>

            {/* Live / Source Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-6 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-signal-bright hover:text-ink"
                >
                  Live platform demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200/80 bg-surface px-5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-signal hover:text-signal dark:border-zinc-800/80 dark:bg-surface"
                >
                  <Github className="h-4 w-4" />
                  View source code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project overview */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              About the project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <p className="eyebrow">Features</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Main features
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-surface p-6 shadow-sm dark:border-zinc-800/80 dark:bg-surface"
              >
                <div>
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {feature.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture & Stack */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <p className="eyebrow">Implementation</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Technical stack & architecture
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {project.tech.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-zinc-200/80 bg-surface p-4 shadow-sm dark:border-zinc-800/80 dark:bg-surface"
              >
                <p className="font-mono text-xs text-zinc-500">{item.label}</p>
                <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Credentials when present */}
      {project.demo && (
        <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
          <div className="site-container">
            <div className="max-w-xl rounded-2xl border border-signal/40 bg-surface p-6 shadow-sm dark:border-signal/30 dark:bg-surface">
              <div className="flex items-center gap-2 text-signal">
                <KeyRound className="h-5 w-5" />
                <h3 className="font-display text-lg font-medium text-foreground">
                  Test credentials
                </h3>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                You can use these credentials to access and evaluate the demo platform:
              </p>
              <div className="mt-4 space-y-2 font-mono text-xs">
                <p className="flex items-center gap-2">
                  <span className="text-zinc-500">Email:</span>
                  <code className="rounded bg-zinc-100 px-2 py-1 text-foreground dark:bg-zinc-800">
                    {project.demo.email}
                  </code>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-zinc-500">Password:</span>
                  <code className="rounded bg-zinc-100 px-2 py-1 text-foreground dark:bg-zinc-800">
                    {project.demo.password}
                  </code>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Previous and next project navigation */}
      <section className="section-space border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="focus-ring group flex flex-1 flex-col rounded-xl border border-zinc-200/80 bg-surface p-4 transition-colors hover:border-signal/50 dark:border-zinc-800/80 dark:bg-surface"
              aria-label={`Previous project: ${prevProject.name}`}
            >
              <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 group-hover:text-signal">
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous project
              </span>
              <span className="mt-2 font-display text-base font-medium text-foreground group-hover:text-signal">
                {prevProject.name}
              </span>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="focus-ring group flex flex-1 flex-col items-end rounded-xl border border-zinc-200/80 bg-surface p-4 text-right transition-colors hover:border-signal/50 dark:border-zinc-800/80 dark:bg-surface"
              aria-label={`Next project: ${nextProject.name}`}
            >
              <span className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 group-hover:text-signal">
                Next project
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="mt-2 font-display text-base font-medium text-foreground group-hover:text-signal">
                {nextProject.name}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <InquiryBanner />
    </main>
  );
}
