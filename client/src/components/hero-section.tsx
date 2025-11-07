import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Snowflake, Star, Sparkles, Gift } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";
import { useState, useEffect, useRef } from "react";

export function HeroSection() {
  const { isPlaying, currentTrack, toggleAudio, trackNames, audioRef } = useAudio();
  const [isOpening, setIsOpening] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(Array(50).fill(0.3));
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpening(true);
    const timer = setTimeout(() => setIsOpening(false), 800);
    return () => clearTimeout(timer);
  }, [currentTrack]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setWaveformData(prev => 
          prev.map(() => 0.2 + Math.random() * 0.8)
        );
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 drop-shadow-2xl animate-gentle-scale" style={{
            textShadow: '0 0 40px rgba(220, 38, 38, 0.5), 0 0 80px rgba(220, 38, 38, 0.3)',
            fontFamily: 'var(--font-christmas)',
          }}>
            Christmas Music Workshops
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-foreground max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
            Master the magic of the season with our comprehensive Christmas music program
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            8 immersive workshops covering carols, theory, ear training, and creative arrangements with Jason Zac
          </p>

          <div className="flex flex-col items-center gap-8 mt-12">
            <button
              onClick={toggleAudio}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50 rounded-lg"
              data-testid="button-audio-toggle-hero"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-primary via-red-600 to-primary rounded-lg shadow-2xl transition-all duration-500 ${isOpening ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}
                style={{
                  boxShadow: '0 0 40px rgba(220, 38, 38, 0.6), 0 0 80px rgba(220, 38, 38, 0.4)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-lg" />
                
                <div className="absolute top-1/2 left-0 right-0 h-4 sm:h-6 bg-accent transform -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-4 sm:w-6 bg-accent transform -translate-x-1/2" />
                
                <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isOpening ? 'scale-150 -translate-y-8' : 'scale-100'}`}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-8 h-2 sm:w-12 sm:h-3 bg-accent-foreground rounded-full" />
                    <div className="absolute w-2 h-8 sm:w-3 sm:h-12 bg-accent-foreground rounded-full" />
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Gift className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-75" />
                    <div className="absolute inset-0 border-4 border-white rounded-full" />
                  </div>
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

            <div className="w-full max-w-4xl mt-8 space-y-4">
              <div 
                ref={waveformRef}
                onClick={handleWaveformClick}
                className="relative h-24 sm:h-32 bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden cursor-pointer hover-elevate transition-all"
                data-testid="waveform-container"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-1 px-2">
                  {waveformData.map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-100 ${isPlaying ? 'bg-primary' : 'bg-muted'}`}
                      style={{
                        height: `${height * 100}%`,
                        opacity: isPlaying ? 0.6 + height * 0.4 : 0.3,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
                    Click to seek
                  </p>
                </div>
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
