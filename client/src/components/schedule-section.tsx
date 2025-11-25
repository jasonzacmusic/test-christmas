import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { TIME_ZONES, getUserTimeZone, convertTime, type TimeZoneInfo } from "@/lib/timezone";

interface Workshop {
  date: string;
  time: string;
  title: string;
}

const WORKSHOPS: Workshop[] = [
  { date: "5th December", time: "06:30 AM", title: "Easy Christmas Carols" },
  { date: "6th December", time: "02:00 PM", title: "The 'Roots' Genre Christmas Twist" },
  { date: "7th December", time: "09:00 AM", title: "The Christmas Challenge" },
  { date: "13th December", time: "06:30 AM", title: "Ear Training" },
  { date: "14th December", time: "06:45 AM", title: "Christmas Factory 1" },
  { date: "20th December", time: "06:30 AM", title: "Christmas Songs Reimagined" },
  { date: "20th December", time: "07:45 AM", title: "Intervals, Scales and Chord Awareness" },
  { date: "21st December", time: "06:45 AM", title: "Christmas Factory 2" },
];

export function ScheduleSection() {
  const [selectedTimezone, setSelectedTimezone] = useState<TimeZoneInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedTimezone(getUserTimeZone());
  }, []);

  if (!selectedTimezone) return null;

  const isIST = selectedTimezone.abbr === "IST";

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/20 via-transparent to-card/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-christmas)' }}>
            Workshop Schedule
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            All times are shown in your local timezone
          </p>

          <div className="flex justify-center mb-8">
            <div className="relative inline-block">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="outline"
                className="min-w-[250px] justify-between"
                data-testid="button-timezone-selector"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedTimezone.name} ({selectedTimezone.abbr})
                </span>
                <span className="ml-2">▼</span>
              </Button>
              
              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute top-full mt-2 w-full bg-popover border border-popover-border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
                    {TIME_ZONES.map((tz) => (
                      <button
                        key={tz.abbr + tz.offset}
                        onClick={() => {
                          setSelectedTimezone(tz);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover-elevate transition-colors ${
                          selectedTimezone.abbr === tz.abbr && selectedTimezone.offset === tz.offset
                            ? 'bg-accent/20 text-accent-foreground'
                            : 'text-popover-foreground'
                        }`}
                        data-testid={`option-timezone-${tz.abbr}`}
                      >
                        <div className="font-medium">{tz.name}</div>
                        <div className="text-sm text-muted-foreground">{tz.abbr}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {WORKSHOPS.map((workshop, index) => {
            const converted = workshop.time !== "TBA" ? convertTime(workshop.time, selectedTimezone.offset) : null;
            const localTime = converted ? converted.time : "TBA";
            const dayOffset = converted ? converted.dayOffset : 0;
            
            let displayDate = workshop.date;
            if (dayOffset !== 0) {
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
                key={index}
                className="bg-card/80 backdrop-blur-sm border-card-border hover-elevate transition-all duration-300"
                data-testid={`card-schedule-${index}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2 text-accent">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      {displayDate}
                      {dayOffset !== 0 && !isIST && (
                        <span className="text-xs ml-2 text-muted-foreground">
                          ({dayOffset > 0 ? '+' : ''}{dayOffset} day)
                        </span>
                      )}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-card-foreground">
                    {workshop.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {!isIST && workshop.time !== "TBA" && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">IST:</span> {workshop.time} ({workshop.date})
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-lg font-bold text-primary">
                        {localTime} {selectedTimezone.abbr}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
