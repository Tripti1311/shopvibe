// Loader fade-out
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const loaderBg = document.querySelector('.loader-bg');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      if (loaderBg) {
        loaderBg.pause && loaderBg.pause();
        loaderBg.parentNode && loaderBg.parentNode.removeChild(loaderBg);
      }
    }, 500);
  }, 2000); // 2 seconds
});

// Light/Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Initial theme
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'dark');

themeToggle.addEventListener('click', () => {
  setTheme(!body.classList.contains('dark'));
});

// Ripple effect for buttons
function addRipple(e) {
  const btn = e.currentTarget;
  btn.classList.remove('active');
  void btn.offsetWidth; // reflow
  btn.classList.add('active');
  setTimeout(() => btn.classList.remove('active'), 500);
}

document.querySelectorAll('.ripple-effect').forEach(btn => {
  btn.addEventListener('click', addRipple);
});

// Parallax effect
window.addEventListener('scroll', () => {
  const parallax = document.querySelector('.parallax-bg');
  if (parallax) {
    const scrolled = window.scrollY;
    parallax.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Carousel/Slider
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let carouselIndex = 0;
function updateCarousel() {
  const cardWidth = track.children[0].offsetWidth + 32;
  track.scrollTo({ left: carouselIndex * cardWidth, behavior: 'smooth' });
}
if (prevBtn && nextBtn && track) {
  prevBtn.addEventListener('click', () => {
    carouselIndex = Math.max(0, carouselIndex - 1);
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    carouselIndex = Math.min(track.children.length - 1, carouselIndex + 1);
    updateCarousel();
  });
}

// Entrance animation for feature cards
function showFeaturesOnScroll() {
  document.querySelectorAll('.feature-item').forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      item.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', showFeaturesOnScroll);
window.addEventListener('DOMContentLoaded', showFeaturesOnScroll);

// Scroll-triggered popup
const scrollPopup = document.getElementById('scroll-popup');
const closePopup = document.getElementById('close-popup');
let popupShown = false;
window.addEventListener('scroll', () => {
  if (!popupShown && window.scrollY > 400) {
    scrollPopup.classList.add('active');
    popupShown = true;
  }
});
if (closePopup) {
  closePopup.addEventListener('click', () => {
    scrollPopup.classList.remove('active');
  });
}

// Animated stats/counters
function animateStats() {
  document.querySelectorAll('.stat-number').forEach(stat => {
    const target = +stat.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 60);
    function update() {
      count += increment;
      if (count > target) count = target;
      stat.textContent = count.toLocaleString();
      if (count < target) requestAnimationFrame(update);
    }
    if (!stat.dataset.animated) {
      stat.dataset.animated = 'true';
      update();
    }
  });
}
let statsAnimated = false;
window.addEventListener('scroll', () => {
  const statsSection = document.getElementById('stats');
  if (!statsAnimated && statsSection.getBoundingClientRect().top < window.innerHeight - 60) {
    animateStats();
    statsAnimated = true;
  }
});

// Testimonial slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-btn.prev');
const testimonialNext = document.querySelector('.testimonial-btn.next');
let testimonialIndex = 0;
function showTestimonial(idx) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle('active', i === idx);
  });
}
if (testimonialPrev && testimonialNext) {
  testimonialPrev.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  });
  testimonialNext.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  });
}
showTestimonial(testimonialIndex);

// Smooth scroll from home to products section on Shop Now click
const shopNowBtn = document.getElementById('shop-now-btn');
if (shopNowBtn) {
  shopNowBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Highlight active navbar link on scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href').replace('#', ''));
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

function setActiveNav() {
  let current = '';
  const scrollY = window.scrollY + 120; // offset for navbar
  sections.forEach(section => {
    if (section && section.offsetTop <= scrollY) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', setActiveNav);

// Animate sections on scroll/slide into view (replay every time)
const animatedSections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  },
  { threshold: 0.15 }
);
animatedSections.forEach(section => sectionObserver.observe(section)); 