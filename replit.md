# Nathaniel School of Music - Christmas Workshops

## Overview
This single-page promotional website showcases Nathaniel School of Music's Christmas music workshops. Designed with a festive Christmas aesthetic featuring dark theme with red, green, and gold accents, it includes smooth animations, snowflakes, twinkling stars, and festive effects. The project aims to attract users to Christmas-themed music workshops and drive registrations for the special event.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript (Vite build tool)
- **Routing**: Wouter (lightweight client-side routing)
- **UI Components**: Shadcn/ui (Radix UI primitives with custom "new-york" styling via Tailwind CSS and CSS variables)
- **State Management**: TanStack Query (React Query) for server state.
- **Styling**: Tailwind CSS with custom Christmas dark theme (red, green, gold), Inter for all text, smooth animations including snowfall, twinkling stars, and sparkle effects.
- **Social Sharing**: Open Graph meta tags configured with NSM logo for WhatsApp, Facebook, Twitter, LinkedIn sharing.
- **Key Features**:
    - Sticky header with NSM logo and 10-track audio selector (keyboard shortcuts 1-10).
    - Hero section with prominent audio player (10 auto-cycling Christmas carol MP3 tracks), animated snowflakes (50), twinkling stars (30), sparkles (15), with festive red/green gradients and glow effects. Large play/pause button, track selector buttons 1-10, and current track display showing carol names.
    - Animated "Join the Christmas Workshops" CTA button with red glow effect.
    - Workshops section featuring 8 detailed workshop cards covering Christmas carols, music theory, ear training, genre exploration, and arrangement skills.
    - Footer with YouTube and Instagram social links.
    - Enhanced Christmas atmosphere with animated overlays, gentle pulse effects, snowfall, twinkling stars, and festive color schemes.

### Backend
- **Server Framework**: Express.js with TypeScript.
- **API Structure**: RESTful endpoints for YouTube videos and playlist data.
- **Data Sources**: Google Sheets API for dynamic YouTube video content, YouTube API for playlist data, with a robust fallback data mechanism.
- **Server-Side Rendering**: Vite middleware for development (HMR) and static file serving for production.

### Data Storage & Content Management
- **Database**: Drizzle ORM configured with PostgreSQL (Neon Database) for future expansion (analytics events tracking).
- **Type Safety**: Zod schemas for runtime validation of API data.
- **Current Content Management**:
    - **Workshops**: Hardcoded directly within React components with 8 workshop details including titles, descriptions, and icons.

### Analytics
- **Tracking System**: Simple event tracking for user engagement.
- **Storage**: `analyticsEventsTable` in PostgreSQL.
- **Backend API**: POST `/api/analytics/track` for recording, GET `/api/analytics/stats` for dashboard data.
- **Frontend Tracking**: Lightweight utility in `client/src/lib/analytics.ts` for non-blocking event dispatch.
- **Tracked Events**: CTA clicks (hero, Patreon).

### Build and Deployment
- **Development**: Vite dev server with HMR, TSX.
- **Production**: Vite for frontend, ESBuild for backend (single-file output).
- **Configuration**: Environment variables for sensitive data, TypeScript path aliases.

## External Dependencies

### Third-Party Services
- **PracticeNow**: External booking system for Christmas workshop registration (`https://nathanielschool.practicenow.us/students/subscriptions?service=group_class`).

### Database
- **Neon Database**: Serverless PostgreSQL via `@neondatabase/serverless` (minimal current usage).

### UI Component Libraries
- **Radix UI**: Headless accessible UI primitives (e.g., accordion, dialog) for foundational components.
- **embla-carousel-react**: Carousel functionality.

### Development Tools (Replit-specific)
- `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`.

### Asset Management
- **Static Assets**: Stored in `attached_assets/` (Christmas Workshop Details RTF).
- **Audio**: 10 Christmas carol MP3 tracks with names like "Jesu Joy of Man's Desiring", "Joy to the World", "Silent Night", etc., with auto-cycling and keyboard control (keys 1-10).