import { BusinessCardGenerator, ValueProp } from "@/components/features/home";
import { HeroSection } from "@/components/HeroSection";
import { heroContent } from "@/data";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <HeroSection
        title={heroContent.title}
        subtitle={heroContent.subtitle}
        artWidth={320}
        artHeight={320}
      />

      {/* Value Proposition Section */}
      <ValueProp />

      {/* Business Card Generator */}
      <BusinessCardGenerator />
    </div>
  );
}
