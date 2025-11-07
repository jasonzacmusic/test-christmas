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
      
      iframes.forEach((iframe, index) => {
        // Add unique ID if not present
        if (!iframe.id) {
          iframe.id = `youtube-player-${index}`;
        }

        try {
          // Create player instance
          new window.YT!.Player(iframe.id, {
            events: {
              onStateChange: (event: any) => {
                // When video starts playing
                if (event.data === window.YT!.PlayerState.PLAYING) {
                  pauseAudio();
                }
              },
            },
          });
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
