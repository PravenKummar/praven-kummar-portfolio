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
