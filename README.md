# ChenYuPersonalPage - Personal Portfolio & Work Collection

A responsive personal portfolio website for Chen Yu Hsu, redesigned as an interactive project showcase hub. The site includes dynamic work filtering, a live time/date display, profile information, and an elegant details overlay for each homework and project.

---

## Live Demo

[View the live site](https://chenyuhsu413.github.io/ChenYuPersonalPage/)

---

## Features

- **Dynamic Work Filtering**: Built with Vue 3 to instantly filter items between "All Works", "Personal Projects", and "Course Homework".
- **Glassmorphism UI**: High-end modern styling with sticky blur headers, sophisticated dark theme, and micro-hover animations.
- **GSAP Motion Suite**: Smooth scroll-triggered entrance animations for section titles, timeline blocks, stats, and project cards.
- **Detailed Project Overlays**: Clicking any card opens a details modal with project descriptions, meta tags, and source code links.
- **Live Clock Widget**: Segmented digit-card clock for Taipei time — individual glass boxes per digit, pulsing live indicator, and blinking colon separators.
- **Fully Responsive**: Adapts automatically to mobile, tablet, and widescreen views.
- **EmailJS Contact Form**: Real email delivery via EmailJS — no backend required. Form shows loading / success / error states. Auto-reply sent to the submitter.
- **Social Preview (OG Tags)**: Open Graph and Twitter Card meta tags for rich link previews on LINE, Facebook, and Twitter.
- **Project Highlight Badges**: Each project card shows a one-line outcome badge for quick-scan value communication.
- **Light / Dark Mode Toggle**: Full CSS-variable-based theme switching with localStorage persistence and anti-FOUC inline script.
- **GitHub API Stats**: Fetches live public repo count from the GitHub API and displays it as a stat card.
- **Vite Build (SFC)**: Vite 5 + Vue 3 SFC architecture in `vite-app/` — bundled, tree-shaken, deployed via GitHub Actions CI/CD.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 + Vite 5 (`<script setup>` Composition API) |
| Animation | gsap + ScrollTrigger (npm) |
| Email | @emailjs/browser (npm) |
| Styling | Vanilla CSS3 (Custom properties, glassmorphism) |
| Icons | FontAwesome 6 CDN |
| Deploy | GitHub Actions → GitHub Pages |

---

## File Structure

```text
ChenYuPersonalPage/
|-- README.md
|-- .github/
|   `-- workflows/
|       `-- deploy.yml         # GitHub Actions: build vite-app → GitHub Pages
|-- vite-app/                  # Vite 5 + Vue 3 SFC
|   |-- index.html
|   |-- vite.config.js
|   |-- package.json
|   |-- public/
|   |   `-- sources/           # Static assets (images)
|   `-- src/
|       |-- App.vue            # Shared state, GSAP, EmailJS, theme
|       |-- main.js
|       |-- style.css
|       |-- data/projects.js   # PROJECTS static data module
|       `-- components/        # 9 SFCs (Header/Hero/About/Resume/Honors/
|                              #         Work/Contact/Modal/Footer)
`-- docs/
    |-- AGENT.md
    |-- dev-log.md
    |-- interview-qa.md
    `-- 工作報告.md
```

---

## How to Add New Homework or Projects

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

## How to Run Locally

```bash
cd vite-app
npm install
npm run dev
# → http://localhost:5173/ChenYuPersonalPage/
```
