import { Hero } from "./_components/Hero";
import { FeaturedProjects } from "./_components/FeaturedProjects";
import { TechStack } from "./_components/TechStack";
import { Experiences } from "./_components/Experiences";
import { InquiryBanner } from "./_components/InquiryBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjects />
      <TechStack />
      <Experiences />
      <InquiryBanner />
    </main>
  );
}
