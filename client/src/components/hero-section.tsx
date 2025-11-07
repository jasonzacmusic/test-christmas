import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Snowflake, Star, Sparkles, Play, Pause, Globe, MapPin } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: string;
}

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function HeroSection() {
  const { isPlaying, currentTrack, toggleAudio, trackNames, audioRef, selectTrack } = useAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { data: videos = [] } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const performances = videos.filter(v => v.type === 'performance');
  const fairytaleVideo = performances.find(v => v.title.toLowerCase().includes('fairytale'));
  const linusVideo = performances.find(v => v.title.toLowerCase().includes('linus'));

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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {linusVideo && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block w-64 lg:w-72" data-testid="video-hero-linus">
          <div className="bg-card/70 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300">
            <div className="relative aspect-video bg-muted">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${linusVideo.id}`}
                title={linusVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold text-card-foreground line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                {linusVideo.title}
              </h4>
            </div>
          </div>
        </div>
      )}

      {fairytaleVideo && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block w-64 lg:w-72" data-testid="video-hero-fairytale">
          <div className="bg-card/70 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300">
            <div className="relative aspect-video bg-muted">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${fairytaleVideo.id}`}
                title={fairytaleVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-semibold text-card-foreground line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                {fairytaleVideo.title}
              </h4>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-slate-900 to-emerald-950" />
      
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
            className="absolute text-accent/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
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
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
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

          <div className="flex flex-col items-center gap-6 mt-12">
            <div className="text-center space-y-2">
              <p className="text-sm sm:text-base text-accent font-semibold">
                {trackNames[currentTrack]}
              </p>
              <p className="text-xs text-muted-foreground">
                Track {currentTrack + 1} of 10
              </p>
            </div>

            <div className="w-full max-w-4xl space-y-2">
              <div 
                ref={progressBarRef}
                className="relative h-3 bg-card/50 backdrop-blur-sm rounded-full border border-border overflow-hidden cursor-pointer group"
                data-testid="progress-bar"
                onClick={handleProgressClick}
                title="Click to seek"
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button
              onClick={toggleAudio}
              className="relative w-20 h-20 sm:w-24 sm:h-24 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
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
                      <Pause className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
                    ) : (
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
                    )}
                  </div>
                  
                  <div className="absolute inset-2 rounded-full border-4 border-white/30" />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center space-y-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6" style={{ fontFamily: 'var(--font-christmas)' }}>
              Choose Your Payment Method
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-card-border space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold text-foreground">Indian Residents</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Pay with UPI, Account Transfer, or Credit Card
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full text-lg px-6 py-6 shadow-xl hover:scale-105 transition-all duration-300"
                  data-testid="button-register-indian"
                >
                  <a
                    href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7010"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', 'hero_register_indian')}
                  >
                    Register Now (Indian)
                  </a>
                </Button>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-card-border space-y-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-6 h-6 text-accent" />
                  <h4 className="text-xl font-bold text-foreground">International</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Secure payment via PayPal
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full text-lg px-6 py-6 shadow-xl hover:scale-105 transition-all duration-300"
                  data-testid="button-paypal-international"
                >
                  <a
                    href="https://www.paypal.com/ncp/payment/LU7B8SNQ85WN6"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', 'hero_paypal_international')}
                  >
                    Pay with PayPal
                  </a>
                </Button>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mt-6" data-testid="text-cta-details">
              Includes Live Lectures, Notation, Assignments & HD Recordings
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
