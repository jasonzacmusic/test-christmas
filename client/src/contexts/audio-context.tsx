import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";

// Import all 10 Christmas MP3 files
import track01 from "@assets/1.Jesu Joy of Man's Desiring_1762525313885.mp3";
import track02 from "@assets/2.Joy to the World_1762525313886.mp3";
import track03 from "@assets/3.Away in a Manger_1762525313886.mp3";
import track04 from "@assets/4.Go Tell it on the Mountain_1762525313886.mp3";
import track05 from "@assets/5.O Come, O Come Emmanuel_1762525313886.mp3";
import track06 from "@assets/6.We Three Kings_1762525313886.mp3";
import track07 from "@assets/7.The First Nowell_1762525313886.mp3";
import track08 from "@assets/8.Silent Night_1762525313886.mp3";
import track09 from "@assets/9.O Come All Ye Faithful_1762525313886.mp3";
import track10 from "@assets/10.Gloria_1762525313886.mp3";

const AUDIO_TRACKS = [
  track01, track02, track03, track04, track05,
  track06, track07, track08, track09, track10
];

const TRACK_NAMES = [
  "Jesu Joy of Man's Desiring",
  "Joy to the World",
  "Away in a Manger",
  "Go Tell it on the Mountain",
  "O Come, O Come Emmanuel",
  "We Three Kings",
  "The First Nowell",
  "Silent Night",
  "O Come All Ye Faithful",
  "Gloria"
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: number;
  toggleAudio: () => Promise<void>;
  selectTrack: (index: number) => Promise<void>;
  trackNames: string[];
  audioRef: React.RefObject<HTMLAudioElement> | null;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedPreference = localStorage.getItem('christmasAudioEnabled');
    if (savedPreference === 'true') {
      setIsPlaying(true);
    }
  }, []);

  const selectTrackRef = useRef<(index: number) => Promise<void>>();

  // Handle keyboard shortcuts 1-10
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '9') {
        const trackIndex = parseInt(key) - 1;
        selectTrackRef.current?.(trackIndex);
      } else if (key === '0') {
        selectTrackRef.current?.(9); // Track 10
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Handle track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Force audio element to reload the new track
    audio.load();
    audio.currentTime = 0;

    const handleLoadedMetadata = () => {
      if (isPlaying) {
        audio.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
      }
    };

    const handleEnded = () => {
      // Auto-cycle to next track when current track ends
      setCurrentTrack((prev) => (prev + 1) % AUDIO_TRACKS.length);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  // Handle play/pause state changes (separate from track changes)
  useEffect(() => {
    localStorage.setItem('christmasAudioEnabled', isPlaying.toString());
    
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.log('Audio playback blocked or failed:', error.message);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const toggleAudio = async () => {
    try {
      const audio = audioRef.current;
      
      if (isPlaying && audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      } else if (!isPlaying || audio?.paused) {
        if (audio) {
          await audio.play().catch((error) => {
            console.log('Audio playback blocked or failed:', error.message);
          });
        }
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback operation failed:', error);
    }
  };

  const selectTrack = async (index: number) => {
    try {
      const audio = audioRef.current;
      const isSameTrack = index === currentTrack;
      
      if (isSameTrack && audio?.paused) {
        audio.play().catch((error) => {
          console.log('Audio playback blocked or failed:', error.message);
        });
        if (!isPlaying) setIsPlaying(true);
      } else {
        setCurrentTrack(index);
        if (!isPlaying) setIsPlaying(true);
      }
    } catch (error) {
      console.log('Track selection failed:', error);
      setCurrentTrack(index);
      if (!isPlaying) setIsPlaying(true);
    }
  };

  selectTrackRef.current = selectTrack;

  return (
    <AudioContext.Provider value={{ isPlaying, currentTrack, toggleAudio, selectTrack, trackNames: TRACK_NAMES, audioRef }}>
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
