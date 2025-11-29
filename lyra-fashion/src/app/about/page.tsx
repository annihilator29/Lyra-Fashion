import { Metadata } from 'next';
import { FactoryHero } from '@/components/about/FactoryHero';
import { TimelineSection } from '@/components/about/TimelineSection';
import { TeamGrid } from '@/components/about/TeamGrid';

export const metadata: Metadata = {
  title: 'About Our Factory | Lyra Fashion',
  description: 'Learn about our ethical manufacturing process and meet the artisans behind our products',
};

export default function AboutPage() {
  return (
    <main>
      <FactoryHero />
      <TimelineSection />
      <TeamGrid />
    </main>
  );
}