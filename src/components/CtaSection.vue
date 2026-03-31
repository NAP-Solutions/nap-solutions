<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'
import LiquidHeading from './LiquidHeading.vue'

defineEmits(['open-booking'])

const innerRef = ref(null)
useScrollReveal(() => [innerRef.value])
</script>

<template>
  <section id="cta" class="section cta-section">
    <div class="cta-bg"></div>
    <div class="cta-inner" ref="innerRef">
      <div class="section-eyebrow center">Get Started</div>
      <LiquidHeading class="cta-heading center">Ready to Stop<br />Missing Revenue?</LiquidHeading>
      <p class="cta-sub">
        Pick a time that works for you and let us show you exactly how NAP
        Solutions works for your business.
      </p>
      <button class="btn-primary cta-btn" @click="$emit('open-booking')">
        Book a Demo
      </button>
      <div class="cta-trust">
        <div class="trust-item">
          <span class="trust-check"><Check :size="9" /></span>
          No contracts
        </div>
        <div class="trust-item">
          <span class="trust-check"><Check :size="9" /></span>
          Setup included
        </div>
        <div class="trust-item">
          <span class="trust-check"><Check :size="9" /></span>
          Cancel anytime
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, var(--surface-tint) 0%, var(--surface-alt) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(var(--brand-rgb), 0.06) 0%, transparent 65%);
  pointer-events: none;
}
.center {
  justify-content: center;
}
.cta-heading.center {
  margin-inline: auto;
  text-align: center;
}
.cta-sub {
  font-size: 19px;
  color: var(--text-body);
  margin-bottom: 44px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  position: relative;
}
.cta-btn {
  font-size: 17px;
  padding: 20px 52px;
  margin-bottom: 24px;
  position: relative;
}
.cta-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  position: relative;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
}
.trust-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.12);
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #000000;
}
.trust-check :deep(svg) {
  display: block;
}

.cta-inner {
  opacity: 0;
  transition: opacity 0.7s ease;
}
.cta-inner[data-revealed] {
  opacity: 1;
}

@media (max-width: 640px) {
  .cta-sub {
    font-size: 16px;
    line-height: 1.72;
    margin-bottom: 30px;
  }
  .cta-btn {
    width: 100%;
    margin-bottom: 20px;
    padding: 16px 20px;
  }
  .cta-trust {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .cta-sub {
    margin-bottom: 24px;
  }
}
</style>
