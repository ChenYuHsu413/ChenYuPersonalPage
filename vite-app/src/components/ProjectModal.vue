<script setup>
defineProps({
    modalActive: Boolean,
    selectedProject: Object,
    getCategoryLabel: Function
})
const emit = defineEmits(['close-modal'])
</script>

<template>
    <div class="modal-overlay" :class="{ 'active': modalActive }" @click.self="emit('close-modal')">
        <transition name="modal-scale">
            <div v-if="modalActive && selectedProject" class="modal-card" @click.stop>
                <button class="modal-close-btn" @click="emit('close-modal')" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-header-banner" :style="{ background: selectedProject.colorGradient }">
                    <span class="modal-category-badge">{{ getCategoryLabel(selectedProject.category) }}</span>
                    <h2>{{ selectedProject.title }}</h2>
                </div>
                <div class="modal-body">
                    <div class="modal-preview" v-if="selectedProject.previewImage">
                        <img
                            :src="selectedProject.previewImage"
                            :alt="`${selectedProject.title} preview image`"
                            @error="$event.target.style.display='none'"
                        >
                    </div>
                    <div class="modal-details-grid">
                        <div class="modal-main-content">
                            <h3>About the Project</h3>
                            <p>{{ selectedProject.longDescription }}</p>

                            <h3 class="tech-title">Technologies Used</h3>
                            <div class="modal-tags">
                                <span v-for="tag in selectedProject.tags" :key="tag" class="modal-tag">{{ tag }}</span>
                            </div>
                        </div>
                        <div class="modal-sidebar">
                            <div class="sidebar-info-box">
                                <h4>Project Metadata</h4>
                                <ul>
                                    <li><strong>Category:</strong> {{ getCategoryLabel(selectedProject.category) }}</li>
                                    <li><strong>Published:</strong> {{ selectedProject.date }}</li>
                                </ul>
                            </div>
                            <div class="modal-action-buttons">
                                <a
                                    :href="selectedProject.demoUrl"
                                    class="modal-btn live-btn"
                                    :target="selectedProject.demoUrl.startsWith('http') ? '_blank' : '_self'"
                                >
                                    <i class="fas fa-external-link-alt"></i> Open Live Demo
                                </a>
                                <a :href="selectedProject.githubUrl" class="modal-btn git-btn" target="_blank" rel="noreferrer">
                                    <i class="fab fa-github"></i> View Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
