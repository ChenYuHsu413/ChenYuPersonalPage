<script setup>
defineProps({
    githubStats: Object
})
</script>

<template>
    <section id="about" class="section-container">
        <div class="section-header">
            <span class="section-num">01 / About</span>
            <h2>Clean layouts, reliable structures, polished execution.</h2>
        </div>
        <div class="about-content">
            <div class="about-decoration">
                <div class="deco-circle"></div>
            </div>
            <div class="about-text-wrapper">
                <p>
                    I enjoy converting creative concepts into structured, semantic, and pixel-perfect webpages. I pay close attention to structural clarity, responsive layout designs, and smooth micro-interactions that elevate the overall user experience.
                </p>
                <div class="stats-row">
                    <div class="stat-card">
                        <span class="stat-number">Vue 3</span>
                        <span class="stat-label">Front-End Engine</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">GSAP</span>
                        <span class="stat-label">Motion Platform</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Responsive Grid</span>
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
