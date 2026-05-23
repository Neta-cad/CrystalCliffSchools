// Scroll progress bar
window.addEventListener('load', () => {
  const banner = document.getElementById('announcementBanner');
  const nav = document.querySelector('nav');
  if (banner && nav) {
    const bannerHeight = banner.offsetHeight;
    nav.style.top = bannerHeight + 'px';
    document.querySelector('.hero').style.paddingTop = (bannerHeight + 80) + 'px';
  }
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
  document.getElementById('announcementBanner').classList.add('hidden');
  document.body.style.paddingTop = '0';
}

// Push content down when banner is visible
window.addEventListener('load', () => {
  const banner = document.getElementById('announcementBanner');
  if (banner) {
    document.body.style.paddingTop = banner.offsetHeight + 'px';
  }
});
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

// Remember theme on page reload
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('crystalcliff-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
});