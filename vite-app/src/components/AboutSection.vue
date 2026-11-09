<script setup>
defineProps({
    githubStats: Object,
    deploymentCount: Number
})

// Skills shown under the About text — edit this list directly
const SKILLS = [
    'Python', 'TypeScript', 'Java', 'Vue', 'React', 'Next.js',
    'FastAPI', 'PostgreSQL', 'scikit-learn', 'PyTorch', 'LLM Integration', 'WebGL'
]
</script>

<template>
    <section id="about" class="section-container about-section">
        <h2 class="mono-label section-label about-label">ABOUT</h2>
        <div class="about-body section-header">
            <p class="section-title">Full-stack engineer working at the intersection of web and AI.</p>
            <p class="about-lead">
                Currently an AI Engineer at SaySing, turning AI into products people actually use &mdash; voice guides, LLM integrations, and assistants that route visitors to the right page. On the side, I keep building personal projects like multi-agent simulations and predictive maintenance.
            </p>
            <p class="about-skills" aria-label="Technologies I currently use">
                <span v-for="(skill, i) in SKILLS" :key="skill"><span class="skill">{{ skill }}</span><span v-if="i < SKILLS.length - 1" class="sep" aria-hidden="true"> · </span></span>
            </p>
            <dl class="about-stats">
                <div>
                    <dt>Live deployments</dt>
                    <dd>{{ deploymentCount }}</dd>
                </div>
                <div v-if="githubStats.repos !== null">
                    <dt>GitHub repos</dt>
                    <dd>{{ githubStats.repos }}</dd>
                </div>
                <div>
                    <dt>Education</dt>
                    <dd>NTHU CS</dd>
                </div>
                <div>
                    <dt>Cluster Comp</dt>
                    <dd>Gold</dd>
                </div>
            </dl>
        </div>
    </section>
</template>
