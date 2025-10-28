import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import nsmWhiteLogo from "@assets/NSM White_1761660070091.png";

// Import all 10 MP3 files
import track01 from "@assets/01_1761662458015.mp3";
import track02 from "@assets/02_1761662458016.mp3";
import track03 from "@assets/03_1761662458016.mp3";
import track04 from "@assets/04_1761662458016.mp3";
import track05 from "@assets/05_1761662458016.mp3";
import track06 from "@assets/06_1761662458016.mp3";
import track07 from "@assets/07_1761662458016.mp3";
import track08 from "@assets/08_1761662458016.mp3";
import track09 from "@assets/09_1761662458016.mp3";
import track10 from "@assets/10_1761662458016.mp3";

const AUDIO_TRACKS = [
  track01, track02, track03, track04, track05,
  track06, track07, track08, track09, track10
];

const START_TIME = 30; // 0:30
const END_TIME = 90; // 1:30

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const savedPreference = localStorage.getItem('halloweenAudioEnabled');
    if (savedPreference === 'true') {
      setIsAudioPlaying(true);
    }
  }, []);

  // Handle keyboard shortcuts 1-10
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '9') {
        const trackIndex = parseInt(key) - 1;
        setCurrentTrack(trackIndex);
      } else if (key === '0') {
        setCurrentTrack(9); // Track 10
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle audio playback and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      audio.currentTime = START_TIME;
      if (isAudioPlaying) {
        audio.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
      }
    };

    const handleTimeUpdate = () => {
      if (audio.currentTime >= END_TIME) {
        // Auto-cycle to next track
        setCurrentTrack((prev) => (prev + 1) % AUDIO_TRACKS.length);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack, isAudioPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    localStorage.setItem('halloweenAudioEnabled', isAudioPlaying.toString());
    
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.currentTime = START_TIME;
        audioRef.current.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
      } else {
        audioRef.current.pause();
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
        preload="auto"
        data-testid="audio-ambient"
        src={AUDIO_TRACKS[currentTrack]}
      />
    </header>
  );
}
