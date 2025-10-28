# Nathaniel School of Music - Halloween Specials

## Overview
This single-page promotional website showcases Nathaniel School of Music's Halloween music specials, including live sessions, Patreon content, and YouTube videos. Designed with a cinematic Halloween aesthetic, it features dark, elegant visuals, minimal scrolling, smooth transitions, and a responsive, marketing-focused layout. The project aims to attract users to Halloween-themed music content and drive registrations for special events.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript (Vite build tool)
- **Routing**: Wouter (lightweight client-side routing)
- **UI Components**: Shadcn/ui (Radix UI primitives with custom "new-york" styling via Tailwind CSS and CSS variables)
- **State Management**: TanStack Query (React Query) for server state.
- **Styling**: Tailwind CSS with custom Halloween dark theme (deep purple, black, burnt orange), gothic fonts (Creepster, Nosifer) for headlines, Inter for body text, smooth animations.
- **Key Features**:
    - Sticky header with NSM logo and 10-track audio selector (keyboard shortcuts 1-10).
    - Hero section with prominent audio player (10 auto-cycling MP3 tracks), animated fog/candlelight effects, cross-fading hero images (desktop: Jason musician photos; mobile: custom CSS spooky design with floating orbs, gradients, and mist effects), and 3 localized Live Session cards (displaying IST and user's local time with country flags globally).
    - Animated "Book Your Halloween Pass" CTA button.
    - Patreon section with rotating image carousel.
    - YouTube section displaying curated "Music Concepts" and "Song Tutorials" videos.
    - Playlist section featuring 10 Halloween riff videos from YouTube.
    - Footer with social links and animated NSM logo.
    - Enhanced Halloween atmosphere with animated overlays, subtle gradient motions, and gentle scale animations on interactive elements.

### Backend
- **Server Framework**: Express.js with TypeScript.
- **API Structure**: RESTful endpoints for YouTube videos and playlist data.
- **Data Sources**: Google Sheets API for dynamic YouTube video content, YouTube API for playlist data, with a robust fallback data mechanism.
- **Server-Side Rendering**: Vite middleware for development (HMR) and static file serving for production.

### Data Storage & Content Management
- **Database**: Drizzle ORM configured with PostgreSQL (Neon Database) for future expansion (admin_users, live_sessions, youtube_videos, patreon_images tables defined but not actively used).
- **Type Safety**: Zod schemas for runtime validation of API data.
- **Current Content Management**:
    - **YouTube Videos**: Fetched dynamically from a public Google Sheet CSV (`1QqebhU7ksJnLRC1j2aTT5bevsUD3vBzhVygEe438VA`).
    - **Fallback Data**: Hardcoded in `server/routes.ts` for reliability when external services are unavailable.
    - **Live Sessions & Patreon**: Hardcoded directly within React components for seasonal content.

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
- **Google Sheets**: Primary content source for YouTube video metadata (`1QqeBhU7ksJnLRC1j2aTT5bevsUD3vBzhVygEe438VA`).
- **YouTube**: Embedded iframe players for video playback (Playlist ID: `PLrNNL05e9FT-nmVSqhB5g0RD2yHEpuoRs`).
- **PracticeNow**: External booking system for Halloween session registration (`https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7749`).

### Database
- **Neon Database**: Serverless PostgreSQL via `@neondatabase/serverless` (minimal current usage).

### UI Component Libraries
- **Radix UI**: Headless accessible UI primitives (e.g., accordion, dialog) for foundational components.
- **embla-carousel-react**: Carousel functionality.

### Development Tools (Replit-specific)
- `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`.

### Asset Management
- **Static Assets**: Stored in `attached_assets/` (hero images for desktop, Patreon images, NSM logos).
- **Audio**: 10 Halloween MP3 tracks (e.g., `01_1761662458015.mp3` to `10_1761662458016.mp3`) with auto-cycling and keyboard control.