<div align="center">

<h1>Chen Yu Hsu — Portfolio</h1>

<p>Personal Portfolio & Interactive Work Collection · Vue 3 + Vite 5</p>

<br/>

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-chenyuhsu413.github.io-3b82f6?style=for-the-badge)](https://chenyuhsu413.github.io/ChenYuPersonalPage/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/ChenYuHsu413/ChenYuPersonalPage/deploy.yml?style=for-the-badge&label=Deploy&logo=github-actions&logoColor=white&color=22c55e)](https://github.com/ChenYuHsu413/ChenYuPersonalPage/actions)
[![Last Commit](https://img.shields.io/github/last-commit/ChenYuHsu413/ChenYuPersonalPage?style=for-the-badge&label=Updated&color=8b5cf6)](https://github.com/ChenYuHsu413/ChenYuPersonalPage/commits/main)

<br/><br/>

[![Tech Icons](https://skillicons.dev/icons?i=vue,vite,js,css,html,github)](https://skillicons.dev)

<br/><br/>

[![Site Preview](https://raw.githubusercontent.com/ChenYuHsu413/ChenYuPersonalPage/main/vite-app/public/sources/demo-screenshot.png)](https://chenyuhsu413.github.io/ChenYuPersonalPage/)

</div>

---

## ✨ Features

- 🔍 **Dynamic Work Filtering** — Vue 3 reactive tabs switching between All Works, Personal Projects, and Course Homework
- 🪟 **Glassmorphism UI** — Sticky blur header, glass-surface cards, and micro-hover animations on dark/light themes
- 🎬 **GSAP Motion Suite** — Scroll-triggered stagger entrance animations across all sections via ScrollTrigger
- 🗂 **Project Detail Modals** — Click any card for a full overlay with description, tech tags, and source links
- 🕐 **Live Clock Widget** — Segmented digit-card for Taipei time with pulsing live dot and blinking colon separators
- 📱 **Fully Responsive** — Mobile-first design adapting across mobile, tablet, and widescreen
- 📧 **EmailJS Contact Form** — Serverless delivery with loading / success / error states and auto-reply to sender
- 🌐 **Open Graph Preview** — OG + Twitter Card meta tags for rich link previews on LINE, Facebook, and Twitter
- 🏅 **Project Highlight Badges** — One-line outcome badge per card for quick-scan value communication
- 🌙 **Light / Dark Mode** — CSS-variable theming, `localStorage` persistence, anti-FOUC inline script
- 📊 **GitHub API Stats** — Live public repo count fetched from the GitHub API and shown as a stat card
- ⚡ **Vite SFC Build** — Tree-shaken bundle (~84 kB gzip JS), HMR dev experience, GitHub Actions CI/CD

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | ![Vue](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vue.js&logoColor=white) Composition API · `<script setup>` SFC |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white) HMR · tree-shaking · GitHub Pages base path |
| **Animation** | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black) ScrollTrigger · npm bundle |
| **Email** | ![EmailJS](https://img.shields.io/badge/EmailJS-f97316?style=flat-square&logoColor=white) `@emailjs/browser` · no backend required |
| **Styling** | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) Custom properties · glassmorphism |
| **Icons** | ![FontAwesome](https://img.shields.io/badge/Font_Awesome_6-528DD7?style=flat-square&logo=fontawesome&logoColor=white) CDN |
| **Deploy** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white) → ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white) |

---

## 📁 File Structure

```text
ChenYuPersonalPage/
|-- README.md
|-- .github/
|   └── workflows/
|       └── deploy.yml         # GitHub Actions: build vite-app → GitHub Pages
|-- vite-app/                  # Vite 5 + Vue 3 SFC
|   |-- index.html
|   |-- vite.config.js
|   |-- package.json
|   |-- public/
|   |   └── sources/           # Static assets (images)
|   └── src/
|       |-- App.vue            # Shared state, GSAP, EmailJS, theme
|       |-- main.js
|       |-- style.css
|       |-- data/projects.js   # PROJECTS static data module
|       └── components/        # 9 SFCs
|                              # AppHeader · HeroSection · AboutSection
|                              # ResumeSection · HonorsSection · WorkSection
|                              # ContactSection · ProjectModal · AppFooter
└── docs/
    |-- AGENT.md
    |-- dev-log.md
    |-- interview-qa.md
    └── 工作報告.md
```

---

## ➕ How to Add New Projects

Open `vite-app/src/data/projects.js` and add a new object to the `PROJECTS` array:

```javascript
{
    id: 'hw-new',
    title: 'Your Project Title',
    category: 'homework',          // 'homework' or 'project'
    highlight: 'One-line outcome badge shown on the card',
    shortDescription: 'Short card description.',
    longDescription: 'Full description shown in the modal.',
    tags: ['Python', 'Streamlit'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/ChenYuHsu413/your-repo',
    previewImage: 'https://raw.githubusercontent.com/.../screenshot.png',
    colorGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    date: '2026'
}
```

Then push to `main` — GitHub Actions will automatically rebuild and redeploy.

---

## 🚀 How to Run Locally

```bash
cd vite-app
npm install
npm run dev
# → http://localhost:5173/ChenYuPersonalPage/
```

---

<div align="center">

Made with ❤️ by [Chen Yu Hsu](https://github.com/ChenYuHsu413)

</div>
