import { Hero } from "./_components/Hero";
import { Services } from "./_components/Services";
import { FeaturedProjects } from "./_components/FeaturedProjects";
import { Process } from "./_components/Process";
import { Experiences } from "./_components/Experiences";
import { Certificates } from "./_components/Certificates";
import { TechStack } from "./_components/TechStack";
import { InquiryBanner } from "./_components/InquiryBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedProjects />
      <Process />
      <Experiences />
      <Certificates />
      <TechStack />
      <InquiryBanner />
    </main>
  );
}
