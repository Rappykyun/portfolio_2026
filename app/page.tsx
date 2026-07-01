import { Hero } from "./_components/Hero";
import TechStack from "./_components/TechStack";
import { Experiences } from "./_components/Experiences";
import { Certificates } from "./_components/Certificates";

const sectionClass =
  "rounded-2xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-7 dark:border-zinc-800/80 dark:bg-zinc-900/40";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto md:px-12 px-5 lg:mt-12 mt-8">
      <div className="flex flex-col gap-5 sm:gap-6">
        <Hero />
        <section className={sectionClass}>
          <TechStack compact />
        </section>
        <section className={sectionClass}>
          <Experiences compact />
        </section>
        <section className={sectionClass}>
          <Certificates compact />
        </section>
      </div>
    </main>
  );
}
