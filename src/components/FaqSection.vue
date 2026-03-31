<script setup>
import { ref } from 'vue'
import { faqItems } from '../data/faqData'
import { useScrollReveal } from '../composables/useScrollReveal'
import LiquidHeading from './LiquidHeading.vue'

defineEmits(['open-booking'])

const openIndex = ref(null)
const showAll = ref(false)
const headerRef = ref(null)
const listRef = ref(null)
const ctaRef = ref(null)

useScrollReveal(() => [headerRef.value, listRef.value, ctaRef.value])

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="faq-inner">

      <div class="faq-header" ref="headerRef">
        <LiquidHeading>Frequently asked questions</LiquidHeading>
        <p class="faq-subtitle">
          Answers to common questions about NAP Solutions and how it works.
          If you have anything else, don't hesitate to reach out.
        </p>
      </div>

      <div class="faq-list" ref="listRef">
        <div
          v-for="(item, i) in (showAll ? faqItems : faqItems.slice(0, 6))"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button
            class="faq-q"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span>{{ item.q }}</span>
            <svg
              class="faq-chevron"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M5 7.5l5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div class="faq-a-wrap">
            <p class="faq-a">{{ item.a }}</p>
          </div>
        </div>
      </div>

      <div class="faq-controls">
        <button class="faq-show-more" @click="showAll = !showAll">
          {{ showAll ? 'Show fewer questions' : `Show all ${faqItems.length} questions` }}
        </button>
      </div>

      <div class="faq-cta" ref="ctaRef">
        <div class="faq-cta-text">
          <p class="faq-cta-label">Still have questions?</p>
          <p class="faq-cta-sub">Book a free demo and we'll walk you through everything in person.</p>
        </div>
        <button class="btn-primary" @click="$emit('open-booking')">
          Book a Demo
        </button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: #fff;
  padding-block: var(--section-space);
}

.faq-inner {
  width: min(760px, calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
}

/* Header */
.faq-header {
  text-align: center;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.faq-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.faq-header h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.025em;
  margin-bottom: 16px;
  line-height: 1.2;
}
.faq-subtitle {
  font-size: 16px;
  color: var(--text-body);
  line-height: 1.7;
  max-width: 52ch;
  margin-inline: auto;
}

/* List */
.faq-list {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.faq-list[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

/* Item */
.faq-item {
  border-bottom: 1px solid #e5e7eb;
}
.faq-item:first-child {
  border-top: 1px solid #e5e7eb;
}

/* Question button */
.faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  color: var(--text-main);
  transition: color 0.2s;
}
.faq-q:hover {
  color: var(--brand-strong);
}

/* Chevron */
.faq-chevron {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--text-muted);
  transition: transform 0.25s ease, color 0.2s;
}
.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: var(--brand-strong);
}

/* Answer */
.faq-a-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}
.faq-item.open .faq-a-wrap {
  grid-template-rows: 1fr;
}
.faq-a {
  overflow: hidden;
  font-size: 15px;
  line-height: 1.75;
  color: var(--accent-ink);
  padding-bottom: 0;
  transition: padding-bottom 0.3s ease;
}
.faq-item.open .faq-a {
  padding-bottom: 20px;
}

/* Show more */
.faq-controls {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  padding-top: 8px;
}
.faq-show-more {
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: transparent;
  transition: color 0.2s, text-decoration-color 0.2s;
}
.faq-show-more:hover {
  color: var(--text-main);
  text-decoration-color: rgba(10, 15, 30, 0.25);
}

/* CTA */
.faq-cta {
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding: 32px 36px;
  background: var(--surface-base);
  border: 1.5px solid rgba(var(--brand-rgb), 0.12);
  border-radius: 16px;
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
.faq-cta-label {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}
.faq-cta-sub {
  font-size: 15px;
  color: var(--text-body);
  line-height: 1.55;
}

@media (max-width: 640px) {
  .faq-q {
    padding: 18px 0;
    font-size: 14px;
  }
  .faq-a {
    font-size: 14px;
  }
  .faq-cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
    gap: 16px;
  }
}
</style>
