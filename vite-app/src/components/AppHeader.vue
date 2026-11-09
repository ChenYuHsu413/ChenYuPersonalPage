<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
    scrolled: Boolean,
    menuActive: Boolean
})
const emit = defineEmits(['toggle-menu', 'close-menu', 'scroll-to'])

const toggleBtn = ref(null)
const menuEl = ref(null)

function focusables() {
    return [...menuEl.value.querySelectorAll('a'), toggleBtn.value]   // DOM order
}

// Mobile overlay: Esc closes, Tab stays inside (toggle button + links)
function onKeydown(e) {
    if (e.key === 'Escape') {
        emit('close-menu')
        return
    }
    if (e.key !== 'Tab') return
    const items = focusables()
    const i = items.indexOf(document.activeElement)
    if (e.shiftKey && i <= 0) {
        e.preventDefault()
        items[items.length - 1].focus()
    } else if (!e.shiftKey && i === items.length - 1) {
        e.preventDefault()
        items[0].focus()
    }
}

watch(() => props.menuActive, async open => {
    if (open) {
        document.addEventListener('keydown', onKeydown)
        document.body.style.overflow = 'hidden'
        await nextTick()
        menuEl.value.querySelector('a').focus()
    } else {
        document.removeEventListener('keydown', onKeydown)
        document.body.style.overflow = ''
        if (menuEl.value.contains(document.activeElement)) toggleBtn.value.focus()
    }
})

onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
    <header :class="{ 'scrolled': scrolled, 'menu-open': menuActive }">
        <nav class="nav-container" aria-label="Main">
            <a class="logo" href="#home" @click.prevent="emit('scroll-to', 'home')">chen yu hsu</a>

            <ul
                id="site-menu"
                ref="menuEl"
                class="nav-links"
                :class="{ 'active': menuActive }"
                @click.self="emit('close-menu')"
            >
                <li><a href="#work" @click.prevent="emit('scroll-to', 'work')">work</a></li>
                <li><a href="#about" @click.prevent="emit('scroll-to', 'about')">about</a></li>
                <li><a href="#resume" @click.prevent="emit('scroll-to', 'resume')">resume</a></li>
                <li><a href="#contact" @click.prevent="emit('scroll-to', 'contact')">contact</a></li>
                <li>
                    <a class="github-icon-link" href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer" aria-label="GitHub Profile" @click="emit('close-menu')">
                        <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>

            <button
                ref="toggleBtn"
                class="menu-toggle"
                aria-controls="site-menu"
                :aria-expanded="menuActive"
                :aria-label="menuActive ? 'Close navigation menu' : 'Open navigation menu'"
                @click="emit('toggle-menu')"
            >
                <i :class="menuActive ? 'fas fa-times' : 'fas fa-bars'" aria-hidden="true"></i>
            </button>
        </nav>
    </header>
</template>
