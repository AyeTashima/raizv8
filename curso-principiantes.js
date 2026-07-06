/* =============================================
   CURSO PRINCIPIANTES — acordeones + stagger
   ============================================= */

/* ── HEADER: fondo blanco + sombra al scrollear ── */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const SCROLL_THRESHOLD = 40;

  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* ── MENÚ MOBILE ── */
function initMobileMenu() {
  const burger = document.getElementById('headerBurger');
  const menu = document.getElementById('mobileMenu');

  function toggleMenu() {
    const isOpen = menu.classList.toggle('mobile-menu--active');
    burger.classList.toggle('header__burger--active', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  burger.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('mobile-menu--active');
      burger.classList.remove('header__burger--active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initFaqAccordion();
});

/* ── FAQ: acordeón con imagen dinámica (igual que v2) ── */
function initFaqAccordion() {
  const items = document.querySelectorAll('#accordionFaq .accordion__item');
  const image = document.getElementById('faqImage');
  if (!items.length || !image) return;

  const defaultSrc = image.getAttribute('src');

  items.forEach((item) => {
    const header = item.querySelector('.accordion__header');
    const panel = item.querySelector('.accordion__panel');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('accordion__item--active');

      items.forEach((otherItem) => {
        otherItem.classList.remove('accordion__item--active');
        otherItem.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.accordion__panel').style.maxHeight = null;
      });

      if (isActive) {
        swapImage(defaultSrc);
        return;
      }

      item.classList.add('accordion__item--active');
      header.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';

      swapImage(item.getAttribute('data-image'));
    });
  });

  function swapImage(newSrc) {
    if (!newSrc || image.getAttribute('src') === newSrc) return;
    image.classList.add('faq__image--fading');
    setTimeout(() => {
      image.setAttribute('src', newSrc);
      image.classList.remove('faq__image--fading');
    }, 350);
  }
}

// ── TESTIMONIOS: entrada escalonada desde abajo al scrollear ──
(function () {
  var cards = document.querySelectorAll('.testimonio-card');
  if (!cards.length) return;

  var isMobile = window.innerWidth <= 768;

  if (isMobile) return; // en mobile usa scroll nativo

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    cards.forEach(function (card) { card.classList.add('is-visible'); });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (card) { card.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();


// ── CONTENIDOS: flip cards al tocar ──
(function () {
  var cards = document.querySelectorAll('.flip-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  });
})();