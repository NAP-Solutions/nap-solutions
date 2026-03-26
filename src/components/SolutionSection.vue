<script setup>
import { PhoneIncoming, CalendarCheck, Clock, Users } from 'lucide-vue-next'
import { solutionCards } from '../data/solutionData'

defineEmits(['open-booking'])

const iconMap = { PhoneIncoming, CalendarCheck, Clock, Users }
</script>

<template>
  <section id="solution" class="section bg-white">
    <div class="section-inner">
      <div class="section-eyebrow">The Solution</div>
      <h2 class="grad-text">
        An AI Receptionist<br />That Never Clocks Out.
      </h2>
      <p class="section-sub">
        NAP Solutions answers every call, qualifies the caller, and books the
        appointment — 24/7, 365 days a year.
      </p>

      <div class="feature-grid">
        <div
          v-for="(card, i) in solutionCards"
          :key="i"
          class="feature-card"
        >
          <div class="fc-icon" :class="`fc-icon--${card.iconVariant}`">
            <component :is="iconMap[card.icon]" :size="18" />
          </div>
          <h3 class="fc-title">{{ card.title }}</h3>
          <p class="fc-desc">{{ card.desc }}</p>
        </div>
      </div>

      <div class="solution-cta">
        <p class="solution-cta-text">
          Ready to put your front desk on autopilot?
          <span>Let's talk.</span>
        </p>
        <button class="btn-primary solution-cta-btn" @click="$emit('open-booking')">
          Book a Demo
        </button>
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
  background: #f8f9fb;
  border-radius: 12px;
  padding: 18px 16px;
  border: 1.5px solid rgba(10, 15, 30, 0.06);
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #7b2fff, #00d4c0);
  border-radius: 2px 2px 0 0;
  opacity: 0;
  transition: opacity 0.2s;
}
.feature-card:hover {
  border-color: rgba(123, 47, 255, 0.2);
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
  background: rgba(123, 47, 255, 0.08);
  border: 1px solid rgba(123, 47, 255, 0.15);
  color: #7b2fff;
}
.fc-icon--cyan {
  background: rgba(0, 212, 192, 0.08);
  border: 1px solid rgba(0, 212, 192, 0.2);
  color: #00b8a6;
}
.fc-title {
  font-size: 13px;
  font-weight: 700;
  color: #0a0f1e;
  letter-spacing: -0.01em;
  margin-bottom: 5px;
}
.fc-desc {
  font-size: 12px;
  color: #8892b0;
  line-height: 1.6;
}
.solution-cta {
  margin-top: 18px;
  background: linear-gradient(135deg, rgba(123, 47, 255, 0.05), rgba(0, 212, 192, 0.05));
  border: 1.5px solid rgba(123, 47, 255, 0.12);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.solution-cta-text {
  font-size: 13px;
  font-weight: 600;
  color: #0a0f1e;
}
.solution-cta-text span {
  color: #7b2fff;
}
.solution-cta-btn {
  font-size: 12px;
  padding: 9px 18px;
  min-height: auto;
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .solution-cta {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
}
</style>
