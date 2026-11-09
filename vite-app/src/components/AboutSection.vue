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
            <h2>Full-stack engineer working at the intersection of web and AI.</h2>
        </div>
        <div class="about-content">
            <div class="about-decoration">
                <div class="deco-circle"></div>
            </div>
            <div class="about-text-wrapper">
                <p>
                    Currently an AI Engineer at SaySing, turning AI into products people actually use &mdash; voice guides, LLM integrations, and assistants that route visitors to the right page. On the side, I keep building personal projects like multi-agent simulations and predictive maintenance.
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
