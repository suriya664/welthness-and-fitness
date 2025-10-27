/**
 * AyuraWell - AJAX Functions
 * Handles all AJAX requests for forms and dynamic content
 */

(function() {
  'use strict';

  // ========== AJAX Configuration ==========
  const AJAX_CONFIG = {
    baseURL: '',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  // ========== AJAX Helper Function ==========
  function ajaxRequest(url, options) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();
      const method = options.method || 'POST';
      const data = options.data || null;
      
      xhr.open(method, url, true);
      
      // Set headers
      if (options.headers) {
        Object.keys(options.headers).forEach(function(key) {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }
      
      // Timeout
      xhr.timeout = options.timeout || AJAX_CONFIG.timeout;
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      
      xhr.onerror = function() {
        reject({
          status: xhr.status,
          statusText: 'Network Error'
        });
      };
      
      xhr.ontimeout = function() {
        reject({
          status: 408,
          statusText: 'Request Timeout'
        });
      };
      
      xhr.send(data);
    });
  }

  // ========== Contact Form Submission ==========
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.innerHTML;
      
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      // Get form data
      const formData = new FormData(this);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });
      
      // Send AJAX request
      ajaxRequest('api/contact.php', {
        method: 'POST',
        headers: AJAX_CONFIG.headers,
        data: JSON.stringify(data)
      })
      .then(function(response) {
        // Success
        if (typeof showToast === 'function') {
          showToast('Message sent successfully! We will get back to you soon.', 'success');
        }
        contactForm.reset();
      })
      .catch(function(error) {
        // Error
        if (typeof showToast === 'function') {
          showToast('Failed to send message. Please try again.', 'error');
        }
        console.error('Contact form error:', error);
      })
      .finally(function() {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnText;
      });
    });
  }

  // ========== Appointment Booking Form ==========
  const appointmentForm = document.getElementById('appointment-form');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
      
      const formData = new FormData(this);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });
      
      ajaxRequest('api/appointments.php', {
        method: 'POST',
        headers: AJAX_CONFIG.headers,
        data: JSON.stringify(data)
      })
      .then(function(response) {
        if (typeof showToast === 'function') {
          showToast('Appointment booked successfully! Check your email for confirmation.', 'success');
        }
        
        // Close modal if exists
        const modal = appointmentForm.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        appointmentForm.reset();
      })
      .catch(function(error) {
        if (typeof showToast === 'function') {
          showToast('Failed to book appointment. Please try again.', 'error');
        }
        console.error('Appointment booking error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnText;
      });
    });
  }

  // ========== Newsletter Subscription ==========
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const emailInput = this.querySelector('input[type="email"]');
      const btnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      const data = {
        email: emailInput.value
      };
      
      ajaxRequest('api/newsletter.php', {
        method: 'POST',
        headers: AJAX_CONFIG.headers,
        data: JSON.stringify(data)
      })
      .then(function(response) {
        if (typeof showToast === 'function') {
          showToast('Successfully subscribed to newsletter!', 'success');
        }
        newsletterForm.reset();
      })
      .catch(function(error) {
        if (typeof showToast === 'function') {
          showToast('Subscription failed. Please try again.', 'error');
        }
        console.error('Newsletter subscription error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnText;
      });
    });
  }

  // ========== Login Form ==========
  const loginForm = document.getElementById('login-form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
      
      const formData = new FormData(this);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });
      
      ajaxRequest('api/login.php', {
        method: 'POST',
        headers: AJAX_CONFIG.headers,
        data: JSON.stringify(data)
      })
      .then(function(response) {
        if (response.success) {
          if (typeof showToast === 'function') {
            showToast('Login successful! Redirecting...', 'success');
          }
          
          setTimeout(function() {
            window.location.href = response.redirect || 'dashboard.html';
          }, 1000);
        } else {
          throw new Error(response.message || 'Login failed');
        }
      })
      .catch(function(error) {
        if (typeof showToast === 'function') {
          showToast(error.message || 'Invalid credentials. Please try again.', 'error');
        }
        console.error('Login error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnText;
      });
    });
  }

  // ========== Registration Form ==========
  const registerForm = document.getElementById('register-form');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = this.querySelector('input[name="password"]').value;
      const confirmPassword = this.querySelector('input[name="confirm_password"]').value;
      
      if (password !== confirmPassword) {
        if (typeof showToast === 'function') {
          showToast('Passwords do not match!', 'error');
        }
        return;
      }
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
      
      const formData = new FormData(this);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });
      
      ajaxRequest('api/register.php', {
        method: 'POST',
        headers: AJAX_CONFIG.headers,
        data: JSON.stringify(data)
      })
      .then(function(response) {
        if (response.success) {
          if (typeof showToast === 'function') {
            showToast('Registration successful! Please check your email.', 'success');
          }
          
          setTimeout(function() {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          throw new Error(response.message || 'Registration failed');
        }
      })
      .catch(function(error) {
        if (typeof showToast === 'function') {
          showToast(error.message || 'Registration failed. Please try again.', 'error');
        }
        console.error('Registration error:', error);
      })
      .finally(function() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnText;
      });
    });
  }

  // ========== Search Doctors ==========
  window.searchDoctors = function(query, specialty) {
    return ajaxRequest('api/search-doctors.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        query: query,
        specialty: specialty
      })
    });
  };

  // ========== Get Available Time Slots ==========
  window.getAvailableSlots = function(doctorId, date) {
    return ajaxRequest('api/get-slots.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        doctor_id: doctorId,
        date: date
      })
    });
  };

  // ========== Load Doctor's Schedule ==========
  const doctorSelect = document.getElementById('doctor-select');
  const dateSelect = document.getElementById('appointment-date');
  const timeSlotsContainer = document.getElementById('time-slots');
  
  if (doctorSelect && dateSelect && timeSlotsContainer) {
    function loadTimeSlots() {
      const doctorId = doctorSelect.value;
      const date = dateSelect.value;
      
      if (!doctorId || !date) return;
      
      timeSlotsContainer.innerHTML = '<div class="loading">Loading available slots...</div>';
      
      getAvailableSlots(doctorId, date)
        .then(function(response) {
          if (response.slots && response.slots.length > 0) {
            let html = '<div class="time-slots-grid">';
            response.slots.forEach(function(slot) {
              const disabled = slot.available ? '' : 'disabled';
              html += '<button type="button" class="time-slot ' + disabled + '" data-time="' + slot.time + '">' + slot.time + '</button>';
            });
            html += '</div>';
            timeSlotsContainer.innerHTML = html;
          } else {
            timeSlotsContainer.innerHTML = '<p class="text-center text-muted">No available slots for this date.</p>';
          }
        })
        .catch(function(error) {
          timeSlotsContainer.innerHTML = '<p class="text-center text-danger">Failed to load time slots.</p>';
          console.error('Error loading time slots:', error);
        });
    }
    
    doctorSelect.addEventListener('change', loadTimeSlots);
    dateSelect.addEventListener('change', loadTimeSlots);
  }

  // ========== Load Blog Posts ==========
  window.loadBlogPosts = function(page, category) {
    return ajaxRequest('api/blog.php', {
      method: 'GET',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        page: page || 1,
        category: category || 'all'
      })
    });
  };

  // ========== File Upload Handler ==========
  window.uploadFile = function(file, type) {
    return new Promise(function(resolve, reject) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type || 'general');
      
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          // Trigger custom event for progress tracking
          window.dispatchEvent(new CustomEvent('uploadProgress', {
            detail: { percent: percentComplete }
          }));
        }
      });
      
      xhr.addEventListener('load', function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(new Error('Invalid response'));
          }
        } else {
          reject(new Error('Upload failed'));
        }
      });
      
      xhr.addEventListener('error', function() {
        reject(new Error('Network error'));
      });
      
      xhr.open('POST', 'api/upload.php', true);
      xhr.send(formData);
    });
  };

  // ========== Fetch User Profile ==========
  window.getUserProfile = function(userId) {
    return ajaxRequest('api/profile.php?id=' + userId, {
      method: 'GET',
      headers: AJAX_CONFIG.headers
    });
  };

  // ========== Update User Profile ==========
  window.updateUserProfile = function(data) {
    return ajaxRequest('api/update-profile.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify(data)
    });
  };

  // ========== Cancel Appointment ==========
  window.cancelAppointment = function(appointmentId) {
    return ajaxRequest('api/cancel-appointment.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        appointment_id: appointmentId
      })
    });
  };

  // ========== Rate Doctor/Service ==========
  window.submitRating = function(type, id, rating, review) {
    return ajaxRequest('api/submit-rating.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        type: type,
        id: id,
        rating: rating,
        review: review
      })
    });
  };

  // ========== Load Notifications ==========
  window.loadNotifications = function() {
    return ajaxRequest('api/notifications.php', {
      method: 'GET',
      headers: AJAX_CONFIG.headers
    });
  };

  // ========== Mark Notification as Read ==========
  window.markNotificationRead = function(notificationId) {
    return ajaxRequest('api/mark-notification.php', {
      method: 'POST',
      headers: AJAX_CONFIG.headers,
      data: JSON.stringify({
        notification_id: notificationId
      })
    });
  };

  console.log('✓ AJAX handlers initialized successfully');

})();

