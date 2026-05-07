document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
     MENU MOBILE
  ====================================== */
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });

    document.querySelectorAll(".navbar a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("show");
      });
    });
  }

  /* ======================================
     TYPE BILLET => CACHER DATE RETOUR
  ====================================== */
  const tripType = document.getElementById("tripType");
  const returnDate = document.getElementById("returnDate");

  function toggleReturnDate() {
    if (!tripType || !returnDate) return;

    if (tripType.value === "oneway") {
      returnDate.style.display = "none";
      returnDate.value = "";
    } else {
      returnDate.style.display = "block";
    }
  }

  if (tripType) {
    tripType.addEventListener("change", toggleReturnDate);
    toggleReturnDate();
  }

  /* ======================================
     BOUTON SWAP DEPART / DESTINATION
  ====================================== */
  const swapBtn = document.getElementById("swapBtn");
  const fromAirport = document.getElementById("fromAirport");
  const toAirport = document.getElementById("toAirport");

  if (swapBtn && fromAirport && toAirport) {
    swapBtn.addEventListener("click", () => {
      const temp = fromAirport.value;
      fromAirport.value = toAirport.value;
      toAirport.value = temp;

      swapBtn.style.transform = "rotate(360deg)";
      setTimeout(() => {
        swapBtn.style.transform = "rotate(0deg)";
      }, 400);
    });
  }

  /* ======================================
     ETAPES UPSELL
  ====================================== */
  const form = document.getElementById("flightForm");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const nextBtns = document.querySelectorAll(".nextBtn");
  const finishBtn = document.getElementById("finishBtn");

  let currentStep = 1;

  function hideAllSteps() {
    [step1, step2, step3].forEach(step => {
      if (step) step.classList.add("hidden");
    });
  }

  function showStep(num) {
    hideAllSteps();

    if (num === 1 && step1) step1.classList.remove("hidden");
    if (num === 2 && step2) step2.classList.remove("hidden");
    if (num === 3 && step3) step3.classList.remove("hidden");

    currentStep = num;

    window.scrollTo({
      top: document.getElementById("upsellArea").offsetTop - 80,
      behavior: "smooth"
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showStep(1);
    });
  }

  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep === 1) showStep(2);
      else if (currentStep === 2) showStep(3);
    });
  });

  /* ======================================
     FIN => WHATSAPP
  ====================================== */
  if (finishBtn) {
    finishBtn.addEventListener("click", () => {

      // infos vol
      const trip = tripType.value === "oneway"
        ? "Aller simple"
        : "Aller-retour";

      const from = fromAirport.value;
      const to = toAirport.value;
      const depart = document.getElementById("departDate").value;
      const ret = returnDate.value;
      const pax = document.getElementById("passengers").value;
      const travelClass =
        document.getElementById("travelClass").value;

      // transport
      let transport = [];
      document.querySelectorAll("#step1 input[type='checkbox']:checked")
        .forEach(item => {
          transport.push(item.value);
        });

      // hotel
      let hotel = "";
      const hotelChecked =
        document.querySelector("input[name='hotel']:checked");

      if (hotelChecked) hotel = hotelChecked.value;

      // bagage
      let bagage = "";
      const bagageChecked =
        document.querySelector("input[name='bagage']:checked");

      if (bagageChecked) bagage = bagageChecked.value;

      /* MESSAGE */
      let msg = `Bonjour MTH VOYAGE,%0A%0A`;
      msg += `Je souhaite un devis voyage :%0A%0A`;

      msg += `✈ Type : ${trip}%0A`;
      msg += `📍 Départ : ${from}%0A`;
      msg += `🌍 Destination : ${to}%0A`;
      msg += `📅 Date Aller : ${depart}%0A`;

      if (tripType.value !== "oneway") {
        msg += `📅 Date Retour : ${ret}%0A`;
      }

      msg += `👤 Passagers : ${pax}%0A`;
      msg += `💺 Classe : ${travelClass}%0A%0A`;

      if (transport.length > 0) {
        msg += `🚗 Transport : ${transport.join(", ")}%0A`;
      }

      if (hotel !== "") {
        msg += `🏨 ${hotel}%0A`;
      }

      if (bagage !== "") {
        msg += `🧳 Bagage supplémentaire : ${bagage}%0A`;
      }

      msg += `%0AMerci.`;

      const url =
        "https://wa.me/221785635806?text=" + msg;

      window.open(url, "_blank");
    });
  }

  /* ======================================
     DATE MIN = AUJOURD'HUI
  ====================================== */
  const today = new Date().toISOString().split("T")[0];
  const departDate = document.getElementById("departDate");

  if (departDate) departDate.min = today;
  if (returnDate) returnDate.min = today;

  if (departDate && returnDate) {
    departDate.addEventListener("change", () => {
      returnDate.min = departDate.value;
    });
  }

  /* ======================================
     APPARITION ANIMATION
  ====================================== */
  const revealItems = document.querySelectorAll(
    ".card, .destination-card, .search-box, .hero-left, .hero-right img"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all .8s ease";
    observer.observe(item);
  });

  /* ======================================
     FOOTER YEAR AUTO
  ====================================== */
  const copy = document.querySelector(".copy");

  if (copy) {
    copy.innerHTML =
      "© " + new Date().getFullYear() +
      " MTH VOYAGE";
  }

});
