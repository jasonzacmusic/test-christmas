import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { YouTubeVideo } from "@/lib/data";

function getYouTubeVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : "";
}

function VideoCard({ video }: { video: YouTubeVideo }) {
  const videoId = getYouTubeVideoId(video.link || "");

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-video-${videoId}`}>
      <CardHeader className="p-3 sm:p-4">
        <div className="aspect-video mb-2 rounded-md overflow-hidden border border-border w-full">
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
        <CardTitle className="text-sm sm:text-base text-card-foreground mb-1" data-testid={`text-title-${videoId}`}>
          {video.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-desc-${videoId}`}>
          {video.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

import { YOUTUBE_VIDEOS } from "@/lib/data";

export function YouTubeSection() {
  const data = { videos: YOUTUBE_VIDEOS };
  const isLoading = false;
  const error = null;

  const tutorials = data?.videos.filter((v) => v.category === "Tutorial") || [];
  const songs = data?.videos.filter((v) => v.category === "Song") || [];

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gothic text-center text-primary mb-3 sm:mb-4">
          Halloween Songs & Tutorials
        </h2>
        <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-2">
          Learn from our collection of Halloween music lessons and performances
        </p>

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
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
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6" data-testid="heading-tutorials">
                Music Concepts
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {tutorials.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6" data-testid="heading-songs">
                Song Tutorials
              </h3>
              <div className="space-y-3 sm:space-y-4">
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
