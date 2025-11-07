import { useEffect } from 'react';
import { useAudio } from '@/contexts/audio-context';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (elementId: string, config: any) => any;
      PlayerState: {
        PLAYING: number;
      };
    };
    youtubePlayersRegistry?: any[];
  }
}

// Global registry to store all YouTube player instances
if (typeof window !== 'undefined') {
  window.youtubePlayersRegistry = [];
  
  // Make pauseAllYouTubeVideos globally accessible
  (window as any).pauseAllYouTubeVideos = function() {
    console.log('pauseAllYouTubeVideos called');
    if (window.youtubePlayersRegistry) {
      console.log(`Pausing ${window.youtubePlayersRegistry.length} YouTube players`);
      window.youtubePlayersRegistry.forEach((player, index) => {
        try {
          if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
            console.log(`Paused YouTube player ${index}`);
          }
        } catch (error) {
          console.log('Failed to pause YouTube video:', error);
        }
      });
    } else {
      console.log('No YouTube players registered yet');
    }
  };
}

export function useYouTubePauseAudio() {
  const { pauseAudio } = useAudio();

  useEffect(() => {
    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Function to initialize players
    const initializePlayers = () => {
      if (!window.YT) {
        console.log('YouTube API not ready yet');
        return;
      }

      const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
      console.log(`Found ${iframes.length} YouTube iframes to initialize`);
      
      // Clear old registry
      window.youtubePlayersRegistry = [];
      
      iframes.forEach((iframe, index) => {
        // Add unique ID if not present
        if (!iframe.id) {
          iframe.id = `youtube-player-${index}`;
        }

        try {
          // Create player instance
          const player = new window.YT!.Player(iframe.id, {
            events: {
              onStateChange: (event: any) => {
                // When video starts playing
                if (event.data === window.YT!.PlayerState.PLAYING) {
                  console.log('YouTube video started playing - pausing audio');
                  pauseAudio();
                }
              },
            },
          });
          
          // Store player in global registry
          window.youtubePlayersRegistry?.push(player);
          console.log(`YouTube player ${index} initialized (${iframe.id})`);
        } catch (error) {
          // Player might already be initialized
          console.log('YouTube player initialization skipped:', error);
        }
      });
      
      console.log(`Total YouTube players registered: ${window.youtubePlayersRegistry?.length || 0}`);
    };

    // Wait for API to be ready
    const checkAndInitialize = () => {
      if (window.YT && window.YT.Player) {
        initializePlayers();
      } else {
        window.onYouTubeIframeAPIReady = initializePlayers;
      }
    };

    // Small delay to ensure iframes are in DOM
    const timer = setTimeout(checkAndInitialize, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pauseAudio]);
}
