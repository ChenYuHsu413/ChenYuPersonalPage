<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
    filteredProjects: Array,
    activeTab: String,
    getCategoryLabel: Function
})
const emit = defineEmits(['update:activeTab', 'open-modal'])

const TABS = [
    { key: 'all', label: 'All' },
    { key: 'professional', label: 'Professional' },
    { key: 'aiml', label: 'AI & ML' },
    { key: 'web', label: 'Web & Data' },
    { key: 'game', label: 'Game Tools' },
    { key: 'archive', label: 'Archive' }
]

const pad = n => String(n).padStart(2, '0')

// Desktop hover preview (≥1024px with a real pointer)
const PREVIEW_W = 360
const PREVIEW_H = 225
const hoverItem = ref(null)
const shownItem = ref(null)   // keeps the last image during fade-out
const previewPos = ref({ x: 0, y: 0 })
let desktopQuery = null
const canHover = ref(false)

function placePreview(x, y) {
    const maxX = window.innerWidth - PREVIEW_W - 16
    const maxY = window.innerHeight - PREVIEW_H - 16
    previewPos.value = {
        x: Math.min(maxX, x + 24),
        y: Math.max(16, Math.min(maxY, y - PREVIEW_H / 2))
    }
}

function onRowEnter(item, e) {
    if (!canHover.value) return
    hoverItem.value = item
    shownItem.value = item
    placePreview(e.clientX, e.clientY)
}

function onRowMove(e) {
    if (canHover.value && hoverItem.value) placePreview(e.clientX, e.clientY)
}

function onRowFocus(item, e) {
    if (!canHover.value) return
    const r = e.currentTarget.getBoundingClientRect()
    hoverItem.value = item
    shownItem.value = item
    placePreview(r.left + r.width * 0.55, r.top + r.height / 2)
}

function clearHover() {
    hoverItem.value = null
}

function syncQuery() {
    canHover.value = desktopQuery.matches
    if (!canHover.value) hoverItem.value = null
}

onMounted(() => {
    desktopQuery = window.matchMedia('(min-width: 1024px) and (hover: hover)')
    syncQuery()
    desktopQuery.addEventListener('change', syncQuery)
})

onUnmounted(() => {
    desktopQuery.removeEventListener('change', syncQuery)
})
</script>

<template>
    <section id="work" class="section-container work-section">
        <div class="work-head">
            <span class="mono-label">SELECTED WORK</span>
            <span class="mono-label work-count">{{ pad(filteredProjects.length) }}</span>
        </div>

        <div class="filter-tabs" role="tablist" aria-label="Project categories">
            <button
                v-for="tab in TABS"
                :key="tab.key"
                role="tab"
                :aria-selected="activeTab === tab.key"
                :class="{ 'active': activeTab === tab.key }"
                @click="emit('update:activeTab', tab.key)"
            >{{ tab.label }}</button>
        </div>

        <ol class="work-list" @mouseleave="clearHover">
            <li v-for="(item, i) in filteredProjects" :key="item.id">
                <div
                    class="work-row"
                    :class="{ 'is-active': hoverItem && hoverItem.id === item.id }"
                    role="button"
                    tabindex="0"
                    @click="emit('open-modal', item)"
                    @keydown.enter.prevent="emit('open-modal', item)"
                    @mouseenter="onRowEnter(item, $event)"
                    @mousemove="onRowMove"
                    @focus="onRowFocus(item, $event)"
                    @blur="clearHover"
                >
                    <span class="row-num">{{ pad(i + 1) }}</span>
                    <div class="row-main">
                        <h3 class="row-title">{{ item.title }}</h3>
                        <p v-if="item.highlight" class="row-highlight">{{ item.highlight }}</p>
                    </div>
                    <span class="row-meta">{{ getCategoryLabel(item.category) }} · {{ item.date }}</span>
                    <div v-if="item.previewImage" class="row-preview">
                        <img
                            :src="item.previewImage"
                            :alt="`${item.title} preview image`"
                            loading="lazy"
                            @error="$event.target.style.display='none'"
                        >
                    </div>
                </div>
            </li>
        </ol>

        <div
            class="work-float"
            :class="{ 'visible': hoverItem && hoverItem.previewImage }"
            :style="{ transform: `translate(${previewPos.x}px, ${previewPos.y}px)` }"
            aria-hidden="true"
        >
            <img v-if="shownItem && shownItem.previewImage" :key="shownItem.id" :src="shownItem.previewImage" alt="">
        </div>
    </section>
</template>
