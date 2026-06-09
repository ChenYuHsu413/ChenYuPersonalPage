<script setup>
defineProps({
    currentTime: String,
    currentDate: String
})
const emit = defineEmits(['scroll-to'])
</script>

<template>
    <main id="home" class="hero-section">
        <div class="hero-wrapper">
            <div class="hero-text-content">
                <p class="eyebrow fade-in-up">Personal Portfolio &amp; Work Collection</p>
                <h1 class="fade-in-up">Chen Yu Hsu</h1>
                <p class="hero-description fade-in-up">
                    I build clear, useful web experiences with a focus on clean structure, responsive layouts, and thoughtful presentation. This site serves as a central hub for my school homework assignments and personal web projects.
                </p>
                <div class="hero-buttons fade-in-up">
                    <a class="btn primary-btn" href="#work" @click.prevent="emit('scroll-to', 'work')">Explore Work</a>
                    <a class="btn secondary-btn" href="#contact" @click.prevent="emit('scroll-to', 'contact')">Get in Touch</a>
                </div>

                <div class="hero-time fade-in-up">
                    <div class="time-box">
                        <span class="time-label">Current Time (Taipei)</span>
                        <span class="time-val">{{ currentTime }}</span>
                    </div>
                    <div class="date-box">
                        <span class="date-val">{{ currentDate }}</span>
                    </div>
                </div>
            </div>

            <div class="portrait-container fade-in-up">
                <div class="portrait-card">
                    <div class="portrait-img-wrapper">
                        <img class="portrait-img" src="/sources/PikaSheen.jpg" alt="Chen Yu Hsu profile illustration">
                    </div>
                    <div class="portrait-caption">
                        <div>
                            <div class="caption-title">Web Developer Portfolio</div>
                            <div class="caption-subtitle">HTML / CSS / JavaScript / Vue</div>
                        </div>
                        <span class="caption-year">2026</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="scroll-indicator" @click="emit('scroll-to', 'about')">
            <span class="mouse-icon"><span class="mouse-wheel"></span></span>
            <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
        </div>
    </main>
</template>
