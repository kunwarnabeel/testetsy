/* Ivory invitation — hash pages + live countdown */
const PAGES = ['p-landing','s0','s1','s2','s3','s4','s5','s6','s7'];
const WEDDING = '2029-07-22T15:30:00';
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function show(id){
  const t = PAGES.includes(id) ? id : 'p-landing';
  PAGES.forEach(p => document.getElementById(p).classList.toggle('on', p === t));
  window.scrollTo(0,0);
}
const route = () => show((location.hash || '#p-landing').slice(1));
window.addEventListener('hashchange', route);

const clock = document.querySelector('.clock');
if (clock){
  const c = {d:clock.querySelector('[data-d]'),h:clock.querySelector('[data-h]'),
             m:clock.querySelector('[data-m]'),s:clock.querySelector('[data-s]')};
  const target = new Date(WEDDING).getTime();
  const pad = n => String(n).padStart(2,'0');
  const tick = () => {
    const sec = Math.floor(Math.max(0, target - Date.now())/1000);
    c.d.textContent = Math.floor(sec/86400);
    c.h.textContent = pad(Math.floor(sec/3600)%24);
    c.m.textContent = pad(Math.floor(sec/60)%60);
    c.s.textContent = pad(sec%60);
  };
  tick(); setInterval(tick,1000);
}
route();
