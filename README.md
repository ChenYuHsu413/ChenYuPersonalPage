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
├── index.html                 # Main portfolio page (Vue 3 templates)
├── style.css                  # Core CSS styles (glassmorphism & layout)
├── script.js                  # Application logic (Vue 3 instance + GSAP trigger)
├── README.md                  # Project overview & guidelines
│
├── homeworks/                 # Course homework assignments
│   ├── hw1/                   # Homework 1: Semantic HTML
│   │   └── index.html
│   └── hw2/                   # Homework 2: CSS Flexbox Layout
│       └── index.html
│
├── projects/                  # Personal web projects
│   └── proj1/                 # Project 1: Glassmorphism Calculator
│       └── index.html
│
├── sources/                   # Media assets (profile pictures, icons)
│   ├── PikaSheen.jpg
│   └── demo-screenshot.png
│
└── docs/                      # AI assistant documents & reports
    ├── AGENT.md
    ├── dev-log.md
    └── 工作報告.md
```

---

## How to Add New Homework or Projects

To add a new work to your portfolio, follow these two steps:

### Step 1: Create the Work Directory
Place your code files inside a self-contained sub-folder under `homeworks/` or `projects/`:
- For homework: `homeworks/hw3/index.html` (include any accompanying styles or scripts in the same folder)
- For personal projects: `projects/proj2/index.html`

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
    demoUrl: 'homeworks/hw3/index.html',            // Relative path to your folder
    githubUrl: 'https://github.com/ChenYuHsu413/ChenYuPersonalPage/tree/main/homeworks/hw3', // GitHub code path
    colorGradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', // Custom card background gradient
    date: 'Feb 2026'                                // Completion date
}
```

---

## How to Run Locally

Open `index.html` directly in a browser, or run a local static server from the project folder:

```bash
# Run local HTTP server
npx http-server
```

Then open `http://127.0.0.1:8080` in your web browser.
