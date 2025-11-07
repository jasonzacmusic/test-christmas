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
    let initialized = false;

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Function to initialize players
    const initializePlayers = () => {
      if (initialized || !window.YT || !window.YT.Player) {
        console.log('Skip initialization - already done or API not ready');
        return;
      }

      const iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
      console.log(`Found ${iframes.length} YouTube iframes to initialize`);
      
      if (iframes.length === 0) {
        // Retry after a delay if no iframes found
        setTimeout(initializePlayers, 1000);
        return;
      }

      initialized = true;
      
      // Clear old registry
      window.youtubePlayersRegistry = [];
      
      iframes.forEach((iframe, index) => {
        // Skip if already has player
        if ((iframe as any).hasYouTubePlayer) {
          return;
        }
        
        // Add unique ID if not present
        if (!iframe.id) {
          iframe.id = `youtube-player-${Date.now()}-${index}`;
        }

        try {
          // Create player instance
          const player = new window.YT!.Player(iframe.id, {
            events: {
              onReady: (event: any) => {
                console.log(`Player ${index} ready`);
              },
              onStateChange: (event: any) => {
                console.log(`Player ${index} state changed: ${event.data}`);
                
                // When this video starts playing
                if (event.data === window.YT!.PlayerState.PLAYING) {
                  console.log('YouTube video started playing - pausing audio and other videos');
                  
                  // Pause audio
                  pauseAudio();
                  
                  // Pause all other YouTube videos
                  if (window.youtubePlayersRegistry) {
                    window.youtubePlayersRegistry.forEach((p) => {
                      if (p !== player && typeof p.pauseVideo === 'function') {
                        try {
                          p.pauseVideo();
                        } catch (e) {
                          // Ignore
                        }
                      }
                    });
                  }
                }
              },
            },
          });
          
          // Mark iframe as having a player
          (iframe as any).hasYouTubePlayer = true;
          
          // Store player in global registry
          window.youtubePlayersRegistry?.push(player);
          console.log(`YouTube player ${index} initialized (${iframe.id})`);
        } catch (error) {
          console.log('YouTube player initialization error:', error);
        }
      });
      
      console.log(`Total YouTube players registered: ${window.youtubePlayersRegistry?.length || 0}`);
    };

    // Wait for API to be ready
    const checkAndInitialize = () => {
      if (window.YT && window.YT.Player) {
        setTimeout(initializePlayers, 1500);
      } else {
        window.onYouTubeIframeAPIReady = () => {
          setTimeout(initializePlayers, 1500);
        };
      }
    };

    checkAndInitialize();

    return () => {
      // Cleanup
    };
  }, [pauseAudio]);
}
