import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/contexts/audio-context";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTrack, selectTrack } = useAudio();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <a
            href="https://www.nathanielschool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity duration-1000 hover-elevate ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            data-testid="link-school-logo"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
              Nathaniel School of Music
            </h1>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {[...Array(10)].map((_, i) => (
              <Button
                key={i}
                onClick={() => selectTrack(i)}
                variant={currentTrack === i ? "default" : "ghost"}
                size="sm"
                className={`
                  w-8 h-8 p-0 text-sm font-bold
                  transition-all duration-200
                  ${currentTrack === i ? 'scale-110' : 'hover:scale-105'}
                `}
                data-testid={`button-header-track-${i + 1}`}
                aria-label={`Select track ${i + 1}`}
              >
                {i === 9 ? '10' : i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
