document.addEventListener('DOMContentLoaded', () => {
  const langWraps = document.querySelectorAll('[data-lang]');
  langWraps.forEach((wrap) => {
    const trigger = wrap.querySelector('.lang-trigger');
    trigger?.addEventListener('click', () => wrap.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
  });

  const drawer = document.querySelector('.mobile-drawer');
  const openBtn = document.querySelector('.burger');
  const closeBtn = document.querySelector('.drawer-close');
  const panel = drawer?.querySelector('.drawer-panel');
  const focusable = 'a,button,input,[tabindex]:not([tabindex="-1"])';

  const lockBody = (on) => document.body.classList.toggle('lock', on);

  const trapFocus = (e) => {
    if (!drawer?.classList.contains('open') || e.key !== 'Tab') return;
    const nodes = panel.querySelectorAll(focusable);
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };

  const openDrawer = () => { drawer?.classList.add('open'); lockBody(true); panel?.querySelector('a,button')?.focus(); };
  const closeDrawer = () => { drawer?.classList.remove('open'); lockBody(false); openBtn?.focus(); };

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    trapFocus(e);
  });

  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      faqItems.forEach((i) => i !== item && i.classList.remove('open'));
      item.classList.toggle('open');
    });
  });

  const modal = document.querySelector('.modal');
  const openModalBtn = document.querySelectorAll('[data-open-privacy]');
  const closeModalBtns = document.querySelectorAll('[data-close-privacy]');
  function openModal() { modal?.classList.add('open'); lockBody(true); }
  function closeModal() { modal?.classList.remove('open'); lockBody(false); }
  openModalBtn.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeModalBtns.forEach((btn) => btn.addEventListener('click', closeModal));
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.style.transform = "translateY(0)";
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".card, .section h2").forEach((el) => {
    el.style.transform = "translateY(12px)";
    el.style.transition = "transform .45s ease";
    io.observe(el);
  });
});
