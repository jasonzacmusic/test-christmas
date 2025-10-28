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
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
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
