<script setup>
import { Check } from 'lucide-vue-next'

defineEmits(['open-booking'])
</script>

<template>
  <section id="cta" class="section cta-section">
    <div class="cta-bg"></div>
    <div class="cta-inner">
      <div class="section-eyebrow center">Get Started</div>
      <h2 class="grad-text center">Ready to Stop<br />Missing Revenue?</h2>
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
  background: linear-gradient(135deg, #faf8ff 0%, #f0faff 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(123, 47, 255, 0.06) 0%, transparent 65%);
  pointer-events: none;
}
.center {
  justify-content: center;
}
.cta-sub {
  font-size: 19px;
  color: #4a5580;
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
  font-size: 12px;
  font-weight: 500;
  color: #8892b0;
}
.trust-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(0, 212, 192, 0.12);
  border: 1px solid rgba(0, 212, 192, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #00b8a6;
}
.trust-check :deep(svg) {
  display: block;
}

@media (max-width: 640px) {
  .cta-sub {
    font-size: 16px;
    line-height: 1.72;
    margin-bottom: 30px;
  }
  .cta-btn {
    width: 100%;
    max-width: 320px;
    margin-bottom: 20px;
    padding: 16px 20px;
  }
  .cta-trust {
    gap: 12px;
  }
}
</style>
