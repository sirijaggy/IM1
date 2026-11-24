/* =========================================================
   HOW ABOUT TENNIS – JavaScript
   1. FARBMODUS: Wechsel zwischen hell und dunkel
   2. Linie in der Navigation: gleitet zur neuen Seite
   3. Schläger-Buttons: Button ↔ Infobox
   ========================================================= */

/* 1. FARBMODUS
   Der Modus wird gespeichert, damit er beim Seitenwechsel bleibt. */
document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  try { localStorage.setItem('hat-theme', theme); } catch (e) {}
});

/* 2. Linie «THIS PAGE»
   Beim Klick auf einen Link in der Navigation merkt sich die Seite,
   wo die Linie gerade ist. Die neue Seite startet die Linie dort
   und lässt sie zur aktuellen Seite gleiten (wie Smart Animate).
   Auf dem Impressum gibt es keine Linie: Sie blendet aus bzw. ein. */
const navbar = document.querySelector('.navbar');
const line = document.querySelector('.nav-indicator');
const current = navbar.querySelector('.nav-link.is-active');

// Position der Linie unter einem Menüpunkt (wie in Figma: 10 px Innenabstand)
function linePosition(link) {
  const bar = navbar.getBoundingClientRect();
  const box = link.getBoundingClientRect();
  return { left: box.left - bar.left + 10, top: box.bottom - bar.top - 9, width: box.width - 20 };
}

function setLine(pos, visible) {
  if (pos) {
    line.style.left = pos.left + 'px';
    line.style.top = pos.top + 'px';
    line.style.width = pos.width + 'px';
  }
  line.style.opacity = visible ? 1 : 0;
}

document.fonts.ready.then(() => {
  const target = current ? linePosition(current) : null;
  let saved = null;
  try {
    saved = sessionStorage.getItem('hat-line');
    sessionStorage.removeItem('hat-line');
  } catch (e) {}

  if (saved === null) {
    // Seite ohne Navigation geöffnet: Linie sofort an ihrem Platz
    setLine(target, Boolean(target));
    return;
  }

  // Über die Navigation gekommen: von der alten Position aus animieren
  const start = JSON.parse(saved);
  setLine(start || target, Boolean(start));
  void line.offsetWidth; // Startposition anwenden, bevor die Animation beginnt
  line.classList.add('is-animated');
  setLine(target || start, Boolean(target));
});

navbar.querySelectorAll('a.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const pos = current ? linePosition(current) : null;
    try { sessionStorage.setItem('hat-line', JSON.stringify(pos)); } catch (e) {}
  });
});

/* 3. Schläger-Buttons (nur auf der Startseite)
   Klick auf den Button → Infobox. Klick auf die Infobox → Button. */
document.querySelectorAll('.part-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('is-open');
  });
});
