
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("show");
    });

    document.querySelectorAll(".navbar a").forEach(link => {
      link.addEventListener("click", function () {
        navbar.classList.remove("show");
      });
    });
  }

  /* ==========================
     BOOKING TABS
  ========================== */
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabs.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* ==========================
     BOOKING FORM => WHATSAPP
  ========================== */
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const ticketType =
        document.getElementById("ticketType")?.value || "";

      const passengers =
        document.getElementById("passengers")?.value || "";

      const travelClass =
        document.getElementById("travelClass")?.value || "";

      const from =
        document.getElementById("from")?.value || "";

      const to =
        document.getElementById("to")?.value || "";

      const departDate =
        document.getElementById("departDate")?.value || "";

      const returnDate =
        document.getElementById("returnDate")?.value || "";

      const message =
`Bonjour MTH VOYAGE,

Je souhaite réserver un billet :

Type : ${ticketType}
Départ : ${from}
Destination : ${to}
Date Aller : ${departDate}
Date Retour : ${returnDate}
Passagers : ${passengers}
Classe : ${travelClass}

Merci de m'envoyer un devis.`;

      const whatsappURL =
        "https://wa.me/221785635806?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank");
    });
  }

  /* ==========================
     SCROLL HEADER EFFECT
  ========================== */
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 50) {
      header.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.10)";
    } else {
      header.style.boxShadow =
        "0 4px 20px rgba(0,0,0,0.05)";
    }

  });

  /* ==========================
     SMOOTH APPEAR ANIMATION
  ========================== */
  const elements = document.querySelectorAll(
    ".service-card, .destination-card, .trust-grid div, .cta-box, .booking-box"
  );

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(35px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
  });

  /* ==========================
     BUTTON HOVER EFFECT
  ========================== */
  const buttons = document.querySelectorAll(
    ".hero-btn, .quote-btn, .search-btn, .outline-btn"
  );

  buttons.forEach(btn => {

    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });

  });

  /* ==========================
     AUTO YEAR FOOTER
  ========================== */
  const copy = document.querySelector(".copyright");

  if (copy) {
    copy.innerHTML =
      "© " +
      new Date().getFullYear() +
      " MTH VOYAGE - Tous droits réservés.";
  }

