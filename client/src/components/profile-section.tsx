import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Youtube, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import jasonChristmas from "@assets/3_1762528038976.jpg";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function ProfileSection() {
  const { data: videos = [] } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const [randomizedVideos, setRandomizedVideos] = useState<YouTubeVideo[]>([]);
  const performanceScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videos.length > 0) {
      setRandomizedVideos(shuffleArray(videos));
    }
  }, [videos]);

  const scroll = (direction: 'left' | 'right') => {
    if (!performanceScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -400 : 400;
    performanceScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const performances = randomizedVideos.filter(v => 
    v.type === 'performance'
  ).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(/bg-instruments-collage.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-6" style={{ 
              fontFamily: 'var(--font-christmas)',
              letterSpacing: '0.03em',
              textShadow: '0 2px 20px rgba(220, 38, 38, 0.3)'
            }}>
              About Your Teacher
            </h2>
            <p className="text-xl sm:text-2xl text-accent font-semibold max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-elegant)' }}>
              Learn from Jason Zachariah, a Bangalore-based musician with over two decades of experience
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-1 space-y-8">
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
                    <img
                      src={jasonChristmas}
                      alt="Jason Zachariah in festive Christmas attire"
                      className="relative rounded-2xl shadow-2xl w-full max-w-lg object-cover"
                      data-testid="img-jason-profile"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
              <div className="space-y-6 text-foreground">
                <p className="text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                  Jason is the co-director of the <strong className="text-primary font-bold">Nathaniel School of Music</strong> and runs a YouTube Education channel with over <strong className="text-primary font-bold">115,000 subscribers</strong>, teaching piano, bass, music theory, composition, ear training, production, and rhythm concepts. His <strong className="text-primary font-bold">15,000+ Instagram supporters</strong> benefit from daily music tips and lessons.
                </p>

                <p className="text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                  His teaching style is best described as <strong className="text-primary font-bold">custom-made to suit every level</strong>. Jason has a knack for identifying the best methods that are engaging, interactive, and flexible to suit the needs of almost any student. His workshops and tutorials are lauded in the music circle for being <strong className="text-primary font-bold">result-oriented</strong> while allowing space for students to learn and improvise above and beyond.
                </p>

                <p className="text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                  As a <strong className="text-primary font-bold">multi-instrumentalist</strong>, Jason plays piano, bass, horns, assorted percussion, and sings. He has released <strong className="text-primary font-bold">three albums</strong> to date, each showing his growth in musical expression, with the latest incorporating influences from Indian Classical Music and Celtic Folk. He has also performed with bands including <strong className="text-primary font-bold">Allegro Fudge</strong>, blending folk with Indian influences.
                </p>

                <p className="text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-elegant)' }}>
                  Jason comes from a family of music pioneers. His grandfathers, <strong className="text-primary font-bold">Walter Nathaniel</strong> and <strong className="text-primary font-bold">A.D. Zachariah</strong>, were key figures in Western and Indian Classical Music in India, respectively, a legacy that informs his unique approach to music education.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                    <div className="text-3xl font-bold text-primary mb-1">115k+</div>
                    <div className="text-sm text-muted-foreground">YouTube Subscribers</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                    <div className="text-3xl font-bold text-primary mb-1">15k+</div>
                    <div className="text-sm text-muted-foreground">Instagram Supporters</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                    <div className="text-3xl font-bold text-primary mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Released Albums</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-4 text-center hover-elevate transition-all">
                    <div className="text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>

                <div className="flex justify-center gap-6 pt-6">
                  <a
                    href="https://www.youtube.com/nathanielschool?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover-elevate"
                    data-testid="link-jason-youtube"
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="font-semibold">YouTube</span>
                  </a>
                  <a
                    href="https://www.instagram.com/jasonzac?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:scale-105 transition-all duration-300 hover-elevate"
                    data-testid="link-jason-instagram"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-semibold">Instagram</span>
                  </a>
                </div>
              </div>
              </div>
            </div>
            
            {performances.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-primary text-center" style={{ 
                  fontFamily: 'var(--font-elegant)',
                  textShadow: '0 2px 15px rgba(220, 38, 38, 0.2)'
                }}>
                  Performance Videos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {performances.map((video) => (
                    <div
                      key={video.id}
                      className="bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300"
                      data-testid={`video-performance-${video.id}`}
                    >
                      <div className="relative aspect-video bg-muted">
                        <iframe
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-semibold text-card-foreground mb-1 line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                          {video.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
