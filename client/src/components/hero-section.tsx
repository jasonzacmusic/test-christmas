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

const formatSessionTime = (startDate: Date, endDate: Date, userTimezone: string) => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  
  // Check if user is in India
  const isIndia = userTimezone === 'Asia/Kolkata' || userTimezone === 'Asia/Calcutta';
  
  // Debug logging
  console.log('formatSessionTime - User timezone:', userTimezone, '| Is India:', isIndia);
  
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
  const localStart = new Intl.DateTimeFormat('en-US', {
    ...timeFormat,
    timeZone: userTimezone,
  }).format(startDate);
  const localEnd = new Intl.DateTimeFormat('en-US', {
    ...timeFormat,
    timeZone: userTimezone,
  }).format(endDate);
  
  // Get flags
  const indiaFlag = '🇮🇳';
  const userFlag = getCountryFlag(userTimezone);
  
  console.log('formatSessionTime - IST:', `${istStart} – ${istEnd}`, '| Local:', `${localStart} – ${localEnd}`, '| Flags:', indiaFlag, userFlag);
  
  return {
    isIndia,
    istTime: `${istStart} – ${istEnd}`,
    localTime: `${localStart} – ${localEnd}`,
    indiaFlag,
    userFlag,
  };
};

export function HeroSection() {
  const [userTimezone, setUserTimezone] = useState<string>(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  });
  const [detectedCountry, setDetectedCountry] = useState<string>('');

  // Enhanced timezone detection with geolocation fallback
  useEffect(() => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(detectedTimezone);
    console.log('Detected timezone:', detectedTimezone);

    // Try geolocation API for better accuracy
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation detected:', position.coords);
          // Geolocation provides coords but we still use browser timezone
          // This is mainly for logging/debugging purposes
        },
        (error) => {
          console.log('Geolocation not available or denied:', error.message);
        },
        { timeout: 5000 }
      );
    }

    // Try to detect country from timezone API
    fetch(`https://worldtimeapi.org/api/timezone/${detectedTimezone}`)
      .then(res => res.json())
      .then(data => {
        if (data.abbreviation) {
          console.log('TimeAPI data:', data);
          setDetectedCountry(data.abbreviation);
        }
      })
      .catch(() => {
        console.log('TimeAPI fetch failed, using browser timezone only');
      });
  }, []);

  // Compute sessions with current user timezone
  const sessions = sessionsData.map(session => {
    const timeInfo = formatSessionTime(session.startTime, session.endTime, userTimezone);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18 sm:pt-20 md:pt-24">
      {/* Mobile Spooky Design - Halloween themed background with VISIBLE decorative elements */}
      <div className="absolute inset-0 md:hidden mobile-spooky-bg">
        {/* Dark Halloween gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-orange-950" />
        
        {/* LARGE jack-o-lantern glows - Much more visible */}
        <div className="absolute top-10 left-5 w-40 h-40 bg-orange-500/60 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-32 right-8 w-32 h-32 bg-orange-600/50 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-12 w-48 h-48 bg-orange-400/55 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-64 left-1/2 w-36 h-36 bg-orange-500/45 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }} />
        
        {/* Bright purple orbs */}
        <div className="absolute top-40 right-16 w-40 h-40 bg-purple-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-48 right-10 w-36 h-36 bg-purple-600/35 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-8 w-44 h-44 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }} />
        
        {/* CSS Pumpkin shapes (jack-o-lanterns) */}
        <div className="absolute top-20 right-12 w-24 h-24 animate-pulse" style={{ animationDuration: '3s' }}>
          <div className="w-full h-full rounded-full bg-orange-600/80" style={{ boxShadow: '0 0 30px rgba(255, 102, 0, 0.7), inset 0 -10px 20px rgba(139, 69, 19, 0.5)' }}>
            <div className="absolute top-6 left-5 w-4 h-6 bg-black/90" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
            <div className="absolute top-6 right-5 w-4 h-6 bg-black/90" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-4 bg-black/90 rounded-full" />
          </div>
        </div>
        
        <div className="absolute bottom-40 left-8 w-20 h-20 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <div className="w-full h-full rounded-full bg-orange-500/70" style={{ boxShadow: '0 0 25px rgba(255, 102, 0, 0.6), inset 0 -8px 15px rgba(139, 69, 19, 0.4)' }}>
            <div className="absolute top-5 left-4 w-3 h-5 bg-black/90" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
            <div className="absolute top-5 right-4 w-3 h-5 bg-black/90" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-3 bg-black/90 rounded-full" />
          </div>
        </div>
        
        {/* CSS Ghost shapes */}
        <div className="absolute top-52 left-16 w-20 h-24 animate-pulse" style={{ animationDuration: '5s' }}>
          <div className="w-full h-full bg-white/60 rounded-t-full" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
            <div className="absolute top-8 left-4 w-3 h-4 bg-black/80 rounded-full" />
            <div className="absolute top-8 right-4 w-3 h-4 bg-black/80 rounded-full" />
            <div className="absolute bottom-0 left-0 w-full h-6 flex">
              <div className="w-1/3 h-full bg-white/60 rounded-b-full" />
              <div className="w-1/3 h-full bg-transparent" />
              <div className="w-1/3 h-full bg-white/60 rounded-b-full" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-60 right-16 w-24 h-28 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
          <div className="w-full h-full bg-white/50 rounded-t-full" style={{ boxShadow: '0 0 25px rgba(255, 255, 255, 0.6)' }}>
            <div className="absolute top-10 left-5 w-3 h-4 bg-black/80 rounded-full" />
            <div className="absolute top-10 right-5 w-3 h-4 bg-black/80 rounded-full" />
            <div className="absolute bottom-0 left-0 w-full h-7 flex">
              <div className="w-1/3 h-full bg-white/50 rounded-b-full" />
              <div className="w-1/3 h-full bg-transparent" />
              <div className="w-1/3 h-full bg-white/50 rounded-b-full" />
            </div>
          </div>
        </div>
        
        {/* CSS Bat shapes */}
        <div className="absolute top-28 left-1/4 w-16 h-8 animate-pulse" style={{ animationDuration: '2.5s' }}>
          <div className="absolute top-0 left-0 w-6 h-6 bg-black/70 rounded-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(-30deg)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-black/80 rounded-full" />
          <div className="absolute top-0 right-0 w-6 h-6 bg-black/70 rounded-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(30deg)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }} />
        </div>
        
        <div className="absolute bottom-52 right-1/4 w-12 h-6 animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <div className="absolute top-0 left-0 w-5 h-5 bg-black/70 rounded-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(-30deg)', boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rounded-full" />
          <div className="absolute top-0 right-0 w-5 h-5 bg-black/70 rounded-full" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'rotate(30deg)', boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)' }} />
        </div>
        
        {/* Spooky cobwebs - more visible */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white via-white/60 to-transparent" style={{ height: '2px' }} />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-white via-white/60 to-transparent" style={{ width: '2px' }} />
          <div className="absolute top-12 right-0 w-36 h-px bg-gradient-to-l from-white/70 to-transparent" style={{ height: '1px' }} />
          <div className="absolute top-0 right-12 h-36 w-px bg-gradient-to-b from-white/70 to-transparent" style={{ width: '1px' }} />
          <div className="absolute top-24 right-0 w-24 h-px bg-gradient-to-l from-white/50 to-transparent" />
          <div className="absolute top-0 right-24 h-24 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
        
        {/* Left bottom cobweb */}
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20 rotate-90">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-white via-white/60 to-transparent" style={{ height: '2px' }} />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-white via-white/60 to-transparent" style={{ width: '2px' }} />
        </div>
        
        {/* Larger twinkling stars */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '2s', boxShadow: '0 0 4px #ffffff' }} />
        <div className="absolute top-60 left-32 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s', boxShadow: '0 0 4px #ffffff' }} />
        <div className="absolute top-96 right-24 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s', boxShadow: '0 0 4px #ffffff' }} />
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s', boxShadow: '0 0 4px #ffffff' }} />
        <div className="absolute top-44 right-32 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '2s', boxShadow: '0 0 4px #ffffff' }} />
        
        {/* Eerie mist layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        
        {/* Dark vignette for text readability */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)'
        }} />
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
