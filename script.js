/**
 * FS BRINDES - LANDING PAGE DIA DOS PAIS
 * Rastreamento (Google Ads / GA4) & Animações
 */

document.addEventListener('DOMContentLoaded', () => {
  // Atualização do ano no rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Rastreamento de cliques nos botões WhatsApp
  document.querySelectorAll('.whatsapp-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.dataset.location || 'unknown';

      // Google Analytics 4 (se disponível)
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
          event_category: 'conversion',
          event_label: location,
          value: 1
        });
      }

      // Google Ads Conversion (se disponível)
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-XXXXXXXXX/YYYYYYY'
        });
      }
    });
  });

  // Scroll reveal simples (CSS-only friendly)
  const revealEls = document.querySelectorAll(
    '.why-item, .diff-item, .review-card, .choose-card'
  );

  if (revealEls.length && 'IntersectionObserver' in window) {
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  // Carrossel de fotos (Seção 6)
  const carouselBox = document.querySelector('.carousel-box');
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  if (carouselBox && track && slides.length) {
    let currentIndex = 0;
    let autoPlayInterval = null;
    let startX = 0;
    let isDragging = false;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 3500);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    // Hover pause
    carouselBox.addEventListener('mouseenter', stopAutoPlay);
    carouselBox.addEventListener('mouseleave', startAutoPlay);

    // Dots navigation
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
    });

    // Touch & Swipe mobile
    carouselBox.addEventListener('touchstart', (e) => {
      stopAutoPlay();
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carouselBox.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 35) {
        if (diffX > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
        isDragging = false;
      }
    }, { passive: true });

    carouselBox.addEventListener('touchend', () => {
      isDragging = false;
      startAutoPlay();
    });

    startAutoPlay();
  }
});


