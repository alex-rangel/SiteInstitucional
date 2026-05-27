/**
 * AC Rangel - Landing Page
 * Configure o número do WhatsApp abaixo (formato: 5519999999999)
 */
const WHATSAPP_NUMBER = '5521964050746';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Gostaria de solicitar um orçamento para serviços elétricos.'
);

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/** Atualiza todos os links do WhatsApp */
function initWhatsAppLinks() {
  const links = document.querySelectorAll('[data-whatsapp]');
  links.forEach((link) => {
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

/** Animação de fade-in ao rolar a página */
function initScrollAnimations() {
  const sections = document.querySelectorAll(
    '.section .container, .cta-banner__inner'
  );

  sections.forEach((el) => {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/** Destaca o botão flutuante após rolar */
function initFloatingButton() {
  const floatBtn = document.querySelector('.whatsapp-float');
  if (!floatBtn) return;

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 300) {
        floatBtn.style.opacity = '1';
        floatBtn.style.pointerEvents = 'auto';
      }

      if (currentScroll > lastScroll && currentScroll > 600) {
        floatBtn.style.transform = 'scale(0.9)';
      } else {
        floatBtn.style.transform = '';
      }

      lastScroll = currentScroll;
    },
    { passive: true }
  );
}

const HEADER_OFFSET = 76;

/** Fecha menu mobile */
function closeMobileMenu() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.site-header__toggle');

  if (header) header.classList.remove('is-menu-open');
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  }
}

/** Smooth scroll para âncoras internas */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });
}

/** Menu principal: mobile e link ativo */
function initSiteHeader() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.site-header__toggle');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  if (!header) return;

  const sections = [
    { id: 'inicio', el: document.getElementById('inicio') },
    { id: 'servicos', el: document.getElementById('servicos') },
    { id: 'sobre', el: document.getElementById('sobre') },
    { id: 'footer', el: document.getElementById('footer') },
  ].filter((s) => s.el);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
      closeMobileMenu();
    });
  });

  function setActiveNav() {
    const scrollPos = window.scrollY + HEADER_OFFSET + 20;
    let current = sections[0]?.id ?? 'inicio';

    sections.forEach(({ id, el }) => {
      if (el.offsetTop <= scrollPos) current = id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === `#${current}`);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();
}

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initScrollAnimations();
  initFloatingButton();
  initSmoothScroll();
  initSiteHeader();
});
