import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { analyticsEventsTable, insertAnalyticsEventSchema } from "@shared/schema";
import { sql } from "drizzle-orm";

const GOOGLE_SHEET_ID = "1QqeTbhU7ksJnLRC1j2aTT5bevsUD3vBzhVygEe438VA";
const YOUTUBE_PLAYLIST_ID = "PLrNNL05e9FT-nmVSqhB5g0RD2yHEpuoRs";

interface GoogleSheetRow {
  Title: string;
  Category: string;
  Link: string;
  Description: string;
}

async function fetchGoogleSheetData() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=0`;
    const response = await fetch(url);
    const text = await response.text();
    
    if (text.includes('<!DOCTYPE html>')) {
      throw new Error('Sheet requires authentication');
    }
    
    const lines = text.split('\n').filter(line => line.trim());
    const videos = lines.slice(1).map(line => {
      const parts = line.split(',').map(part => part.replace(/^"|"$/g, '').trim());
      if (parts.length < 4) return null;
      
      return {
        title: parts[0],
        category: parts[1],
        link: parts[2],
        description: parts.slice(3).join(','),
      };
    }).filter((v): v is NonNullable<typeof v> => v !== null && v.title && v.link);
    
    return { videos };
  } catch (error) {
    console.warn('Failed to fetch from Google Sheets, using fallback data:', error);
    const videos = [
      {
        title: "How to play Chord Connections | Part 1",
        category: "Tutorial",
        link: "https://youtu.be/JCChCSaxFjw",
        description: "This video is part 1 of how to play chord connections."
      },
      {
        title: "STOP Wasting Time with Boring Chords - Mysterious Connections Revealed",
        category: "Tutorial",
        link: "https://youtu.be/_yoM8SzSaEk",
        description: "Discover mysterious connections between chords to make your playing more interesting."
      },
      {
        title: "How to Use \"Wrong\" Notes Creatively - Intervals Music Theory",
        category: "Tutorial",
        link: "https://youtu.be/W6rTUhK4RgY",
        description: "Learn how to take the most unstable intervals in music – minor 2nds, tritones, major 7ths & minor 6ths – and turn them into lush, usable chords. Perfect for pianists, composers & arrangers looking to add emotional depth and harmonic colour."
      },
      {
        title: "ALL the Scary Chords & Progressions you should know 👻",
        category: "Tutorial",
        link: "https://youtu.be/l7B37u8--OQ",
        description: "Learn how to form chords using the dissonant intervals that theory offers and compose some spooky, eerie, and scary music. Using tension intervals - Minor 2nd, Tritone, Major 6th & Major 7th, we build a variety of chords using unique musical concepts."
      },
      {
        title: "🎹 Learn to Play The Addams Family Theme on Piano! 🖤",
        category: "Song",
        link: "https://youtu.be/Js31p-7mItU?si=xF4_xE_sAPq41MEg",
        description: "Learn to play The Addams Family Theme on piano in beginner, intermediate & advanced versions. We'll cover the essential music theory, melody phrasing, left-hand rhythm patterns, and ornaments to make your performance sound authentic and full."
      },
      {
        title: "How to Play the Halloween Theme 🎹 John Carpenter 👻",
        category: "Song",
        link: "https://youtu.be/eGKSpaNCS2k",
        description: "This video teaches you how to play John Carpenter's Halloween Theme on piano."
      },
      {
        title: "How to Play the Ghostbusters Theme on Piano 👻 Easy Piano Tutorial",
        category: "Song",
        link: "https://youtu.be/2cfx5Q4FV38",
        description: "Learn to play the Ghostbusters Theme on piano with this easy tutorial."
      },
      {
        title: "Thriller on the Piano - Michael Jackson",
        category: "Song",
        link: "https://youtu.be/uZ8Gl_p-ghE",
        description: "This video shows you how to play Michael Jackson's \"Thriller\" on the piano."
      },
      {
        title: "How to Play Wednesday's Theme with This One Simple Piano Technique?",
        category: "Song",
        link: "https://youtu.be/Z309URkixMU",
        description: "Learn how to play the Wednesday Theme by Danny Elfman as a solo piano arrangement. After transcribing the epic cello bass line, orchestration, percussion, choir, and haunting theremin, this piano arrangement pushes your skills to the limit."
      }
    ];
    
    return { videos };
  }
}

async function fetchYouTubePlaylist() {
  const url = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    const videoIds: string[] = [];
    const titles: string[] = [];
    
    const videoIdRegex = /"videoId":"([^"]{11})"/g;
    const titleRegex = /"title":{"runs":\[{"text":"([^"]+)"/g;
    
    let match;
    while ((match = videoIdRegex.exec(html)) !== null) {
      if (!videoIds.includes(match[1])) {
        videoIds.push(match[1]);
      }
    }
    
    while ((match = titleRegex.exec(html)) !== null) {
      titles.push(match[1]);
    }
    
    const videos = videoIds.slice(0, 12).map((id, index) => ({
      id,
      title: titles[index] || `Video ${index + 1}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    }));
    
    videos.sort((a, b) => {
      const numA = parseInt(a.title.match(/#(\d+)/)?.[1] || '0');
      const numB = parseInt(b.title.match(/#(\d+)/)?.[1] || '0');
      return numA - numB;
    });
    
    return { videos };
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return { videos: [] };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/youtube-videos", async (req, res) => {
    try {
      const data = await fetchGoogleSheetData();
      res.json(data);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.get("/api/playlist-videos", async (req, res) => {
    try {
      const data = await fetchYouTubePlaylist();
      res.json(data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      res.status(500).json({ error: "Failed to fetch playlist" });
    }
  });

  app.post("/api/analytics/track", async (req, res) => {
    try {
      const validated = insertAnalyticsEventSchema.parse(req.body);
      await db.insert(analyticsEventsTable).values(validated);
      res.json({ success: true });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        console.warn("Invalid analytics event data:", error);
        res.status(400).json({ error: "Invalid event data" });
      } else {
        console.error("Error tracking analytics event:", error);
        res.status(500).json({ error: "Failed to track event" });
      }
    }
  });

  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const result = await db.execute(sql`
        SELECT 
          event_type,
          COUNT(*) as count,
          DATE_TRUNC('day', created_at) as date
        FROM analytics_events
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY event_type, DATE_TRUNC('day', created_at)
        ORDER BY date DESC, event_type ASC
      `);
      
      const totalEvents = await db.execute(sql`
        SELECT event_type, COUNT(*) as count
        FROM analytics_events
        GROUP BY event_type
      `);
      
      res.json({ 
        daily: result.rows,
        totals: totalEvents.rows
      });
    } catch (error) {
      console.error("Error fetching analytics stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
