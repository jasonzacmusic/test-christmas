import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Snowflake } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-green-50 to-white dark:from-red-950/20 dark:via-green-950/20 dark:to-background" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Snowflake className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 drop-shadow-lg">
            Christmas Music Workshops
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground max-w-4xl mx-auto leading-relaxed">
            Master the magic of the season with our comprehensive Christmas music program
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            8 immersive workshops covering carols, theory, ear training, and creative arrangements with Jason Zac
          </p>
        </div>

        <div className="text-center space-y-4">
          <Button
            asChild
            size="lg"
            className="text-xl sm:text-2xl px-8 py-6 sm:px-12 sm:py-8 shadow-xl hover:scale-105 transition-all duration-300"
            data-testid="button-hero-cta"
          >
            <a
              href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', 'hero_book_christmas_workshop')}
            >
              Join the Christmas Workshops
            </a>
          </Button>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto" data-testid="text-cta-details">
            Includes Live Lectures, Notation, Assignments & HD Recordings
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
