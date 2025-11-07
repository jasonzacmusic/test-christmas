import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Ear, Radio, Sparkles, Palette, Wrench, WrenchIcon, Calendar, Clock } from "lucide-react";
import { getUserTimeZone, convertTime } from "@/lib/timezone";
import { useQuery } from "@tanstack/react-query";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: string;
}

const workshops = [
  {
    id: "1",
    title: "Easy Christmas Carols",
    date: "5th December",
    time: "06:30 AM",
    icon: Music,
    description: "Ideal to prepare yourself for the festive season to sing and play your favourite carols or accompany a group of musicians or singers. We'll also sneak in simple melodic arrangements for solo piano.",
  },
  {
    id: "2",
    title: "Christmas Songs Reimagined",
    date: "6th December",
    time: "06:30 AM",
    icon: Palette,
    description: "Learn how to reharmonize with timeless classics and strengthen your theory, composition and arrangement skills.",
  },
  {
    id: "3",
    title: "Intervals, Scales and Chord Awareness",
    date: "6th December",
    time: "07:45 AM",
    icon: BookOpen,
    description: "Study the basics of music theory with Christmas themed music and work out the melodic structure of the great classics along with their chords. You'll also be in a position to Harmonize music on your own using tried and tested theory of chords and progressions.",
  },
  {
    id: "4",
    title: "The 'Roots' Genre Christmas Twist",
    date: "6th December",
    time: "02:00 PM",
    icon: Radio,
    description: "Learn the Blues, Gospel, Country, Folk, Rock n Roll, Reggae and many more genres by using our favourite Christmas pieces as examples. We'll also be playing with meter and time feel through the lecture.",
  },
  {
    id: "5",
    title: "The Christmas Challenge",
    date: "7th December",
    time: "08:30 AM",
    icon: Sparkles,
    description: "Suggest or Choose a great Christmas song and develop your own versions for Christmas for your loved ones. These will be Solo Piano arrangements. Before learning the song, we'll figure out each and every ingredient by ear and create the notation on our own with cutting edge software.",
  },
  {
    id: "6",
    title: "Ear Training",
    date: "13th December",
    time: "TBA",
    icon: Ear,
    description: "Listen to popular Christmas carols and songs and identify the scale, chords, intervals and rhythm pattern just by using your ear. Also, covered in this lecture would be sight singing of melodies along with their rhythm elements. Designed for students of all levels.",
  },
  {
    id: "7",
    title: "Christmas Factory 1",
    date: "14th December",
    time: "06:45 AM",
    icon: Wrench,
    description: "Transcribe all aspects of songs suggested by you and your classmates and brainstorm them live with Jason Zac. Understand why the greats did what they did and learn to predict patterns, rhythmic devices and harmonic flow. Ideal for all skill levels.",
  },
  {
    id: "8",
    title: "Christmas Factory 2",
    date: "21st December",
    time: "06:45 AM",
    icon: WrenchIcon,
    description: "Transcribe all aspects of songs suggested by you and your classmates and brainstorm them live with Jason Zac. Understand why the greats did what they did and learn to predict patterns, rhythmic devices and harmonic flow. Ideal for all skill levels.",
  },
];

export function WorkshopsSection() {
  const [userTimezone, setUserTimezone] = useState(getUserTimeZone());

  useEffect(() => {
    setUserTimezone(getUserTimeZone());
  }, []);

  const { data: videos = [] } = useQuery<YouTubeVideo[]>({
    queryKey: ['/api/christmas-videos'],
  });

  const performances = videos.filter(v => v.type === 'performance');
  const firstPerformance = performances[0];

  const isIST = userTimezone.abbr === "IST";

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(/bg-piano-bw.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
            Workshop Schedule
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            8 comprehensive sessions designed to elevate your Christmas music skills
          </p>
        </div>

        {firstPerformance && (
          <div className="lg:hidden mb-8 max-w-2xl mx-auto" data-testid="video-workshops-mobile">
            <div className="bg-card/70 backdrop-blur-sm rounded-lg overflow-hidden border border-card-border hover-elevate transition-all duration-300">
              <div className="relative aspect-video bg-muted">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${firstPerformance.id}`}
                  title={firstPerformance.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h4 className="text-base font-semibold text-card-foreground line-clamp-2" style={{ fontFamily: 'var(--font-elegant)' }}>
                  {firstPerformance.title}
                </h4>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workshops.map((workshop) => {
            const IconComponent = workshop.icon;
            const converted = workshop.time !== "TBA" ? convertTime(workshop.time, userTimezone.offset) : null;
            const localTime = converted ? converted.time : "TBA";
            const dayOffset = converted ? converted.dayOffset : 0;
            
            let displayDate = workshop.date;
            if (dayOffset !== 0 && workshop.time !== "TBA") {
              const dateMatch = workshop.date.match(/(\d+)(st|nd|rd|th)\s+(\w+)/);
              if (dateMatch) {
                const day = parseInt(dateMatch[1]);
                const month = dateMatch[3];
                const newDay = day + dayOffset;
                const suffix = newDay === 1 || newDay === 21 || newDay === 31 ? 'st' :
                               newDay === 2 || newDay === 22 ? 'nd' :
                               newDay === 3 || newDay === 23 ? 'rd' : 'th';
                displayDate = `${newDay}${suffix} ${month}`;
              }
            }

            return (
              <Card
                key={workshop.id}
                className="bg-card/80 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300"
                data-testid={`card-workshop-${workshop.id}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg text-card-foreground mb-3">
                    {workshop.title}
                  </CardTitle>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-accent">
                      <Calendar className="w-4 h-4" />
                      <span className="font-semibold">
                        {displayDate}
                        {dayOffset !== 0 && !isIST && workshop.time !== "TBA" && (
                          <span className="text-xs ml-2 text-muted-foreground">
                            ({dayOffset > 0 ? '+' : ''}{dayOffset} day)
                          </span>
                        )}
                      </span>
                    </div>
                    {!isIST && workshop.time !== "TBA" && (
                      <div className="text-xs text-muted-foreground">
                        IST: {workshop.time} ({workshop.date})
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-bold text-primary">
                        {localTime} {workshop.time !== "TBA" && userTimezone.abbr}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {workshop.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
