/* ════════════════════════════════════════════
   script.js — Krishna Peacock Wings x AI Tech
════════════════════════════════════════════ */

/* ── 1. TYPING EFFECT ── */
const words = [
    "Building Java Backends",
    "Learning System Design",
    "Shipping Projects Daily"
];
let wi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typingWord');

function type() {
    if (!typingEl) return;
    const word = words[wi];
    if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 40 : 80);
}
type();

/* ── 2. PEACOCK WINGS x AI NEURAL ENGINE ── */
const canvas = document.getElementById('tech-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const mouse = { x: null, y: null, radius: 200 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Track mouse position for interactive connections & CSS Glow
const mouseGlow = document.getElementById('mouse-glow');
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    if(mouseGlow) {
        mouseGlow.style.left = event.x + 'px';
        mouseGlow.style.top = event.y + 'px';
        mouseGlow.style.opacity = '1';
    }
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
    if(mouseGlow) mouseGlow.style.opacity = '0';
});

class PeacockNode {
    constructor() {
        this.reset();
        // Scatter initially so it doesn't start empty
        this.y = Math.random() * canvas.height; 
        this.x = Math.random() * canvas.width;
    }
    
    reset() {
        // Start from the bottom center (like the base of a peacock tail)
        this.x = (canvas.width / 2) + (Math.random() * 200 - 100);
        this.y = canvas.height + 50;
        this.size = Math.random() * 2 + 0.5;
        
        // Arc motion (flowing up and outward gracefully)
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 1.5 + 0.5;
        this.curve = (Math.random() - 0.5) * 0.05; // Creates the feather sweep
        
        // Colors: Gold, Teal, Emerald (Grace & Luck)
        const colors = ['255, 215, 0', '0, 229, 255', '0, 255, 136'];
        this.colorHex = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.8 + 0.2;
    }
    
    update() {
        // Calculate curved swooping motion
        this.angle += this.curve;
        this.x += Math.sin(this.angle) * this.speed;
        this.y -= this.speed * 1.5; // Flow upward

        // Interactive gravity: gently bend toward the mouse
        if (mouse.x && mouse.y) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                // Low gravity so they don't form blinding tight clusters
                this.x += dx * 0.005;
                this.y += dy * 0.005;
                this.baseAlpha = 1; // Flare up when touched
            }
        }

        // Reset if it flows off the top or sides
        if (this.y < -50 || this.x < -50 || this.x > canvas.width + 50) {
            this.reset();
        }
        
        this.draw();
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${this.colorHex}, ${this.baseAlpha})`;
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let numberOfNodes = (canvas.width * canvas.height) / 10000;
    if(numberOfNodes > 150) numberOfNodes = 150; 

    for (let i = 0; i < numberOfNodes; i++) {
        particlesArray.push(new PeacockNode());
    }
}

// Connect nodes close to each other AND close to the mouse
function connectParticles() {
    let maxDistance = 150;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = (dx * dx) + (dy * dy);
            
            if (distance < (maxDistance * maxDistance)) {
                let opacityValue = 1 - (distance / (maxDistance * maxDistance));
                
                let mouseDist = Infinity;
                if (mouse.x && mouse.y) {
                    let mdx = mouse.x - particlesArray[a].x;
                    let mdy = mouse.y - particlesArray[a].y;
                    mouseDist = (mdx*mdx) + (mdy*mdy);
                }

                ctx.beginPath();
                if(mouseDist < (mouse.radius * mouse.radius)) {
                    // Capped opacity and line width so it stays a delicate web
                    ctx.strokeStyle = `rgba(${particlesArray[a].colorHex}, ${opacityValue * 0.5})`;
                    ctx.lineWidth = 0.8;
                } else {
                    // Graceful, faint background web
                    ctx.strokeStyle = `rgba(${particlesArray[a].colorHex}, ${opacityValue * 0.15})`;
                    ctx.lineWidth = 0.5;
                }
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    
    // Fill with semi-transparent dark blue to create a graceful glowing motion trail
    ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

initParticles();
animateParticles();

/* ── 3. WHEEL MOTIF (Sudarshana Subtle Lines) ── */
const spokeGroup = document.getElementById('wheelSpokes');
if (spokeGroup) {
    const cx = 200, cy = 200, rInner = 175, rOuter = 192;
    const spokeCount = 24; 
    let spokesSVG = '';
    for (let i = 0; i < spokeCount; i++) {
        const angle = (i / spokeCount) * 2 * Math.PI;
        const x1 = cx + rInner * Math.cos(angle);
        const y1 = cy + rInner * Math.sin(angle);
        const x2 = cx + rOuter * Math.cos(angle);
        const y2 = cy + rOuter * Math.sin(angle);
        spokesSVG += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }
    spokeGroup.innerHTML = spokesSVG;
}

/* ── 4. HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navbar    = document.getElementById('navbar');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navbar.classList.toggle('open');
    document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navbar.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ── 5. ACTIVE NAV ON SCROLL ── */
const sections     = document.querySelectorAll('section[id], .home[id]');
const navLinks     = document.querySelectorAll('.nav-link');
const header       = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

function updateActiveNav() {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 10);
    scrollTopBtn.classList.toggle('visible', scrollY > 400);
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - header.offsetHeight - 80) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ── 6. SMOOTH SCROLL ── */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

/* ── 7. SCROLL TO TOP ── */
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── 8. SCROLL REVEAL (SMOOTH MAP TRANSITION) ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});
revealEls.forEach(el => revealObserver.observe(el));

/* ── 9. PRAGMATIC SCROLL MAP (DATA STREAM) ── */
window.addEventListener('scroll', () => {
    const scrollTracker = document.getElementById('scrollTracker');
    if(scrollTracker) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        scrollTracker.style.height = `${scrollPercent * 100}%`;
    }
});