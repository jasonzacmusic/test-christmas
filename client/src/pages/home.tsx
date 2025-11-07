import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WorkshopsSection } from "@/components/workshops-section";
import { ScheduleSection } from "@/components/schedule-section";
import { ProfileSection } from "@/components/profile-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WorkshopsSection />
        <ScheduleSection />
        <ProfileSection />
      </main>
      <Footer />
    </div>
  );
}
