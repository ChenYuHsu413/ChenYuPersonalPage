<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { PROJECTS } from './data/projects.js'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ResumeSection from './components/ResumeSection.vue'
import HonorsSection from './components/HonorsSection.vue'
import WorkSection from './components/WorkSection.vue'
import ContactSection from './components/ContactSection.vue'
import ProjectModal from './components/ProjectModal.vue'
import AppFooter from './components/AppFooter.vue'

gsap.registerPlugin(ScrollTrigger)

// State
const scrolled = ref(false)
const menuActive = ref(false)
const activeTab = ref('all')
const modalActive = ref(false)
const selectedProject = ref(null)
const formStatus = ref('idle')
const formStatusMessage = ref('')
const FALLBACK_REPOS = 16
const githubStats = ref({ repos: FALLBACK_REPOS })

const filteredProjects = computed(() => {
    if (activeTab.value === 'all') {
        const rank = p => p.featured ? FEATURED_ORDER.indexOf(p.id) : FEATURED_ORDER.length
        return [...PROJECTS].sort((a, b) => rank(a) - rank(b))
    }
    return PROJECTS.filter(p => p.category === activeTab.value)
})

const deploymentCount = computed(() => PROJECTS.filter(p => p.demoUrl).length)

const FEATURED_ORDER = [
    'pro-echoai-website',
    'aiml-ai-town',
    'aiml-servo-predictive-maintenance',
    'hw-taiwan-weather-map'
]

const CATEGORY_LABELS = {
    professional: 'Professional Work',
    aiml: 'AI & ML',
    web: 'Web & Data',
    game: 'Game Tools',
    archive: 'Archive Work'
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

function initGSAPAnimations() {
    const scrollReveal = (selector, from, to, start = 'top bottom-=80') => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.fromTo(el, from, {
                ...to,
                scrollTrigger: { trigger: el, start, toggleActions: 'play none none reverse' }
            })
        })
    }

    scrollReveal('.section-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    scrollReveal('.timeline-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        'top bottom-=60'
    )
    scrollReveal('.stat-card',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' },
        'top bottom-=50'
    )
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => initGSAPAnimations())
    fetchGitHubStats()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <AppHeader
        :scrolled="scrolled"
        :menu-active="menuActive"
        @toggle-menu="toggleMenu"
        @scroll-to="scrollToSection"
    />

    <HeroSection @scroll-to="scrollToSection" />

    <WorkSection
        :filtered-projects="filteredProjects"
        :active-tab="activeTab"
        :get-category-label="getCategoryLabel"
        @update:active-tab="activeTab = $event"
        @open-modal="openModal"
    />

    <AboutSection :github-stats="githubStats" :deployment-count="deploymentCount" />

    <ResumeSection />

    <HonorsSection />

    <ContactSection
        :form-status="formStatus"
        :form-status-message="formStatusMessage"
        @submit-form="submitContactForm"
    />

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
        <i class="fas fa-arrow-up"></i>
    </button>

    <AppFooter @scroll-to="scrollToSection" />
</template>
