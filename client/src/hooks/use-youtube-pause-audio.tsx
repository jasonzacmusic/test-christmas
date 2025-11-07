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
}

export function pauseAllYouTubeVideos() {
  if (typeof window !== 'undefined' && window.youtubePlayersRegistry) {
    window.youtubePlayersRegistry.forEach((player) => {
      try {
        if (player && typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        }
      } catch (error) {
        console.log('Failed to pause YouTube video:', error);
      }
    });
  }
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
      if (!window.YT) return;

      const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
      
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
                  pauseAudio();
                }
              },
            },
          });
          
          // Store player in global registry
          window.youtubePlayersRegistry?.push(player);
        } catch (error) {
          // Player might already be initialized
          console.log('YouTube player initialization skipped:', error);
        }
      });
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
