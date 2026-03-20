# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio from 4 separate HTML pages into one luxury single-page site with rich animations, parallax, and responsive mobile support.

**Architecture:** Static single-page site using Tailwind CSS v3.4.17 (via PostCSS), vanilla JS with Intersection Observer for scroll animations, requestAnimationFrame for parallax. No frameworks. Deployed as static files on Vercel.

**Tech Stack:** HTML5, Tailwind CSS 3.4.17, PostCSS, vanilla JavaScript, Google Fonts (Inter, Plus Jakarta Sans)

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-redesign-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `index.html` | Rewrite | Single-page with all 8 sections |
| `base-styles.css` | Rewrite | Custom classes: glass, parallax, timeline, animations, dot-grid |
| `main.js` | Rewrite | Scroll-spy, parallax, Intersection Observer, counters, mobile menu, magnetic buttons |
| `tailwind.config.js` | Modify | Add alternating bg color `#0f0f12`, animation utilities |
| `input.css` | Keep | Unchanged (Tailwind directives) |
| `_archive/about.html` | Move | Archive old page |
| `_archive/projects.html` | Move | Archive old page |
| `_archive/experience.html` | Move | Archive old page |

---

## Task 1: Setup — Archive old pages, update Tailwind config

**Files:**
- Move: `about.html` → `_archive/about.html`
- Move: `projects.html` → `_archive/projects.html`
- Move: `experience.html` → `_archive/experience.html`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Create _archive directory and move old pages**

```bash
mkdir -p _archive
mv about.html _archive/
mv projects.html _archive/
mv experience.html _archive/
```

- [ ] **Step 2: Update tailwind.config.js with new colors and animations**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        "background-alt": "#0f0f12",
        foreground: "#fafafa",
        card: {
          DEFAULT: "#18181b",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#6366f1",
          foreground: "#fafafa",
        },
        border: "#27272a",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-in-left": "slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        bounce: "bounce 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Commit**

```bash
git add _archive/ tailwind.config.js
git commit -m "chore: archive old pages, update Tailwind config for redesign"
```

---

## Task 2: Write base-styles.css — all custom classes

**Files:**
- Rewrite: `base-styles.css`

- [ ] **Step 1: Write the complete base-styles.css**

```css
/* ============================================================
   Portfolio — Custom Styles
   ============================================================ */

/* Base */
body {
    font-family: 'Inter', sans-serif;
    background: #09090b;
    color: #fafafa;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}

.font-display { font-family: 'Plus Jakarta Sans', sans-serif; }

html { scroll-behavior: smooth; }
::selection { background: rgba(99, 102, 241, 0.2); color: #fafafa; }

/* Scroll Progress Bar */
#scrollProgress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: #6366f1;
    z-index: 200;
    transition: width 0.1s ease-out;
}

/* Navigation */
.nav-glass {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-scrolled {
    background: rgba(9, 9, 11, 0.85) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-link {
    position: relative;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link-active {
    color: #fafafa;
}

.nav-link-active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background: #6366f1;
}

/* Mobile Menu Overlay */
.mobile-menu {
    position: fixed;
    inset: 0;
    background: rgba(9, 9, 11, 0.98);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 90;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

.mobile-menu.active {
    opacity: 1;
    pointer-events: all;
}

.mobile-menu a {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu.active a {
    opacity: 1;
    transform: translateY(0);
}

/* Glassmorphism */
.glass {
    background: rgba(24, 24, 27, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-pill {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
}

.glass-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(99, 102, 241, 0.2);
}

/* Hero */
.hero-glow {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(99, 102, 241, 0.06) 0%, transparent 70%);
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
}

/* Dot Grid Background */
.dot-grid {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 32px 32px;
}

/* Parallax Section */
.parallax-bg {
    will-change: transform;
    transition: transform 0.1s linear;
}

/* Progress Bar (Impact Section) */
.progress-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: #6366f1;
    border-radius: 2px;
    width: 0%;
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Project Cards */
.project-card {
    background: rgba(24, 24, 27, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
    background: rgba(24, 24, 27, 0.8);
    border-color: rgba(99, 102, 241, 0.2);
    transform: translateY(-6px);
}

/* Timeline */
.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(99, 102, 241, 0.2);
    transform: translateX(-50%);
}

.timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #09090b;
    border: 2px solid #6366f1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.timeline-dot-current {
    border-color: #10b981;
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.3);
}

.timeline-card {
    background: rgba(24, 24, 27, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}

.timeline-card:hover {
    border-color: rgba(99, 102, 241, 0.15);
}

/* Mobile timeline */
@media (max-width: 767px) {
    .timeline-line {
        left: 20px;
    }
    .timeline-dot {
        left: 20px;
    }
}

/* Skill Tags */
.skill-tag {
    padding: 0.25rem 0.75rem;
    font-size: 0.7rem;
    font-weight: 500;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #a1a1aa;
    transition: all 0.3s ease;
}

.skill-tag:hover {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);
    color: #c7d2fe;
}

/* Expertise Card */
.expertise-card {
    background: rgba(24, 24, 27, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: all 0.3s ease;
}

.expertise-card:hover {
    border-color: rgba(99, 102, 241, 0.15);
    background: rgba(24, 24, 27, 0.5);
}

/* Section Divider */
.section-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent);
}

/* Magnetic Button */
.magnetic-btn {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Hero Letter Animation */
.hero-name span {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px);
    animation: letterReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes letterReveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Scroll Reveal */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

.reveal-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-right {
    opacity: 0;
    transform: translateX(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-left.revealed,
.reveal-right.revealed {
    opacity: 1;
    transform: translateX(0);
}

/* Stagger Delays */
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
.stagger-3 { transition-delay: 0.3s; }
.stagger-4 { transition-delay: 0.4s; }
.stagger-5 { transition-delay: 0.5s; }
.stagger-6 { transition-delay: 0.6s; }
.stagger-7 { transition-delay: 0.7s; }

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
    .parallax-bg {
        transform: none !important;
    }
    .reveal, .reveal-left, .reveal-right {
        opacity: 1;
        transform: none;
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add base-styles.css
git commit -m "feat: rewrite base-styles.css for luxury single-page design"
```

---

## Task 3: Write main.js — all interactivity

**Files:**
- Rewrite: `main.js`

- [ ] **Step 1: Write the complete main.js**

```js
// ============================================================
// Portfolio — Main JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrollPercent + "%";
  }

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById("mainNav");
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }

  // --- Scroll Spy ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 200;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("nav-link-active");
          if (link.getAttribute("data-section") === id) {
            link.classList.add("nav-link-active");
          }
        });
      }
    });
  }

  // --- Combined Scroll Handler ---
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateNav();
        updateScrollSpy();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Mobile Menu ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
      // Stagger link animations
      const links = mobileMenu.querySelectorAll("a");
      links.forEach((link, i) => {
        link.style.transitionDelay = mobileMenu.classList.contains("active")
          ? `${0.1 + i * 0.08}s`
          : "0s";
      });
    });
    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // --- Hero Name Letter Animation ---
  const heroName = document.querySelector(".hero-name");
  if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = "";
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${0.05 * i}s`;
      heroName.appendChild(span);
    });
  }

  // --- Hero Glow Follow Mouse ---
  const heroGlow = document.querySelector(".hero-glow");
  if (heroGlow) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      heroGlow.style.left = x + "%";
      heroGlow.style.top = y + "%";
    });
  }

  // --- Intersection Observer: Reveal on Scroll ---
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Counter Animation ---
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // --- Progress Bar Animation ---
  const progressFills = document.querySelectorAll(".progress-fill");
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target.getAttribute("data-width");
          entry.target.style.width = target;
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  progressFills.forEach((el) => progressObserver.observe(el));

  // --- Parallax ---
  const parallaxElements = document.querySelectorAll(".parallax-bg");
  function updateParallax() {
    // Disable on mobile for performance
    if (window.innerWidth < 768) return;
    parallaxElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.5;
      const yPos = -(rect.top * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }

  // --- Magnetic Buttons ---
  const magneticBtns = document.querySelectorAll(".magnetic-btn");
  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // --- Reduced Motion Check ---
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    // Skip parallax and show all reveals immediately
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      el.classList.add("revealed");
    });
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = prefix + target.toLocaleString() + suffix;
    });
  }

  // --- Initialize ---
  updateScrollProgress();
  updateNav();
  updateScrollSpy();
});
```

- [ ] **Step 2: Commit**

```bash
git add main.js
git commit -m "feat: rewrite main.js with scroll-spy, parallax, reveal animations"
```

---

## Task 4: Write index.html — Sections 1-4 (Hero, About, Impact, Projects)

**Files:**
- Rewrite: `index.html` (first half)

- [ ] **Step 1: Write index.html with head, nav, and sections 1-4**

Write the complete `index.html` file. This step writes sections 1 through 4. Task 5 will append sections 5-8 by editing the same file.

The HTML must include:
- Full `<head>` with meta tags, Open Graph, structured data (from existing index.html)
- Google Fonts preconnect + stylesheet links (Inter, Plus Jakarta Sans)
- AOS removed — using custom Intersection Observer instead
- `#scrollProgress` div
- Fixed navigation with scroll-spy `data-section` attributes, mobile hamburger, "Download Resume" link to `Praven-Kummar-Resume.pdf`
- Mobile menu overlay
- **Section 1 (Hero):** id="hero", 100vh, hero-glow div, staggered reveal name/title/statement, stats row with `data-count` / `data-prefix` / `data-suffix` attributes, scroll chevron with bounce animation
- **Section 2 (About):** id="about", bg-background-alt, two-column layout, industry glass-pills, vendor/end-user glass cards
- **Section 3 (Impact):** id="impact", dot-grid parallax bg, 3 horizontal progress bars (Project Success Rate 95%, Regional Coverage 8 Countries, Years of Experience 10+)
- **Section 4 (Projects):** id="projects", all 7 project cards in staggered grid

All text content pulled from the archived HTML files in `_archive/`. Read `_archive/index.html`, `_archive/about.html`, `_archive/projects.html`, `_archive/experience.html` to extract exact text, stats, project details, and experience entries. Every visible element gets `reveal` or `reveal-left`/`reveal-right` class with appropriate `stagger-N` delays.

- [ ] **Step 2: Quick build to verify rendering**

```bash
npm run build && open index.html
```

Note: Must rebuild styles.css after writing new HTML so Tailwind generates the correct utility classes. Without this, the page will appear unstyled.

Check: nav visible, hero displays, sections scroll. No broken layout.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: write index.html sections 1-4 (hero, about, impact, projects)"
```

---

## Task 5: Write index.html — Sections 5-8 (Experience, Expertise, Certs, Footer)

**Files:**
- Modify: `index.html` (append before closing `</main>` or `</body>`)

- [ ] **Step 1: Add sections 5-8 to index.html**

Insert before the closing `</body>` tag:

- **Section 5 (Experience Timeline):** id="experience", relative container with `.timeline-line`, 4 entries alternating left/right on desktop (use md:flex-row-reverse for alternating). Current role (DataPost) gets `.timeline-dot-current` with emerald styling. Each entry: company, title, dates, 1-2 key achievements, tech tags. Mobile: single column, all cards left of line.
  - DataPost Pte Ltd — Regional IT Project Manager — Jan 2024 – Present
  - Great Eastern Life — VP, IT Project Manager — May 2021 – Dec 2023
  - Techlab Security — Cyber Security Project Manager — Apr 2019 – May 2021
  - Carl Zeiss Pte Ltd — IT Project Manager, APAC — Mar 2017 – Apr 2019

- **Section 6 (Technical Expertise):** id="expertise", bg-background-alt, 3-col grid of `.expertise-card` divs. Categories: Governance & PMO, Compliance & Risk, Cybersecurity, Cloud Infrastructure, Enterprise Systems, Integration & IoT. Each has title + `.skill-tag` spans.

- **Section 7 (Certifications & Education):** id="certifications", two-column: left lists certs (PRINCE2, AWS, IBM QRadar, ITIL, Scrum, 79+ LinkedIn Learning), right shows education (B.Sc. BIS, First Class Honours) and languages.

- **Section 8 (Footer):** Full-width footer with gradient-line top divider, centered content: email (pravenkummar@outlook.com), LinkedIn link, prominent "Download Resume" magnetic-btn, copyright line.

- `<script src="main.js"></script>` before `</body>`

- [ ] **Step 2: Rebuild and verify complete page in browser**

```bash
npm run build && open index.html
```

Check: all 8 sections render, timeline alternates, footer displays.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add sections 5-8 (experience, expertise, certs, footer)"
```

---

## Task 6: Build CSS and test responsive

**Files:**
- Regenerate: `styles.css` (via PostCSS build)

- [ ] **Step 1: Install dependencies and build**

```bash
cd /Users/praven/praven-kummar-portfolio
npm install
npm run build
```

Expected: `styles.css` regenerated with all Tailwind utilities used in the new index.html.

- [ ] **Step 2: Verify file size is reasonable**

```bash
wc -c styles.css
```

Expected: 15-25KB (similar to or larger than original 16.9KB).

- [ ] **Step 3: Test in browser — desktop**

```bash
open index.html
```

Check all sections:
- Nav: transparent → glass on scroll, scroll-spy highlights active section
- Hero: glow follows mouse, counters animate, chevron bounces
- About: two-column, glass pills, vendor/end-user cards
- Impact: dot-grid visible, progress bars animate on scroll, parallax effect
- Projects: cards stagger in, hover lifts with indigo glow
- Timeline: alternates left/right, current role has emerald dot
- Expertise: 3-col grid, skill tags hover
- Certs: two-column clean layout
- Footer: resume button, links

- [ ] **Step 4: Test responsive — mobile (use browser DevTools)**

Resize to 375px width or use Chrome DevTools mobile emulation:
- Nav hamburger visible, menu overlay works
- Hero stats: 2-col grid
- All grids: single column
- Timeline: single column, line on left
- Tap targets: minimum 44px
- No horizontal overflow

- [ ] **Step 5: Fix any issues found**

Address any layout breaks, animation glitches, or responsive issues.

- [ ] **Step 6: Commit**

```bash
git add styles.css
git commit -m "build: regenerate styles.css with complete Tailwind utilities"
```

---

## Task 7: Final polish and deploy

**Files:**
- Modify: `sitemap.xml` (remove old page URLs)
- Modify: `robots.txt` (if needed)

- [ ] **Step 1: Update sitemap.xml**

Remove entries for `about.html`, `projects.html`, `experience.html`. Keep only the root URL. Update `<lastmod>` to today's date.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://praven-kummar-portfolio.vercel.app/</loc>
    <lastmod>2026-03-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Update .gitignore to include _archive in repo**

Verify `_archive/` is NOT in `.gitignore` (we want it tracked).

- [ ] **Step 3: Commit and push**

```bash
git add sitemap.xml
git commit -m "chore: update sitemap for single-page site"
git push
```

- [ ] **Step 4: Verify Vercel deployment**

Wait 1-2 minutes for Vercel auto-deploy. Check https://praven-kummar-portfolio.vercel.app/ loads correctly with full styling.

- [ ] **Step 5: Test live site on mobile device**

Open the Vercel URL on a phone. Verify:
- Mobile menu works
- All sections readable
- Animations trigger on scroll
- No horizontal scroll
- Resume download works
