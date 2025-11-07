import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Ear, Radio, Sparkles, Palette, Wrench, WrenchIcon } from "lucide-react";

const workshops = [
  {
    id: "1",
    title: "Easy Christmas Carols",
    icon: Music,
    description: "Ideal to prepare yourself for the festive season to sing and play your favourite carols or accompany a group of musicians or singers. We'll also sneak in simple melodic arrangements for solo piano.",
  },
  {
    id: "2",
    title: "Intervals, Scales and Chord Awareness",
    icon: BookOpen,
    description: "Study the basics of music theory with Christmas themed music and work out the melodic structure of the great classics along with their chords. You'll also be in a position to Harmonize music on your own using tried and tested theory of chords and progressions.",
  },
  {
    id: "3",
    title: "Ear Training",
    icon: Ear,
    description: "Listen to popular Christmas carols and songs and identify the scale, chords, intervals and rhythm pattern just by using your ear. Also, covered in this lecture would be sight singing of melodies along with their rhythm elements. Designed for students of all levels.",
  },
  {
    id: "4",
    title: "The 'Roots' Genre Christmas Twist",
    icon: Radio,
    description: "Learn the Blues, Gospel, Country, Folk, Rock n Roll, Reggae and many more genres by using our favourite Christmas pieces as examples. We'll also be playing with meter and time feel through the lecture.",
  },
  {
    id: "5",
    title: "The Christmas Challenge",
    icon: Sparkles,
    description: "Suggest or Choose a great Christmas song and develop your own versions for Christmas for your loved ones. These will be Solo Piano arrangements. Before learning the song, we'll figure out each and every ingredient by ear and create the notation on our own with cutting edge software.",
  },
  {
    id: "6",
    title: "Christmas Songs Reimagined",
    icon: Palette,
    description: "Learn how to reharmonize with timeless classics and strengthen your theory, composition and arrangement skills.",
  },
  {
    id: "7",
    title: "Christmas Factory 1",
    icon: Wrench,
    description: "Transcribe all aspects of songs suggested by you and your classmates and brainstorm them live with Jason Zac. Understand why the greats did what they did and learn to predict patterns, rhythmic devices and harmonic flow. Ideal for all skill levels.",
  },
  {
    id: "8",
    title: "Christmas Factory 2",
    icon: WrenchIcon,
    description: "Transcribe all aspects of songs suggested by you and your classmates and brainstorm them live with Jason Zac. Understand why the greats did what they did and learn to predict patterns, rhythmic devices and harmonic flow. Ideal for all skill levels.",
  },
];

export function WorkshopsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">
            Workshop Lineup
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            8 comprehensive sessions designed to elevate your Christmas music skills
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workshops.map((workshop) => {
            const IconComponent = workshop.icon;
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
                  <CardTitle className="text-lg text-card-foreground">
                    {workshop.title}
                  </CardTitle>
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
