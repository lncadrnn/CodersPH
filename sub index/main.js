// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize active states for team page
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the team page and set active state
  const isTeamPage = window.location.pathname.includes('team.html');
  if (isTeamPage) {
    const teamLinks = document.querySelectorAll('a[href*="team.html"]');
    teamLinks.forEach(link => {
      link.classList.add('active');
    });
  }
});

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;

  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      body.classList.toggle('mobile-menu-open');
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
      }
    });
  }
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a, .mobile-nav a, .cta-button').forEach(link => {
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
  // Check if we're on the team page
  const isTeamPage = window.location.pathname.includes('team.html');
  
  // If we're on the team page, don't run the dynamic active link logic
  if (isTeamPage) {
    // Ensure Team links stay active on team page
    const teamLinks = document.querySelectorAll('a[href*="team.html"]');
    teamLinks.forEach(link => {
      if (!link.classList.contains('active')) {
        link.classList.add('active');
      }
    });
    return;
  }
  
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  
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

// Contact Form Handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const emailModal = document.getElementById('emailModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalQuestion = document.getElementById('modalQuestion');
  const closeEmailModal = document.getElementById('closeEmailModal');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  
  let currentMailtoLink = '';
  
  // EmailJS Configuration - Replace these with your actual values
  const EMAILJS_CONFIG = {
    publicKey: "VftWN8vG-w97xhRzP", // Replace with your EmailJS public key
    serviceId: "service_coders_ph",   // Replace with your EmailJS service ID
    templateId: "template_contact"    // Replace with your EmailJS template ID
  };
  
  // Check if EmailJS is available and properly configured
  const isEmailJSReady = typeof emailjs !== 'undefined';
  
  if (isEmailJSReady) {
    try {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    } catch (error) {
      console.warn('EmailJS initialization failed:', error);
    }
  }
  
  // Modal functions
  function showEmailModal(title, message, question, mailtoLink) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalQuestion.textContent = question;
    currentMailtoLink = mailtoLink;
    
    emailModal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    // Add show class after a brief delay for animation
    setTimeout(() => {
      emailModal.classList.add('show');
    }, 10);
  }
  
  function hideEmailModal() {
    emailModal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      emailModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      currentMailtoLink = '';
    }, 300);
  }
  
  // Modal event listeners
  closeEmailModal.addEventListener('click', hideEmailModal);
  modalCancel.addEventListener('click', hideEmailModal);
  
  modalConfirm.addEventListener('click', function() {
    if (currentMailtoLink) {
      window.location.href = currentMailtoLink;
    }
    hideEmailModal();
  });
  
  // Close modal when clicking outside
  emailModal.addEventListener('click', function(e) {
    if (e.target === emailModal) {
      hideEmailModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && emailModal.classList.contains('show')) {
      hideEmailModal();
    }
  });
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Prevent the default form submission
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Basic form validation
      if (!name || !email || !message) {
        alert('Please fill in all fields before submitting.');
        return;
      }
      
      // Change button text to show loading
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Try to send email using EmailJS
      if (isEmailJSReady && emailjs.send) {
        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
          to_email: 'lanceadrn.acal@gmail.com'
        };
        
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
          .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            handleSuccessfulSubmission(name, email, message);
            resetButton();
          })
          .catch(function(error) {
            console.error('EmailJS failed:', error);
            handleEmailFallback(name, email, message);
            resetButton();
          });
      } else {
        // EmailJS not available or not configured - use fallback
        console.warn('EmailJS not available, using fallback method');
        handleEmailFallback(name, email, message);
        resetButton();
      }
      
      function resetButton() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      
      function handleSuccessfulSubmission(name, email, message) {
        // Reset the form first
        contactForm.reset();
        
        // Create mailto link for copy to self
        const subject = encodeURIComponent(`Copy: New Contact Form Message from ${name}`);
        const body = encodeURIComponent(
          `This is a copy of your message sent to Coders PH:\n\n` +
          `From: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}\n\n` +
          `---\n` +
          `Original message was sent to lanceadrn.acal@gmail.com`
        );
        
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
        
        // Show custom modal
        showEmailModal(
          'Message Sent Successfully!',
          'Your message has been delivered to Coders PH team. We\'ll get back to you soon!',
          'Would you like to send a copy to yourself?',
          mailtoLink
        );
      }
      
      function handleEmailFallback(name, email, message) {
        // Reset the form first
        contactForm.reset();
        
        // Create mailto link
        const subject = encodeURIComponent(`New Contact Form Message from ${name}`);
        const body = encodeURIComponent(
          `Hello Coders PH Team,\n\n` +
          `You have received a new message from your website contact form:\n\n` +
          `From: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}\n\n` +
          `---\n` +
          `This email was sent from the Coders PH website contact form.`
        );
        
        const mailtoLink = `mailto:lanceadrn.acal@gmail.com?subject=${subject}&body=${body}`;
        
        // Show custom modal for fallback
        showEmailModal(
          'Ready to Send Message',
          'Your message is ready to be sent to the Coders PH team.',
          'Would you like to open your email client to send this message?',
          mailtoLink
        );
      }
    });
  }
});
