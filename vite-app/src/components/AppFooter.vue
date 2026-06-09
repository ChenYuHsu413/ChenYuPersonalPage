<script setup>
const emit = defineEmits(['scroll-to'])
</script>

<template>
    <footer>
        <div class="footer-content">
            <p>&copy; 2026 Chen Yu Hsu. Portfolio &amp; Assignment Hub. All rights reserved.</p>
            <div class="footer-links">
                <a href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer">GitHub</a>
                <a href="#about" @click.prevent="emit('scroll-to', 'about')">About</a>
                <a href="#honors" @click.prevent="emit('scroll-to', 'honors')">Honors</a>
                <a href="#work" @click.prevent="emit('scroll-to', 'work')">Work</a>
            </div>
        </div>
    </footer>
</template>
