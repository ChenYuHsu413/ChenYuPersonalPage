<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentTime: String,
    currentDate: String
})
const emit = defineEmits(['scroll-to'])

const timeParts = computed(() => {
    const t = props.currentTime || '--:--:--'
    const [h = '--', m = '--', s = '--'] = t.split(':')
    return { h, m, s }
})

const clockAngles = computed(() => {
    const [h, m, s] = (props.currentTime || '00:00:00').split(':').map(v => Number(v) || 0)
    return {
        hour: (h % 12) * 30 + m * 0.5,
        minute: m * 6 + s * 0.1,
        second: s * 6
    }
})
</script>

<template>
    <main id="home" class="hero-section">
        <div class="hero-wrapper">
            <div class="hero-text-content">
                <p class="eyebrow fade-in-up">Personal Portfolio &amp; Work Collection</p>
                <h1 class="fade-in-up">Chen Yu Hsu</h1>
                <p class="hero-description fade-in-up">
                    I build clear, useful web experiences with a focus on clean structure, responsive layouts, and thoughtful presentation. This site serves as a central hub for my school homework assignments and personal web projects.
                </p>
                <div class="hero-buttons fade-in-up">
                    <a class="btn primary-btn" href="#work" @click.prevent="emit('scroll-to', 'work')">Explore Work</a>
                    <a class="btn secondary-btn" href="#contact" @click.prevent="emit('scroll-to', 'contact')">Get in Touch</a>
                </div>

                <div class="clock-widget fade-in-up">
                    <div class="clock-header">
                        <span class="clock-dot"></span>
                        <span class="clock-label">Taipei</span>
                        <span class="clock-live">Live</span>
                    </div>
                    <div class="clock-body">
                        <div class="clock-dial" aria-hidden="true">
                            <span
                                v-for="n in 12"
                                :key="n"
                                class="dial-tick"
                                :style="{ transform: `rotate(${n * 30}deg)` }"
                            ></span>
                            <span class="dial-hand hand-hour" :style="{ transform: `rotate(${clockAngles.hour}deg)` }"></span>
                            <span class="dial-hand hand-minute" :style="{ transform: `rotate(${clockAngles.minute}deg)` }"></span>
                            <span class="dial-hand hand-second" :style="{ transform: `rotate(${clockAngles.second}deg)` }"></span>
                            <span class="dial-center"></span>
                        </div>
                        <div class="clock-digits">
                        <div class="digit-group">
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.h[0]">{{ timeParts.h[0] }}</span>
                                </transition>
                            </span>
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.h[1]">{{ timeParts.h[1] }}</span>
                                </transition>
                            </span>
                        </div>
                        <span class="digit-sep">:</span>
                        <div class="digit-group">
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.m[0]">{{ timeParts.m[0] }}</span>
                                </transition>
                            </span>
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.m[1]">{{ timeParts.m[1] }}</span>
                                </transition>
                            </span>
                        </div>
                        <span class="digit-sep">:</span>
                        <div class="digit-group">
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.s[0]">{{ timeParts.s[0] }}</span>
                                </transition>
                            </span>
                            <span class="digit">
                                <transition name="digit-roll">
                                    <span class="digit-value" :key="timeParts.s[1]">{{ timeParts.s[1] }}</span>
                                </transition>
                            </span>
                        </div>
                        </div>
                    </div>
                    <div class="clock-date">{{ currentDate }}</div>
                </div>
            </div>

            <div class="portrait-container fade-in-up">
                <div class="portrait-card">
                    <div class="portrait-img-wrapper">
                        <img class="portrait-img" src="/sources/PikaSheen.jpg" alt="Chen Yu Hsu profile illustration">
                    </div>
                    <div class="portrait-caption">
                        <div>
                            <div class="caption-title">Web Developer Portfolio</div>
                            <div class="caption-subtitle">HTML / CSS / JavaScript / Vue</div>
                        </div>
                        <span class="caption-year">2026</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="scroll-indicator" @click="emit('scroll-to', 'about')">
            <span class="mouse-icon"><span class="mouse-wheel"></span></span>
            <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
        </div>
    </main>
</template>
