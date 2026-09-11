import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from "lucide-react";
import HeroVisual from "./HeroVisual";
import SplitText from "./SplitText/SplitText";
import Magnet from "./Magnet/Magnet";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 transition-colors dark:border-zinc-800/80">
      <HeroVisual />

      <div className="site-container relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          {/* Portrait */}
          <div className="relative mb-6">
            <div className="h-32 w-32 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 p-1 shadow-sm sm:h-36 sm:w-36">
              <Image
                src="/portfolio_pic_v2.png"
                alt="Portrait of Ralph Vincent Rodriguez"
                width={144}
                height={144}
                priority
                sizes="(max-width: 640px) 128px, 144px"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Status pill & location */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-signal-bright/30 bg-zinc-950/80 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-bright opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal-bright" />
              </span>
              Open for freelance projects
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/80 bg-zinc-950/80 px-3 py-1 font-mono text-xs text-zinc-200 shadow-sm backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-signal-bright" />
              Sultan Kudarat, Philippines
            </span>
          </div>

          {/* SplitText Hero Heading */}
          <div className="mt-6">
            <SplitText
              text="I build software that moves real work forward."
              tag="h1"
              className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              delay={30}
              duration={0.9}
              splitType="words"
            />
          </div>

          {/* Positioning Paragraph */}
          <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Fullstack software engineer crafting web applications, mobile platforms, data/ML
            systems, and connected IoT prototypes. From operational dashboards to predictive
            tools, turning requirements into reliable software.
          </p>
          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnet padding={60} magnetStrength={3}>
              <Link
                href="/contact"
                className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-signal px-6 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-signal-bright hover:text-ink"
              >
                Start an inquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnet>

            <Link
              href="/projects"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/80 px-5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:border-signal hover:text-signal"
            >
              View case studies
            </Link>

            <a
              href="/cv.pdf"
              download
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              aria-label="Download CV"
            >
              <Download className="h-4 w-4" />
              CV
            </a>
          </div>

          {/* Credibility links */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-4">
            <a
              href="https://github.com/Rappykyun"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 transition-colors hover:text-signal"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ralph-vincent-rodriguez-205a6b241/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 transition-colors hover:text-signal"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:ralphvincentrodriguez@sksu.edu.ph"
              className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-zinc-300 transition-colors hover:text-signal"
            >
              <Mail className="h-4 w-4" />
              <span>ralphvincentrodriguez@sksu.edu.ph</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
