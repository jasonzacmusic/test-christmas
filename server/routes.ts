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
        title: "The Wednesday Theme - Piano Tutorial",
        category: "Tutorial",
        link: "https://www.youtube.com/watch?v=ygkYKQU81Cw",
        description: "Learn Danny Elfman's hauntingly beautiful Wednesday theme step by step"
      },
      {
        title: "Addams Family Theme - Piano Tutorial",
        category: "Tutorial",
        link: "https://www.youtube.com/watch?v=zUwmfD6N0fU",
        description: "Master the iconic Addams Family theme with detailed breakdown"
      },
      {
        title: "Scary Chord Progressions Tutorial",
        category: "Tutorial",
        link: "https://www.youtube.com/watch?v=BaJu3_0bQSI",
        description: "Create dark, cinematic harmonies using tritones and diminished chords"
      },
      {
        title: "Thriller - Michael Jackson Piano",
        category: "Song",
        link: "https://www.youtube.com/watch?v=4V90AmXnguw",
        description: "Halloween classic - Thriller piano arrangement"
      },
      {
        title: "Ghostbusters Theme Piano",
        category: "Song",
        link: "https://www.youtube.com/watch?v=cK5G8fPmWeA",
        description: "The iconic Ghostbusters theme on piano"
      },
      {
        title: "This Is Halloween Piano",
        category: "Song",
        link: "https://www.youtube.com/watch?v=xpvdAJYvofI",
        description: "From The Nightmare Before Christmas"
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
