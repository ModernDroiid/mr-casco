/* ==========================================================================
   COMPORTAMIENTO DE LA PÁGINA
   Cada función init* controla una sola funcionalidad.
   ========================================================================== */

(function () {
  "use strict";

  const MOBILE_NAV_QUERY = "(max-width: 53.75em)";

  /* Convierte en enlaces de WhatsApp todo lo marcado con [data-whatsapp] */
  function initWhatsappLinks() {
    const { number, message } = window.MR_CASCO_CONFIG.whatsapp;
    const digits = number.replace(/\D/g, "");

    if (!digits) {
      console.warn("Mr. Casco: falta el número de WhatsApp en js/config.js");
      return;
    }

    const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

    document.querySelectorAll("[data-whatsapp]").forEach((link) => {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
    });
  }

  /* Abre y cierra el menú en pantallas pequeñas */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    }

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia(MOBILE_NAV_QUERY).addEventListener("change", () => setOpen(false));
  }

  /* Mantiene al día el año de los derechos reservados */
  function initCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });
  }

  initWhatsappLinks();
  initMobileNav();
  initCurrentYear();
})();
