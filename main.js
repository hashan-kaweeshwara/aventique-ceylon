/* ============================================
   AVENTIQUE CEYLON - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ---------- Preloader ----------
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
      }, 500);
    });
  }

  // ---------- Navbar Scroll ----------
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // If page has no hero (inner pages with banner), force scrolled state
  const hero = document.querySelector('.hero');
  if (!hero) {
    navbar.classList.add('scrolled');
  }

  // ---------- Hamburger Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navMenu.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ---------- Mobile Dropdown Toggle ----------
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        toggle.parentElement.classList.toggle('open');
      }
    });
  });

  // ---------- Hero Slider ----------
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 80) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // ---------- Stats Counter ----------
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounters = () => {
    if (statsAnimated) return;
    
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      statsAnimated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out quad
          const easeOut = 1 - (1 - progress) * (1 - progress);
          const current = Math.floor(start + (target - start) * easeOut);
          
          stat.textContent = current.toLocaleString() + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };

        requestAnimationFrame(updateCounter);
      });
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---------- Testimonial Slider ----------
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;
  let testimonialInterval;

  const showTestimonial = (index) => {
    testimonialSlides.forEach(s => s.classList.remove('active'));
    testimonialDots.forEach(d => d.classList.remove('active'));
    testimonialSlides[index]?.classList.add('active');
    testimonialDots[index]?.classList.add('active');
    currentTestimonial = index;
  };

  if (testimonialSlides.length > 0) {
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showTestimonial(index);
        clearInterval(testimonialInterval);
        startTestimonialAutoplay();
      });
    });

    const startTestimonialAutoplay = () => {
      testimonialInterval = setInterval(() => {
        const next = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(next);
      }, 6000);
    };

    startTestimonialAutoplay();
  }

  // ---------- Tour Filter ----------
  const filterBtns = document.querySelectorAll('.tour-filter button');
  const tourCards = document.querySelectorAll('.tour-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      tourCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // ---------- Gallery Filter ----------
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 10);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  let lightboxImages = [];
  let lightboxIndex = 0;

  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      lightboxImages.push(img.src);
      item.addEventListener('click', () => {
        lightboxIndex = index;
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex];
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
      lightboxImg.src = lightboxImages[lightboxIndex];
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Keyboard nav for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev?.click();
    if (e.key === 'ArrowRight') lightboxNext?.click();
  });

  // ---------- Itinerary Accordion ----------
  const itineraryHeaders = document.querySelectorAll('.itinerary-header');
  itineraryHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const day = header.parentElement;
      const body = day.querySelector('.itinerary-body');
      const isActive = day.classList.contains('active');

      // Close all
      document.querySelectorAll('.itinerary-day').forEach(d => {
        d.classList.remove('active');
        d.querySelector('.itinerary-body').style.maxHeight = '0';
      });

      // Open clicked if it was closed
      if (!isActive) {
        day.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first itinerary day by default
  const firstDay = document.querySelector('.itinerary-day');
  if (firstDay) {
    firstDay.classList.add('active');
    const firstBody = firstDay.querySelector('.itinerary-body');
    if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }

  // ---------- Back to Top ----------
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Contact Form ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const message = formData.get('message');
      
      // Redirect to WhatsApp with the message
      const whatsappMessage = encodeURIComponent(
        `Hello Aventique Ceylon! My name is ${name}. ${message}`
      );
      window.open(`https://wa.me/94771234567?text=${whatsappMessage}`, '_blank');
      
      // Show success feedback
      alert('Thank you! Redirecting you to WhatsApp to continue the conversation.');
      contactForm.reset();
    });
  }

  // ---------- Newsletter Form ----------
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing! We\'ll keep you updated with the best travel deals.');
      newsletterForm.reset();
    });
  }

  // ---------- Active Navigation Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu > a, .nav-menu .nav-dropdown > a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
