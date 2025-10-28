import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { YouTubeVideo } from "@shared/schema";

function getYouTubeVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : "";
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  const videoId = getYouTubeVideoId(video.link);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300" data-testid={`card-video-${videoId}`}>
      <CardHeader>
        <div className="aspect-video mb-3 rounded-md overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            data-testid={`iframe-video-${videoId}`}
          />
        </div>
        <CardTitle className="text-lg text-card-foreground" data-testid={`text-title-${videoId}`}>
          {video.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground" data-testid={`text-desc-${videoId}`}>
          {video.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function YouTubeSection() {
  const { data, isLoading, error } = useQuery<{ videos: YouTubeVideo[] }>({
    queryKey: ["/api/youtube-videos"],
  });

  const tutorials = data?.videos.filter((v) => v.category === "Tutorial") || [];
  const songs = data?.videos.filter((v) => v.category === "Song") || [];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-gothic text-center text-primary mb-4">
          Halloween Songs & Tutorials
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Learn from our collection of Halloween music lessons and performances
        </p>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Tutorials</h3>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Songs</h3>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center text-destructive" data-testid="text-error-youtube">
            Failed to load videos. Please try again later.
          </div>
        )}

        {data && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-primary mb-6" data-testid="heading-tutorials">
                Tutorials
              </h3>
              <div className="space-y-6">
                {tutorials.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-primary mb-6" data-testid="heading-songs">
                Songs
              </h3>
              <div className="space-y-6">
                {songs.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
