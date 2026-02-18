const langButton = document.querySelector(".lang-switch");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const storedLang = localStorage.getItem("tx_lang") || "en";

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.body.dir = lang === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-fa]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll("[data-en-placeholder][data-fa-placeholder]").forEach((el) => {
    el.placeholder = lang === "fa" ? el.dataset.faPlaceholder : el.dataset.enPlaceholder;
  });

  if (langButton) {
    langButton.textContent = lang === "fa" ? langButton.dataset.fa : langButton.dataset.en;
  }

  localStorage.setItem("tx_lang", lang);
}

if (langButton) {
  langButton.addEventListener("click", () => {
    const current = localStorage.getItem("tx_lang") || "en";
    applyLanguage(current === "en" ? "fa" : "en");
  });
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

applyLanguage(storedLang);
