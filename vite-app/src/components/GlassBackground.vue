<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const layerSlow = ref(null)
const layerFast = ref(null)
const cursorGlow = ref(null)

let rafId = null
let targetX = -600
let targetY = -600
let glowX = -600
let glowY = -600

function onMouseMove(e) {
    targetX = e.clientX
    targetY = e.clientY
}

function tick() {
    glowX += (targetX - glowX) * 0.08
    glowY += (targetY - glowY) * 0.08
    if (cursorGlow.value) {
        cursorGlow.value.style.transform = `translate(${glowX}px, ${glowY}px)`
    }
    const sy = window.scrollY
    if (layerSlow.value) layerSlow.value.style.transform = `translateY(${sy * 0.04}px)`
    if (layerFast.value) layerFast.value.style.transform = `translateY(${sy * -0.07}px)`
    rafId = requestAnimationFrame(tick)
}

onMounted(() => {
    // backdrop-filter 的 url() SVG 濾鏡只有 Chromium 能正確渲染
    const isChromium = navigator.userAgentData?.brands?.some(b => b.brand.includes('Chromium'))
    if (isChromium) document.documentElement.classList.add('liquid-ok')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
    <div class="glass-bg" aria-hidden="true">
        <div class="glass-bg-gradient"></div>
        <div class="bg-grid"></div>

        <div ref="layerSlow" class="bg-layer">
            <div class="glass-orb glass-orb-purple"></div>
            <span class="bg-shape bg-ring-1"></span>
            <span class="bg-shape bg-dot-1"></span>
            <span class="bg-shape bg-dot-2"></span>
            <span class="bg-shape bg-line-1"></span>
        </div>

        <div ref="layerFast" class="bg-layer">
            <div class="glass-orb glass-orb-cyan"></div>
            <div class="glass-orb glass-orb-pink"></div>
            <span class="bg-shape bg-ring-2"></span>
            <span class="bg-shape bg-dot-3"></span>
            <span class="bg-shape bg-diamond-1"></span>
            <span class="bg-shape bg-line-2"></span>
            <span class="bg-shape bg-ring-3"></span>
            <span class="bg-shape bg-dot-4"></span>
        </div>

        <div ref="cursorGlow" class="glow-cursor"></div>
    </div>

    <!-- 液態折射用的 SVG 位移濾鏡（供 backdrop-filter: url(#liquid-glass) 取用） -->
    <svg class="liquid-defs" aria-hidden="true" focusable="false">
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="7" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="4" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="24" xChannelSelector="R" yChannelSelector="G" />
        </filter>
    </svg>
</template>
