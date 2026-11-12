<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import emailjs from '@emailjs/browser'
import { PROJECTS } from './data/projects.js'
import { SELECTED_IDS } from './data/selected.js'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ResumeSection from './components/ResumeSection.vue'
import HonorsSection from './components/HonorsSection.vue'
import WorkSection from './components/WorkSection.vue'
import ContactSection from './components/ContactSection.vue'
import ProjectModal from './components/ProjectModal.vue'
import AppFooter from './components/AppFooter.vue'
import AppIcon from './components/AppIcon.vue'
import { initReveal } from './utils/reveal.js'

// State
const scrolled = ref(false)
const menuActive = ref(false)
const activeTab = ref('selected')
const modalActive = ref(false)
const selectedProject = ref(null)
const formStatus = ref('idle')
const formStatusMessage = ref('')
const FALLBACK_REPOS = 31
const githubStats = ref({ repos: FALLBACK_REPOS })
let stopReveal = () => {}

// Resolved once at load so a missing id warns a single time
const SELECTED_PROJECTS = SELECTED_IDS.flatMap(id => {
    const project = PROJECTS.find(p => p.id === id)
    if (!project) console.warn(`[selected.js] Unknown project id "${id}", skipped`)
    return project ? [project] : []
})

const filteredProjects = computed(() => {
    if (activeTab.value === 'selected') return SELECTED_PROJECTS
    if (activeTab.value === 'all') {
        // Selected first (in SELECTED_IDS order), then by category order; stable sort keeps data order
        const rank = p => SELECTED_PROJECTS.includes(p)
            ? SELECTED_PROJECTS.indexOf(p)
            : SELECTED_PROJECTS.length + CATEGORY_ORDER.indexOf(p.category)
        return [...PROJECTS].sort((a, b) => rank(a) - rank(b))
    }
    return PROJECTS.filter(p => p.category === activeTab.value)
})

const deploymentCount = computed(() => PROJECTS.filter(p => p.demoUrl).length)

const CATEGORY_ORDER = ['professional', 'aiml', 'web', 'game', 'archive']

const CATEGORY_LABELS = {
    professional: 'Professional',
    aiml: 'AI & ML',
    web: 'Web & Data',
    game: 'Game Tools',
    archive: 'Archive'
}

function getCategoryLabel(category) {
    return CATEGORY_LABELS[category] ?? 'Project'
}

function handleScroll() {
    scrolled.value = window.scrollY > 50
}

function toggleMenu() {
    menuActive.value = !menuActive.value
}

function closeMenu() {
    menuActive.value = false
}

function scrollToSection(sectionId) {
    menuActive.value = false
    const el = document.getElementById(sectionId)
    if (el) {
        const headerHeight = document.querySelector('header').offsetHeight
        const offsetPosition = el.getBoundingClientRect().top + window.scrollY - headerHeight
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
}

function fetchGitHubStats() {
    fetch('https://api.github.com/users/ChenYuHsu413')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
            if (data && typeof data.public_repos === 'number') {
                githubStats.value.repos = data.public_repos
            }
        })
        .catch(() => {})
}

function openModal(project) {
    selectedProject.value = project
    modalActive.value = true
    document.body.style.overflow = 'hidden'
}

function closeModal() {
    modalActive.value = false
    setTimeout(() => { selectedProject.value = null }, 300)
    document.body.style.overflow = 'auto'
}

function handleKeydown(e) {
    if (e.key === 'Escape' && modalActive.value) closeModal()
}

function submitContactForm(formData) {
    formStatus.value = 'loading'
    const params = {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
        to_name:    'Chen Yu Hsu'
    }
    Promise.all([
        emailjs.send('service_48keklo', 'template_zgegwvk', params),
        emailjs.send('service_48keklo', 'template_337686k', params)
    ]).then(() => {
        formStatus.value = 'success'
        formStatusMessage.value = `Message sent! A confirmation has been sent to ${formData.email}.`
        setTimeout(() => { formStatus.value = 'idle' }, 6000)
    }).catch(() => {
        formStatus.value = 'error'
        formStatusMessage.value = 'Failed to send. Please email me directly.'
        setTimeout(() => { formStatus.value = 'idle' }, 6000)
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => { stopReveal = initReveal('.section-header, .resume-row, .honor-row') })
    fetchGitHubStats()
})

onUnmounted(() => {
    stopReveal()
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <AppHeader
        :scrolled="scrolled"
        :menu-active="menuActive"
        @toggle-menu="toggleMenu"
        @close-menu="closeMenu"
        @scroll-to="scrollToSection"
    />

    <main>
    <HeroSection @scroll-to="scrollToSection" />

    <WorkSection
        :filtered-projects="filteredProjects"
        :active-tab="activeTab"
        :total-count="PROJECTS.length"
        :get-category-label="getCategoryLabel"
        @update:active-tab="activeTab = $event"
        @open-modal="openModal"
        @scroll-to="scrollToSection"
    />

    <AboutSection :github-stats="githubStats" :deployment-count="deploymentCount" />

    <ResumeSection />

    <HonorsSection />

    <ContactSection
        :form-status="formStatus"
        :form-status-message="formStatusMessage"
        @submit-form="submitContactForm"
    />
    </main>

    <ProjectModal
        :modal-active="modalActive"
        :selected-project="selectedProject"
        :get-category-label="getCategoryLabel"
        @close-modal="closeModal"
    />

    <button
        class="scroll-to-top"
        :class="{ 'visible': scrolled }"
        @click="scrollToSection('home')"
        aria-label="Scroll to top"
    >
        <AppIcon name="arrow-up" />
    </button>

    <AppFooter />
</template>
