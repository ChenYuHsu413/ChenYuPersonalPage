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
        <div class="section-header">
            <span class="section-num">05 / Contact</span>
            <h2>Open to new ideas, collaborations, and discussions.</h2>
        </div>
        <div class="contact-grid">
            <div class="contact-info-panel">
                <p>
                    If you have any questions about my work, want to collaborate on a project, or simply want to say hello, feel free to reach out using the contact links or form!
                </p>
                <div class="contact-details">
                    <a class="contact-item" href="mailto:ChenYuHsu413@users.noreply.github.com">
                        <i class="fas fa-envelope"></i>
                        <div>
                            <span class="label">Email</span>
                            <span class="val">ChenYuHsu413@users.noreply.github.com</span>
                        </div>
                    </a>
                    <a class="contact-item" href="https://github.com/ChenYuHsu413" target="_blank" rel="noreferrer">
                        <i class="fab fa-github"></i>
                        <div>
                            <span class="label">GitHub</span>
                            <span class="val">github.com/ChenYuHsu413</span>
                        </div>
                    </a>
                </div>
            </div>

            <div class="contact-form-panel">
                <div v-if="formStatus === 'success'" class="form-success">
                    <i class="fas fa-check-circle"></i>
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
                    <p v-if="formStatus === 'error'" class="form-error">{{ formStatusMessage }}</p>
                    <button type="submit" class="btn primary-btn submit-btn" :disabled="formStatus === 'loading'">
                        <i v-if="formStatus === 'loading'" class="fas fa-spinner fa-spin"></i>
                        <span>{{ formStatus === 'loading' ? 'Sending...' : 'Send Message' }}</span>
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
