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
