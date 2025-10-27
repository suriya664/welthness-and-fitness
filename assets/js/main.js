/**
 * AyuraWell - Main JavaScript File
 * Author: AyuraWell Team
 * Description: Core functionality for health and wellness template
 */

(function() {
  'use strict';

  // ========== Global Variables ==========
  const body = document.body;
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const backToTop = document.querySelector('.back-to-top');
  const preloader = document.querySelector('.preloader');

  // ========== Preloader ==========
  window.addEventListener('load', function() {
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add('hidden');
      }, 500);
    }
  });

  // ========== Sticky Header ==========
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      if (header) {
        header.classList.add('scrolled');
      }
      if (backToTop) {
        backToTop.classList.add('visible');
      }
    } else {
      if (header) {
        header.classList.remove('scrolled');
      }
      if (backToTop) {
        backToTop.classList.remove('visible');
      }
    }
  });

  // ========== Mobile Navigation Toggle ==========
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      if (navMenu) {
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
      }
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
          navToggle.classList.remove('active');
        }
        body.style.overflow = '';
      }
    });
  });

  // ========== Active Navigation Link ==========
  const sections = document.querySelectorAll('section[id]');
  
  function setActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(function(section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) {
          navLink.classList.add('active');
        }
      } else {
        if (navLink) {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  // ========== Smooth Scroll ==========
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#0') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========== Back to Top Button ==========
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== Dark Mode Toggle ==========
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  // Load saved theme
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        this.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        this.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // ========== Counter Animation ==========
  const counters = document.querySelectorAll('.counter');
  
  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = function() {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  }

  // Intersection Observer for counters
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  }

  // ========== Form Validation ==========
  const forms = document.querySelectorAll('.needs-validation');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });

  // ========== Testimonial Carousel ==========
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.testimonials-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }

  // ========== Gallery Filters (Isotope) ==========
  if (typeof Isotope !== 'undefined') {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      const iso = new Isotope(galleryGrid, {
        itemSelector: '.gallery-item',
        layoutMode: 'fitRows'
      });

      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          const filterValue = this.getAttribute('data-filter');
          iso.arrange({ filter: filterValue });

          filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
          });
          this.classList.add('active');
        });
      });
    }
  }

  // ========== AOS (Animate On Scroll) Initialization ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // ========== Modal Management ==========
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.modal-close, [data-dismiss="modal"]');

  modalTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });

  modals.forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });

  // ========== Toast Notifications ==========
  window.showToast = function(message, type) {
    type = type || 'success';
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
    
    document.body.appendChild(toast);
    
    setTimeout(function() {
      toast.classList.add('show');
    }, 100);

    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() {
        toast.remove();
      }, 300);
    }, 3000);
  };

  // ========== Image Lazy Loading ==========
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(function(img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }

  // ========== Appointment Time Slots ==========
  const timeSlots = document.querySelectorAll('.time-slot');
  
  timeSlots.forEach(function(slot) {
    slot.addEventListener('click', function() {
      if (!this.classList.contains('disabled')) {
        timeSlots.forEach(function(s) {
          s.classList.remove('selected');
        });
        this.classList.add('selected');
        
        const hiddenInput = document.getElementById('selected-time');
        if (hiddenInput) {
          hiddenInput.value = this.getAttribute('data-time');
        }
      }
    });
  });

  // ========== Search Functionality ==========
  const searchInput = document.querySelector('.search-input');
  const searchResults = document.querySelector('.search-results');

  if (searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();
      
      if (query.length >= 3) {
        searchTimeout = setTimeout(function() {
          // Implement your search logic here
          console.log('Searching for:', query);
        }, 500);
      } else if (searchResults) {
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
      }
    });
  }

  // ========== Print Functionality ==========
  const printButtons = document.querySelectorAll('.print-btn');
  
  printButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      window.print();
    });
  });

  // ========== Copy to Clipboard ==========
  window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('Copied to clipboard!', 'success');
      });
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Copied to clipboard!', 'success');
    }
  };

  // ========== Keyboard Navigation ==========
  document.addEventListener('keydown', function(e) {
    // Close modal on ESC
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        activeModal.classList.remove('active');
        body.style.overflow = '';
      }
      
      // Close mobile menu
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
          navToggle.classList.remove('active');
        }
        body.style.overflow = '';
      }
    }
  });

  // ========== Initialize Tooltips ==========
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  
  tooltipTriggers.forEach(function(trigger) {
    trigger.addEventListener('mouseenter', function() {
      const text = this.getAttribute('data-tooltip');
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = text;
      
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      
      this._tooltip = tooltip;
    });

    trigger.addEventListener('mouseleave', function() {
      if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
      }
    });
  });

  // ========== Auto-hide Alerts ==========
  const alerts = document.querySelectorAll('.alert');
  
  alerts.forEach(function(alert) {
    if (alert.hasAttribute('data-auto-dismiss')) {
      const delay = parseInt(alert.getAttribute('data-auto-dismiss')) || 5000;
      setTimeout(function() {
        alert.style.opacity = '0';
        setTimeout(function() {
          alert.remove();
        }, 300);
      }, delay);
    }
  });

  // ========== Console Message ==========
  console.log('%c🌿 AyuraWell Health & Wellness Template', 'color: #4CAF50; font-size: 16px; font-weight: bold;');
  console.log('%cVersion: 1.0.0', 'color: #666; font-size: 12px;');

})();

