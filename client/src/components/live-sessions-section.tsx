import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Music2, Piano } from "lucide-react";
import type { LiveSession } from "@shared/schema";
import { trackEvent } from "@/lib/analytics";

const sessions: LiveSession[] = [
  {
    id: "1",
    date: "Saturday, 1st November",
    time: "6:30 AM – 7:30 AM",
    className: "Scary Chord Progressions",
    duration: "60 min",
    description: "Learn to create dark, cinematic harmonies using tritones, minor seconds, and diminished voicings. Explore modal shifts and rhythmic tension for composers and pianists.",
    icon: "flame"
  },
  {
    id: "2",
    date: "Sunday, 2nd November",
    time: "6:45 AM – 8:15 AM",
    className: "Music Factory – Halloween Themes & Songs",
    duration: "90 min",
    description: "Work through iconic Halloween themes from movies & TV. Transcribe by ear, study melodic ideas, and analyze suspense techniques.",
    icon: "music"
  },
  {
    id: "3",
    date: "Sunday, 2nd November",
    time: "8:45 AM – 9:45 AM",
    className: "The Wednesday Theme – Solo Piano Arrangement",
    duration: "60 min",
    description: "Learn Danny Elfman's haunting Wednesday theme phrase by phrase. Study harmony, bass motion, and orchestral adaptation for solo piano.",
    icon: "piano"
  }
];

const iconMap = {
  flame: Flame,
  music: Music2,
  piano: Piano,
};

export function LiveSessionsSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-gothic text-center text-primary mb-4">
          Halloween Live Sessions
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Join our exclusive Halloween music workshops and master spooky piano techniques
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {sessions.map((session) => {
            const IconComponent = iconMap[session.icon as keyof typeof iconMap];
            return (
              <Card
                key={session.id}
                className="bg-card/50 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300"
                data-testid={`card-session-${session.id}`}
              >
                <CardHeader>
                  <div className="mb-2">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    {session.className}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {session.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" data-testid={`badge-time-${session.id}`}>
                      {session.time}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="outline" data-testid={`badge-duration-${session.id}`}>
                      Duration: {session.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-description-${session.id}`}>
                    {session.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="text-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            data-testid="button-book-sessions"
          >
            <a
              href="https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7749"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('cta_click', 'live_sessions_book_now')}
            >
              Book Now
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
