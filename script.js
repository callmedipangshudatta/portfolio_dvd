
/* =========================================
   DIPANGSHU DATTA — PORTFOLIO SCRIPT
   Compatible with the updated index.html
   and style.css
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     1. THEME TOGGLE
  ========================================= */

  const themeButton = document.getElementById("theme");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeButton) {
      const isDark = theme === "dark";

      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  // Read saved theme preference
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {
    console.warn("Theme preference could not be accessed.");
  }

  // Use system preference if no saved preference exists
  if (savedTheme !== "dark" && savedTheme !== "light") {
    savedTheme = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(savedTheme);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(newTheme);

      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Theme preference could not be saved.");
      }
    });
  }


  /* =========================================
     2. MOBILE NAVIGATION
  ========================================= */

  const menuButton = document.getElementById("menu");
  const nav = document.getElementById("nav");

  function closeMenu() {
    if (!menuButton || !nav) return;

    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");

    document.body.style.overflow = "";

    const menuIcon = menuButton.querySelector("i");

    if (menuIcon) {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  }

  function openMenu() {
    if (!menuButton || !nav) return;

    nav.classList.add("open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");

    document.body.style.overflow = "hidden";

    const menuIcon = menuButton.querySelector("i");

    if (menuIcon) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    }
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu after selecting a navigation link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside it
    document.addEventListener("click", (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedMenuButton = menuButton.contains(event.target);

      if (
        nav.classList.contains("open") &&
        !clickedInsideNav &&
        !clickedMenuButton
      ) {
        closeMenu();
      }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close mobile menu when returning to desktop layout
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }


  /* =========================================
     3. SCROLL REVEAL ANIMATIONS
  ========================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("in");
    });
  } else {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("in");

            // Stop observing once the element is revealed
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }


  /* =========================================
     4. ACTIVE NAVIGATION ON SCROLL
  ========================================= */

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("#nav a");

  function updateActiveNavigation() {

    let currentSection = "home";

    const headerHeight = document.querySelector("header")?.offsetHeight || 68;

    sections.forEach(section => {

      const sectionTop = section.offsetTop;
      const scrollPosition = window.scrollY + headerHeight + 120;

      if (scrollPosition >= sectionTop) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      const target = link.getAttribute("href");

      if (target === `#${currentSection}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }

    });
  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  window.addEventListener("resize", updateActiveNavigation);

  updateActiveNavigation();


  /* =========================================
     5. SMOOTH SCROLL FOR INTERNAL LINKS
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      const headerHeight =
        document.querySelector("header")?.offsetHeight || 68;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });

    });

  });


  /* =========================================
     6. INITIALIZE PAGE
  ========================================= */

  document.body.classList.add("loaded");

  console.log("Dipangshu Datta portfolio initialized successfully.");

});
