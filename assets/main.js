// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Hamburger
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}
function closeMobile() {
  if (!hamburger || !mobileMenu) return;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}
window.closeMobile = closeMobile;

// Active nav link highlight (multi-page)
(() => {
  const path = (window.location.pathname || '').split('/').pop() || 'index.html';
  const current = path.toLowerCase();
  const links = document.querySelectorAll('.nav-links a, .mobile-menu a');
  links.forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const isMatch =
      (current === 'index.html' && (href === 'index.html' || href === './' || href === '/')) ||
      href === current;
    if (isMatch) a.classList.add('active');
  });
})();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${(i % 3) * 0.1}s`;
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => revealObserver.observe(r));
}

// Home-only intro: "Welcome to JKC" then reveal brand
(() => {
  const intro = document.getElementById('homeIntro');
  const introText = document.getElementById('homeIntroText');
  const navBrand = document.getElementById('navBrand');
  const navEl = document.getElementById('navbar');
  if (!intro || !introText || !navBrand || !navEl) return;

  const runIntro = () => {
    document.body.classList.remove('intro-complete');
    // Let layout settle before computing animation destination
    setTimeout(() => {
      const from = introText.getBoundingClientRect();
      const to = navBrand.getBoundingClientRect();
      const tx = (to.left + (to.width * 0.34)) - (from.left + from.width / 2);
      const ty = (to.top + (to.height / 2)) - (from.top + from.height / 2);
      intro.style.setProperty('--intro-x', `${tx}px`);
      intro.style.setProperty('--intro-y', `${ty}px`);
      intro.classList.add('moving');

      setTimeout(() => {
        // Wave sweep across header when text reaches brand
        navEl.classList.add('wave-run');
        navBrand.classList.remove('intro-hidden');
        navBrand.classList.add('intro-visible');
        setTimeout(() => {
          intro.classList.add('done');
          navEl.classList.remove('wave-run');
          // Delay hero reveal so it starts after intro finishes
          setTimeout(() => {
            document.body.classList.add('intro-complete');
          }, 120);
        }, 380);
      }, 920);
    }, 1150);
  };

  if (document.readyState !== 'loading') runIntro();
  else document.addEventListener('DOMContentLoaded', runIntro, { once: true });
})();

