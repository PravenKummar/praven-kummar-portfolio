// ============================================================
// Shared JS for all pages
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            duration: 800, 
            easing: 'ease-out-quart', 
            once: true, 
            offset: 100 
        });
    }

    // 2. Header Scroll Effect & Scroll Progress
    const header = document.getElementById('siteHeader');
    const scrollProgress = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        // Header background toggle
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Progress Bar logic
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + "%";
        }
    });

    // 3. Active Navigation Link Indicator
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        const normalizedPath = currentPath === '/' ? 'index.html' : currentPath.replace('/', '');
        
        if (normalizedPath.includes(linkPath.replace('.html', '')) || 
           (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('nav-link-active');
            link.classList.remove('text-muted-foreground');
        }
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 5. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseout', function() {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // 6. Dynamic Hero Glow (Mouse Follow)
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            heroGlow.style.left = x + 'px';
            heroGlow.style.top = y + 'px';
        });
    }

    // 7. Counter Animation (Refined)
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const inc = Math.ceil(target / speed);

            if (count < target) {
                const newVal = count + inc > target ? target : count + inc;
                counter.innerText = counter.getAttribute('data-separator') === 'true' 
                    ? newVal.toLocaleString() 
                    : newVal;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = counter.getAttribute('data-separator') === 'true' 
                    ? target.toLocaleString() 
                    : target;
            }
        };
        updateCount();
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});

// ============================================================
// Project Filtering (for projects.html)
// ============================================================
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('bg-foreground', 'text-background');
            btn.classList.remove('border-border', 'text-muted-foreground');
        } else {
            btn.classList.remove('bg-foreground', 'text-background');
            btn.classList.add('border-border', 'text-muted-foreground');
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}
