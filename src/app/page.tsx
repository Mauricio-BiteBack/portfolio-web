import Hero from "@/components/Hero";
import AnimationSection from "@/components/AnimationSection";
import Services from "@/components/Services";
import WebProjects from "@/components/WebProjects";
import ContentProjects from "@/components/ContentProjects";
import DesignProjects from "@/components/DesignProjects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AnimationSection />
      <Services />
      <WebProjects />
      <ContentProjects />
      <DesignProjects />
      <Footer />
    </main>
  );
}
