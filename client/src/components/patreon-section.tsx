import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import patreon1 from "@assets/Patreon 1_1761656377221.png";
import patreon2 from "@assets/Patreon 2_1761656377221.png";
import patreon3 from "@assets/ Patreon 3 _1761656377221.png";
import patreon4 from "@assets/Patreon 4_1761656377221.png";
import patreon5 from "@assets/Patreon 5_1761656377221.png";

export function PatreonSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [patreon1, patreon2, patreon3, patreon4, patreon5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-gothic text-center text-primary mb-4">
          Patreon Halloween Collection
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Exclusive access to premium Halloween music content
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden border border-card-border shadow-2xl">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={img}
                  alt={`Patreon Collection ${index + 1}`}
                  className="w-full h-full object-cover"
                  data-testid={`img-patreon-${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-foreground mb-8 leading-relaxed max-w-3xl mx-auto" data-testid="text-patreon-description">
              Get access to notations, MIDI files, and handwritten notes for Halloween classics — including the Wednesday Theme, Addams Family Theme, and creative tips for spooky chord progressions.
            </p>

            <Button
              asChild
              size="lg"
              className="text-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              data-testid="button-patreon-cta"
            >
              <a
                href="https://www.patreon.com/collection/1805426"
                target="_blank"
                rel="noopener noreferrer"
              >
                Access on Patreon
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
