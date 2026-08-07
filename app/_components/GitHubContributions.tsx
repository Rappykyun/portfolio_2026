"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GitHubContributions() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const syncColorScheme = () => {
      setColorScheme(root.classList.contains("dark") ? "dark" : "light");
    };

    syncColorScheme();
    const observer = new MutationObserver(syncColorScheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="github-activity-title"
      className="rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40"
    >
      <h2
        id="github-activity-title"
        className="font-incognito text-xl font-bold sm:text-2xl"
      >
        Recent GitHub activity
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
        A snapshot of the projects, experiments, and learning behind my last year in software.
      </p>
      <div className="mt-5 overflow-x-auto pb-2">
        <GitHubCalendar
          username="Rappykyun"
          colorScheme={colorScheme}
          errorMessage="GitHub activity is temporarily unavailable."
        />
      </div>
    </section>
  );
}
