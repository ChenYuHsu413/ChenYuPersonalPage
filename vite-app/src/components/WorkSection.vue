<script setup>
defineProps({
    filteredProjects: Array,
    activeTab: String,
    getCategoryLabel: Function
})
const emit = defineEmits(['update:activeTab', 'open-modal'])
</script>

<template>
    <section id="work" class="section-container">
        <div class="section-header">
            <span class="section-num">04 / Work</span>
            <h2>Selected Web &amp; AI Projects</h2>
        </div>

        <div class="filter-tabs">
            <button :class="{ 'active': activeTab === 'all' }" @click="emit('update:activeTab', 'all')">
                <i class="fas fa-th-large"></i> All
            </button>
            <button :class="{ 'active': activeTab === 'professional' }" @click="emit('update:activeTab', 'professional')">
                <i class="fas fa-briefcase"></i> Professional
            </button>
            <button :class="{ 'active': activeTab === 'aiml' }" @click="emit('update:activeTab', 'aiml')">
                <i class="fas fa-brain"></i> AI &amp; ML
            </button>
            <button :class="{ 'active': activeTab === 'web' }" @click="emit('update:activeTab', 'web')">
                <i class="fas fa-globe"></i> Web &amp; Data
            </button>
            <button :class="{ 'active': activeTab === 'game' }" @click="emit('update:activeTab', 'game')">
                <i class="fas fa-gamepad"></i> Game Tools
            </button>
            <button :class="{ 'active': activeTab === 'archive' }" @click="emit('update:activeTab', 'archive')">
                <i class="fas fa-archive"></i> Archive
            </button>
        </div>

        <div class="work-grid">
            <div
                v-for="item in filteredProjects"
                :key="item.id"
                class="project-card"
                @click="emit('open-modal', item)"
            >
                <div class="card-bg-gradient" :style="{ background: item.colorGradient }"></div>
                <div class="card-preview">
                    <img
                        :src="item.previewImage"
                        :alt="`${item.title} preview image`"
                        loading="lazy"
                        @error="$event.target.style.display='none'"
                    >
                </div>
                <div class="card-info">
                    <span class="card-category">{{ getCategoryLabel(item.category) }}</span>
                    <h3>{{ item.title }}</h3>
                    <div v-if="item.highlight" class="card-highlight">
                        <i class="fas fa-bolt"></i> {{ item.highlight }}
                    </div>
                    <p class="card-desc">{{ item.shortDescription }}</p>
                    <div class="card-tags">
                        <span v-for="tag in item.tags" :key="tag" class="card-tag">{{ tag }}</span>
                    </div>
                    <div class="card-action-hint">
                        <span>View Details</span> <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
