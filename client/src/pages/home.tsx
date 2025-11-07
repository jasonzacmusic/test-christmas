import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WorkshopsSection } from "@/components/workshops-section";
import { YouTubeVideosSection } from "@/components/youtube-videos-section";
import { PatreonCollectionSection } from "@/components/patreon-collection-section";
import { ProfileSection } from "@/components/profile-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WorkshopsSection />
        <YouTubeVideosSection />
        <PatreonCollectionSection />
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
