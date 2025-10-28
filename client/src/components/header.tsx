import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import nsmWhiteLogo from "@assets/NSM White_1761660070091.png";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const savedPreference = localStorage.getItem('halloweenAudioEnabled');
    if (savedPreference === 'true') {
      setIsAudioPlaying(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('halloweenAudioEnabled', isAudioPlaying.toString());
    
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleAudio}
          className="text-primary"
          data-testid="button-audio-toggle"
          aria-label={isAudioPlaying ? "Mute ambient sound" : "Play ambient sound"}
        >
          {isAudioPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
        
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
            className="h-12 animate-pulse hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>
      
      <audio
        ref={audioRef}
        loop
        preload="auto"
        data-testid="audio-ambient"
        src="https://assets.mixkit.co/active_storage/sfx/2466/2466-preview.mp3"
      />
    </header>
  );
}
