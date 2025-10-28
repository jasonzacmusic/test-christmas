import { z } from "zod";

// YouTube Video from Google Sheets
export const youtubeVideoSchema = z.object({
  title: z.string(),
  category: z.enum(["Song", "Tutorial"]),
  link: z.string().url(),
  description: z.string(),
});

export type YouTubeVideo = z.infer<typeof youtubeVideoSchema>;

// YouTube Playlist Video
export const playlistVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string().url(),
});

export type PlaylistVideo = z.infer<typeof playlistVideoSchema>;

// Live Session
export const liveSessionSchema = z.object({
  id: z.string(),
  date: z.string(),
  time: z.string(),
  className: z.string(),
  duration: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type LiveSession = z.infer<typeof liveSessionSchema>;

// API Response Types
export const youtubeDataResponseSchema = z.object({
  videos: z.array(youtubeVideoSchema),
});

export const playlistDataResponseSchema = z.object({
  videos: z.array(playlistVideoSchema),
});

export type YouTubeDataResponse = z.infer<typeof youtubeDataResponseSchema>;
export type PlaylistDataResponse = z.infer<typeof playlistDataResponseSchema>;
