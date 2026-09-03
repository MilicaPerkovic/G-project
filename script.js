const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const progressBar = document.querySelector('.progress-bar span');
const revealItems = document.querySelectorAll('.reveal');
const detailButtons = document.querySelectorAll('.js-details');
const contactForm = document.querySelector('.contact-form');

const closeNav = () => {
  siteNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach((item) => observer.observe(item));

detailButtons.forEach((button) => {
  button.dataset.label = button.textContent;

  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    const isHidden = target.hasAttribute('hidden');
    target.toggleAttribute('hidden');
    button.textContent = isHidden ? 'Sakrij informacije' : button.dataset.label;
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    alert('Ovo je prototip. Forma je spremna za kasniju integraciju.');
  });
}

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
