<script setup>
defineProps({
    scrolled: Boolean,
    menuActive: Boolean,
    isDark: Boolean
})
const emit = defineEmits(['toggle-menu', 'toggle-theme', 'scroll-to'])
</script>

<template>
    <header :class="{ 'scrolled': scrolled }">
        <nav class="nav-container">
            <a class="logo" href="#home" @click.prevent="emit('scroll-to', 'home')">
                <span class="logo-mark">CY</span>
                <span class="logo-text">Chen Yu Hsu</span>
            </a>

            <ul class="nav-links" :class="{ 'active': menuActive }">
                <li><a href="#about" @click.prevent="emit('scroll-to', 'about')">About</a></li>
                <li><a href="#resume" @click.prevent="emit('scroll-to', 'resume')">Resume</a></li>
                <li><a href="#honors" @click.prevent="emit('scroll-to', 'honors')">Honors</a></li>
                <li><a href="#work" @click.prevent="emit('scroll-to', 'work')">Work</a></li>
                <li><a href="#contact" @click.prevent="emit('scroll-to', 'contact')">Contact</a></li>
                <li>
                    <a class="github-icon-link" href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
                        <i class="fab fa-github"></i> <span>GitHub</span>
                    </a>
                </li>
            </ul>

            <div class="nav-actions">
                <button
                    class="theme-toggle"
                    @click="emit('toggle-theme')"
                    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
                >
                    <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
                </button>
                <button class="menu-toggle" @click="emit('toggle-menu')" aria-label="Toggle navigation menu">
                    <i :class="menuActive ? 'fas fa-times' : 'fas fa-bars'"></i>
                </button>
            </div>
        </nav>
    </header>
</template>
