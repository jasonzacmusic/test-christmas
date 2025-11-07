import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useQuery } from "@tanstack/react-query";
import thumbnail1 from "@assets/Maxresdefault 1280x720 (1)_1762528882666.jpg";
import thumbnail2 from "@assets/Maxresdefault 1280x720 (2)_1762528882666.webp";
import thumbnail3 from "@assets/Maxresdefault 1280x720 (3)_1762528882666.webp";
import thumbnail4 from "@assets/Maxresdefault 1280x720 (4)_1762528882666.webp";
import thumbnail5 from "@assets/Maxresdefault 1280x720 (5)_1762528882666.webp";
import thumbnail6 from "@assets/Maxresdefault 1280x720_1762528882666.jpg";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: string;
}

const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5, thumbnail6];

export function PatreonCollectionSection() {
  const { data: videos = [] } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const performances = videos.filter(v => v.type === 'performance');
  const secondPerformance = performances[1];
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
              Christmas Music Collection
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Unlock 20 exclusive Christmas piano tutorials and performances
            </p>
          </div>

          {secondPerformance && (
            <div className="lg:hidden mb-8 max-w-2xl mx-auto" data-testid="video-patreon-mobile">
              <div className="bg-card/70 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300">
                <div className="relative aspect-video bg-muted">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${secondPerformance.id}`}
                    title={secondPerformance.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-base font-semibold text-card-foreground line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                    {secondPerformance.title}
                  </h4>
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {thumbnails.map((thumb, i) => (
                <a
                  key={i}
                  href="https://www.patreon.com/collection/1818487?view=expanded"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video rounded-lg overflow-hidden shadow-xl hover-elevate transition-all duration-300 group cursor-pointer"
                  style={{
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                  data-testid={`patreon-thumbnail-${i}`}
                  onClick={() => trackEvent('patreon_thumbnail_click', `thumbnail_${i + 1}`)}
                >
                  <img
                    src={thumb}
                    alt={`Christmas tutorial ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View Collection</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center space-y-6">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 border border-card-border">
                <div className="mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">$89</div>
                  <p className="text-muted-foreground">Complete Christmas Collection</p>
                </div>
                <ul className="text-left space-y-3 mb-8 max-w-2xl mx-auto text-foreground">
                  <li className="flex items-center gap-3">
                    <span className="text-accent text-xl">✓</span>
                    <span>20 premium Christmas piano tutorials and performances</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent text-xl">✓</span>
                    <span>Learn classics like Fairytale of New York, Silent Night, Jingle Bells</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent text-xl">✓</span>
                    <span>Easy to advanced arrangements for all skill levels</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent text-xl">✓</span>
                    <span>Multiple genres: Blues, Folk, Jazz, and traditional styles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-accent text-xl">✓</span>
                    <span>Lifetime access to all videos</span>
                  </li>
                </ul>
                <Button
                  asChild
                  size="lg"
                  className="text-xl px-12 py-6 shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.3)',
                  }}
                  data-testid="button-patreon-cta"
                >
                  <a
                    href="https://www.patreon.com/collection/1818487?view=expanded"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', 'patreon_christmas_collection')}
                  >
                    Get Christmas Collection
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
