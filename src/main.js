import "./style.css";

import {
    profile,
    education,
    skills,
    projects,
    certifications,
    seminars,
    seminarCertificates,
    stats,
} from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
];

const join = (...parts) => parts.filter(Boolean).join(" · ");
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const pad = (number) => String(number).padStart(2, "0");

const icons = {
    arrow: `<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>`,

    chip: `<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>`,

    badge: `<svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14 -1.5 8 5-3 5 3-1.5-8"/></svg>`,
};

/* =========================
   HOME AND PROFILE
========================= */

document.title = `${profile.name} | Portfolio`;

$("#name").textContent = profile.name;
$("#title").textContent = profile.title;
$("#badge").textContent = profile.badge;
$("#tagline").textContent = profile.tagline;
$("#location").textContent = profile.location;
$("#school-line").textContent = education[0].school;
$("#about-long").textContent = profile.about;

const initials = profile.name
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word) && !word.endsWith("."))
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

$("#logo").textContent = initials;

// The photo comes from data.js (profile.photo) and is always cropped to the circle.
$("#avatar").innerHTML = `
  <div class="avatar-inner">
    ${
    profile.photo
        ? `<img
  src="${profile.photo}"
  alt="${profile.name}"
  class="profile-picture"
/>`
        : `<span class="avatar-initials">${initials}</span>`
}
  </div>
`;

$("#stats").innerHTML = stats
    .map(
        (stat, index) => `
      <div class="stat-card reveal" style="--i:${5 + index}">
        <p class="stat-number">
          <span
            class="count"
            data-target="${stat.value}"
            data-suffix="${stat.suffix || ""}"
          >0${stat.suffix || ""}</span>
        </p>
        <p class="stat-label">${stat.label}</p>
        <span class="stat-index">${pad(index + 1)}</span>
        <div class="bar stat-fill">
          <span class="bar-fill" data-w="100"></span>
        </div>
      </div>
    `
    )
    .join("");

/* =========================
   EDUCATION
========================= */

$("#education-list").innerHTML = education
    .map(
        (item) => `
      <div>
        <h4 class="education-degree">${item.degree}</h4>
        <p class="education-school">${item.school}</p>
        <p>${item.place}</p>

        <div class="year-track">
          ${Array.from(
            { length: item.totalYears },
            (_, index) => `
              <span class="${index < item.year ? "done" : ""}"></span>
            `
        ).join("")}
        </div>

        <p class="education-progress">
          ${join(
            `Year ${item.year} of ${item.totalYears}`,
            item.note
        )}
        </p>
      </div>
    `
    )
    .join("");

/* =========================
   TECHNICAL SKILLS (names only, no percentages)
========================= */

$("#skills-list").innerHTML = skills
    .map(
        (group) => `
      <div class="skill-group">
        <p class="skill-group-title">${group.group}</p>

        <div class="skill-items">
          ${group.items
            .map(
                (item) => `
                <span class="skill-row">
                  <span class="skill-meta">${item.name}</span>
                </span>
              `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");

/* =========================
   PROJECT CARDS
========================= */

$("#projects-list").innerHTML = projects
    .map((project, index) => {
        const body = `
      <div class="project-top">
        <span class="project-no">PROJECT / ${pad(index + 1)}</span>
        ${icons.chip}
      </div>

      <h3>${project.title}</h3>
      <p>${project.desc}</p>

      ${
            project.stats && project.stats.length
                ? `
            <div class="project-stats">
              ${project.stats
                    .map(
                        (item) => `
                    <div class="project-stat">
                      <strong>${item.value}</strong>
                      <span>${item.label}</span>
                    </div>
                  `
                    )
                    .join("")}
            </div>
          `
                : ""
        }

      <div class="tag-row">
        ${project.tech
            .map((technology) => `<span class="tag">${technology}</span>`)
            .join("")}
      </div>

      ${
            project.url
                ? `<span class="project-link">View project ${icons.arrow}</span>`
                : ""
        }
    `;

        return project.url
            ? `
        <a
          href="${project.url}"
          target="_blank"
          rel="noopener"
          class="glass glass-hover project-card reveal"
          style="--i:${2 + index}"
        >${body}</a>
      `
            : `
        <article
          class="glass glass-hover project-card reveal"
          style="--i:${2 + index}"
        >${body}</article>
      `;
    })
    .join("");

/* =========================
   CERTIFICATES (picture on top, click to enlarge)
========================= */

$("#certs-list").innerHTML = certifications
    .map(
        (certificate, index) => `
      <article
        class="glass glass-hover cert-card reveal"
        style="--i:${2 + index}"
      >
        <div class="cert-body">
          <div class="cert-top">
            <span class="cert-icon">${icons.badge}</span>
            <span class="cert-number">CREDENTIAL / ${pad(index + 1)}</span>
          </div>

          <h3>${certificate.title}</h3>

          <p class="cert-meta">
            ${
            join(certificate.issuer, certificate.date) ||
            "Details to be added"
        }
          </p>

          ${
            certificate.file
                ? `<a
                  class="cert-link"
                  href="${certificate.file}"
                  target="_blank"
                  rel="noopener"
                >Open file ${icons.arrow}</a>`
                : ""
        }
        </div>
      </article>
    `
    )
    .join("");

// Full-size certificate viewer (created here so index.html does not need changes)
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button type="button" class="lightbox-close" aria-label="Close">✕</button>
  <img class="lightbox-img" alt="" />
`;
document.body.appendChild(lightbox);

const lightboxImage = $(".lightbox-img", lightbox);

function closeLightbox() {
    lightbox.classList.remove("open");
}

document.addEventListener("click", (event) => {
    const thumb = event.target.closest(".cert-thumb[data-src]");

    if (!thumb) return;

    lightboxImage.src = thumb.dataset.src;
    lightboxImage.alt = thumb.dataset.title;
    lightbox.classList.add("open");
});

lightbox.addEventListener("click", closeLightbox);
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
});

/* =========================
   CONTACT LINKS
========================= */

$("#links").innerHTML = profile.links
    .map(
        (link, index) => `
      <a
        href="${link.url}"
        target="_blank"
        rel="noopener"
        class="glass glass-hover contact-link reveal"
        style="--i:${3 + index}"
      >
        <div class="min-w-0">
          <p class="link-label">${link.label}</p>
          <p class="link-value">${link.value || link.url}</p>
        </div>

        <span class="contact-arrow">${icons.arrow}</span>
      </a>
    `
    )
    .join("");

$("#year").textContent = new Date().getFullYear();
$("#credential-count").textContent = String(
    certifications.length
).padStart(2, "0");
$("#footer-name").textContent = profile.name;

/* =========================
   SEMINAR DONUT CHART
========================= */

const palette = [
    "#3e5e2b",
    "#5d8740",
    "#86ad62",
    "#a9c985",
    "#c8dca9",
    "#8aa89a",
];

const counts = {};

seminars.forEach((seminar) => {
    const tag = seminar.tag || "Other";
    counts[tag] = (counts[tag] || 0) + 1;
});

const entries = Object.entries(counts).sort(
    (a, b) => b[1] - a[1]
);

const total = seminars.length;
const radius = 70;
const circumference = 2 * Math.PI * radius;

let offset = 0;

const arcs = entries
    .map(([, count], index) => {
        const length = total ? (count / total) * circumference : 0;
        const dash = Math.max(length - 4, 2);

        const element = `
      <circle
        class="arc"
        cx="100"
        cy="100"
        r="${radius}"
        fill="none"
        stroke="${palette[index % palette.length]}"
        stroke-width="26"
        stroke-dasharray="0 ${circumference}"
        data-dash="${dash}"
        stroke-dashoffset="${-offset}"
        transform="rotate(-90 100 100)"
      />
    `;

        offset += length;
        return element;
    })
    .join("");

$("#seminar-chart").innerHTML = `
  <div class="chart-layout">
    <div>
      <svg
        viewBox="0 0 200 200"
        class="chart-ring"
        role="img"
        aria-label="Seminars by topic"
      >
        <circle
          cx="100"
          cy="100"
          r="${radius}"
          fill="none"
          stroke="#dfe9cc"
          stroke-width="26"
          opacity=".7"
        />

        ${arcs}

        <text
          x="100"
          y="104"
          text-anchor="middle"
          fill="#1f2e17"
          font-size="38"
          font-weight="700"
          font-family="Space Grotesk, sans-serif"
        >${total}</text>

        <text
          x="100"
          y="124"
          text-anchor="middle"
          fill="#66795a"
          font-size="11"
          letter-spacing="2"
        >SEMINARS</text>
      </svg>
    </div>

    <div>
      <h3 class="chart-title">Seminars by topic</h3>
      <ul class="chart-legend">
        ${entries
    .map(
        ([tag, count], index) => `
              <li class="legend-row">
                <span
                  class="legend-dot"
                  style="background:${palette[index % palette.length]}"
                ></span>

                <span>${tag}</span>

                <div class="legend-bar">
                  <span
                    class="bar-fill"
                    data-w="${total ? (count / total) * 100 : 0}"
                    style="background:${palette[index % palette.length]}"
                  ></span>
                </div>
              </li>
            `
    )
    .join("")}
      </ul>
    </div>
  </div>
`;

/* =========================
   SEMINAR FILTERS
========================= */

/* =========================
   SEMINAR CERTIFICATES (pictures live on the Seminars page)
========================= */

// A seminar's date comes from the conference certificate it belongs to.
const seminarDate = (seminar) =>
    seminar.date || seminarCertificates[seminar.cert]?.date || "";

$("#seminar-chart").insertAdjacentHTML(
    "afterend",
    `
  <div class="seminar-certs reveal" style="--i:4">
    <span class="eyebrow">CERTIFICATES OF PARTICIPATION</span>
    <h3 class="chart-title">Conference certificates</h3>
    <p class="text-muted">Click a certificate to view it full size.</p>

    <div class="sem-cert-grid">
      ${seminarCertificates
        .map(
            (item, index) => `
          <article class="glass glass-hover sem-cert-card">
            <button
              type="button"
              class="cert-thumb"
              data-src="${item.image}"
              data-title="${item.title}"
              aria-label="View certificate ${pad(index + 1)} full size"
            >
              <img
                src="${item.image}"
                alt="Certificate of participation: ${item.title}"
                loading="lazy"
              />
            </button>

            <div class="cert-body">
              <p class="cert-number">CERTIFICATE / ${pad(index + 1)}</p>
              <h3>${item.title}</h3>
              <p class="cert-meta">${join(item.date, item.place)}</p>

              <ul class="sem-cert-topics">
                ${seminars
                .filter((seminar) => seminar.cert === index)
                .map((seminar) => `<li>${seminar.title}</li>`)
                .join("")}
              </ul>
            </div>
          </article>
        `
        )
        .join("")}
    </div>
  </div>
`
);

let activeTag = "All";

function renderFilters() {
    const tags = ["All", ...entries.map(([tag]) => tag)];

    $("#seminar-filters").innerHTML = tags
        .map(
            (tag) => `
        <button
          class="filter-chip ${tag === activeTag ? "active" : ""}"
          data-tag="${tag}"
          type="button"
        >${tag}</button>
      `
        )
        .join("");
}

function renderSeminars() {
    const filtered = seminars.filter(
        (seminar) =>
            activeTag === "All" ||
            (seminar.tag || "Other") === activeTag
    );

    $("#seminar-count").textContent =
        `Showing ${filtered.length} of ${total}`;

    $("#seminar-list").innerHTML = filtered
        .map(
            (seminar, index) => `
        <li class="glass seminar-item" style="--i:${index}">
          <span class="seminar-number">
            ${pad(seminars.indexOf(seminar) + 1)}
          </span>

          <div>
            <p class="seminar-title">${seminar.title}</p>

            <p class="seminar-meta">
              ${
                seminar.tag
                    ? `<span class="tag">${seminar.tag}</span>`
                    : ""
            }

              ${seminarDate(seminar) ? `<span>${seminarDate(seminar)}</span>` : ""}
            </p>
          </div>
        </li>
      `
        )
        .join("");
}

$("#seminar-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-tag]");

    if (!button) return;

    activeTag = button.dataset.tag;

    renderFilters();
    renderSeminars();
});

renderFilters();
renderSeminars();

/* =========================
   NUMBER AND BAR ANIMATIONS
========================= */

function countUp(element) {
    const target = Number(element.dataset.target);
    const suffix = element.dataset.suffix || "";

    if (reduceMotion || !target) {
        element.textContent = target + suffix;
        return;
    }

    const duration = 1100;
    const startTime = performance.now();

    function tick(time) {
        const progress = Math.min(
            (time - startTime) / duration,
            1
        );

        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent =
            Math.round(target * eased) + suffix;

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}

function growBars(root) {
    $$(".bar-fill", root).forEach((element) => {
        element.style.width = "0%";
        void element.offsetWidth;

        requestAnimationFrame(() => {
            element.style.width = element.dataset.w + "%";
        });
    });
}

const onEnter = {
    home() {
        $$(".count").forEach(countUp);
        growBars($("#view-home"));
    },

    about() {
        growBars($("#view-about"));
    },

    seminars() {
        growBars($("#view-seminars"));

        $$(".arc").forEach((arc) => {
            arc.setAttribute(
                "stroke-dasharray",
                `0 ${circumference}`
            );

            void arc.getBoundingClientRect();

            requestAnimationFrame(() => {
                const dash = Number(arc.dataset.dash);

                arc.setAttribute(
                    "stroke-dasharray",
                    `${dash} ${circumference - dash}`
                );
            });
        });
    },
};

/* =========================
   PAGE NAVIGATION
========================= */

const pages = [
    "home",
    "about",
    "projects",
    "certificates",
    "seminars",
    "contact",
];

let current = null;
let transitionTimer;

function show(name) {
    if (!pages.includes(name)) name = "home";
    if (name === current) return;

    const next = $(`#view-${name}`);
    if (!next) return;

    const previous = current
        ? $(`#view-${current}`)
        : null;

    current = name;

    $$("[data-nav]").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.nav === name
        );
    });

    clearTimeout(transitionTimer);

    function enterPage() {
        $$(".view").forEach((view) => {
            if (view !== next) {
                view.classList.remove(
                    "is-active",
                    "is-leaving",
                    "is-entering"
                );
            }
        });

        next.classList.add("is-active", "is-entering");

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });

        onEnter[name]?.();

        // Long enough for the staggered "reveal" animations to finish
        transitionTimer = setTimeout(() => {
            next.classList.remove("is-entering");
        }, 1500);
    }

    if (previous && !reduceMotion) {
        previous.classList.add("is-leaving");
        transitionTimer = setTimeout(enterPage, 200);
    } else {
        enterPage();
    }
}

function route() {
    const name = location.hash
        .replace("#", "")
        .replace("/", "");

    show(name || "home");
}

window.addEventListener("hashchange", route);

route();