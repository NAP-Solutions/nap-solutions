<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'
import LiquidHeading from './LiquidHeading.vue'

const props = defineProps({
  service: {
    type: String,
    default: 'ai-receptionist',
  },
})

const emit = defineEmits(['open-booking'])

const innerRef = ref(null)
useScrollReveal(() => [innerRef.value])

const ctaCopy = props.service === 'outbound-agent'
  ? {
      eyebrow: 'Get Started',
      heading: 'Ready to Let AI Fill Your Calendar?',
      sub:
        'See the outbound agent call, qualify, and book meetings in real time. No commitment required.',
      button: 'Book a Free Demo',
      trustItems: ['No long-term contracts', 'Setup in days, not months'],
    }
  : {
      eyebrow: 'Get Started',
      heading: 'Ready to Stop Missing Revenue?',
      sub:
        'Pick a time that works for you and let us show you exactly how NAP Solutions works for your business.',
      button: 'Book a Demo',
      trustItems: ['Setup included', 'Cancel anytime'],
    }

function trackLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead')
  }
}
</script>

<template>
  <section id="cta" class="section cta-section noise-bg">
    <div class="cta-bg"></div>
    <div class="cta-inner" ref="innerRef">
      <div class="section-eyebrow center">{{ ctaCopy.eyebrow }}</div>
      <LiquidHeading class="cta-heading center">{{ ctaCopy.heading }}</LiquidHeading>
      <p class="cta-sub">
        {{ ctaCopy.sub }}
      </p>
      <button class="btn-primary btn-shine cta-btn" @click="trackLead(); emit('open-booking')">
        {{ ctaCopy.button }}
      </button>
      <div class="cta-trust">
        <div class="trust-item" v-for="item in ctaCopy.trustItems" :key="item">
          <span class="trust-check"><Check :size="9" /></span>
          {{ item }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  --faq-cta-blend: clamp(3rem, 7vw, 5.5rem);
  background:
    linear-gradient(
      to bottom,
      #ffffff 0,
      #ffffff clamp(0.75rem, 1.6vw, 1.25rem),
      var(--surface-tint) var(--faq-cta-blend),
      var(--surface-tint) 100%
    ),
    linear-gradient(135deg, var(--surface-tint) 0%, var(--surface-alt) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
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
.cta-heading :deep(.liquid-heading-layer--fill .liquid-heading-content) {
  background-image: var(--heading-gradient);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
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
  background: var(--text-main);
  border: 1px solid var(--text-main);
  display: grid;
  place-items: center;
  line-height: 0;
  flex-shrink: 0;
  color: #ffffff;
}
.trust-check :deep(svg) {
  display: block;
  width: 10px;
  height: 10px;
  stroke-width: 5;
}

.cta-inner {
  position: relative;
  z-index: 2;
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
