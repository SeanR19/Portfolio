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
    const title = card.querySelector('.project-title');
    const arrow = card.querySelector('.project-arrow');

    const restartAnimation = () => {
      arrow.style.animation = 'none';
      setTimeout(() => {
        arrow.style.animation = 'arrow-pop 0.6s ease';
      }, 10);
    };

    title?.addEventListener('mouseenter', restartAnimation);
    title?.addEventListener('mouseleave', restartAnimation);
    arrow?.closest('a')?.addEventListener('mouseenter', restartAnimation);
    arrow?.closest('a')?.addEventListener('mouseleave', restartAnimation);
  });

  // Also apply this for the hero button arrow
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
