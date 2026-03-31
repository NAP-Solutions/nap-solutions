<script setup>
import { ref } from 'vue'
import { Check, X } from 'lucide-vue-next'
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
          Starting at <strong>$479/mo</strong> — 2,000 mins — 24/7 receptionist &amp; calendar integration included
        </p>
      </div>

      <p class="plans-label">MONTHLY PLANS</p>

      <div class="pricing-grid">
        <div
          v-for="(plan, i) in pricingPlans"
          :key="plan.tier"
          class="pricing-plan"
          :class="{ 'is-featured': plan.featured }"
          :ref="el => cardRefs[i] = el"
        >
          <!-- Popular badge floats above the card -->
          <div v-if="plan.badge" class="plan-badge-wrap">
            <span class="plan-badge" :class="{ 'badge-popular': plan.featured }">
              {{ plan.badge }}
            </span>
          </div>

          <div class="pricing-card" :class="{ featured: plan.featured }">
            <!-- Header -->
            <div class="card-header">
              <div class="pricing-tier">{{ plan.tier }}</div>
              <p class="pricing-desc">{{ plan.description }}</p>
            </div>

            <!-- Price -->
            <div class="pricing-head">
              <div class="pricing-price-row">
                <div class="pricing-price">{{ plan.price }}</div>
                <div class="pricing-period">/ mo + tax</div>
              </div>
              <div v-if="plan.originalPrice || plan.discountText" class="pricing-promo-row">
                <span v-if="plan.originalPrice" class="pricing-old-price">{{ plan.originalPrice }}</span>
                <span v-if="plan.discountText" class="pricing-discount-pill">{{ plan.discountText }}</span>
              </div>
            </div>

            <!-- Minutes -->
            <div class="pricing-mins-row">
              <span class="mins-dot"></span>
              <span class="mins-label">{{ plan.minutes }}</span>
              <span v-if="plan.subBadge" class="mins-trial">{{ plan.subBadge }}</span>
            </div>

            <div class="pricing-divider"></div>

            <!-- Features -->
            <ul class="pricing-features">
              <li
                v-for="(feat, j) in plan.features"
                :key="j"
                class="feat-row"
                :class="{ 'feat-excluded': !feat.included }"
              >
                <span class="feat-icon">
                  <Check v-if="feat.included" :size="11" />
                  <X v-else :size="11" />
                </span>
                <span class="feat-label">{{ feat.label }}</span>
              </li>
            </ul>

            <!-- CTA -->
            <button
              :class="plan.featured ? 'btn-primary' : 'btn-ghost'"
              class="pricing-cta"
              @click="$emit('open-booking')"
            >
              Book a Demo
            </button>
          </div>

          <p v-if="plan.promoNote" class="pricing-note">{{ plan.promoNote }}</p>
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

/* Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: clamp(1.5rem, 4vw, 2.5rem);
  align-items: start;
  padding-top: 36px; /* room for floating badges */
}

.pricing-plan {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 22px; /* space above card for badge */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.pricing-plan[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.pricing-plan:nth-child(2) { transition-delay: 0.08s; }
.pricing-plan:nth-child(3) { transition-delay: 0.16s; }
.pricing-plan:nth-child(4) { transition-delay: 0.24s; }

/* Badge sits above the card, centered, overlapping the top border */
.plan-badge-wrap {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  white-space: nowrap;
}
.plan-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  padding: 5px 16px;
  border-radius: 100px;
  background: #fff;
  color: var(--brand-strong);
  border: 1.5px solid rgba(var(--brand-rgb), 0.3);
}
.plan-badge.badge-popular {
  background: linear-gradient(135deg, var(--brand), var(--accent));
  color: #000;
  border: none;
}

/* Card — full border on all sides, same shape for all plans */
.pricing-card {
  position: relative;
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.1);
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, box-shadow 0.25s, transform 0.25s;
}
.pricing-card:hover {
  border-color: rgba(var(--brand-rgb), 0.35);
  box-shadow: 0 12px 36px rgba(var(--brand-rgb), 0.12);
  transform: translateY(-4px);
}
.pricing-card.featured {
  border-color: transparent;
  border-width: 1.5px;
  box-shadow: 0 8px 28px rgba(var(--brand-rgb), 0.14);
}

.pricing-card.featured::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1.5px;
  background-image: radial-gradient(
    transparent, transparent,
    var(--brand), var(--accent), var(--brand-strong),
    transparent, transparent
  );
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shine-pulse 5s infinite linear;
  will-change: background-position;
  pointer-events: none;
  z-index: 0;
}

@keyframes shine-pulse {
  0%   { background-position: 0% 0%; }
  50%  { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

.pricing-card.featured .pricing-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background-image: radial-gradient(
    transparent, transparent,
    var(--brand), var(--accent), var(--brand-strong),
    transparent, transparent
  );
  background-size: 300% 300%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shine-pulse 5s infinite linear;
  will-change: background-position;
  pointer-events: none;
  z-index: 1;
}

/* Header */
.card-header {
  min-height: 62px; /* tallest: tier label + 2-line description */
  margin-bottom: 20px;
}
.pricing-tier {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--brand-strong);
  margin-bottom: 4px;
}
.pricing-card.featured .pricing-tier {
  color: var(--accent-ink);
}
.pricing-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

/* Price */
.pricing-head {
  min-height: 78px; /* tallest: price-row + promo row (SCALE) */
  margin-bottom: 6px;
}
.pricing-price-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.pricing-price {
  font-size: 42px;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.03em;
  line-height: 1;
}
.pricing-period {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
  white-space: nowrap;
}
.pricing-promo-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.pricing-old-price {
  font-size: 15px;
  color: var(--text-muted);
  text-decoration: line-through;
  font-weight: 500;
}
.pricing-discount-pill {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--accent-ink);
  border-radius: 100px;
  padding: 3px 9px;
}

/* Minutes row */
.pricing-mins-row {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 16px;
}
.mins-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand), var(--accent));
  flex-shrink: 0;
}
.mins-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-body);
  letter-spacing: 0.04em;
}
.mins-trial {
  margin-left: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent-ink);
  background: rgba(var(--accent-rgb), 0.15);
  border-radius: 100px;
  padding: 3px 10px;
}

.pricing-divider {
  height: 1px;
  background: rgba(10, 15, 30, 0.07);
  margin-bottom: 16px;
}

/* Features */
.pricing-features {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.feat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(10, 15, 30, 0.05);
}
.feat-row:last-child {
  border-bottom: none;
}
.feat-row.feat-excluded {
  opacity: 0.48;
}
.feat-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(var(--brand-rgb), 0.15);
  color: var(--brand-strong);
}
.feat-row.feat-excluded .feat-icon {
  background: rgba(10, 15, 30, 0.06);
  color: var(--text-muted);
}
.feat-icon :deep(svg) {
  display: block;
}
.feat-label {
  font-size: 14px;
  color: var(--text-body);
  line-height: 1.4;
}
.feat-row.feat-excluded .feat-label {
  color: var(--text-muted);
}

/* CTA */
.pricing-cta {
  width: 100%;
  margin-top: auto;
}

/* Promo note */
.pricing-note {
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--text-muted);
  text-align: center;
  padding: 0 4px;
}

/* Footer */
.pricing-footer {
  text-align: center;
  font-size: 13px;
  color: var(--text-body);
  margin-top: 36px;
  letter-spacing: 0.3px;
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
  .pricing-card {
    padding: 24px 20px;
  }
  .pricing-price {
    font-size: 36px;
  }
  .card-header,
  .pricing-head {
    min-height: 0;
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
