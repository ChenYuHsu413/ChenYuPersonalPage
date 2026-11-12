<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

defineProps({
    filteredProjects: Array,
    activeTab: String,
    totalCount: Number,
    getCategoryLabel: Function
})
const emit = defineEmits(['update:activeTab', 'open-modal', 'scroll-to'])

const TABS = [
    { key: 'selected', label: 'Selected' },
    { key: 'professional', label: 'Professional' },
    { key: 'aiml', label: 'AI & ML' },
    { key: 'web', label: 'Web & Data' },
    { key: 'game', label: 'Game Tools' },
    { key: 'archive', label: 'Archive' },
    { key: 'all', label: 'All' }
]

const pad = n => String(n).padStart(2, '0')

// Desktop hover preview (≥1200px with a real pointer): fixed in the empty column
// between the titles and the category/year, vertically centred on the active row
// and clamped so it never leaves the list area
const listEl = ref(null)
const floatEl = ref(null)
const tabsEl = ref(null)
const hoverItem = ref(null)
const shownItem = ref(null)   // keeps the last image during fade-out
const previewTop = ref(0)
let desktopQuery = null
const canHover = ref(false)

async function showPreview(item, row) {
    if (!canHover.value) return
    hoverItem.value = item
    shownItem.value = item
    await nextTick()   // caption length changes the preview height
    const h = floatEl.value.offsetHeight
    const max = listEl.value.clientHeight - h
    const top = row.offsetTop + row.offsetHeight / 2 - h / 2
    previewTop.value = Math.max(0, Math.min(max, top))
}

function clearHover() {
    hoverItem.value = null
}

async function showAll() {
    emit('update:activeTab', 'all')
    emit('scroll-to', 'work')
    // the "View all" button disappears with the tab switch; keep keyboard focus nearby
    await nextTick()
    tabsEl.value.querySelector('[aria-selected="true"]').focus({ preventScroll: true })
}

function syncQuery() {
    canHover.value = desktopQuery.matches
    if (!canHover.value) hoverItem.value = null
}

onMounted(() => {
    desktopQuery = window.matchMedia('(min-width: 1200px) and (hover: hover)')
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
            <h2 class="mono-label">SELECTED WORK</h2>
            <span class="mono-label work-count">{{ pad(filteredProjects.length) }}</span>
        </div>

        <div ref="tabsEl" class="filter-tabs" role="tablist" aria-label="Project categories">
            <button
                v-for="tab in TABS"
                :key="tab.key"
                role="tab"
                :aria-selected="activeTab === tab.key"
                :class="{ 'active': activeTab === tab.key }"
                @click="emit('update:activeTab', tab.key)"
            >{{ tab.label }}</button>
        </div>

        <div ref="listEl" class="work-list-wrap" @mouseleave="clearHover">
        <ol class="work-list">
            <li v-for="(item, i) in filteredProjects" :key="item.id">
                <div
                    class="work-row"
                    :class="{ 'is-active': hoverItem && hoverItem.id === item.id }"
                    role="button"
                    tabindex="0"
                    @click="emit('open-modal', item)"
                    @keydown.enter.prevent="emit('open-modal', item)"
                    @mouseenter="showPreview(item, $event.currentTarget)"
                    @focus="showPreview(item, $event.currentTarget)"
                    @blur="clearHover"
                >
                    <span class="row-num">{{ pad(i + 1) }}</span>
                    <h3 class="row-title">{{ item.title }}</h3>
                    <span class="row-meta"><span class="row-category">{{ getCategoryLabel(item.category) }} · </span>{{ item.date }}</span>
                </div>
            </li>
        </ol>
        <p v-if="activeTab === 'selected'" class="work-all">
            <button type="button" class="hero-link work-all-link" @click="showAll">View all {{ totalCount }} projects →</button>
        </p>
        <div
            ref="floatEl"
            class="work-float"
            :class="{ 'visible': hoverItem && hoverItem.previewImage }"
            :style="{ top: previewTop + 'px' }"
            aria-hidden="true"
        >
            <div class="work-float-img">
                <img v-if="shownItem && shownItem.previewImage" :key="shownItem.id" :src="shownItem.previewImage" alt="">
            </div>
            <p v-if="shownItem && shownItem.highlight" class="project-highlight work-float-caption">{{ shownItem.highlight }}</p>
        </div>
        </div>
    </section>
</template>
