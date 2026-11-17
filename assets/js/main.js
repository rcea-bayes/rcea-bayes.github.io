// Mobile menu toggle and active-section highlighting. No tracking, no external requests.
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight the menu entry of the section that sits under the top third of the window.
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var pairs = links
    .map(function (a) { return { link: a, section: document.querySelector(a.getAttribute('href')) }; })
    .filter(function (p) { return p.section; });
  var ticking = false;

  function update() {
    ticking = false;
    var probe = window.innerHeight / 3;
    var current = null;
    pairs.forEach(function (p) {
      if (p.section.getBoundingClientRect().top <= probe) current = p;
    });
    // At the very bottom of the page, the last section counts as current.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) current = pairs[pairs.length - 1];
    pairs.forEach(function (p) { p.link.classList.toggle('active', p === current); });
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
