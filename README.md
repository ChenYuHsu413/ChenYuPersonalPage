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
- **Live Local Clock**: A real-time Taipei clock updating dynamically.
- **Fully Responsive**: Adapts automatically to mobile, tablet, and widescreen views.
- **EmailJS Contact Form**: Real email delivery via EmailJS — no backend required. Form shows loading / success / error states.
- **Social Preview (OG Tags)**: Open Graph and Twitter Card meta tags for rich link previews on LINE, Facebook, and Twitter.
- **Project Highlight Badges**: Each project card shows a one-line outcome badge for quick-scan value communication.

---

## Tech Stack

- **Framework**: Vue 3 (Progressive CDN)
- **Animation**: GSAP (GreenSock Animation Platform) + ScrollTrigger
- **Styling**: Vanilla CSS3 (Custom properties, Flexbox/Grid)
- **Icons**: FontAwesome 6

---

## File Structure

```text
ChenYuPersonalPage/
|-- index.html                 # Main portfolio page (Vue 3 templates)
|-- style.css                  # Core CSS styles (glassmorphism & layout)
|-- script.js                  # Application logic (Vue 3 instance + GSAP trigger)
|-- README.md                  # Project overview & guidelines
|-- sources/                   # Media assets
|   |-- PikaSheen.jpg
|   |-- demo-screenshot.png
|   `-- workflow_infographic.jpg
`-- docs/                      # AI assistant documents & reports
    |-- AGENT.md
    |-- dev-log.md
    |-- interview-qa.md
    `-- work report files
```

---

## How to Add New Homework or Projects

To add a new work to your portfolio, follow these two steps:

### Step 1: Create the Work Directory

If the demo should live inside this repository, place your code files inside a self-contained sub-folder under `homeworks/` or `projects/`:

- For homework: `homeworks/hw3/index.html` (include any accompanying styles or scripts in the same folder)
- For personal projects: `projects/proj2/index.html`

If the demo already lives in another GitHub repository or deployed site, you can skip creating a local folder and link directly to that external URL.

### Step 2: Register in `script.js`

Open `script.js` and add a new item object into the `projects` array inside the Vue data object. Fill out the metadata fields:

```javascript
{
    id: 'hw-3',                                     // Unique ID string
    title: 'Your Homework Title',                   // Display title
    category: 'homework',                           // Category: 'homework' or 'project'
    categoryLabel: 'Course Homework',               // Display label
    shortDescription: 'One-line summary for card',  // Short card copy
    longDescription: 'Detailed description for modal popup.', // Long modal description
    tags: ['HTML5', 'CSS3', 'JavaScript'],          // Technical tags
    demoUrl: 'homeworks/hw3/index.html',            // Relative path or external demo URL
    githubUrl: 'https://github.com/ChenYuHsu413/ChenYuPersonalPage/tree/main/homeworks/hw3', // GitHub code path
    previewImage: 'https://example.com/preview.png', // Card and modal preview image
    colorGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    highlight: 'One-line outcome shown as a badge on the card',  // Optional
    date: 'Feb 2026'
}
```

---

## How to Run Locally

Open `index.html` directly in a browser, or run a local static server from the project folder:

```bash
npx http-server
```

Then open `http://127.0.0.1:8080` in your web browser.
