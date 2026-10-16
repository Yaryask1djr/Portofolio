"use strict";

document.documentElement.classList.add("js");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const mobileViewport = window.matchMedia("(max-width: 768px)");

function setMenu(open) {
    navMenu.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuToggle.querySelector("i").className = open ? "fas fa-xmark" : "fas fa-bars";
}

menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});
navLinks.forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus();
    }
});
document.addEventListener("click", event => {
    if (!event.target.closest(".nav-container")) setMenu(false);
});
mobileViewport.addEventListener("change", () => setMenu(false));

const themeToggle = document.getElementById("themeToggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let themePreference;
// Storage can be blocked in private browsers or embedded previews.
try {
    themePreference = localStorage.getItem("portfolio-theme");
} catch { /* Use the system preference when storage is unavailable. */ }
if (!["dark", "light"].includes(themePreference)) themePreference = null;

function applyTheme(dark) {
    document.body.classList.toggle("dark-mode", dark);
    themeToggle.setAttribute("aria-pressed", String(dark));
    themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.querySelector("i").className = dark ? "fas fa-sun" : "fas fa-moon";
    document.querySelector('meta[name="theme-color"]').content = dark ? "#0f172a" : "#2563eb";
}
applyTheme(themePreference ? themePreference === "dark" : systemTheme.matches);
themeToggle.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark-mode");
    themePreference = dark ? "dark" : "light";
    applyTheme(dark);
    try { localStorage.setItem("portfolio-theme", themePreference); } catch { /* Keep the theme for this visit. */ }
});
systemTheme.addEventListener("change", event => {
    if (!themePreference) applyTheme(event.matches);
});

// Batch geometry reads and avoid doing layout work for every scroll event.
const sections = [...document.querySelectorAll("section[id]")];
let scrollPending = false;
function updateActiveLink() {
    let current = sections[0]?.id;
    for (const section of sections) {
        if (section.getBoundingClientRect().top <= 150) current = section.id;
    }
    navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
    scrollPending = false;
}
window.addEventListener("scroll", () => {
    if (!scrollPending) {
        scrollPending = true;
        window.requestAnimationFrame(updateActiveLink);
    }
}, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

// Observe cards only: hiding whole sections also hides their nested content.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    document.querySelectorAll(".project-card, .skill-card, .service-card").forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}
