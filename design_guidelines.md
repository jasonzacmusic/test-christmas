# Design Guidelines: Nathaniel School of Music Halloween Specials

## Design Approach
**Cinematic Halloween Theme** - Dark, elegant, and sophisticated Halloween aesthetic avoiding cartoonish visuals. Draw inspiration from high-end horror cinematography with deep shadows, atmospheric lighting, and refined Gothic elements.

## Color Palette
- **Primary Dark**: Deep purple and black backgrounds
- **Accent**: Burnt orange for highlights, CTAs, and glowing effects
- **Overlays**: Dark gradient overlays on all visuals and video thumbnails for depth and text clarity
- **Effects**: Subtle orange glow for interactive elements, candlelight flicker effects in footer

## Typography
- **Headlines**: Gothic display font for dramatic impact and Halloween atmosphere
- **Body Text**: Clean, modern sans-serif for readability and sophistication
- **Hierarchy**: Large, bold typography throughout with clear size differentiation between heading levels

## Layout System
**Single-page responsive design** with smooth scrolling between sections. Minimal vertical scrolling approach - content organized efficiently.

### Spacing
- Consistent section padding with generous breathing room
- Clear visual separation between major sections using minimal icons (🕯️ 🧛 🕸️) as subtle dividers
- Mobile-first responsive approach that stacks elegantly on smaller screens

## Components & Sections

### 1. Sticky Header
- **Logo**: Nathaniel School of Music logo fixed top-right corner, small and elegant
- **Behavior**: Always visible on scroll with fade-in reveal animation on page load
- **Link**: Logo clickable, opens https://www.nathanielschool.com/

### 2. Hero Section
- **Background**: Dark cinematic gradient with subtle fog or candlelight glow animation
- **Images**: Two hero images (Jason 1, Jason 2) cross-fading every few seconds automatically
- **Title**: "🎃 Halloween Music Specials" in large gothic display font
- **Subtitle**: "Learn haunting piano chords and Halloween themes."
- **CTA**: "Book Your Halloween Pass 🎃" button with soft glowing hover effect, links to PracticeNow

### 3. Live Session Cards
- **Heading**: "🕸️ Halloween Live Sessions"
- **Layout**: Three elegant cards displayed horizontally (stack on mobile)
- **Card Content**: Date, Time, Class name, Duration, Description
- **Sessions**:
  - Saturday, Nov 1 | 6:30-7:30 AM | Scary Chord Progressions (60 min)
  - Sunday, Nov 2 | 6:45-8:15 AM | Music Factory – Halloween Themes (90 min)
  - Sunday, Nov 2 | 8:45-9:45 AM | Wednesday Theme Piano (60 min)
- **Single CTA**: "🎹 Book Now" button below all cards, glowing hover effect

### 4. Patreon Collection Section
- **Heading**: "🧙 Patreon Halloween Collection"
- **Image Carousel**: Five explainer images (Patreon 1-5) with smooth cross-fade animation, 4-second intervals, infinite loop
- **Description**: Text about notations, MIDI files, handwritten notes for Halloween classics
- **CTA**: "💀 Access on Patreon" button with glow effect

### 5. YouTube Songs & Tutorials
- **Heading**: "🎬 Halloween Songs & Tutorials"
- **Layout**: Two-subsection grid - Tutorials (left) and Songs (right), stacks vertically on mobile
- **Data Source**: Google Sheets (ID: 1QqeTbhU7ksJnLRC1j2aTT5bevsUD3vBzhVygEe438VA)
- **Video Cards**: Thumbnail, Title, Description, Embedded playable YouTube video
- **Auto-division**: Based on Category column from spreadsheet

### 6. Halloween Riffs Playlist
- **Heading**: "🎧 Halloween Riffs Playlist"
- **Description**: "A spooky selection of riffs and chord ideas..."
- **Layout**: Grid of videos from playlist, each with thumbnail, title, and embedded player
- **Playlist**: PLrNNL05e9FT-nmVSqhB5g0RD2yHEpuoRs
- **No CTA button** in this section

### 7. Footer
- **Social Icons**: YouTube, Instagram, Patreon, Website with respective links
- **Copyright**: "© 2025 Nathaniel School of Music | All Rights Reserved"
- **Effects**: Subtle orange glow or candle flicker near footer elements

## Decorative Images
**Three Halloween décor images** (Decor 1, 2, 3) placed tastefully throughout the site:
- Blend cinematically with dark gradient overlays
- Subtle placement, not distracting
- Enhance atmosphere without overwhelming content

## Interactive Elements
- **Buttons/CTAs**: Soft glowing hover effects in burnt orange
- **Video Embeds**: Playable directly on webpage with dark overlays on thumbnails
- **Smooth Transitions**: Between all sections and image cross-fades
- **Background Animations**: Subtle fog, candlelight flicker, or gradient motion

## Animations
- **Hero Images**: Cross-fade every few seconds
- **Logo**: Fade-in reveal on page load
- **Patreon Images**: 4-second cross-fade intervals, infinite loop
- **Hover States**: Soft glowing effects on all CTAs and interactive elements
- **Performance**: All animations optimized for mobile devices

## Technical Specifications
- Fully responsive single-page design
- SEO optimized with keywords: Halloween Music Lessons, Piano Workshops, Nathaniel School of Music, Halloween Songs, Wednesday Theme Piano, Jason Zac Piano
- Fast-loading with optimized images and efficient code
- Smooth scroll navigation between sections
- Dynamic content loading from Google Sheets API