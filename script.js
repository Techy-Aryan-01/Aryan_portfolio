/* ═══════════════════════════════════════════
   KESHAV GOYAL PORTFOLIO — SCRIPTS
═══════════════════════════════════════════ */

// ── CURSOR GLOW ──────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

// ── PARTICLE CANVAS ───────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];
let animId;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size  = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '99,102,241' : '6,182,212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor(window.innerWidth / 10), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animId = requestAnimationFrame(animate);
}

initParticles();
animate();

// ── NAVBAR ────────────────────────────────────
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

function updateActiveNav() {
  const sections = ['home','about','skills','achievements','projects','contact'];
  const scrollPos = window.scrollY + 100;
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ── HERO ROLE SLIDER ─────────────────────────
const roles = document.querySelectorAll('.role');
let roleIdx = 0;

function rotateRole() {
  roles[roleIdx].classList.remove('active');
  roleIdx = (roleIdx + 1) % roles.length;
  roles[roleIdx].classList.add('active');
}
setInterval(rotateRole, 2500);

// ── COUNTER ANIMATION ─────────────────────────
function animateCounter(el, target, suffix) {
  const duration = 1800;
  const start    = performance.now();
  const update   = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);
    el.textContent = current.toLocaleString() + (progress === 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  const pills = document.querySelectorAll('.stat-pill');
  pills.forEach(pill => {
    const target = parseInt(pill.dataset.target);
    const suffix = pill.dataset.suffix;
    const numEl  = pill.querySelector('.stat-num');
    if (numEl) animateCounter(numEl, target, suffix);
  });
}

// ── SKILL BARS ANIMATION ──────────────────────
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const w = bar.dataset.width;
    setTimeout(() => { bar.style.width = w + '%'; }, 100);
  });
}

// ── SCROLL REVEAL ─────────────────────────────
function addRevealClasses() {
  const targets = [
    '.about-grid',
    '.skill-category',
    '.achieve-card',
    '.project-card',
    '.timeline-card',
    '.contact-card',
    '.contact-cta-box',
    '.achieve-badge',
    '.badge-row',
  ];
  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 80) + 'ms';
    });
  });
}
addRevealClasses();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Trigger counters when hero stats visible
      if (entry.target.closest('#home')) startCounters();
      
      // Trigger bars when skills section visible
      if (entry.target.closest('#skills')) animateBars();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Also observe stats section
const heroSection = document.getElementById('home');
const skillsSection = document.getElementById('skills');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target === heroSection) startCounters();
      if (entry.target === skillsSection) animateBars();
    }
  });
}, { threshold: 0.3 });

if (heroSection) statsObserver.observe(heroSection);
if (skillsSection) statsObserver.observe(skillsSection);

// Start counters immediately since hero is visible on load
setTimeout(startCounters, 600);

// ── CODE CARD TILT ────────────────────────────
const codeCard = document.getElementById('codeCard');
if (codeCard) {
  codeCard.addEventListener('mousemove', (e) => {
    const rect = codeCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    codeCard.style.transform = `rotate(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  });
  codeCard.addEventListener('mouseleave', () => {
    codeCard.style.transform = '';
  });
}

// ── SMOOTH ANCHOR SCROLL ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PAGE LOAD ANIMATION ────────────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
