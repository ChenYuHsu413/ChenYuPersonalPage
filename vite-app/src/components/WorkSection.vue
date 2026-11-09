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

// Desktop hover preview (≥1200px with a real pointer): fixed in the empty column
// between the titles and the category/year, vertically aligned with the active row
const PREVIEW_H = 225
const listEl = ref(null)
const hoverItem = ref(null)
const shownItem = ref(null)   // keeps the last image during fade-out
const previewTop = ref(0)
let desktopQuery = null
const canHover = ref(false)

function showPreview(item, row) {
    if (!canHover.value) return
    hoverItem.value = item
    shownItem.value = item
    const max = listEl.value.clientHeight - PREVIEW_H
    const top = row.offsetTop + row.offsetHeight / 2 - PREVIEW_H / 2
    previewTop.value = Math.max(0, Math.min(max, top))
}

function clearHover() {
    hoverItem.value = null
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
            :style="{ top: previewTop + 'px' }"
            aria-hidden="true"
        >
            <img v-if="shownItem && shownItem.previewImage" :key="shownItem.id" :src="shownItem.previewImage" alt="">
        </div>
        </div>
    </section>
</template>
