# Portfolio Redesign — Luxury Single Page

## Overview

Redesign praven-kummar-portfolio from a multi-page Tailwind site into a single-page luxury dark portfolio. Executive authority aesthetic, data-forward, rich animations. Consolidates index.html, about.html, projects.html, experience.html into one scrollable page.

## Design Decisions

- **Aesthetic**: Refined indigo tech authority (option C from brainstorm)
- **Purpose**: Credibility piece first, resume download secondary
- **Structure**: Single page, alternating full-bleed sections (option A)
- **Motion**: Rich — parallax, staggered animations, scroll-triggered reveals (option C)
- **Responsive**: Mobile-first, desktop and mobile fully supported

## Typography & Color

- Display: Plus Jakarta Sans 700 (headings)
- Body: Inter 300-500
- Background: #09090b (zinc 950), alternating sections #0f0f12
- Text: #fafafa primary, rgba(255,255,255,0.4) muted
- Accent: #6366f1 (indigo 500) — progress bars, active states, hover glows
- Borders: rgba(255,255,255,0.05)

## Navigation

- Fixed top bar, transparent on load, glass blur on scroll
- Logo "PK" left, section links center (scroll-spy), "Download Resume" right
- Mobile: hamburger, full-screen overlay with staggered link animations
- Scroll progress bar (indigo, 2px) fixed at top

## Sections

### 1. Hero (100vh)

- Large "Praven Kummar" display font, staggered letter animation on load
- "Regional IT Project Manager" subtitle fades in after name
- One-line positioning statement fades in last
- Stats row with counter animation: $10M (Largest Project) / 90+ (Delivered) / 1,284 (Servers) / 10,268 (Endpoints) / 10 (Countries)
- Radial gradient glow follows mouse
- Scroll-down chevron with bounce animation

### 2. About (alternating bg: #0f0f12)

- Two-column desktop: section label + heading left, summary paragraph right
- Industry badges: glass pills (Banking, FinTech, Aviation, Government, Medical)
- Vendor vs end-user: two glass cards side by side
- Fade-in-up on scroll, staggered 100ms

### 3. Impact Numbers (parallax)

- Full-bleed dark section with dot-grid background pattern
- 3 large animated horizontal progress bars showing different metrics than hero (e.g. project success rate, regional coverage, years of experience)
- Numbers animate on scroll into view — distinct data from hero stats to avoid redundancy
- Parallax: background at 0.5x scroll speed

### 4. Featured Projects

- All projects from existing projects.html as staggered grid (2 cols desktop, 1 col mobile)
- Each card: glass bg, project name, dollar value, tech stack tags, one-line outcome
- Hover: lift, indigo border glow, "View details" arrow
- Stagger in from bottom, 150ms delay between cards

### 5. Experience Timeline

- Vertical indigo line with dot markers
- Cards alternate left/right on desktop, stack on mobile
- Current role: emerald dot + "Current" badge
- Each card: company, title, date range, 1-2 key achievements
- Cards slide in from respective sides on scroll

### 6. Technical Expertise

- 3-col grid desktop, 1-col mobile
- Categories: Governance & PMO, Compliance, Cybersecurity, Cloud Infrastructure, Enterprise Systems, Integration
- Each: title + skill tags
- Subtle hover: border brightens

### 7. Certifications & Education

- Two-column: certifications left, education right
- Clean text with subtle dividers, no cards

### 8. Footer

- Centered: email, LinkedIn
- "Download Resume" button (indigo, prominent)
- Copyright line
- Gradient line at top

## Responsive Strategy

- Mobile-first Tailwind breakpoints (md: 768px, lg: 1024px)
- All grids collapse to single column on mobile
- Hero stats: 2-col grid on mobile
- Timeline: single-column stack
- Nav: hamburger with full-screen overlay
- 44px minimum tap targets
- Parallax disabled on mobile (performance)

## Animation Approach

- Scroll animations: Intersection Observer (no heavy library)
- CSS keyframes: fadeInUp, staggered delays, counter increment
- Parallax: scroll event + requestAnimationFrame
- Magnetic button effect on CTAs
- Respects `prefers-reduced-motion` media query

## Files Changed

- `index.html` — complete rewrite, single page with all sections
- `base-styles.css` — updated with new section styles, animations, parallax
- `input.css` — unchanged (Tailwind directives)
- `main.js` — rewritten for single-page: scroll-spy, parallax, Intersection Observer animations, mobile menu, counter animations
- `tailwind.config.js` — add alternating bg color, any new utilities
- `about.html`, `projects.html`, `experience.html` — moved to `_archive/` (zero-deletions policy; content merged into index.html)

## Content Source

All text, stats, project descriptions, and experience entries pulled from existing HTML files. No new content needed.

## Out of Scope

- CMS or dynamic content
- Contact form
- Blog
- Dark/light theme toggle
