import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import nsmWhiteLogo from "@assets/NSM White_1761660070091.png";
import { useAudio } from "@/contexts/audio-context";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTrack, selectTrack } = useAudio();

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <div className="flex-shrink-0">
          <a
            href="https://www.nathanielschool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-opacity duration-1000 hover-elevate ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            data-testid="link-school-logo"
          >
            <img 
              src={nsmWhiteLogo} 
              alt="Nathaniel School of Music" 
              className="h-12 animate-gentle-scale hover:scale-110 transition-transform duration-300"
            />
          </a>
        </div>
        
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <Button
              key={num}
              onClick={() => selectTrack(num - 1)}
              variant={currentTrack === num - 1 ? "default" : "outline"}
              size="icon"
              className={`
                w-10 h-10 font-bold text-base transition-all duration-300
                ${currentTrack === num - 1 ? 'scale-110 shadow-lg shadow-primary/50' : ''}
              `}
              data-testid={`button-track-${num}`}
              aria-label={`Play track ${num}`}
            >
              {num === 10 ? '0' : num}
            </Button>
          ))}
        </div>

        <div className="flex-shrink-0 w-12" />
      </div>
    </header>
  );
}
