// Kemi Cakes - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Load components
  loadComponents();
  
  // Smooth scrolling
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.25)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });
  
  // Mobile menu toggle (accessible + touch-friendly)
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.setAttribute('aria-controls', 'main-nav');
    hamburger.setAttribute('aria-expanded', 'false');

    const openMenu = () => {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) closeMenu();
      else openMenu();
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close menu when clicking on a link that opts-in with data-close-menu
    document.querySelectorAll('[data-close-menu]').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!navMenu.contains(target) && !hamburger.contains(target)) {
        if (navMenu.classList.contains('active')) closeMenu();
      }
    });
  }

  
  // Form handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your message has been sent. We\'ll contact you soon.');
      this.reset();
    });
  });
  
  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      
      content.classList.toggle('active');
      
      if (icon) {
        icon.innerHTML = content.classList.contains('active') ? '−' : '+';
      }
    });
  });
});

async function loadComponents() {
  // Load navbar
  try {
    const navbarResponse = await fetch('./components/navbar.html');
    const navbarHTML = await navbarResponse.text();
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = navbarHTML;
      // Re-attach event listeners after loading
      attachNavListeners();
    }
  } catch (error) {
    console.log('Navbar load failed, using fallback');
  }
  
  // Load footer
  try {
    const footerResponse = await fetch('./components/footer.html');
    const footerHTML = await footerResponse.text();
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
    }
  } catch (error) {
    console.log('Footer load failed, using fallback');
  }
  
  // Initialize slider after components load
  setTimeout(initAfterComponents, 500);
}

function attachNavListeners() {
  // Mobile menu (re-attach)
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.onclick = () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    };
  }
}

// Hero Slider Functionality
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slide-prev');
  const nextBtn = document.querySelector('.slide-next');
  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }

  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Pause on hover
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
  }
}

// Initialize slider after components load
function initAfterComponents() {
  if (document.querySelector('.hero-slider')) {
    initSlider();
  }
}

