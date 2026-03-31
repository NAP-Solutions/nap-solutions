<script setup>
import { ref } from 'vue'
import { PhoneIncoming, CalendarCheck, Clock, Users } from 'lucide-vue-next'
import { solutionCards } from '../data/solutionData'
import { useScrollReveal } from '../composables/useScrollReveal'
import LiquidHeading from './LiquidHeading.vue'

const iconMap = { PhoneIncoming, CalendarCheck, Clock, Users }

const headerRef = ref(null)
const cardRefs = ref([])

useScrollReveal(() => [headerRef.value, ...cardRefs.value])
</script>

<template>
  <section id="solution" class="section bg-white">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">The Solution</div>
        <LiquidHeading>
          An AI Receptionist<br />That Never Clocks Out.
        </LiquidHeading>
        <p class="section-sub">
          NAP Solutions answers every call, qualifies the caller, and books the
          appointment — 24/7, 365 days a year.
        </p>
      </div>

      <div class="feature-grid">
        <div
          v-for="(card, i) in solutionCards"
          :key="i"
          class="feature-card"
          :ref="el => cardRefs[i] = el"
        >
          <div class="fc-icon" :class="`fc-icon--${card.iconVariant}`">
            <component :is="iconMap[card.icon]" :size="18" />
          </div>
          <h3 class="fc-title">{{ card.title }}</h3>
          <p class="fc-desc">{{ card.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: clamp(1.8rem, 5vw, 3rem);
}
.feature-card {
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.58) 46%, rgba(var(--accent-rgb), 0.15) 100%);
  border-radius: 12px;
  padding: 18px 16px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow:
    0 10px 24px rgba(12, 18, 38, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -8px 14px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, box-shadow 0.2s;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--brand), var(--accent));
  border-radius: 2px 2px 0 0;
  opacity: 0;
  transition: opacity 0.2s;
}
.feature-card:hover {
  border-color: rgba(var(--brand-rgb), 0.34);
  box-shadow:
    0 14px 30px rgba(var(--brand-rgb), 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
}
.feature-card:hover::before {
  opacity: 1;
}
.fc-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.fc-icon :deep(svg) {
  display: block;
}
.fc-icon--purple {
  background: rgba(var(--brand-rgb), 0.08);
  border: 1px solid rgba(var(--brand-rgb), 0.15);
  color: var(--brand);
}
.fc-icon--cyan {
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  color: var(--accent-strong);
}
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.feature-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:nth-child(2) { transition-delay: 0.08s; }
.feature-card:nth-child(3) { transition-delay: 0.16s; }
.feature-card:nth-child(4) { transition-delay: 0.24s; }
.fc-title {
  font-size: clamp(15px, 0.9rem + 0.2vw, 17px);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.01em;
  margin-bottom: 5px;
}
.fc-desc {
  font-size: clamp(14px, 0.85rem + 0.15vw, 15px);
  color: var(--text-body);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>

