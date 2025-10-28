import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlaylistVideo } from "@shared/schema";

function PlaylistVideoCard({ video }: { video: PlaylistVideo }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-playlist-${video.id}`}>
      <CardHeader className="p-3 sm:p-4">
        <div className="aspect-video mb-2 sm:mb-3 rounded-md overflow-hidden border border-border w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            data-testid={`iframe-playlist-${video.id}`}
          />
        </div>
        <CardTitle className="text-sm sm:text-base text-card-foreground" data-testid={`text-playlist-title-${video.id}`}>
          {video.title}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export function PlaylistSection() {
  const { data, isLoading, error } = useQuery<{ videos: PlaylistVideo[] }>({
    queryKey: ["/api/playlist-videos"],
  });

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gothic text-center text-primary mb-3 sm:mb-4">
          Halloween Riffs Playlist
        </h2>
        <p className="text-center text-sm sm:text-base text-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2" data-testid="text-playlist-description">
          A spooky selection of riffs and chord ideas from our YouTube channel — crafted for pianists, producers, and Halloween lovers.
        </p>

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-72 rounded-lg" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center text-destructive" data-testid="text-error-playlist">
            Failed to load playlist. Please try again later.
          </div>
        )}

        {data && (
          <>
            <div className="text-center mb-6 text-muted-foreground text-sm" data-testid="text-video-count">
              Showing {data.videos.length} Halloween riffs
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {data.videos.map((video) => (
                <PlaylistVideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
