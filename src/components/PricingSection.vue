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
  <section id="pricing" class="section bg-white" style="overflow: hidden">
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
          Starting at <strong>$479/mo</strong> - 2,000 mins - 24/7 receptionist &amp; calendar integration included
        </p>
      </div>

      <p class="plans-label">MONTHLY PLANS</p>

      <div class="pricing-grid">
        <div
          v-for="(plan, i) in pricingPlans"
          :key="plan.tier"
          class="pricing-plan"
        >
          <div
            class="pricing-card"
            :class="{ featured: plan.featured, 'has-attached-banner': !!plan.subBadge }"
            :ref="el => cardRefs[i] = el"
          >
            <div class="plan-top-row">
              <div class="pricing-tier">{{ plan.tier }}</div>
              <div class="plan-badge-slot">
                <div v-if="plan.badge" class="plan-badge" :class="{ 'badge-popular': plan.featured }">{{ plan.badge }}</div>
              </div>
            </div>
            <div class="pricing-head">
              <div class="pricing-mins">{{ plan.minutes }}</div>
              <div class="pricing-price">
                {{ plan.price }}<span class="pricing-per">/mo + tax</span>
              </div>
              <div v-if="plan.originalPrice || plan.discountText" class="pricing-promo-row">
                <span v-if="plan.originalPrice" class="pricing-old-price">{{ plan.originalPrice }}</span>
                <span v-if="plan.discountText" class="pricing-discount-pill">{{ plan.discountText }}</span>
              </div>
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
            <div v-if="plan.subBadge" class="plan-attached-banner">{{ plan.subBadge }}</div>
          </div>
          <p v-if="plan.promoNote" class="pricing-note pricing-note-outside">{{ plan.promoNote }}</p>
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
  border: 1.5px solid rgba(var(--brand-rgb), 0.15);
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
  background: linear-gradient(135deg, var(--brand), var(--accent));
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
  color: var(--text-body);
}
.base-plan-text strong {
  color: var(--text-main);
}
.plans-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 16px;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 22px;
  margin-top: clamp(2rem, 5vw, 3.2rem);
  align-items: stretch;
  padding-bottom: 56px;
}
.pricing-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Cards */
.pricing-card {
  flex: 1;
  border-radius: 20px;
  padding: 36px 28px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.62) 46%, rgba(var(--accent-rgb), 0.16) 100%);
  border: 1px solid rgba(255, 255, 255, 0.76);
  box-shadow:
    0 12px 30px rgba(12, 18, 38, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -10px 16px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s, border-color 0.2s;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
}
.pricing-card.has-attached-banner {
  border-radius: 20px 20px 0 0;
  border-bottom: none;
}
.pricing-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--brand-rgb), 0.34);
  box-shadow:
    0 18px 42px rgba(var(--brand-rgb), 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
  transition-delay: 0s;
}
.pricing-card[data-revealed]:hover {
  transform: translateY(-6px);
}
.pricing-card.featured {
  background: linear-gradient(155deg, rgba(var(--brand-rgb), 0.24) 0%, rgba(255, 255, 255, 0.76) 52%, rgba(var(--accent-rgb), 0.2) 100%);
  border-color: rgba(var(--brand-rgb), 0.46);
  border-width: 1.5px;
  box-shadow:
    0 16px 34px rgba(var(--brand-rgb), 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -12px 18px rgba(255, 255, 255, 0.14);
}
.pricing-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.pricing-plan:nth-child(2) .pricing-card { transition-delay: 0.1s; }
.pricing-plan:nth-child(3) .pricing-card { transition-delay: 0.2s; }
.plan-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  min-height: 30px;
}
.plan-badge-slot {
  min-width: 118px;
  display: flex;
  justify-content: flex-end;
}
.plan-badge {
  position: static;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  padding: 5px 16px;
  border-radius: 100px;
  background: rgba(var(--brand-rgb), 0.1);
  color: var(--brand);
  border: 1px solid rgba(var(--brand-rgb), 0.2);
}
.plan-badge.badge-popular {
  background: linear-gradient(135deg, var(--brand), var(--accent));
  color: #fff;
  border: none;
}
.badge-popular {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
}
.badge-start {
  background: linear-gradient(135deg, var(--brand), var(--brand-strong));
  color: #fff;
}

/* Tier */
.pricing-tier {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--brand);
  margin-bottom: 0;
}
.pricing-head {
  min-height: 112px;
}
.pricing-card.featured .pricing-tier {
  color: var(--accent-strong);
}

/* Minutes */
.pricing-mins {
  font-size: 12px;
  color: var(--text-body);
  margin-bottom: 10px;
  letter-spacing: 1px;
}
.pricing-promo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 24px;
  margin-top: 6px;
  margin-bottom: 10px;
}
.pricing-old-price {
  font-size: 17px;
  color: var(--text-muted);
  text-decoration: line-through;
  font-weight: 600;
}
.pricing-discount-pill {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--accent-strong);
  border-radius: 100px;
  padding: 4px 10px;
}
.pricing-price {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0;
}
.pricing-per {
  display: inline-block;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-body);
  letter-spacing: 0;
}
.plan-sub-badge {
  display: inline-flex;
  align-self: flex-start;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-main);
  background: var(--surface-alt);
  border: 1px solid rgba(10, 15, 30, 0.12);
  border-radius: 100px;
  padding: 5px 12px;
  margin-bottom: 12px;
}
.pricing-note {
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-body);
}
.pricing-note-outside {
  position: absolute;
  top: 100%;
  left: 30px;
  right: 30px;
  margin: 12px 0 0;
}
.plan-attached-banner {
  position: absolute;
  top: 100%;
  left: -1px;
  right: -1px;
  padding: 12px 14px;
  text-align: center;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-strong), var(--accent-strong));
  border: 1px solid rgba(10, 15, 30, 0.08);
  border-top: none;
  border-radius: 0 0 20px 20px;
  z-index: 2;
}
.pricing-divider {
  height: 1px;
  background: rgba(10, 15, 30, 0.08);
  margin: 10px 0 12px;
}

/* Features */
.pricing-features {
  list-style: none;
  margin-bottom: 28px;
  padding: 0;
  flex: 1;
}
.pricing-features li {
  font-size: 15px;
  color: var(--text-body);
  padding: 11px 0;
  border-bottom: 1px solid rgba(10, 15, 30, 0.07);
  display: flex;
  align-items: center;
  gap: 12px;
}
.pricing-features li:last-child {
  border-bottom: none;
}
.check-icon {
  width: 22px;
  height: 22px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
  line-height: 1;
  padding-top: 1px;
}

/* Footer */
.pricing-footer {
  text-align: center;
  font-size: 13px;
  color: var(--text-body);
  margin-top: 28px;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  .pricing-card.has-attached-banner {
    border-radius: 16px 16px 0 0;
  }
  .pricing-grid {
    padding-bottom: 46px;
  }
  .pricing-note-outside {
    position: static;
    left: auto;
    right: auto;
    margin: 10px 16px 0;
  }
  .plan-attached-banner {
    border-radius: 0 0 16px 16px;
  }

  .pricing-features {
    margin-bottom: 22px;
  }

  .pricing-features li {
    font-size: 14px;
    padding: 9px 0;
  }
  .pricing-head {
    min-height: 0;
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

