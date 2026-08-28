/* ============================================================
   Ivory invitation
   Two screens, exactly like the reference: the sealed envelope,
   then one long scrolling invitation.
   ============================================================ */

const SCREENS = ['p-landing', 'invitation'];
const WEDDING = '2029-07-22T15:30:00';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function show(id) {
  const target = SCREENS.includes(id) ? id : 'p-landing';
  SCREENS.forEach((s) => {
    const el = document.getElementById(s);
    if (el) el.classList.toggle('on', s === target);
  });
  window.scrollTo(0, 0);
  document.title = target === 'invitation' ? 'Main Invitation' : 'Save the Date';
}

const route = () => show((location.hash || '#p-landing').slice(1));
window.addEventListener('hashchange', route);

/* the whole envelope opens the invitation, not just the seal */
const landing = document.getElementById('p-landing');
if (landing) {
  landing.style.cursor = 'pointer';
  landing.addEventListener('click', () => { location.hash = '#invitation'; });
}

/* ---------------- countdown ---------------- */
const clock = document.querySelector('.clock');
if (clock) {
  const c = {
    d: clock.querySelector('[data-d]'), h: clock.querySelector('[data-h]'),
    m: clock.querySelector('[data-m]'), s: clock.querySelector('[data-s]'),
  };
  const target = new Date(WEDDING).getTime();
  const pad = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const sec = Math.floor(Math.max(0, target - Date.now()) / 1000);
    c.d.textContent = Math.floor(sec / 86400);
    c.h.textContent = pad(Math.floor(sec / 3600) % 24);
    c.m.textContent = pad(Math.floor(sec / 60) % 60);
    c.s.textContent = pad(sec % 60);
  };
  tick();
  setInterval(tick, 1000);
}

route();
