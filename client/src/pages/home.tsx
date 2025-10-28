import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PatreonSection } from "@/components/patreon-section";
import { YouTubeSection } from "@/components/youtube-section";
import { PlaylistSection } from "@/components/playlist-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PatreonSection />
        <YouTubeSection />
        <PlaylistSection />
      </main>
      <Footer />
    </div>
  );
}
