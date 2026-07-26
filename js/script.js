// ============================================================
// Respect reduced motion
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// Hero "decrypt" scramble reveal
// ============================================================
function scrambleReveal(el){
  const finalText = el.dataset.text || el.textContent;
  const glyphs = "!<>-_\\/[]{}—=+*^?#01ABCDEF";
  const duration = 900; // ms
  const frameRate = 40; // ms per frame
  let frame = 0;
  const totalFrames = Math.floor(duration / frameRate);

  if (prefersReducedMotion) {
    el.textContent = finalText;
    return;
  }

  const interval = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const revealCount = Math.floor(progress * finalText.length);

    let out = "";
    for (let i = 0; i < finalText.length; i++){
      if (finalText[i] === " "){ out += " "; continue; }
      if (i < revealCount){
        out += finalText[i];
      } else {
        out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
    }
    el.textContent = out;

    if (frame >= totalFrames){
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, frameRate);
}

window.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('scrambleTarget');
  if (target) scrambleReveal(target);
});

// ============================================================
// Scroll reveal for sections
// ============================================================
document.querySelectorAll('.section, .hero__stage').forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// hero is visible immediately (above the fold)
window.addEventListener('load', () => {
  document.querySelector('.hero__stage')?.classList.add('is-visible');
});

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Footer year
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
