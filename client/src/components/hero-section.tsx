import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Snowflake, Star, Sparkles, Globe, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import jasonChristmasMain from "@assets/1_1762536054233.png";
import jasonHero1 from "@assets/2_1762532746081.png";
import jasonHero2 from "@assets/1_1762531724143.png";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: string;
}


export function HeroSection() {
  const { data: videos = [] } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const linusVideo = videos.find(v => 
    v.type === 'performance' && v.title.toLowerCase().includes('linus')
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

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
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: 'var(--font-elegant)' }}>
                <span className="block text-foreground mb-3" style={{ 
                  textShadow: '0 2px 25px rgba(0, 0, 0, 0.5)'
                }}>
                  Master Christmas Classics
                </span>
                <span className="block text-primary mb-3" style={{
                  textShadow: '0 0 40px rgba(220, 38, 38, 0.5), 0 2px 20px rgba(0, 0, 0, 0.6)',
                  fontFamily: 'var(--font-christmas)',
                  fontSize: '1.2em',
                  letterSpacing: '0.02em',
                }}>
                  Like Never Before
                </span>
              </h1>
              
              <div className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-secondary mx-auto lg:mx-0 rounded-full" />
              
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto lg:mx-0 leading-relaxed" style={{ 
                fontFamily: 'var(--font-elegant)',
                textShadow: '0 1px 15px rgba(0, 0, 0, 0.4)'
              }}>
                Celebrate the season with <span className="text-primary font-bold">8 live workshops</span> covering carols, theory, ear training, and arrangements with Jason Zac. Unwrap the complete holiday music experience with our <span className="text-accent font-bold">exclusive Patreon collection</span> featuring 20 tutorials, sheet music, and performance videos. From beginner carols to creative techniques for every skill level, everything you need to shine this season awaits.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-base sm:text-lg font-semibold">
                <div className="flex items-center gap-2 group transition-all duration-300" data-testid="bullet-workshops">
                  <div className="w-3 h-3 bg-primary rounded-full group-hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all duration-300" />
                  <span className="text-foreground/90 group-hover:text-primary transition-colors duration-300">8 Live Workshops (Dec 5-21)</span>
                </div>
                <div className="flex items-center gap-2 group transition-all duration-300" data-testid="bullet-tutorials">
                  <div className="w-3 h-3 bg-accent rounded-full group-hover:shadow-[0_0_15px_rgba(251,191,36,0.6)] transition-all duration-300" />
                  <span className="text-foreground/90 group-hover:text-accent transition-colors duration-300">20+ Patreon Tutorials</span>
                </div>
                <div className="flex items-center gap-2 group transition-all duration-300" data-testid="bullet-sheet-music">
                  <div className="w-3 h-3 bg-secondary rounded-full group-hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300" />
                  <span className="text-foreground/90 group-hover:text-secondary transition-colors duration-300">Sheet Music & Recordings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="max-w-md mx-auto lg:max-w-none">
              <div className="relative group lg:hidden">
                <div className="absolute -inset-3 bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl opacity-30 group-hover:opacity-40 transition-opacity blur-2xl" />
                <img
                  src={jasonChristmasMain}
                  alt="Jason Zachariah - Merry Christmas"
                  className="relative rounded-3xl shadow-2xl w-full object-cover border-4 border-primary/20"
                  data-testid="img-jason-hero-mobile"
                />
              </div>
              
              <div className="hidden lg:grid lg:grid-cols-1 gap-4">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-25 group-hover:opacity-35 transition-opacity blur-xl" />
                  <img
                    src={jasonHero2}
                    alt="Jason Zac performing"
                    className="relative rounded-2xl shadow-xl w-full object-cover border-3 border-accent/20"
                    data-testid="img-jason-hero-right"
                  />
                </div>
                
                {linusVideo && (
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-secondary via-primary to-accent rounded-2xl opacity-25 group-hover:opacity-35 transition-opacity blur-xl" />
                    <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border-3 border-secondary/20 shadow-xl">
                      <div className="aspect-video bg-muted">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${linusVideo.id}?enablejsapi=1`}
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
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6" style={{ fontFamily: 'var(--font-christmas)' }}>
              Choose Your Payment Method
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-card-border space-y-4 hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(220,38,38,0.4)] transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h4 className="text-xl font-bold text-foreground">UPI / Card / Bank Transfer</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  For Indian & International Students
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full text-lg px-6 py-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                  style={{
                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                  }}
                  data-testid="button-register-indian"
                >
                  <a
                    href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7010"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', 'hero_register_indian')}
                  >
                    Enroll Now
                  </a>
                </Button>
              </div>

              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-card-border space-y-4 hover:border-accent/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(251,191,36,0.4)] transition-all duration-300">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-6 h-6 text-accent" />
                  <h4 className="text-xl font-bold text-foreground">PayPal</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  For International Students Only
                </p>
                <p className="text-xs text-foreground/70 -mt-2">
                  Secure worldwide payment via PayPal
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full text-lg px-6 py-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                  style={{
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
                  }}
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
