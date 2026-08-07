"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GitHubContributions() {
  return (
    <section
      aria-labelledby="github-activity-title"
      className="rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40"
    >
      <h2
        id="github-activity-title"
        className="font-incognito text-xl font-bold sm:text-2xl"
      >
        GitHub activity
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
        Public and anonymized private contributions from the last year.
      </p>
      <div className="mt-5 overflow-x-auto pb-2">
        <GitHubCalendar
          username="Rappykyun"
          errorMessage="GitHub activity is temporarily unavailable."
        />
      </div>
    </section>
  );
}
