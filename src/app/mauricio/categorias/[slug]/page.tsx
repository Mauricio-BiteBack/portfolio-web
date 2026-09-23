import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { PillarSection } from "../../components/PillarSection";
import { pillars, getProjectsByPillar } from "../../data";

export function generateStaticParams() {
  return pillars.map((p) => ({ slug: p.key }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pillar = pillars.find((p) => p.key === params.slug);
  if (!pillar) return {};
  return {
    title: `${pillar.title} | Mauricio Jaramillo`,
    description: pillar.intro,
  };
}

export default function CategoriaPage({ params }: { params: { slug: string } }) {
  const pillar = pillars.find((p) => p.key === params.slug);
  if (!pillar) notFound();

  const projects = getProjectsByPillar(pillar.key);

  return (
    <>
      <Nav />
      <div className="pt-16">
        <PillarSection pillar={pillar} projects={projects} />
      </div>
      <Footer />
    </>
  );
}
