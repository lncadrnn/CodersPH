// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a, .cta-button').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  });
});

// Add navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    navbar.style.backdropFilter = 'blur(15px)';
  } else {
    navbar.style.background = 'rgba(26, 26, 46, 0.9)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// Add active nav link highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Project Modal Functionality
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function() {
    const projectId = this.dataset.project;
    const modal = document.getElementById(`modal-${projectId}`);
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  });
});

document.querySelectorAll('.close-modal').forEach(closeBtn => {
  closeBtn.addEventListener('click', function() {
    this.closest('.modal').classList.remove('show');
    document.body.classList.remove('modal-open');
  });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(modal => {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
    
    // Also close success modal specifically
    const successModal = document.getElementById('successModal');
    if (successModal && successModal.style.display === 'block') {
      successModal.style.display = 'none';
      successModal.classList.remove('show');
      document.body.classList.remove('modal-open');
      
      // Reset the form
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.reset();
      }
    }
  }
});

// Handle back link redirect to team section
document.addEventListener('DOMContentLoaded', function() {
  const backLink = document.querySelector('.back-link');
  if (backLink) {
    backLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Redirect to main page with team section anchor
      window.location.href = '../index.html#team';
    });
  }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const modalOkButton = document.getElementById('modalOkButton');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Prevent the default mailto action
      e.preventDefault();
      
      // Show the success modal immediately
      if (successModal) {
        successModal.style.display = 'block';
        successModal.classList.add('show');
        document.body.classList.add('modal-open');
      }
    });
  }

  // Close modal functionality
  function closeModal() {
    if (successModal) {
      successModal.style.display = 'none';
      successModal.classList.remove('show');
      document.body.classList.remove('modal-open');
      
      // Reset the form
      if (contactForm) {
        contactForm.reset();
      }
    }
  }

  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', closeModal);
  }

  if (modalOkButton) {
    modalOkButton.addEventListener('click', closeModal);
  }

  // Close modal when clicking outside
  if (successModal) {
    successModal.addEventListener('click', function(e) {
      if (e.target === successModal) {
        closeModal();
      }
    });
  }
});
