# Nathaniel School of Music - Halloween Specials

## Overview

This is a single-page promotional website for Nathaniel School of Music's Halloween music specials. The application showcases Halloween-themed music content including live sessions, Patreon collections, YouTube videos, and playlists. Built with a cinematic Halloween aesthetic featuring dark, elegant visuals with deep purple, black, and burnt orange color schemes.

The site is designed as a responsive, marketing-focused landing page with minimal vertical scrolling, smooth transitions, and a sophisticated horror cinematography-inspired design approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing (single-page application with minimal routes)

**UI Component Library**: Shadcn/ui (Radix UI primitives with custom styling)
- Provides accessible, customizable components
- Configured with "new-york" style variant
- Uses Tailwind CSS for styling with CSS variables for theming

**State Management**: TanStack Query (React Query) for server state management
- Handles data fetching from backend APIs
- Provides caching, background updates, and loading states
- No complex global state needed due to simple data flow

**Styling System**: 
- Tailwind CSS with custom configuration
- CSS variables for theming (Halloween dark theme by default)
- Custom color palette: deep purple backgrounds, burnt orange accents
- Gothic display fonts (Creepster, Nosifer) for headlines, Inter for body text
- Smooth animations and transitions throughout

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**API Structure**: RESTful endpoints serving JSON data
- `/api/youtube-videos` - Fetches curated Halloween video content from Google Sheets
- `/api/playlist-videos` - Returns YouTube playlist data

**Data Sources**:
- Google Sheets API integration for dynamic content management
- YouTube API integration for playlist videos
- Fallback data mechanism when external services are unavailable

**Server-Side Rendering**: Vite middleware integration for development
- Hot module replacement (HMR) for development
- Static file serving for production builds

### Component Architecture

**Page Structure**: Single home page with multiple sections
- Header (sticky navigation with school logo and ambient audio toggle)
- Hero Section (cross-fading hero images with CTA, animated fog effects, candlelight flickers)
- Live Sessions Section (card-based layout for three Halloween sessions)
- Patreon Section (rotating image carousel with CTA)
- YouTube Section (embedded video grid from Google Sheets data)
- Playlist Section (embedded playlist videos)
- Footer (social links and branding)

**Enhanced Halloween Atmosphere**:
- Animated fog drift overlays with purple and orange tinted radial gradients
- Candlelight flicker effects using CSS animations
- Smooth gradient background motion in hero section
- Ambient audio toggle in header (localStorage persistence, autoplay compliance)
  - Note: Currently uses silent WAV placeholder - replace data URI with actual Halloween ambient audio file

**Design Pattern**: Component composition with shared UI primitives
- Reusable card, button, and layout components
- Consistent spacing and visual hierarchy
- Mobile-first responsive design

### Data Storage

**Database Configuration**: Drizzle ORM with PostgreSQL dialect configured
- Schema defined in `shared/schema.ts`
- Currently using in-memory storage for user data (MemStorage class)
- Database credentials via environment variable `DATABASE_URL`
- Migration system in place but minimal database usage in current implementation

**Type Safety**: Zod schemas for runtime validation
- YouTube video data validation
- Playlist video validation
- Live session data validation

### Build and Deployment

**Development**: 
- Vite dev server with HMR
- TSX for TypeScript execution
- Development-only plugins: runtime error overlay, cartographer, dev banner

**Production Build**:
- Vite builds frontend to `dist/public`
- ESBuild bundles backend to `dist`
- Single-file server output with external packages

**Configuration Management**:
- Environment variables for sensitive data (DATABASE_URL, API keys)
- TypeScript path aliases for clean imports (@/, @shared, @assets)

## External Dependencies

### Third-Party Services

**Google Sheets**: Primary content management system
- Sheet ID: `1QqeTbhU7ksJnLRC1j2aTT5bevsUD3vBzhVygEe438VA`
- Serves YouTube video metadata (title, category, link, description)
- CSV export format for easy parsing
- Fallback data when sheet is unavailable

**YouTube**: 
- Playlist ID: `PLrNNL05e9FT-nmVSqhB5g0RD2yHEpuoRs` (Halloween Riffs Playlist)
- Embedded iframe players for video playback
- No direct API integration (uses public embed URLs)

**PracticeNow**: External booking system
- URL: `https://nathanielschool.practicenow.us/students/subscriptions?service=group_class&plan_id=7749`
- Used for Halloween session registration CTA

### Database

**Neon Database**: Serverless PostgreSQL
- Package: `@neondatabase/serverless`
- Connection via `DATABASE_URL` environment variable
- Minimal current usage (prepared for future features)

### UI Component Dependencies

**Radix UI**: Headless accessible UI primitives
- Multiple components: accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, etc.
- Provides keyboard navigation, ARIA compliance, and accessibility
- Customized with Tailwind styling

**Additional UI Libraries**:
- `embla-carousel-react`: Carousel/slider functionality
- `cmdk`: Command menu component
- `vaul`: Drawer component
- `react-day-picker`: Date picker
- `recharts`: Charting (included but not actively used)

### Form Handling

**React Hook Form**: Form state management
- Package: `react-hook-form` with `@hookform/resolvers`
- Zod integration for validation
- Not heavily used in current marketing page

### Development Tools

**Replit Plugins**:
- `@replit/vite-plugin-runtime-error-modal`: Error overlay
- `@replit/vite-plugin-cartographer`: Code navigation
- `@replit/vite-plugin-dev-banner`: Development banner
- Conditionally loaded only in Replit development environment

### Asset Management

**Static Assets**: Stored in `attached_assets/` directory
- Hero images: Jason 1, Jason 2 (cross-fading background)
- Patreon collection images: 5 rotating promotional images
- Décor images: 3 Halloween-themed decorative images
- Vite alias: `@assets` for clean imports