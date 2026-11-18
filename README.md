# Sofatech — Portfolio · Chioma Kamsi Victor

A modern, fully responsive personal portfolio website for **Chioma Kamsi Victor**, built with plain **HTML, CSS, and JavaScript**. No frameworks, no build step, no dependencies to install.

Brand: **Sofatech** · Owner: Chioma Kamsi Victor

---

## Quick start

Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

For a local server (recommended so links behave like a real site):

```powershell
# PowerShell — serve the folder on http://localhost:8000
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Features

- **Dark / light theme toggle**, saved to `localStorage` and applied before paint (no flash).
- **Sticky navbar** with scrollspy active links and a mobile hamburger menu.
- **Hero** with animated stat counters and a floating profile card.
- **Skills**: AI & Data Analysis, two columns with animated progress bars plus tech chips.
- **Services**: AI & Data Analysis offerings (ML, data analysis, dashboards, NLP, predictive analytics, data engineering).
- **Portfolio**: filterable grid with real images and a click-to-zoom lightbox.
- **Testimonials**: auto-rotating quote slider.
- **Contact**: form with live validation.
- **Downloadable CV**: `cv.html` is a print-optimized résumé. The Download CV button opens it and triggers Save as PDF.
- **Extras**: preloader, scroll-reveal animations, back-to-top button.

---

## Project structure

```
kamsi/
├── index.html        Main one-page portfolio
├── cv.html           Standalone, print-optimized CV (Save as PDF)
├── css/
│   └── style.css     All styling + dark/light themes
├── js/
│   └── script.js     All interactivity (nav, counters, lightbox, theme, form)
└── README.md         This file
```

---

## Sections in `index.html`

| Section | What it shows |
|--------|---------------|
| Hero | Name, role, intro, stats, socials |
| About | Bio, highlights, "Work With Me" and "Download CV" buttons |
| Skills | AI & Data Analysis: AI/ML and Data Analysis bars, tech chips |
| Services | Six AI & Data Analysis service cards |
| Work | Filterable project images with lightbox |
| Testimonials | Rotating client quotes |
| Contact | Contact info plus validated form |

---

## Customization

**Name / bio** — edit the Hero and About text in `index.html`.

**Contact details** — in the Contact section and in `cv.html`: email, phone, location, and social links (X, Facebook).

**Skill percentages** — change the `data-width="…"` values and the `%` labels in the Skills section.

**Services** — edit the six `.service-card` blocks.

**Portfolio images** — each `.work-thumb` has a `src` (thumbnail) and a `data-full` (lightbox size) URL. Replace the Unsplash URLs with your own screenshots. If an image fails to load, the card's gradient shows as a fallback.

**CV content** — edit `cv.html` directly (Profile, Experience, Projects, Education). The Education section currently has placeholders, so fill in your degree and certifications.

**Theme** — toggle with the navbar button; the choice is remembered. Colors are CSS variables in `css/style.css`: `:root` for dark, `[data-theme="light"]` for light.

---

## Tech stack

- HTML5, CSS3 (custom properties, grid/flex, animations), vanilla JavaScript (IntersectionObserver).
- Google Fonts: Plus Jakarta Sans, Space Grotesk.
- Font Awesome 6 for icons.
- Portfolio images from Unsplash.

No build tools. Everything runs straight from the files.

---

## Browser support

Works in all modern evergreen browsers. The lightbox, theme toggle, and print-to-PDF use standard APIs available in current Chrome, Edge, Firefox, and Safari.

---

## Credits

- Images: [Unsplash](https://unsplash.com) (free license). Replace with your own work for production.
- Fonts: Google Fonts (Open Font License).
- Icons: Font Awesome (free).

© Chioma Kamsi Victor · Sofatech.
