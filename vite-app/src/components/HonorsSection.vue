<script setup>
// Newest first
const HONORS = [
    { year: '2015', name: 'Taiwan Student Cluster Competition', place: 'First Prize' },
    { year: '2012', name: 'National College Programming Contest', place: 'Third Prize' },
    { year: '2012', name: 'The ACM-ICPC Asia Kaohsiung Regional Contest', place: 'Honorable Mention' },
    {
        year: '2010',
        name: 'High School Student Academic Competence Contest, Computer Science',
        place: 'Regional Semi-Final · 6th Place',
        note: 'Qualified to participate in the national final contest.'
    }
]
</script>

<template>
    <section id="honors" class="section-container">
        <div class="section-header">
            <h2 class="mono-label section-label">HONORS</h2>
            <p class="section-title">Early recognitions in programming and academic contests.</p>
        </div>
        <ul class="honors-list">
            <li v-for="h in HONORS" :key="h.year + h.name" class="honor-row">
                <p class="honor-line">
                    <span class="honor-year">{{ h.year }}</span>
                    <span class="sep" aria-hidden="true">·</span>
                    <span class="honor-name">{{ h.name }}</span>
                    <span class="sep" aria-hidden="true">·</span>
                    <span class="honor-place">{{ h.place }}</span>
                </p>
                <p v-if="h.note" class="honor-note">{{ h.note }}</p>
            </li>
        </ul>
    </section>
</template>
