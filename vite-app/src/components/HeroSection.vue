<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { initBlackHole } from '../blackhole/blackhole.js'

const emit = defineEmits(['scroll-to'])

const BASE = import.meta.env.BASE_URL
const hero = ref(null)
const bhEl = ref(null)
const content = ref(null)

let bh = null
let io = null
let ticking = false
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function blackHoleOptions() {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const options = {
        center: [0.65, 0.4],
        radius: 0.24,
        exposure: 0.7,
        grain: 0.8,
        background: '#0a0a0b',
        fallbackSrc: BASE + 'sources/blackhole-still.webp'
    }
    if (mobile) Object.assign(options, { particleCount: 1200, steps: 64, maxDpr: 1.5 })
    return options
}

// Scroll progress 0..1 across the hero: black hole fades + scales, text fades up
function applyScroll() {
    ticking = false
    if (!hero.value) return
    const p = Math.min(1, Math.max(0, window.scrollY / hero.value.offsetHeight))
    if (bh) bh.setOpacity(Math.max(0, 1 - p * 1.2))
    content.value.style.opacity = String(Math.max(0, 1 - p * 1.8))
    if (reducedMotion) return
    bhEl.value.style.transform = `scale(${1 + 0.08 * p})`
    content.value.style.transform = `translateY(${-60 * p}px)`
}

function onScroll() {
    if (!ticking) {
        ticking = true
        requestAnimationFrame(applyScroll)
    }
}

onMounted(() => {
    bh = initBlackHole(bhEl.value, blackHoleOptions())
    // Stop rendering while the hero is off screen
    io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) bh.resume()
        else bh.pause()
    })
    io.observe(hero.value)
    window.addEventListener('scroll', onScroll, { passive: true })
    applyScroll()
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    if (io) io.disconnect()
    if (bh) bh.destroy()
})
</script>

<template>
    <section id="home" ref="hero" class="hero">
        <div ref="bhEl" class="hero-bh" aria-hidden="true"></div>
        <div class="hero-fade" aria-hidden="true"></div>
        <div ref="content" class="hero-content">
            <div class="hero-inner">
                <p class="hero-eyebrow">AI ENGINEER · TAICHUNG, TW</p>
                <h1 class="hero-name">Chen Yu Hsu</h1>
                <p class="hero-desc">
                    Full-stack engineer building AI-powered web products, with industry experience across web and enterprise stacks. NTHU CS, Taiwan Student Cluster Competition gold medalist.
                </p>
                <a class="hero-link" href="#work" @click.prevent="emit('scroll-to', 'work')">View work ↓</a>
            </div>
        </div>
    </section>
</template>
