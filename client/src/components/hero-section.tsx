import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Music2, Piano, Volume2, VolumeX } from "lucide-react";
import jason1 from "@assets/Jason 1_1761656394481.jpg";
import jason2 from "@assets/Jason 2_1761656394482.jpg";
import { trackEvent } from "@/lib/analytics";
import { useAudio } from "@/contexts/audio-context";

const sessions = [
  {
    id: "1",
    date: "Saturday, 1st November",
    time: "6:30 AM – 7:30 AM",
    className: "Scary Chord Progressions",
    duration: "60 min",
    description: "Learn to create dark, cinematic harmonies using tritones, minor seconds, and diminished voicings.",
    icon: Flame
  },
  {
    id: "2",
    date: "Sunday, 2nd November",
    time: "6:45 AM – 8:15 AM",
    className: "Music Factory – Halloween Themes & Songs",
    duration: "90 min",
    description: "Work through iconic Halloween themes from movies & TV. Transcribe by ear and study melodic ideas.",
    icon: Music2
  },
  {
    id: "3",
    date: "Sunday, 2nd November",
    time: "8:45 AM – 9:45 AM",
    className: "The Wednesday Theme – Solo Piano Arrangement",
    duration: "60 min",
    description: "Learn Danny Elfman's haunting Wednesday theme phrase by phrase.",
    icon: Piano
  }
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [jason1, jason2];
  const { isPlaying, currentTrack, toggleAudio } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background animate-gradient" />
        
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-drift"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 100%)',
          }}
        />
        <div 
          className="absolute inset-0 pointer-events-none animate-fog-drift-2"
          style={{
            background: 'radial-gradient(ellipse 70% 40% at 30% 70%, rgba(251, 146, 60, 0.12) 0%, transparent 100%)',
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none animate-candlelight">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary rounded-full blur-xl opacity-60" />
          <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-primary rounded-full blur-xl opacity-50" />
          <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-primary rounded-full blur-xl opacity-70" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-gothic text-primary mb-6 drop-shadow-2xl animate-pulse">
            Halloween Live Sessions
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
            Join our exclusive Halloween music workshops and master spooky piano techniques
          </p>
          
          <div className="flex justify-center mb-12">
            <Button
              onClick={toggleAudio}
              size="lg"
              className="w-32 h-32 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/50 hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
              data-testid="button-audio-toggle-hero"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Volume2 className="w-16 h-16" />
              ) : (
                <VolumeX className="w-16 h-16" />
              )}
            </Button>
          </div>

          {isPlaying && (
            <p className="text-sm text-muted-foreground mb-8 animate-pulse">
              Now playing: Track {currentTrack + 1}
            </p>
          )}
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {sessions.map((session) => {
              const IconComponent = session.icon;
              return (
                <Card key={session.id} className="bg-card/70 backdrop-blur-md border-card-border hover-elevate transition-all duration-300" data-testid={`card-session-${session.id}`}>
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <IconComponent className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground text-center">
                      {session.className}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center">
                      {session.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Badge variant="secondary" data-testid={`badge-time-${session.id}`}>
                        {session.time}
                      </Badge>
                    </div>
                    <div className="flex justify-center">
                      <Badge variant="outline" data-testid={`badge-duration-${session.id}`}>
                        Duration: {session.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-description-${session.id}`}>
                      {session.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="text-lg bg-primary text-primary-foreground shadow-2xl shadow-primary/50 animate-pulse hover:animate-none hover:scale-110 transition-all duration-300"
            data-testid="button-hero-cta"
          >
            <a
              href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7749"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', 'hero_book_halloween_pass')}
            >
              Book Your Halloween Pass
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
