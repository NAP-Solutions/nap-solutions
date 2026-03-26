<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { faqItems } from '../data/faqData'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const openIndex = ref(-1)
const showAll = ref(false)
const headerRef = ref(null)
const faqListRef = ref(null)
const ctaRef = ref(null)

useScrollReveal(() => [headerRef.value, faqListRef.value, ctaRef.value])

function toggleItem(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="section bg-alt">
    <div class="section-inner">
      <div class="faq-layout">
        <!-- Left: questions -->
        <div class="faq-left">
          <div class="reveal-header" ref="headerRef">
            <div class="section-eyebrow">FAQ</div>
            <h2 class="grad-text">Got Questions?<br />We Have Answers.</h2>
            <p class="section-sub">
              Everything you need to know about NAP Solutions.
            </p>
          </div>

          <div class="faq-collapse" :class="{ collapsed: !showAll }" ref="faqListRef">
            <div class="faq-list">
              <div
                v-for="(item, i) in faqItems"
                :key="i"
                v-show="showAll || i < 3"
                class="faq-item"
                :class="{ open: openIndex === i }"
              >
                <button
                  class="faq-q"
                  :aria-expanded="openIndex === i"
                  @click="toggleItem(i)"
                >
                  {{ item.q }}
                  <span class="faq-icon" aria-hidden="true">
                    <Plus :size="13" />
                  </span>
                </button>
                <div class="faq-a">{{ item.a }}</div>
              </div>
            </div>
            <div v-if="!showAll" class="faq-fade"></div>
          </div>

          <button class="faq-toggle" @click="showAll = !showAll">
            {{ showAll ? 'See less ↑' : 'See all questions ↓' }}
          </button>

          <div class="faq-cta" ref="ctaRef">
            <div class="faq-cta-text">
              <h3>STILL HAVE QUESTIONS?</h3>
              <p>Book a free demo and we will walk you through everything in person.</p>
            </div>
            <button class="btn-primary" @click="$emit('open-booking')">
              Book a Demo
            </button>
          </div>
        </div>

        <!-- Right: decorative graphic -->
        <div class="faq-right" aria-hidden="true">
          <span class="faq-q1">?</span>
          <span class="faq-q2">?</span>
          <span class="faq-q3">?</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-alt {
  background: #f5f7fb;
}

/* Two-column layout */
.faq-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: start;
}
.faq-left {
  min-width: 0;
}

/* Reveal animations */
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.faq-collapse {
  position: relative;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.faq-collapse[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.faq-cta {
  margin-top: 48px;
  padding: 34px 36px;
  background: linear-gradient(135deg, rgba(123, 47, 255, 0.06), rgba(0, 212, 192, 0.06));
  border: 1.5px solid rgba(123, 47, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
}
.faq-cta[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

/* Collapse / fade */
.faq-collapse.collapsed {
  /* items beyond index 2 hidden via v-show */
}
.faq-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent 50%, #f5f7fb 85%);
  pointer-events: none;
}
.faq-toggle {
  margin-top: 12px;
  background: none;
  border: 1.5px solid rgba(123, 47, 255, 0.2);
  border-radius: 10px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #7b2fff;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.faq-toggle:hover {
  background: rgba(123, 47, 255, 0.05);
  border-color: rgba(123, 47, 255, 0.35);
}

/* FAQ list */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.faq-item {
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.faq-item.open {
  border-color: rgba(123, 47, 255, 0.25);
  box-shadow: 0 6px 24px rgba(123, 47, 255, 0.08);
}
.faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  text-align: left;
  font-size: clamp(16px, 0.95rem + 0.3vw, 18px);
  font-weight: 600;
  color: #0a0f1e;
  transition: color 0.2s;
}
.faq-item.open .faq-q {
  color: #7b2fff;
}
.faq-icon {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f7fb;
  border: 1px solid rgba(10, 15, 30, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5580;
  transition: all 0.3s, transform 0.3s;
}
.faq-icon :deep(svg) {
  display: block;
}
.faq-item.open .faq-icon {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  border-color: transparent;
  color: #fff;
  transform: rotate(45deg);
}
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.3s ease;
  font-size: clamp(15px, 0.9rem + 0.25vw, 16px);
  line-height: 1.8;
  color: #4a5580;
  padding: 0 24px;
}
.faq-item.open .faq-a {
  max-height: 340px;
  padding: 0 24px 20px;
}

.faq-cta-text h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0a0f1e;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.faq-cta-text p {
  font-size: 16px;
  color: #4a5580;
  line-height: 1.6;
}

/* Right decorative graphic */
.faq-right {
  position: sticky;
  top: 120px;
  min-height: 300px;
  pointer-events: none;
  user-select: none;
  /* establish containing block for absolute children */
  transform: translateZ(0);
}
.faq-right span {
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  line-height: 1;
  color: var(--brand);
  letter-spacing: -0.05em;
}
.faq-q1 {
  font-size: 220px;
  opacity: 0.05;
  top: 20px;
  left: 30px;
  transform: rotate(-12deg);
}
.faq-q2 {
  font-size: 130px;
  opacity: 0.07;
  top: 140px;
  left: 190px;
  transform: rotate(8deg);
}
.faq-q3 {
  font-size: 80px;
  opacity: 0.06;
  top: 60px;
  left: 220px;
  transform: rotate(-6deg);
}

/* Responsive */
@media (max-width: 960px) {
  .faq-layout {
    grid-template-columns: 1fr;
  }
  .faq-right {
    display: none;
  }
  .faq-cta {
    flex-direction: column;
    text-align: center;
  }
}
@media (max-width: 640px) {
  .faq-q {
    padding: 0 16px;
    min-height: 56px;
    font-size: clamp(14px, 0.88rem + 0.2vw, 15px);
    line-height: 1.45;
  }
  .faq-a {
    font-size: 14px;
    line-height: 1.7;
    padding: 0 16px;
  }
  .faq-item.open .faq-a {
    padding: 0 16px 16px;
  }
  .faq-cta {
    margin-top: 34px;
    padding: 24px 16px;
    gap: 16px;
    align-items: stretch;
  }
  .faq-cta-text h3 {
    font-size: 16px;
  }
  .faq-cta-text p {
    font-size: 15px;
  }
}
</style>
