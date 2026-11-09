<script setup>
defineProps({
    scrolled: Boolean,
    menuActive: Boolean
})
const emit = defineEmits(['toggle-menu', 'scroll-to'])
</script>

<template>
    <header :class="{ 'scrolled': scrolled }">
        <nav class="nav-container">
            <a class="logo" href="#home" @click.prevent="emit('scroll-to', 'home')">chen yu hsu</a>

            <ul class="nav-links" :class="{ 'active': menuActive }">
                <li><a href="#work" @click.prevent="emit('scroll-to', 'work')">work</a></li>
                <li><a href="#about" @click.prevent="emit('scroll-to', 'about')">about</a></li>
                <li><a href="#resume" @click.prevent="emit('scroll-to', 'resume')">resume</a></li>
                <li><a href="#contact" @click.prevent="emit('scroll-to', 'contact')">contact</a></li>
                <li>
                    <a class="github-icon-link" href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
                        <i class="fab fa-github"></i>
                    </a>
                </li>
            </ul>

            <button class="menu-toggle" @click="emit('toggle-menu')" aria-label="Toggle navigation menu">
                <i :class="menuActive ? 'fas fa-times' : 'fas fa-bars'"></i>
            </button>
        </nav>
    </header>
</template>
