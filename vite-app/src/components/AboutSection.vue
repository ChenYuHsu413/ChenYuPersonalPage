<script setup>
defineProps({
    githubStats: Object,
    deploymentCount: Number
})
</script>

<template>
    <section id="about" class="section-container">
        <div class="section-header">
            <span class="section-num">01 / About</span>
            <h2>Generalist engineer. Deliberate pivot into AI tooling.</h2>
        </div>
        <div class="about-content">
            <div class="about-decoration">
                <div class="deco-circle"></div>
            </div>
            <div class="about-text-wrapper">
                <p>
                    Web engineer crossing into AI integration. Java/Spring &rarr; Angular/Node &rarr; TypeScript &rarr; AI tooling. The path was deliberate; the focus now is making AI features feel native inside everyday web products.
                </p>
                <div class="stats-row">
                    <div class="stat-card">
                        <span class="stat-number">{{ deploymentCount }}</span>
                        <span class="stat-label">Live Deployments</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">Web + AI</span>
                        <span class="stat-label">Current Focus</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">NTHU CS</span>
                        <span class="stat-label">Cluster Gold</span>
                    </div>
                    <div v-if="githubStats.repos !== null" class="stat-card">
                        <span class="stat-number">{{ githubStats.repos }}</span>
                        <span class="stat-label">GitHub Repos</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
