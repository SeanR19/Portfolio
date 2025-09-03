// js/main.js
import { inView, animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===================== PROJECTS: helpers ===================== */
function primeProjectCards() {
  if (reduce) return;
  document.querySelectorAll(".projects-grid .project-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.willChange = "transform, opacity";
  });
}

function revealProjectCards() {
  const cards = document.querySelectorAll(".projects-grid .project-card");
  if (!cards.length) return;

  if (reduce) {
    cards.forEach(el => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; });
    return;
  }
  animate(
    cards,
    { opacity: 1, transform: "translateY(0)" },
    { delay: stagger(0.1), duration: 0.6, easing: "cubic-bezier(.22,.61,.36,1)" }
  );
}

/* ===================== HERO: on page load ===================== */
(function animateHeroOnLoad() {
  const hero = document.querySelector(".reveal-hero");
  // Prime project cards before anything so they have a start pose
  primeProjectCards();

  if (!hero) {
    // No hero? just reveal cards immediately.
    revealProjectCards();
    return;
  }

  if (reduce) {
    hero.style.opacity = 1;
    // On reduced motion, also just show cards immediately
    revealProjectCards();
    return;
  }

  // Start pose (in case CSS didn't set it)
  hero.style.opacity = "0";
  hero.style.transform = "translateY(28px)";

  animate(
    hero,
    { opacity: [0, 1], transform: ["translateY(28px)", "translateY(0)"] },
    {
      duration: 0.7,
      easing: "cubic-bezier(.22,.61,.36,1)",
      // After hero finishes, reveal project cards (on page load)
      onComplete: () => {
        revealProjectCards();
      }
    }
  );
})();

/* ===================== PROJECTS ROW: on scroll ===================== */
(function primeProjectsRow() {
  if (reduce) return;
  document.querySelectorAll(".projects-row > *").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.willChange = "transform, opacity";
  });
})();

function revealProjectsRow() {
  const parts = document.querySelectorAll(".projects-row > *");
  if (!parts.length) return;

  if (reduce) {
    parts.forEach(el => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; });
    return;
  }
  animate(
    parts,
    { opacity: 1, transform: "translateY(0)" },
    { delay: stagger(0.06), duration: 0.5, easing: "cubic-bezier(.22,.61,.36,1)" }
  );
}

// Reveal the row when the section content scrolls into view (run once)
const stopProjectsRow = inView(
  ".projects-section-content",
  () => {
    revealProjectsRow();
    // stop observing this selector after first trigger
    stopProjectsRow && stopProjectsRow();
  },
  { amount: 0.2, margin: "0px 0px -10% 0px" }
);

// If already visible on very small screens, reveal immediately
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".projects-section-content");
  if (section) {
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const already = r.top < vh * 0.95 && r.bottom > vh * 0.05;
    if (already) revealProjectsRow();
  }
});

/* ===================== OTHER SECTIONS: on scroll ===================== */
function offsetFrom(dir = "up", dist = 28) {
  switch (dir) {
    case "down":  return [0, -dist];
    case "left":  return [dist, 0];
    case "right": return [-dist, 0];
    default:      return [0,  dist]; // up
  }
}

function primeSection(el, dir = "up") {
  if (!el || reduce) return;
  const [x, y] = offsetFrom(dir, 28);
  el.style.opacity = "0";
  el.style.transform = `translate(${x}px, ${y}px)`;
  el.style.willChange = "transform, opacity";
}

function revealSection(el) {
  if (!el) return;
  if (reduce) {
    el.style.opacity = "1";
    el.style.transform = "translate(0,0)";
    return;
  }
  animate(el, { opacity: 1, transform: "translate(0,0)" }, {
    duration: 0.6,
    easing: "cubic-bezier(.22,.61,.36,1)"
  });
}

function setupSectionReveal(selector, dir = "up", opts = { amount: 0.2 }) {
  const el = document.querySelector(selector);
  if (!el) return;

  // Prime
  primeSection(el, dir);

  // Reveal immediately if already in view on load
  const checkImmediate = () => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const already = r.top < vh * 0.95 && r.bottom > vh * 0.05;
    if (already) revealSection(el);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkImmediate, { once: true });
  } else {
    checkImmediate();
  }

  // Observe (run once, then stop)
  let stop;
  stop = inView(
    selector,
    () => {
      revealSection(el);
      stop && stop();
    },
    { amount: opts.amount ?? 0.2, margin: opts.margin ?? "0px 0px -10% 0px" }
  );
}

// Hook up remaining sections (directions per your earlier choice)
setupSectionReveal("#careers", "left");
setupSectionReveal("#brands",  "right");
setupSectionReveal("#tools",   "up");
setupSectionReveal("#footer",  "up");



// Mouse enter filter for project images
function initProjectImageHover() {
  const images = document.querySelectorAll('.project-preview img');
  
  function checkHoveredImages(x, y) {
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isHovered =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      img.classList.toggle('hovered', isHovered);
    });
  }

  // Track cursor position
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    checkHoveredImages(mouseX, mouseY);
  });

  window.addEventListener('scroll', () => {
    // On scroll, recheck current mouse position
    checkHoveredImages(mouseX, mouseY);
  });
}

// Project arrows animation re-enter
function initProjectArrowAnimations() {
  const cards = document.querySelectorAll('.project-footer');

  cards.forEach(card => {
    const arrow = card.querySelector('.project-arrow');

    const restartAnimation = () => {
      if (!arrow) return;
      arrow.style.animation = 'none';
      setTimeout(() => {
        arrow.style.animation = 'arrow-pop 0.6s ease';
      }, 10);
    };

    // 🔹 Hover on the whole card, not just title/arrow
    card.addEventListener('mouseenter', restartAnimation);
    card.addEventListener('mouseleave', restartAnimation);
  });

  // Hero button arrow (same logic)
  const heroArrows = document.querySelectorAll('.hero-button .button-arrow');
  heroArrows.forEach(arrow => {
    const restartAnimation = () => {
      arrow.style.animation = 'none';
      setTimeout(() => {
        arrow.style.animation = 'arrow-pop 0.6s ease';
      }, 10);
    };

    const button = arrow.closest('.hero-button');
    button?.addEventListener('mouseenter', restartAnimation);
    button?.addEventListener('mouseleave', restartAnimation);
  });
}


// Ticker 3D parallax effect
function initTickerParallax() {
  document.querySelectorAll('.tickerlogo').forEach(logo => {
    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      const translateX = ((x - centerX) / centerX) * 5;
      const translateY = ((y - centerY) / centerY) * 5;

      logo.style.transform = `
        perspective(500px)
        translateX(${translateX}px)
        translateY(${translateY}px)
        rotateX(${-rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'perspective(500px) translateX(0) translateY(0) rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initProjectImageHover();
  initProjectArrowAnimations();
  initTickerParallax();
  
  console.log('Portfolio loaded successfully! 🚀');
});

// cal.com
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document; C.Cal = C.Cal || function () {
      let cal = C.Cal; let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1]; api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]);
        } else p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  // init a namespace (the name "site" is arbitrary)
  Cal("init", "site", { origin: "https://app.cal.com" });

  // Render inline
  Cal.ns.site("inline", {
    elementOrSelector: "#my-cal-inline",
    calLink: "sean-hammond-vnc8nt",        // or "sean-hammond-vnc8nt/<event-type>"
    config: { layout: "month_view" }       // options: month_view, week_view, etc.
  });

  // UI options (theme etc.)
  Cal.ns.site("ui", { theme: "dark" });

