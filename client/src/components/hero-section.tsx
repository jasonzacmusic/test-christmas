import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import { Snowflake, Volume2, VolumeX, Star, Sparkles } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";

export function HeroSection() {
  const { isPlaying, currentTrack, toggleAudio, selectTrack, trackNames } = useAudio();

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
            <Button
              onClick={toggleAudio}
              size="lg"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-110 transition-all duration-300 animate-gentle-scale hover:animate-none"
              style={{
                boxShadow: '0 0 40px rgba(220, 38, 38, 0.6), 0 0 80px rgba(220, 38, 38, 0.4)',
              }}
              data-testid="button-audio-toggle-hero"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Volume2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
              ) : (
                <VolumeX className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
              )}
            </Button>

            {isPlaying && (
              <div className="text-center space-y-2 animate-in fade-in duration-500">
                <p className="text-sm sm:text-base text-accent font-semibold animate-pulse">
                  Now playing: {trackNames[currentTrack]}
                </p>
                <p className="text-xs text-muted-foreground">
                  Track {currentTrack + 1} of 10
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {[...Array(10)].map((_, i) => (
                <Button
                  key={i}
                  onClick={() => selectTrack(i)}
                  variant={currentTrack === i ? "default" : "outline"}
                  size="lg"
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-lg font-bold text-lg
                    transition-all duration-300
                    ${currentTrack === i 
                      ? 'scale-110 shadow-lg shadow-primary/50' 
                      : 'hover:scale-105'
                    }
                  `}
                  data-testid={`button-track-${i + 1}`}
                  aria-label={`Play track ${i + 1}: ${trackNames[i]}`}
                  style={currentTrack === i ? {
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
                  } : {}}
                >
                  {i === 9 ? '10' : i + 1}
                </Button>
              ))}
            </div>

            <Badge variant="outline" className="text-sm px-4 py-2 bg-card/50 backdrop-blur-sm">
              Press 1-10 on keyboard for quick track selection
            </Badge>
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
