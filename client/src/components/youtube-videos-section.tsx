import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function YouTubeVideosSection() {
  const { data: videos = [], isLoading } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const [randomizedVideos, setRandomizedVideos] = useState<YouTubeVideo[]>([]);
  const tutorialScrollRef = useRef<HTMLDivElement>(null);
  const performanceScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videos.length > 0) {
      setRandomizedVideos(shuffleArray(videos));
    }
  }, [videos]);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = direction === 'left' ? -400 : 400;
    ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  if (isLoading || randomizedVideos.length === 0) {
    return null;
  }

  const tutorials = randomizedVideos.filter(v => v.type === 'tutorial');

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: 'url(/bg-christmas-festive.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        {tutorials.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-6" style={{ 
                fontFamily: 'var(--font-christmas)',
                letterSpacing: '0.03em',
                textShadow: '0 2px 20px rgba(220, 38, 38, 0.3)'
              }}>
                Christmas Piano Tutorials
              </h2>
              <p className="text-xl sm:text-2xl text-accent font-semibold max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-elegant)' }}>
                Learn your favorite Christmas songs with step-by-step video tutorials
              </p>
            </div>

            <div className="relative group">
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scroll(tutorialScrollRef, 'left')}
                data-testid="button-scroll-left-tutorials"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <div
                ref={tutorialScrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollBehavior: 'smooth' }}
              >
                {tutorials.map((video) => (
                  <div
                    key={video.id}
                    className="flex-shrink-0 w-[400px] bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300"
                    data-testid={`video-tutorial-${video.id}`}
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
                      <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => scroll(tutorialScrollRef, 'right')}
                data-testid="button-scroll-right-tutorials"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
