import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Snowflake, Star, Sparkles, Play, Pause } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";
import { useState, useEffect, useRef } from "react";

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function HeroSection() {
  const { isPlaying, currentTrack, toggleAudio, trackNames, audioRef, analyzerNode } = useAudio();
  const [waveformData, setWaveformData] = useState<number[]>(Array(64).fill(0));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const waveformRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

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

  useEffect(() => {
    const analyzer = analyzerNode?.current;
    if (!analyzer || !isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setWaveformData(Array(64).fill(0));
      return;
    }

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateWaveform = () => {
      analyzer.getByteFrequencyData(dataArray);
      const normalized = Array.from(dataArray).map(val => val / 255);
      setWaveformData(normalized);
      animationFrameRef.current = requestAnimationFrame(updateWaveform);
    };

    updateWaveform();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, analyzerNode]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current || !audioRef?.current) return;
    
    const audio = audioRef.current;
    if (audio.readyState < HTMLMediaElement.HAVE_METADATA || !isFinite(audio.duration)) {
      return;
    }
    
    const rect = waveformRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = audio.duration * percentage;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-red-950 to-green-900" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute text-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 7}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <Snowflake className="w-3 h-3 sm:w-5 sm:h-5" />
          </div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-accent/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" />
          </div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse-glow ${1.5 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          animation: 'gentle-pulse 8s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-primary mb-6 drop-shadow-2xl animate-gentle-scale" style={{
            textShadow: '0 0 50px rgba(220, 38, 38, 0.6), 0 0 100px rgba(220, 38, 38, 0.4), 0 4px 20px rgba(0, 0, 0, 0.5)',
            fontFamily: 'var(--font-christmas)',
            letterSpacing: '0.05em',
          }}>
            Christmas Music Workshops
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-accent max-w-4xl mx-auto leading-relaxed font-bold" style={{ 
            fontFamily: 'var(--font-elegant)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            Master the magic of the season with our comprehensive Christmas music program
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            8 immersive workshops covering carols, theory, ear training, and creative arrangements with Jason Zac
          </p>

          <div className="flex flex-col items-center gap-8 mt-12">
            <button
              onClick={toggleAudio}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
              data-testid="button-audio-toggle-hero"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-red-600 to-primary shadow-2xl"
                  style={{
                    boxShadow: '0 0 60px rgba(220, 38, 38, 0.7), 0 0 120px rgba(220, 38, 38, 0.5)',
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
                  
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-6 h-8 sm:w-8 sm:h-10 bg-accent rounded-t-lg" />
                    <div className="w-8 h-2 sm:w-10 sm:h-3 bg-accent rounded-full transform -translate-x-1 -translate-y-1" />
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isPlaying ? (
                      <Pause className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white fill-white" />
                    ) : (
                      <Play className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white fill-white ml-2" />
                    )}
                  </div>
                  
                  <div className={`absolute inset-2 rounded-full border-4 border-white/30 transition-all duration-300 ${isPlaying ? 'animate-ping' : ''}`} />
                </div>
              </div>
            </button>

            <div className="text-center space-y-2 mt-4">
              <p className="text-sm sm:text-base text-accent font-semibold">
                {trackNames[currentTrack]}
              </p>
              <p className="text-xs text-muted-foreground">
                Track {currentTrack + 1} of 10
              </p>
            </div>

            <div className="w-full max-w-4xl mt-8 space-y-2">
              <div 
                ref={waveformRef}
                onClick={handleWaveformClick}
                className="relative h-24 sm:h-32 bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden cursor-pointer group transition-all hover:border-primary/50"
                data-testid="waveform-container"
                title="Click anywhere to seek"
              >
                <div className="absolute inset-0 flex items-end justify-center gap-1 px-2 pb-2">
                  {waveformData.map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-full transition-all duration-75 ${isPlaying ? 'bg-primary' : 'bg-muted'}`}
                      style={{
                        height: `${Math.max(height * 90, 5)}%`,
                        opacity: isPlaying ? 0.7 + height * 0.3 : 0.4,
                      }}
                    />
                  ))}
                </div>
                
                <div 
                  className="absolute top-0 left-0 bottom-0 bg-primary/20 pointer-events-none transition-all"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
                
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-accent shadow-lg shadow-accent/50 pointer-events-none transition-all"
                  style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 mt-16">
          <Button
            asChild
            size="lg"
            className="text-xl sm:text-2xl px-8 py-6 sm:px-12 sm:py-8 shadow-2xl hover:scale-105 transition-all duration-300 animate-gentle-scale hover:animate-none"
            style={{
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.3)',
            }}
            data-testid="button-hero-cta"
          >
            <a
              href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', 'hero_book_christmas_workshop')}
            >
              Join the Christmas Workshops
            </a>
          </Button>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto" data-testid="text-cta-details">
            Includes Live Lectures, Notation, Assignments & HD Recordings
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
