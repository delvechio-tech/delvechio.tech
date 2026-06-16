const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const revealHeroTitle = () => {
  const heroTitle = document.getElementById("hero-title");
  heroTitle?.classList.add("reveal-active");
};

const setupScrollReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");

        if (entry.target.querySelector(".text-reveal-content")) {
          entry.target.classList.add("reveal-active");
        }

        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
};

const setupFlashlightCards = () => {
  document.querySelectorAll(".flashlight-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    });
  });
};

const setupMobileMenu = () => {
  menuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => header?.classList.add("loaded"), 100);
  setTimeout(revealHeroTitle, 450);

  updateHeader();
  setupScrollReveal();
  setupFlashlightCards();
  setupMobileMenu();
});

window.addEventListener("scroll", updateHeader, { passive: true });
