<script setup>
import { ref } from 'vue'

defineProps({
    formStatus: String,
    formStatusMessage: String
})
const emit = defineEmits(['submit-form'])

const form = ref({ name: '', email: '', message: '' })

function handleSubmit() {
    emit('submit-form', { ...form.value })
    form.value = { name: '', email: '', message: '' }
}
</script>

<template>
    <section id="contact" class="section-container">
        <h2 class="mono-label section-label">CONTACT</h2>
        <div class="contact-grid">
            <div class="contact-info-panel section-header">
                <p class="section-title contact-invite">Open to new ideas, collaborations, and discussions.</p>
                <ul class="contact-links">
                    <li>
                        <a class="text-link" href="mailto:ChenYuHsu413@users.noreply.github.com">ChenYuHsu413@users.noreply.github.com</a>
                    </li>
                    <li>
                        <a class="text-link" href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer">github.com/ChenYuHsu413</a>
                    </li>
                </ul>
            </div>

            <div class="contact-form-panel">
                <div v-if="formStatus === 'success'" class="form-success" role="status">
                    <span class="mono-label">SENT</span>
                    <p>{{ formStatusMessage }}</p>
                </div>
                <form v-else @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="form-name">Name</label>
                        <input id="form-name" type="text" placeholder="Your name" required v-model="form.name" :disabled="formStatus === 'loading'">
                    </div>
                    <div class="form-group">
                        <label for="form-email">Email</label>
                        <input id="form-email" type="email" placeholder="Your email address" required v-model="form.email" :disabled="formStatus === 'loading'">
                    </div>
                    <div class="form-group">
                        <label for="form-message">Message</label>
                        <textarea id="form-message" rows="4" placeholder="Write your message here..." required v-model="form.message" :disabled="formStatus === 'loading'"></textarea>
                    </div>
                    <p v-if="formStatus === 'error'" class="form-error" role="alert">{{ formStatusMessage }}</p>
                    <button type="submit" class="submit-btn" :disabled="formStatus === 'loading'">
                        {{ formStatus === 'loading' ? 'Sending…' : 'Send message →' }}
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
