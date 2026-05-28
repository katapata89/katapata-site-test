(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('[data-site-nav] a').forEach((link) => {
    const href = new URL(link.getAttribute('href'), location.href).pathname.replace(/\/index\.html$/, '/');
    if (href === path || (href !== '/' && path.startsWith(href))) {
      link.classList.add('is-active');
    }
  });
})();
