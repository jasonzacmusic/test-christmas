import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";

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

  useEffect(() => {
    if (videos.length > 0) {
      setRandomizedVideos(shuffleArray(videos));
    }
  }, [videos]);

  if (isLoading || randomizedVideos.length === 0) {
    return null;
  }

  const tutorials = randomizedVideos.filter(v => v.type === 'tutorial');
  const performances = randomizedVideos.filter(v => v.type === 'performance');

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-transparent to-card/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {tutorials.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
                Christmas Piano Tutorials
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn your favorite Christmas songs with step-by-step video tutorials
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((video) => (
                <div
                  key={video.id}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300"
                  data-testid={`video-tutorial-${video.id}`}
                >
                  <div className="relative aspect-video bg-muted">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          </div>
        )}

        {performances.length > 0 && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
                Christmas Performances
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                Enjoy beautiful Christmas piano performances
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {performances.slice(0, 3).map((video) => (
                <div
                  key={video.id}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300"
                  data-testid={`video-performance-${video.id}`}
                >
                  <div className="relative aspect-video bg-muted">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          </div>
        )}
      </div>
    </section>
  );
}
