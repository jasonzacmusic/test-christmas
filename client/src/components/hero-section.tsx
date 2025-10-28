import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import jason1 from "@assets/Jason 1_1761656394481.jpg";
import jason2 from "@assets/Jason 2_1761656394482.jpg";

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [jason1, jason2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background animate-gradient" />
        
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-drift"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 100%)',
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-drift-2"
          style={{
            background: 'radial-gradient(ellipse 70% 40% at 30% 70%, rgba(251, 146, 60, 0.12) 0%, transparent 100%)',
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none animate-candlelight">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary rounded-full blur-xl opacity-60" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-primary rounded-full blur-xl opacity-50" />
          <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-primary rounded-full blur-xl opacity-70" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-gothic text-primary mb-6 drop-shadow-2xl animate-pulse">
          Halloween Music Specials
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto">
          Learn haunting piano chords and Halloween themes.
        </p>
        <Button
          asChild
          size="lg"
          className="text-lg bg-primary text-primary-foreground shadow-2xl shadow-primary/50"
          data-testid="button-hero-cta"
        >
          <a
            href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7749"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Halloween Pass
          </a>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
