import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";

export default function NotFound() {
  return (
    <main className="section-space">
      <div className="site-container flex flex-col items-center justify-center text-center py-20">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-signal">
          Error 404
        </span>

        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          The requested page or case study could not be located. It may have been moved, renamed,
          or does not exist.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-6 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-signal-bright hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Return home
          </Link>

          <Link
            href="/projects"
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200/80 bg-surface px-5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-signal hover:text-signal dark:border-zinc-800/80 dark:bg-surface"
          >
            <FolderKanban className="h-4 w-4" />
            Browse projects
          </Link>
        </div>
      </div>
    </main>
  );
}
