/**
 * AyuraWell - Modal Handler
 * Standalone modal functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Open modal when clicking trigger buttons
  document.querySelectorAll('[data-modal]').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal on close button click
  document.querySelectorAll('.modal-close, [data-dismiss="modal"]').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on backdrop click
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(function(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });

});

