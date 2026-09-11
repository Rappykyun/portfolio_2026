import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Magnet from "./Magnet/Magnet";

export function InquiryBanner() {
  return (
    <section className="section-space transition-colors">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-surface p-8 text-center shadow-sm sm:p-12 lg:p-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
              Tell me what you want to build, your timeline, and your main requirements.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnet padding={60} magnetStrength={3}>
                <Link
                  href="/contact"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-6 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-signal-bright hover:text-ink"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnet>

              <a
                href="mailto:ralphvincentrodriguez@sksu.edu.ph"
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-800 bg-background px-5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-signal hover:text-signal"
              >
                <Mail className="h-4 w-4 text-signal" />
                <span>Email me</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InquiryBanner;
