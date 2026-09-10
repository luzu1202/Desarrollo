const timelineData = {
  2003: {
    club: "Manchester United",
    title: "El salto al gran escenario",
    description: "Con 18 años, Cristiano llega a Old Trafford. Sir Alex Ferguson confía en aquel extremo portugués que pronto se convertiría en el número 7 más icónico del fútbol inglés.",
    number: "07",
    progress: "7%"
  },
  2008: {
    club: "Manchester United",
    title: "El primer Balón de Oro",
    description: "Una temporada de ensueño: 42 goles, una Premier League, una Champions League y el primer Balón de Oro de su carrera. El mundo ya conoce su nombre.",
    number: "42",
    progress: "29%"
  },
  2014: {
    club: "Real Madrid",
    title: "Una noche para la historia",
    description: "La Décima llega a Madrid y Cristiano firma una Champions inolvidable. Su voracidad goleadora lo convierte en el máximo referente de un equipo histórico.",
    number: "17",
    progress: "52%"
  },
  2018: {
    club: "Juventus",
    title: "Un nuevo desafío",
    description: "Después de nueve temporadas en Madrid, el delantero acepta el reto italiano. Su chilena en Turín queda como una de las imágenes eternas de la Champions.",
    number: "CR7",
    progress: "75%"
  },
  2023: {
    club: "Al-Nassr · Portugal",
    title: "El récord continúa",
    description: "Cristiano abre una nueva etapa en Arabia Saudí mientras sigue ampliando su legado internacional y defendiendo los colores de Portugal.",
    number: "900",
    progress: "100%"
  }
};

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (menuToggle && siteNavigation) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNavigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNavigation.classList.toggle("is-open", !isOpen);
    if (isOpen) {
      menuToggle.focus();
    }
  });

  siteNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });
}

const timeline = document.querySelector("[data-timeline]");

if (timeline) {
  const buttons = timeline.querySelectorAll(".timeline-button");
  const year = timeline.querySelector("[data-detail-year]");
  const club = timeline.querySelector("[data-detail-club]");
  const title = timeline.querySelector("[data-detail-title]");
  const description = timeline.querySelector("[data-detail-description]");
  const number = timeline.querySelector("[data-detail-number]");
  const progress = timeline.querySelector(".timeline-line span");

  const updateTimeline = (selectedYear) => {
    const data = timelineData[selectedYear];
    if (!data || !year || !club || !title || !description || !number || !progress) return;

    year.textContent = selectedYear;
    club.textContent = data.club;
    title.textContent = data.title;
    description.textContent = data.description;
    number.textContent = data.number;
    progress.style.width = data.progress;

    buttons.forEach((button) => {
      const isActive = button.dataset.year === String(selectedYear);
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => updateTimeline(button.dataset.year));
  });
}
