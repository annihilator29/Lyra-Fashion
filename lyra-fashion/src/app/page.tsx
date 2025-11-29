import HeroSection from '@/components/home/hero-section';
import ValueProps from '@/components/home/value-props';
import StoryTeaser from '@/components/home/story-teaser';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <HeroSection />
      <ValueProps />
      <StoryTeaser />
    </div>
  );
}
