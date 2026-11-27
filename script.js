// =========================================================
// HOW ABOUT TENNIS – JavaScript
// 1. Farbmodus (hell / dunkel)
// 2. Mobile-Menü
// 3. Infoboxen auf der Startseite
// 3. Nummern auf dem Schläger, scroll to Infobox and open
// =========================================================

// ---------- 1. Farbmodus ----------

// Beim Laden: Wurde der Dark Mode gespeichert? Dann einschalten.
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Wechselt zwischen hell und dunkel und merkt sich die Wahl
function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Alle Farbmodus-Buttons (Desktop, Mobile-Icon, Mobile-Menü)
const themeButtons = document.querySelectorAll(".theme-button");

themeButtons.forEach(function (button) {
  button.addEventListener("click", toggleTheme);
});


// ---------- 2. Mobile-Menü ----------

const header = document.querySelector(".header");
const menuButton = document.querySelector(".menu-button");

menuButton.addEventListener("click", function () {
  header.classList.toggle("open");
});


// ---------- 3. Infoboxen ----------
// Klick auf eine Infobox öffnet sie, nochmals klicken schliesst sie.

const infoboxes = document.querySelectorAll(".infobox");

infoboxes.forEach(function (infobox) {
  infobox.addEventListener("click", function () {
    infobox.classList.toggle("open");
  });
});


// Alle Nummern auf dem Schläger
const numbers = document.querySelectorAll(".number");

numbers.forEach(function (number) {
  number.addEventListener("click", function (event) {
    // Den normalen Sprung des Links verhindern
    event.preventDefault();

    // Die passende Infobox suchen (z. B. href="#frame" → id="frame")
    const box = document.querySelector(number.getAttribute("href"));

    // Infobox öffnen
    box.classList.add("open");

    // Warten, bis die Box fertig aufgegangen ist (0.3 s wie im CSS),
    // dann weich in die Mitte des Bildschirms scrollen
    setTimeout(function () {
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  });
});