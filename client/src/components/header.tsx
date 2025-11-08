import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/contexts/audio-context";
import nsmLogoWhite from "@assets/NSM White_1762526198507.png";
import { Church, Gift, Baby, Mountain, Star, Crown, Snowflake, Flame, TreePine, Sparkles, Play, Pause } from "lucide-react";

const trackIcons = [
  Church,     // 1. Jesu Joy of Man's Desiring - Religious hymn
  Gift,       // 2. Joy to the World - Gift of joy
  Baby,       // 3. Away in a Manger - Baby Jesus
  Mountain,   // 4. Go Tell it on the Mountain - Mountain
  Star,       // 5. O Come, O Come Emmanuel - Star of Bethlehem
  Crown,      // 6. We Three Kings - Kings' crowns
  Snowflake,  // 7. The First Nowell - Winter/Christmas
  Flame,      // 8. Silent Night - Candlelight service
  TreePine,   // 9. O Come All Ye Faithful - Christmas tree
  Sparkles    // 10. Gloria - Glory/shine
];

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTrack, selectTrack, trackNames, isPlaying, toggleAudio, audioRef } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef?.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    audio.currentTime = newTime;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-3">
          <a
            href="https://www.nathanielschool.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-all duration-1000 hover:scale-110 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            data-testid="link-school-logo"
          >
            <div className="bg-foreground/90 dark:bg-transparent rounded-full p-2 sm:p-3 transition-colors">
              <img 
                src={nsmLogoWhite} 
                alt="NSM Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleAudio}
              className="relative w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
              data-testid="button-audio-toggle-header"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-red-600 to-primary shadow-lg">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                  )}
                </div>
              </div>
            </button>

            <div className="flex-1 max-w-2xl space-y-1">
              <div 
                ref={progressBarRef}
                className="relative h-2 bg-card/50 backdrop-blur-sm rounded-full border border-border overflow-hidden cursor-pointer group"
                data-testid="progress-bar-header"
                onClick={handleProgressClick}
                title="Click to seek"
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-1 hidden sm:flex">
                <span>{formatTime(currentTime)}</span>
                <span className="text-center flex-1 truncate px-2 font-medium text-foreground">{trackNames[currentTrack]}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-3 px-3">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max pb-1">
            {[...Array(10)].map((_, i) => {
              const Icon = trackIcons[i];
              return (
                <Button
                  key={i}
                  onClick={() => selectTrack(i)}
                  variant={currentTrack === i ? "default" : "outline"}
                  className={`
                    flex items-center gap-1.5 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm
                    transition-all duration-200 whitespace-nowrap
                    ${currentTrack === i 
                      ? 'shadow-lg shadow-primary/50 ring-2 ring-primary/30' 
                      : 'hover:border-primary/50'
                    }
                  `}
                  data-testid={`button-header-track-${i + 1}`}
                  aria-label={trackNames[i]}
                  title={trackNames[i]}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden lg:inline">{trackNames[i]}</span>
                  <span className="lg:hidden font-bold">{i + 1}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
