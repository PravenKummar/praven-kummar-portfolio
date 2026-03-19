// ============================================================
// Shared JS for all pages
// ============================================================

// AOS init (Check if AOS is defined, as it's deferred)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
});

// Header scroll effect with performance optimization
const header = document.getElementById('siteHeader');
if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const inner = header.querySelector('div');
                if (window.scrollY > 50) {
                    header.classList.add('header-scrolled');
                    if (inner) {
                        inner.classList.remove('py-5');
                        inner.classList.add('py-3');
                    }
                } else {
                    header.classList.remove('header-scrolled');
                    if (inner) {
                        inner.classList.remove('py-3');
                        inner.classList.add('py-5');
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animated counters
const counters = document.querySelectorAll('.counter');
if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                const useSep = el.dataset.separator === 'true';
                const start = performance.now();
                function tick(now) {
                    const p = Math.min((now - start) / 2000, 1);
                    const v = Math.round((1 - Math.pow(1 - p, 3)) * target);
                    el.textContent = useSep ? v.toLocaleString() : v;
                    if (p < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
}
