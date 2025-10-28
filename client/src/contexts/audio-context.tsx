import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

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

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: number;
  toggleAudio: () => void;
  selectTrack: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedPreference = localStorage.getItem('halloweenAudioEnabled');
    if (savedPreference === 'true') {
      setIsPlaying(true);
    }
  }, []);

  // Handle keyboard shortcuts 1-10
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '9') {
        const trackIndex = parseInt(key) - 1;
        setCurrentTrack(trackIndex);
        if (!isPlaying) setIsPlaying(true);
      } else if (key === '0') {
        setCurrentTrack(9); // Track 10
        if (!isPlaying) setIsPlaying(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  // Handle audio playback and track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      audio.currentTime = START_TIME;
      if (isPlaying) {
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
  }, [currentTrack, isPlaying]);

  // Handle play/pause state changes
  useEffect(() => {
    localStorage.setItem('halloweenAudioEnabled', isPlaying.toString());
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.currentTime = START_TIME;
        audioRef.current.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, currentTrack, toggleAudio, selectTrack }}>
      {children}
      <audio
        ref={audioRef}
        preload="auto"
        data-testid="audio-ambient"
        src={AUDIO_TRACKS[currentTrack]}
      />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
