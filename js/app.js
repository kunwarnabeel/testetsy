/* ============================================================
   Replica behaviour: hash "pages", live countdown, RSVP form.
   Matches the reference — no entrance animations, the only
   motion is the CSS hover transform on .tap elements.
   ============================================================ */

const PAGES = ['envelope', 'home', 'details', 'story', 'rsvp'];
const WEDDING_DATE = '2026-11-08T15:45:00';
const TITLES = {
  envelope: 'Click to Open',
  home: 'Home',
  details: 'The Finer Details',
  story: 'Our Love Story',
  rsvp: 'RSVP',
};

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function show(id) {
  const target = PAGES.includes(id) ? id : 'envelope';
  PAGES.forEach((p) => {
    document.getElementById('p-' + p).classList.toggle('on', p === target);
  });
  window.scrollTo(0, 0);
  document.title = TITLES[target];
}

const route = () => show((location.hash || '#envelope').slice(1));
window.addEventListener('hashchange', route);

/* ---------------- countdown ---------------- */
const clock = document.getElementById('clock');
const cell = {
  d: clock.querySelector('[data-d]'),
  h: clock.querySelector('[data-h]'),
  m: clock.querySelector('[data-m]'),
  s: clock.querySelector('[data-s]'),
};
const target = new Date(WEDDING_DATE).getTime();
const pad = (n) => String(n).padStart(2, '0');

function tick() {
  const diff = Math.max(0, target - Date.now());
  const sec = Math.floor(diff / 1000);
  cell.d.textContent = Math.floor(sec / 86400);
  cell.h.textContent = pad(Math.floor(sec / 3600) % 24);
  cell.m.textContent = pad(Math.floor(sec / 60) % 60);
  cell.s.textContent = pad(sec % 60);
}
tick();
setInterval(tick, 1000);

/* ---------------- RSVP form ---------------- */
const form = document.getElementById('rsvpForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();

  if (!name) return (note.textContent = 'Please tell us your name.');
  if (!data.get('attending')) return (note.textContent = 'Please let us know if you can make it.');

  note.textContent =
    data.get('attending') === 'yes'
      ? `Thank you, ${name} — we can't wait to celebrate with you.`
      : `Thank you for letting us know, ${name} — you'll be missed.`;
  form.querySelector('.submit').disabled = true;
  console.log('RSVP', Object.fromEntries(data));
});

route();
