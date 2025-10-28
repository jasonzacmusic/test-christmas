import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PlaylistVideo } from "@shared/schema";

function PlaylistVideoCard({ video }: { video: PlaylistVideo }) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300" data-testid={`card-playlist-${video.id}`}>
      <CardHeader>
        <div className="aspect-video mb-3 rounded-md overflow-hidden border border-border">
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
        <CardTitle className="text-base text-card-foreground" data-testid={`text-playlist-title-${video.id}`}>
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
    <section className="py-20 bg-card/30 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-gothic text-center text-primary mb-4">
          Halloween Riffs Playlist
        </h2>
        <p className="text-center text-foreground mb-12 max-w-3xl mx-auto" data-testid="text-playlist-description">
          A spooky selection of riffs and chord ideas from our YouTube channel — crafted for pianists, producers, and Halloween lovers.
        </p>

        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.videos.map((video) => (
              <PlaylistVideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
