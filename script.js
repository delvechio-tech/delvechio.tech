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


const pushTrackingEvent = (payload) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

const setupTrackingEvents = () => {
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const link = target?.closest("a[href]");

    if (!link) return;

    const href = link.getAttribute("href") || "";
    const normalizedHref = href.toLowerCase();
    const isWhatsapp =
      normalizedHref.includes("wa.me/") ||
      normalizedHref.includes("api.whatsapp.com") ||
      normalizedHref.includes("web.whatsapp.com");

    if (!isWhatsapp) return;

    const linkText = link.textContent.replace(/\s+/g, " ").trim();
    const decodedHref = (() => {
      try {
        return decodeURIComponent(href);
      } catch {
        return href;
      }
    })();
    const hasDiagnosticIntent = /diagn[óo]stico/i.test(`${linkText} ${decodedHref}`);

    pushTrackingEvent({
      event: "click_whatsapp",
      click_text: linkText.slice(0, 120),
      page_path: window.location.pathname,
      whatsapp_destination: href.split("?")[0],
      lead_intent: hasDiagnosticIntent ? "diagnostico" : "whatsapp",
    });

    if (hasDiagnosticIntent) {
      pushTrackingEvent({
        event: "generate_lead",
        lead_source: "whatsapp",
        lead_intent: "diagnostico",
        page_path: window.location.pathname,
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => header?.classList.add("loaded"), 100);
  setTimeout(revealHeroTitle, 450);

  updateHeader();
  setupScrollReveal();
  setupFlashlightCards();
  setupMobileMenu();
  setupTrackingEvents();
});

window.addEventListener("scroll", updateHeader, { passive: true });
