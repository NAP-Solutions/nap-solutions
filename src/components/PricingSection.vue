<script setup>
import { ref } from 'vue'
import { pricingPlans } from '../data/pricingData'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const headerRef = ref(null)
const bannerRef = ref(null)
const cardRefs = ref([])

useScrollReveal(() => [headerRef.value, bannerRef.value, ...cardRefs.value])
</script>

<template>
  <section id="pricing" class="section bg-white">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">Pricing</div>
        <h2 class="grad-text">
          Simple. Transparent.<br />No Hidden Fees.
        </h2>
        <p class="section-sub">
          All plans include full setup, onboarding, and calendar integration. Book
          a demo and we will walk you through everything.
        </p>
      </div>
      <div class="base-plan-banner" ref="bannerRef">
        <span class="base-plan-pill">BASE PLAN</span>
        <p class="base-plan-text">
          Starting at <strong>$475/mo</strong> — 2,000 mins · 24/7 receptionist &amp; calendar integration included
        </p>
      </div>

      <p class="plans-label">MONTHLY PLANS</p>

      <div class="pricing-grid">
        <div
          v-for="(plan, i) in pricingPlans"
          :key="plan.tier"
          class="pricing-card"
          :class="{ featured: plan.featured }"
          :ref="el => cardRefs[i] = el"
        >
          <div v-if="plan.badge" class="plan-badge" :class="{ 'badge-popular': plan.featured }">{{ plan.badge }}</div>
          <div class="pricing-tier">{{ plan.tier }}</div>
          <div class="pricing-mins">{{ plan.minutes }}</div>
          <div class="pricing-price">
            {{ plan.price }}<span class="pricing-per">/mo + tax</span>
          </div>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li v-for="(feat, j) in plan.features" :key="j">{{ feat }}</li>
          </ul>
          <button
            :class="plan.featured ? 'btn-primary' : 'btn-ghost'"
            style="width: 100%"
            @click="$emit('open-booking')"
          >
            Book a Demo
          </button>
        </div>
      </div>
      <p class="pricing-footer">
        All plans include full setup, onboarding, and calendar integration. Prices + tax. No hidden fees.
      </p>
    </div>
  </section>
</template>

<style scoped>
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.base-plan-banner {
  background: #fff;
  border: 1.5px solid rgba(123, 47, 255, 0.15);
  border-radius: 14px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.base-plan-banner[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.base-plan-pill {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 5px 14px;
  border-radius: 100px;
  white-space: nowrap;
  flex-shrink: 0;
}
.base-plan-text {
  font-size: 16px;
  color: #4a5580;
}
.base-plan-text strong {
  color: #0a0f1e;
}
.plans-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: #b0b8cc;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 22px;
  margin-top: clamp(2rem, 5vw, 3.2rem);
}
.pricing-card {
  border-radius: 20px;
  padding: 36px 30px;
  background: #fff;
  border: 1px solid rgba(10, 15, 30, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(123, 47, 255, 0.1);
  transition-delay: 0s;
}
.pricing-card[data-revealed]:hover {
  transform: translateY(-6px);
}
.pricing-card.featured {
  background: linear-gradient(135deg, #faf8ff, #f0faff);
  border-color: rgba(123, 47, 255, 0.3);
  box-shadow: 0 8px 40px rgba(123, 47, 255, 0.12);
}
.pricing-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.pricing-card:nth-child(2) { transition-delay: 0.1s; }
.pricing-card:nth-child(3) { transition-delay: 0.2s; }
.plan-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 5px 13px;
  border-radius: 100px;
  background: rgba(123, 47, 255, 0.1);
  color: #7b2fff;
  border: 1px solid rgba(123, 47, 255, 0.2);
}
.plan-badge.badge-popular {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  color: #fff;
  border: none;
}
.pricing-tier {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #7b2fff;
  margin-bottom: 10px;
}
.pricing-mins {
  font-size: 14px;
  color: #8892b0;
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.pricing-price {
  font-size: 42px;
  font-weight: 800;
  color: #0a0f1e;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 18px;
}
.pricing-per {
  font-size: 14px;
  font-weight: 400;
  color: #8892b0;
  letter-spacing: 0;
}
.pricing-divider {
  height: 1px;
  background: rgba(10, 15, 30, 0.08);
  margin-bottom: 24px;
}
.pricing-features {
  list-style: none;
  margin-bottom: 34px;
  padding: 0;
  flex: 1;
}
.pricing-features li {
  font-size: 16px;
  color: #4a5580;
  padding: 10px 0;
  border-bottom: 1px solid rgba(10, 15, 30, 0.08);
  display: flex;
  align-items: center;
  gap: 12px;
}
.pricing-features li::before {
  content: '\2713';
  color: #00d4c0;
  font-size: 15px;
  font-weight: 700;
}
.pricing-footer {
  text-align: center;
  font-size: 14px;
  color: #8892b0;
  margin-top: 28px;
  letter-spacing: 1px;
}

@media (max-width: 640px) {
  .pricing-card {
    padding: 26px 16px 18px;
    border-radius: 16px;
  }

  .pricing-features {
    margin-bottom: 22px;
  }

  .pricing-features li {
    font-size: 15px;
    padding: 8px 0;
  }
}

@media (max-width: 520px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .base-plan-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
