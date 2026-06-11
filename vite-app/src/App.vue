<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { PROJECTS } from './data/projects.js'
import GlassBackground from './components/GlassBackground.vue'
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

const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
})
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

// State
const scrolled = ref(false)
const menuActive = ref(false)
const activeTab = ref('all')
const modalActive = ref(false)
const selectedProject = ref(null)
const currentTime = ref('--:--:--')
const currentDate = ref('Loading date...')
const formStatus = ref('idle')
const formStatusMessage = ref('')
const isDark = ref(true)
const githubStats = ref({ repos: null })
const timerInterval = ref(null)

const filteredProjects = computed(() => {
    if (activeTab.value === 'all') return PROJECTS
    return PROJECTS.filter(p => p.category === activeTab.value)
})

function getCategoryLabel(category) {
    const labels = {
        project: 'Personal Project',
        homework: 'Course Homework',
        archive: 'Archive Work'
    }
    return labels[category] || category
}

function updateTime() {
    const now = new Date()
    currentTime.value = timeFormatter.format(now)
    currentDate.value = dateFormatter.format(now)
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

function toggleTheme() {
    isDark.value = !isDark.value
    const theme = isDark.value ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

function fetchGitHubStats() {
    fetch('https://api.github.com/users/ChenYuHsu413')
        .then(r => r.json())
        .then(data => { githubStats.value.repos = data.public_repos })
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
    gsap.to('.fade-in-up', {
        y: 0, opacity: 1,
        duration: 1.0, stagger: 0.15, ease: 'power3.out'
    })

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
    const savedTheme = localStorage.getItem('theme') || 'dark'
    isDark.value = savedTheme === 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)

    updateTime()
    timerInterval.value = setInterval(updateTime, 1000)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeydown)
    nextTick(() => initGSAPAnimations())
    fetchGitHubStats()
})

onUnmounted(() => {
    clearInterval(timerInterval.value)
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <GlassBackground />

    <AppHeader
        :scrolled="scrolled"
        :menu-active="menuActive"
        :is-dark="isDark"
        @toggle-menu="toggleMenu"
        @toggle-theme="toggleTheme"
        @scroll-to="scrollToSection"
    />

    <HeroSection
        :current-time="currentTime"
        :current-date="currentDate"
        @scroll-to="scrollToSection"
    />

    <AboutSection :github-stats="githubStats" />

    <ResumeSection />

    <HonorsSection />

    <WorkSection
        :filtered-projects="filteredProjects"
        :active-tab="activeTab"
        :get-category-label="getCategoryLabel"
        @update:active-tab="activeTab = $event"
        @open-modal="openModal"
    />

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
