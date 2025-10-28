import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Music2, Piano, Volume2, VolumeX } from "lucide-react";
import jason1 from "@assets/Jason 1_1761656394481.jpg";
import jason2 from "@assets/Jason 2_1761656394482.jpg";
import { trackEvent } from "@/lib/analytics";
import { useAudio } from "@/contexts/audio-context";

// Session data with timezone-aware dates
// Base times are in IST (Indian Standard Time - Asia/Kolkata)
const sessionsData = [
  {
    id: "1",
    startTime: new Date('2025-11-01T06:30:00+05:30'), // 6:30 AM IST
    endTime: new Date('2025-11-01T07:30:00+05:30'),   // 7:30 AM IST
    className: "Scary Chord Progressions",
    duration: "60 min",
    description: "Learn to create dark, cinematic harmonies using tritones, minor seconds, and diminished voicings. Explore modal shifts and rhythmic tension for composers and pianists.",
    icon: Flame
  },
  {
    id: "2",
    startTime: new Date('2025-11-02T06:45:00+05:30'), // 6:45 AM IST
    endTime: new Date('2025-11-02T08:15:00+05:30'),   // 8:15 AM IST
    className: "Music Factory – Halloween Themes & Songs",
    duration: "90 min",
    description: "Work through iconic Halloween themes from movies & TV. Transcribe by ear, study melodic ideas, and analyze suspense techniques.",
    icon: Music2
  },
  {
    id: "3",
    startTime: new Date('2025-11-02T08:45:00+05:30'), // 8:45 AM IST
    endTime: new Date('2025-11-02T09:45:00+05:30'),   // 9:45 AM IST
    className: "The Wednesday Theme – Solo Piano Arrangement",
    duration: "60 min",
    description: "Learn Danny Elfman's haunting Wednesday theme phrase by phrase. Study harmony, bass motion, and orchestral adaptation for solo piano.",
    icon: Piano
  }
];

// Map timezone to country flag emoji
const getCountryFlag = (timezone: string): string => {
  // Common timezone to country mappings
  const timezoneToCountry: Record<string, string> = {
    // India
    'Asia/Kolkata': '🇮🇳',
    'Asia/Calcutta': '🇮🇳',
    // USA
    'America/New_York': '🇺🇸',
    'America/Chicago': '🇺🇸',
    'America/Denver': '🇺🇸',
    'America/Los_Angeles': '🇺🇸',
    'America/Phoenix': '🇺🇸',
    'America/Anchorage': '🇺🇸',
    'Pacific/Honolulu': '🇺🇸',
    // UK
    'Europe/London': '🇬🇧',
    // Australia
    'Australia/Sydney': '🇦🇺',
    'Australia/Melbourne': '🇦🇺',
    'Australia/Brisbane': '🇦🇺',
    'Australia/Perth': '🇦🇺',
    'Australia/Adelaide': '🇦🇺',
    // UAE
    'Asia/Dubai': '🇦🇪',
    // Singapore
    'Asia/Singapore': '🇸🇬',
    // Japan
    'Asia/Tokyo': '🇯🇵',
    // China
    'Asia/Shanghai': '🇨🇳',
    'Asia/Hong_Kong': '🇭🇰',
    // Canada
    'America/Toronto': '🇨🇦',
    'America/Vancouver': '🇨🇦',
    'America/Montreal': '🇨🇦',
    // Brazil
    'America/Sao_Paulo': '🇧🇷',
    // Germany
    'Europe/Berlin': '🇩🇪',
    // France
    'Europe/Paris': '🇫🇷',
    // Spain
    'Europe/Madrid': '🇪🇸',
    // Italy
    'Europe/Rome': '🇮🇹',
    // South Africa
    'Africa/Johannesburg': '🇿🇦',
    // New Zealand
    'Pacific/Auckland': '🇳🇿',
    // Mexico
    'America/Mexico_City': '🇲🇽',
  };
  
  return timezoneToCountry[timezone] || '🌍'; // Default globe emoji
};

// Format session date in IST
const formatSessionDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(date);
};

const formatSessionTime = (startDate: Date, endDate: Date) => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  
  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isIndia = userTimezone === 'Asia/Kolkata' || userTimezone === 'Asia/Calcutta';
  
  // Format in IST (Indian Standard Time)
  const istStart = new Intl.DateTimeFormat('en-US', {
    ...timeFormat,
    timeZone: 'Asia/Kolkata',
  }).format(startDate);
  const istEnd = new Intl.DateTimeFormat('en-US', {
    ...timeFormat,
    timeZone: 'Asia/Kolkata',
  }).format(endDate);
  
  // Format in user's local timezone
  const localStart = new Intl.DateTimeFormat('en-US', timeFormat).format(startDate);
  const localEnd = new Intl.DateTimeFormat('en-US', timeFormat).format(endDate);
  
  // Get flags
  const indiaFlag = '🇮🇳';
  const userFlag = getCountryFlag(userTimezone);
  
  return {
    isIndia,
    istTime: `${istStart} – ${istEnd}`,
    localTime: `${localStart} – ${localEnd}`,
    indiaFlag,
    userFlag,
  };
};

export function HeroSection() {
  // Compute sessions inside component to ensure timezone info is current
  const sessions = sessionsData.map(session => {
    const timeInfo = formatSessionTime(session.startTime, session.endTime);
    return {
      ...session,
      date: formatSessionDate(session.startTime),
      isIndia: timeInfo.isIndia,
      istTime: timeInfo.istTime,
      localTime: timeInfo.localTime,
      indiaFlag: timeInfo.indiaFlag,
      userFlag: timeInfo.userFlag,
    };
  });
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [jason1, jason2];
  const { isPlaying, currentTrack, toggleAudio } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 2); // Cycle through 2 desktop images
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 md:pt-20">
      {/* Mobile Spooky Design - Optimized CSS-based Halloween background */}
      <div className="absolute inset-0 md:hidden mobile-spooky-bg">
        {/* Combined base gradient with all color layers for performance */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-orange-950" />
        
        {/* Single subtle animated accent - reduced GPU load */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '6s' }}
        />
        
        {/* Combined mist and vignette overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%), radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

      {/* Desktop Background Images (Jason) - Hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        {desktopImages.map((img, index) => (
          <div
            key={`desktop-${index}`}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80 animate-gradient" />
        
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
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-gothic text-primary mb-4 sm:mb-6 drop-shadow-2xl animate-gentle-scale">
            Halloween Live Sessions
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Join our exclusive Halloween music workshops and master spooky piano techniques
          </p>
          
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
            <Button
              onClick={toggleAudio}
              size="lg"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/50 hover:scale-110 transition-all duration-300 animate-gentle-scale hover:animate-none"
              data-testid="button-audio-toggle-hero"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? (
                <Volume2 className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
              ) : (
                <VolumeX className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
              )}
            </Button>
          </div>

          {isPlaying && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 animate-pulse">
              Now playing: Track {currentTrack + 1}
            </p>
          )}
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
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
                    <div className="space-y-2">
                      {session.isIndia ? (
                        // Show only IST time with India flag for Indian users
                        <div className="flex items-center gap-2 justify-center flex-wrap">
                          <Badge variant="secondary" className="text-base px-3 py-1" data-testid={`badge-time-ist-${session.id}`}>
                            {session.indiaFlag} {session.istTime}
                          </Badge>
                        </div>
                      ) : (
                        // Show both times with flags for non-Indian users
                        <>
                          <div className="flex items-center gap-2 justify-center flex-wrap">
                            <Badge variant="secondary" className="text-base px-3 py-1" data-testid={`badge-time-local-${session.id}`}>
                              {session.userFlag} {session.localTime}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 justify-center flex-wrap">
                            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-base px-3 py-1" data-testid={`badge-time-ist-${session.id}`}>
                              {session.indiaFlag} {session.istTime}
                            </Badge>
                          </div>
                        </>
                      )}
                      <div className="flex justify-center">
                        <Badge variant="outline" data-testid={`badge-duration-${session.id}`}>
                          {session.duration}
                        </Badge>
                      </div>
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
            className="text-2xl md:text-3xl px-12 py-8 md:px-16 md:py-10 bg-primary text-primary-foreground shadow-2xl shadow-primary/50 animate-gentle-scale hover:animate-none hover:scale-110 transition-all duration-300"
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
          <p className="text-sm sm:text-base text-muted-foreground mt-4 max-w-2xl mx-auto" data-testid="text-cta-details">
            Includes Live Lectures, Notation, Assignments & HD Recordings
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
