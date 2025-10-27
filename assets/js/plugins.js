/**
 * AyuraWell - Plugins & Third-Party Integrations
 * Contains initialization and configuration for external libraries
 */

(function() {
  'use strict';

  // ========== Bootstrap Popovers ==========
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  if (typeof bootstrap !== 'undefined' && bootstrap.Popover) {
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

  // ========== Bootstrap Tooltips ==========
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // ========== Date Picker Configuration ==========
  window.initDatePicker = function(selector) {
    if (typeof flatpickr !== 'undefined') {
      flatpickr(selector, {
        dateFormat: 'd-m-Y',
        minDate: 'today',
        disable: [
          function(date) {
            // Disable Sundays
            return date.getDay() === 0;
          }
        ],
        locale: {
          firstDayOfWeek: 1
        }
      });
    }
  };

  // ========== Time Picker Configuration ==========
  window.initTimePicker = function(selector) {
    if (typeof flatpickr !== 'undefined') {
      flatpickr(selector, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: false,
        minTime: '09:00',
        maxTime: '18:00'
      });
    }
  };

  // ========== Image Lightbox ==========
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.lightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }

  // ========== Owl Carousel - Testimonials ==========
  if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
    $('.testimonials-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
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

    // Doctors Carousel
    $('.doctors-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 },
        1200: { items: 4 }
      }
    });

    // Blog Carousel
    $('.blog-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ],
      dots: true,
      autoplay: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });

    // Partners/Sponsors Carousel
    $('.partners-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 2 },
        576: { items: 3 },
        768: { items: 4 },
        992: { items: 5 },
        1200: { items: 6 }
      }
    });
  }

  // ========== CountUp.js - Number Animation ==========
  if (typeof CountUp !== 'undefined') {
    const counters = document.querySelectorAll('.countup');
    
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-count'));
          const decimal = target.getAttribute('data-decimal') || 0;
          const duration = parseInt(target.getAttribute('data-duration')) || 2;
          
          const countUp = new CountUp(target, endValue, {
            startVal: 0,
            duration: duration,
            decimalPlaces: decimal,
            separator: ',',
            prefix: target.getAttribute('data-prefix') || '',
            suffix: target.getAttribute('data-suffix') || ''
          });
          
          if (!countUp.error) {
            countUp.start();
          }
          
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  }

  // ========== Isotope - Gallery Filtering ==========
  if (typeof Isotope !== 'undefined') {
    window.addEventListener('load', function() {
      const galleryGrid = document.querySelector('.gallery-grid');
      
      if (galleryGrid) {
        const iso = new Isotope(galleryGrid, {
          itemSelector: '.gallery-item',
          layoutMode: 'fitRows',
          percentPosition: true
        });

        // Filter buttons
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

        // Layout after images load
        imagesLoaded(galleryGrid, function() {
          iso.layout();
        });
      }
    });
  }

  // ========== AOS (Animate On Scroll) ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
      offset: 100
    });

    // Refresh AOS on window resize
    window.addEventListener('resize', function() {
      AOS.refresh();
    });
  }

  // ========== Typed.js - Text Animation ==========
  if (typeof Typed !== 'undefined') {
    const typedElements = document.querySelectorAll('.typed');
    
    typedElements.forEach(function(element) {
      const strings = element.getAttribute('data-typed-items').split(',');
      new Typed(element, {
        strings: strings,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    });
  }

  // ========== Chart.js Configuration ==========
  window.createChart = function(canvasId, config) {
    if (typeof Chart !== 'undefined') {
      const ctx = document.getElementById(canvasId);
      if (ctx) {
        return new Chart(ctx, config);
      }
    }
    return null;
  };

  // Sample Chart: Appointments Overview
  window.initAppointmentsChart = function(canvasId, data) {
    return createChart(canvasId, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Appointments',
          data: data.values,
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderColor: '#4CAF50',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  // ========== Full Calendar ==========
  window.initCalendar = function(elementId, events) {
    if (typeof FullCalendar !== 'undefined') {
      const calendarEl = document.getElementById(elementId);
      if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          events: events,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          themeSystem: 'bootstrap5'
        });
        calendar.render();
        return calendar;
      }
    }
    return null;
  };

  // ========== DataTables Configuration ==========
  if (typeof $ !== 'undefined' && $.fn.DataTable) {
    $('.data-table').DataTable({
      responsive: true,
      pageLength: 10,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
      language: {
        search: 'Search:',
        lengthMenu: 'Show _MENU_ entries',
        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        paginate: {
          first: 'First',
          last: 'Last',
          next: 'Next',
          previous: 'Previous'
        }
      }
    });
  }

  // ========== Select2 Configuration ==========
  if (typeof $ !== 'undefined' && $.fn.select2) {
    $('.select2').select2({
      theme: 'bootstrap-5',
      width: '100%',
      placeholder: 'Select an option',
      allowClear: true
    });
  }

  // ========== Summernote - Rich Text Editor ==========
  if (typeof $ !== 'undefined' && $.fn.summernote) {
    $('.summernote').summernote({
      height: 300,
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture']],
        ['view', ['fullscreen', 'codeview', 'help']]
      ]
    });
  }

  // ========== Google Maps Integration ==========
  window.initMap = function(elementId, options) {
    if (typeof google !== 'undefined' && google.maps) {
      const mapOptions = {
        center: options.center || { lat: 12.9716, lng: 77.5946 }, // Bangalore
        zoom: options.zoom || 15,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      const map = new google.maps.Map(document.getElementById(elementId), mapOptions);

      if (options.marker) {
        new google.maps.Marker({
          position: options.marker.position,
          map: map,
          title: options.marker.title || 'AyuraWell Clinic'
        });
      }

      return map;
    }
    return null;
  };

  // ========== Swiper Slider ==========
  if (typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-slider', {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  }

  // ========== Particle Effects ==========
  window.initParticles = function(elementId) {
    if (typeof particlesJS !== 'undefined') {
      particlesJS(elementId, {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#4CAF50'
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.5,
            random: false
          },
          size: {
            value: 3,
            random: true
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#4CAF50',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          }
        },
        retina_detect: true
      });
    }
  };

  console.log('✓ Plugins initialized successfully');

})();

