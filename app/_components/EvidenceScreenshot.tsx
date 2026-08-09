"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

export interface EvidenceScreenshotProps {
  screenshotPath: string | null;
  screenshotAlt: string;
}

export function EvidenceScreenshot({
  screenshotPath,
  screenshotAlt,
}: EvidenceScreenshotProps) {
  const [failedScreenshotPath, setFailedScreenshotPath] = useState<string | null>(
    null,
  );
  useEffect(() => {
    startTransition(() => setFailedScreenshotPath(null));
  }, [screenshotPath]);

  const screenshotLoadFailed = Boolean(
    screenshotPath && failedScreenshotPath === screenshotPath,
  );
  const activeScreenshotPath =
    screenshotPath && !screenshotLoadFailed ? screenshotPath : null;

  return (
    <figure>
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-100/80 dark:border-zinc-700 dark:bg-zinc-900/60">
        {activeScreenshotPath ? (
          <Image
            key={activeScreenshotPath}
            src={activeScreenshotPath}
            alt={screenshotAlt}
            fill
            sizes="(max-width: 640px) calc(100vw - 5rem), (max-width: 1024px) calc(100vw - 9.5rem), 872px"
            className="object-cover"
            onError={() => setFailedScreenshotPath(activeScreenshotPath)}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 px-5 text-center text-zinc-500 dark:text-zinc-400">
            <ImageIcon
              aria-hidden="true"
              className="h-8 w-8 text-zinc-400 dark:text-zinc-500"
            />
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
              {screenshotLoadFailed
                ? "Screenshot unavailable"
                : "Screenshot coming soon"}
            </p>
            <p className="max-w-md text-sm">
              {screenshotLoadFailed
                ? "The configured screenshot could not be loaded."
                : "A real screenshot will replace this temporary placeholder."}
            </p>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {activeScreenshotPath
          ? "Project screenshot shown above."
          : screenshotLoadFailed
            ? "Screenshot unavailable. The configured image could not be loaded."
            : "Temporary screenshot placeholder. Final screenshot is still pending."}
      </figcaption>
    </figure>
  );
}
