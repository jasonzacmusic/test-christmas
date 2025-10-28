import { z } from "zod";
import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

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

// Database Tables
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const liveSessionsTable = pgTable("live_sessions", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  className: text("class_name").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const youtubeVideosTable = pgTable("youtube_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  link: text("link").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const patreonImagesTable = pgTable("patreon_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analyticsEventsTable = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(),
  eventData: text("event_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
});

export const insertLiveSessionSchema = createInsertSchema(liveSessionsTable).omit({
  id: true,
  createdAt: true,
});

export const insertYoutubeVideoSchema = createInsertSchema(youtubeVideosTable).omit({
  id: true,
  createdAt: true,
});

export const insertPatreonImageSchema = createInsertSchema(patreonImagesTable).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEventsTable).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type InsertLiveSession = z.infer<typeof insertLiveSessionSchema>;
export type InsertYoutubeVideo = z.infer<typeof insertYoutubeVideoSchema>;
export type InsertPatreonImage = z.infer<typeof insertPatreonImageSchema>;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;

export type SelectAdminUser = typeof adminUsers.$inferSelect;
export type SelectLiveSession = typeof liveSessionsTable.$inferSelect;
export type SelectYoutubeVideo = typeof youtubeVideosTable.$inferSelect;
export type SelectPatreonImage = typeof patreonImagesTable.$inferSelect;
export type SelectAnalyticsEvent = typeof analyticsEventsTable.$inferSelect;
