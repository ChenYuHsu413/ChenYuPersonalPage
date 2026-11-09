<script setup>
const ENTRIES = [
    {
        time: '2026.09 –', present: true,
        title: 'SaySing Information · AI Engineer',
        desc: 'Building AI-powered products and internal tools; led development of the bilingual ECHOAi brand website with an AI voice guide.',
        tags: ['AI Engineering', 'Next.js', 'Now']
    },
    {
        time: '2026',
        title: 'AI Course',
        desc: 'Completed coursework in AI fundamentals, practical tools, and applied project workflows.',
        tags: ['AI', 'Coursework']
    },
    {
        time: '2022 – 2026',
        title: 'Working Holiday · Australia',
        desc: 'Worked, saved, and self-studied AI fundamentals during a second working holiday in Australia.',
        tags: ['Working Holiday', 'Australia', 'Self-Study']
    },
    {
        time: '2022',
        title: 'VisionAsia Corporation',
        desc: 'Built TypeScript front-end features for a web product.',
        tags: ['TypeScript', 'Front-End', 'Web Product']
    },
    {
        time: '2020 – 2022',
        title: 'National Examination Preparation',
        desc: "Full-time self-study for Taiwan's national civil service examination.",
        tags: ['Self-Study', 'Career Exploration']
    },
    {
        time: '2018 – 2020',
        title: 'Working Holiday · Australia',
        desc: 'Worked, saved, and built English fluency during a first working holiday in Australia.',
        tags: ['Working Holiday', 'Australia', 'English Environment']
    },
    {
        time: '2017 – 2018',
        title: 'Genie Network',
        desc: 'Built full-stack web features — Angular + TypeScript on the front, Node.js on the back.',
        tags: ['Angular', 'TypeScript', 'Node.js']
    },
    {
        time: '2017',
        title: 'Want Want China',
        desc: 'Built Java + Spring MVC web features for enterprise systems.',
        tags: ['Java', 'Spring MVC', 'Enterprise']
    },
    {
        time: '2012 – 2017',
        title: 'National Tsing Hua University',
        desc: 'Majored in Computer Science. NVIDIA Taiwan student ambassador, ITRI part-time research, and Taiwan Student Cluster Competition gold — all during 2015–2016.',
        tags: ['Computer Science', 'Cluster Comp Gold', 'NVIDIA Ambassador']
    }
]
</script>

<template>
    <section id="resume" class="section-container">
        <div class="section-header">
            <h2 class="mono-label section-label">RESUME</h2>
            <p class="section-title">Education and career experience in one readable path.</p>
        </div>
        <ol class="resume-list">
            <li v-for="entry in ENTRIES" :key="entry.time + entry.title" class="resume-row">
                <span class="resume-time">
                    {{ entry.time }}<span v-if="entry.present" class="resume-present"> Present</span>
                </span>
                <div class="resume-main">
                    <h3>{{ entry.title }}</h3>
                    <p>{{ entry.desc }}</p>
                </div>
                <span class="resume-tags">{{ entry.tags.join(' · ') }}</span>
            </li>
        </ol>
    </section>
</template>
