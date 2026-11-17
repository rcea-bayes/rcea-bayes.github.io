// RCEA BEW 2027 site script: mobile menu, active menu entry, and buttons that follow the timeline.
// No tracking, no external requests.

// ---------------------------------------------------------------------------
// Timeline. Edit only this block when dates or links change.
// Times are Salzburg local time (CET until 28 March 2027, CEST afterwards).
// A button only becomes active when its window is open AND its address is filled in.
var TIMELINE = {
  submission: {
    opens:  '2027-01-07T00:00:00+01:00',
    closes: '2027-03-15T23:59:59+01:00',
    href:   '',   // e.g. 'mailto:rcea2027@plus.ac.at?subject=Submission%20RCEA%20BEW%202027'
    before: 'Submissions open on 7 January 2027',
    open:   'Submit your paper by email',
    after:  'Submissions are closed',
    noLink: 'Submission address follows'
  },
  registration: {
    opens:  '2027-04-19T00:00:00+02:00',
    closes: '2027-05-07T23:59:59+02:00',
    href:   '',   // link to the event in "PLUS Veranstaltungen"
    before: 'Registration opens on 19 April 2027',
    open:   'Register now',
    after:  'Registration is closed',
    noLink: 'Registration link follows'
  }
};
// ---------------------------------------------------------------------------

(function () {
  // Optional override for testing: ?now=2027-02-01
  var now = new Date();
  var m = /[?&]now=([0-9T:+\-]+)/.exec(window.location.search);
  if (m) { var t = new Date(m[1]); if (!isNaN(t)) now = t; }

  Array.prototype.forEach.call(document.querySelectorAll('[data-window]'), function (el) {
    var w = TIMELINE[el.getAttribute('data-window')];
    if (!w) return;
    var opens = new Date(w.opens), closes = new Date(w.closes);
    if (now < opens) { el.textContent = w.before; return; }
    if (now > closes) { el.textContent = w.after; return; }
    if (!w.href) { el.textContent = w.noLink; return; }
    var a = document.createElement('a');
    a.className = 'btn btn-solid';
    a.href = w.href;
    a.textContent = w.open;
    el.parentNode.replaceChild(a, el);
  });
})();

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
