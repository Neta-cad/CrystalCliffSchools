// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollBar').style.width = (scrollTop / docHeight * 100) + '%';
});

// Fade up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

// Mobile menu
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('active');
  document.getElementById('mobileMenu').classList.toggle('active');
}

// Form submissions
function submitForm() {
  alert('✅ Application submitted successfully!\nWe will contact you within 24-48 hours.');
}

function sendMessage() {
  alert('✅ Message sent successfully!\nWe will get back to you shortly.');
}
// FAQ Toggle
function toggleFaq(el) {
  const item = el.parentElement;
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => {
    if (i !== item) i.classList.remove('active');
  });
  item.classList.toggle('active');
}
// Announcement Banner
function closeBanner() {
  document.getElementById('announcementBanner').style.display = 'none';
  document.querySelector('nav').style.top = '0';
}




// Page Loader
const pageLoader = document.getElementById('pageLoader');
const loaderBar = document.getElementById('loaderBar');
let loaderProgress = 0;

const loaderInterval = setInterval(() => {
  loaderProgress += Math.random() * 15;
  if (loaderProgress >= 100) {
    loaderProgress = 100;
    loaderBar.style.width = '100%';
    clearInterval(loaderInterval);
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      setTimeout(() => {
        pageLoader.style.display = 'none';
      }, 500);
    }, 300);
  } else {
    loaderBar.style.width = loaderProgress + '%';
  }
}, 100);

// Dark/Light Mode Toggle
function toggleTheme() {
  document.body.classList.toggle('light');
  const btn = document.getElementById('themeToggle');
  if (document.body.classList.contains('light')) {
    btn.textContent = '☀️';
    localStorage.setItem('crystalcliff-theme', 'light');
  } else {
    btn.textContent = '🌙';
    localStorage.setItem('crystalcliff-theme', 'dark');
  }
}


// Animated Number Counters
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// Testimonial Slider
let currentSlide = 0;
const track = document.getElementById('sliderTrack');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
const dotsContainer = document.getElementById('sliderDots');
let slidesPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
let totalSlides = cards.length - slidesPerView;
let autoSlideTimer;

// Create dots
if (dotsContainer && cards.length > 0) {
  for (let i = 0; i <= totalSlides; i++) {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function updateSlider() {
  if (!track) return;
  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides));
  updateSlider();
  resetAutoSlide();
}

function slideTestimonial(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = totalSlides;
  if (currentSlide > totalSlides) currentSlide = 0;
  updateSlider();
  resetAutoSlide();
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(() => slideTestimonial(1), 4000);
}

// Auto slide every 4 seconds
if (cards.length > 0) {
  autoSlideTimer = setInterval(() => slideTestimonial(1), 4000);
}

// Update on resize
window.addEventListener('resize', () => {
  slidesPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  totalSlides = cards.length - slidesPerView;
  currentSlide = 0;
  updateSlider();
});
// Image Lightbox
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', caption: 'Modern Classrooms' },
  { src: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80', caption: 'Science Lab' },
  { src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80', caption: 'Sports Day' },
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80', caption: 'Our Library' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', caption: 'Graduation Day' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80', caption: 'Happy Students' },
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = galleryImages.length - 1;
  if (currentLightboxIndex >= galleryImages.length) currentLightboxIndex = 0;
  updateLightbox();
}

function updateLightbox() {
  const img = galleryImages[currentLightboxIndex];
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxCaption').textContent = img.caption;
  document.getElementById('lightboxCounter').textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowLeft') changeLightbox(-1);
  if (e.key === 'ArrowRight') changeLightbox(1);
  if (e.key === 'Escape') closeLightbox();
});
// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
// Floating Particles
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const symbols = [
    'A+', 'B', '📚', '🎓', '✏️',
    'ABC', '123', '∑', '√', 'π',
    'E=mc²', '🔬', '⚽', '🏆',
    'JSS', 'SSS', 'WAEC', 'A1',
    '♪', '🎨', '💡', '📐', '📏',
    'READ', 'LEARN', 'GROW', '🌟',
  ];

  const colors = [
    '#00d4ff',
    '#7c3aed',
    '#10b981',
    '#00d4ff66',
    '#7c3aed66',
  ];

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(H + 20, H + 200),
      text: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: randomBetween(9, 15),
      speed: randomBetween(0.3, 0.9),
      opacity: randomBetween(0.15, 0.5),
      drift: randomBetween(-0.25, 0.25),
      wobble: randomBetween(0, Math.PI * 2),
      wobbleSpeed: randomBetween(0.005, 0.02),
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < 50; i++) {
      const p = createParticle();
      p.y = randomBetween(0, H);
      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.y -= p.speed;
      p.wobble += p.wobbleSpeed;
      p.x += p.drift + Math.sin(p.wobble) * 0.3;

      const fadeZone = H * 0.15;
      let alpha = p.opacity;
      if (p.y < fadeZone) {
        alpha = p.opacity * (p.y / fadeZone);
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.font = `${p.size}px 'DM Sans', sans-serif`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, p.x, p.y);
      ctx.restore();

      if (p.y < -30) {
        particles[i] = createParticle();
      }
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
  animate();
})();
// Newsletter Signup
function subscribeNewsletter() {
  const name = document.getElementById('newsletterName').value.trim();
  const email = document.getElementById('newsletterEmail').value.trim();

  if (!name) {
    alert('Please enter your full name!');
    return;
  }

  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address!');
    return;
  }

  // Show success message
  document.getElementById('newsletterSuccess').style.display = 'block';
  document.getElementById('newsletterName').value = '';
  document.getElementById('newsletterEmail').value = '';

  // Hide after 5 seconds
  setTimeout(() => {
    document.getElementById('newsletterSuccess').style.display = 'none';
  }, 5000);
}
// Visitor Counter
function initVisitorCounter() {
  // Get stored values
  let totalVisitors = parseInt(localStorage.getItem('cc_total_visitors') || '0');
  let todayVisitors = parseInt(localStorage.getItem('cc_today_visitors') || '0');
  let lastVisitDate = localStorage.getItem('cc_last_visit_date') || '';

  const today = new Date().toDateString();

  // New visitor
  if (!localStorage.getItem('cc_visited')) {
    totalVisitors += 1;
    localStorage.setItem('cc_visited', 'true');
    localStorage.setItem('cc_total_visitors', totalVisitors);
  }

  // Today's visitors
  if (lastVisitDate !== today) {
    todayVisitors = 1;
    localStorage.setItem('cc_today_visitors', todayVisitors);
    localStorage.setItem('cc_last_visit_date', today);
  } else {
    if (!localStorage.getItem('cc_counted_today')) {
      todayVisitors += 1;
      localStorage.setItem('cc_today_visitors', todayVisitors);
      localStorage.setItem('cc_counted_today', 'true');
    }
  }

  // Simulate online visitors (2-8 random)
  const onlineVisitors = Math.floor(Math.random() * 7) + 2;

  // Add base numbers to make it look established
  const baseTotal = 1247;
  const baseToday = 23;

  // Animate counters
  animateVisitorNum('totalVisitors', baseTotal + totalVisitors);
  animateVisitorNum('onlineVisitors', onlineVisitors);
  animateVisitorNum('todayVisitors', baseToday + todayVisitors);
}

function animateVisitorNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, 20);
}

// WhatsApp Enquiry Form
function sendWhatsAppEnquiry() {
  const name = document.getElementById('wName').value.trim();
  const phone = document.getElementById('wPhone').value.trim();
  const type = document.getElementById('wType').value;
  const message = document.getElementById('wMessage').value.trim();

  if (!name) { alert('Please enter your name!'); return; }
  if (!phone) { alert('Please enter your phone number!'); return; }
  if (!message) { alert('Please enter your message!'); return; }

  const whatsappNumber = '2348038982612';

  const fullMessage = `Hello Crystal Cliff Schools! 👋

*Name:* ${name}
*Phone:* ${phone}
*Enquiry Type:* ${type}

*Message:*
${message}

_Sent from Crystal Cliff Schools Website_`;

  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, '_blank');
}
// Load event
window.addEventListener('load', () => {
  // Theme
  const savedTheme = localStorage.getItem('crystalcliff-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
  // Visitor counter
  initVisitorCounter();
});
