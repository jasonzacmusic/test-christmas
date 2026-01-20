import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AudioProvider } from "@/contexts/audio-context";
import { useYouTubePauseAudio } from "@/hooks/use-youtube-pause-audio";
import HomePage from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  useYouTubePauseAudio();
  
  return (
    <WouterRouter base={import.meta.env.BASE_URL}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <Toaster />
          <Router />
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
