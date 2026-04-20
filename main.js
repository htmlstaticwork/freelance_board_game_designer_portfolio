// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Load Theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
}

// RTL Toggle
const rtlToggle = document.getElementById('rtl-toggle');
if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
        const isRtl = document.documentElement.dir === 'rtl';
        document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
        localStorage.setItem('dir', isRtl ? 'ltr' : 'rtl');
    });
}

// Load RTL
if (localStorage.getItem('dir') === 'rtl') {
    document.documentElement.dir = 'rtl';
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('fa-bars');
        hamburger.classList.toggle('fa-times');
    });
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .card, .animate-on-scroll, [class*="reveal-"], .zoom-in, .blur-in, .skew-in, .rotate-in').forEach(el => {
    observer.observe(el);
});

// Dynamic Modal Logic
function openGameModal(btn) {
    const modal = document.getElementById('game-modal');
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-desc');
    const img = btn.getAttribute('data-image');
    
    if (modal) {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        document.getElementById('modal-img').src = img;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeGameModal() {
    const modal = document.getElementById('game-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        closeGameModal();
    }
}
// Active Navigation State Logic
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Normalize paths
    // If we're at root, handle 'index.html' specifically
    if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('index.html')) {
        if (linkHref === 'index.html') {
            link.classList.add('active');
        }
    } else if (currentPath.includes(linkHref)) {
        link.classList.add('active');
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
