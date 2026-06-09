import { createApp } from 'vue'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import './style.css'

emailjs.init({ publicKey: 'bLwqLWUY10o9p19az' })

createApp(App).mount('#app')
