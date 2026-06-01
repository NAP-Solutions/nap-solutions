<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  receptionistPricingPlans,
  outboundPricingPlans,
  receptionistComparisonRows,
  outboundComparisonRows,
} from '../data/pricingData'
import { useScrollReveal } from '../composables/useScrollReveal'
import LiquidHeading from './LiquidHeading.vue'
import HeroCanvas from './HeroCanvas.vue'

const props = defineProps({
  service: {
    type: String,
    default: 'ai-receptionist',
  },
})

const emit = defineEmits(['open-booking'])

const headerRef = ref(null)
const bannerRef = ref(null)
const tableRef = ref(null)
const customRef = ref(null)
const referralRef = ref(null)
const pricingSectionRef = ref(null)
const shouldRenderCanvas = ref(false)
const isOutbound = props.service === 'outbound-agent'
const comparisonTierOrder = ['GROWTH', 'SCALE', 'DELUXE', 'ENTERPRISE']

const pricingCopy = props.service === 'outbound-agent'
  ? {
      heading: 'Simple. Scalable. Outbound-ready.',
      sub:
        'All plans include setup, onboarding, campaign configuration, and CRM integration. Book a demo to see the right fit.',
      baseBanner:
        'Starting at $59/mo - 100 mins - 24/7 outbound calling and CRM sync included',
    }
  : {
      heading: 'Simple. Transparent. No hidden fees.',
      sub:
        'All plans include full setup, onboarding, and calendar integration. Book a demo and we will walk you through everything.',
      baseBanner:
        'Starting at $59/mo - 100 mins - 24/7 receptionist and calendar integration included',
    }

const comparisonPlans = (isOutbound ? outboundPricingPlans : receptionistPricingPlans).filter((plan) =>
  comparisonTierOrder.includes(plan.tier)
)
const comparisonRows = isOutbound ? outboundComparisonRows : receptionistComparisonRows
const customPlan = isOutbound
  ? outboundPricingPlans.find((plan) => plan.tier === 'CUSTOM')
  : null

function getComparisonValue(row, tier) {
  const key = tier.toLowerCase()
  return row[key] ?? '-'
}

function isMutedComparisonValue(value) {
  const normalized = String(value).trim().toLowerCase()
  return normalized === 'no' || normalized.startsWith('no ')
}

useScrollReveal(() => {
  const revealTargets = [headerRef.value, bannerRef.value, referralRef.value]

  revealTargets.push(tableRef.value)
  if (isOutbound) revealTargets.push(customRef.value)

  return revealTargets
})

let canvasWarmupObserver = null
let idleWarmupHandle = 0
let idleWarmupTimeout = 0
let deferredMountTimeout = 0

function mountCanvas() {
  if (shouldRenderCanvas.value) return
  shouldRenderCanvas.value = true
  canvasWarmupObserver?.disconnect()
  canvasWarmupObserver = null

  if (idleWarmupHandle && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(idleWarmupHandle)
  }
  idleWarmupHandle = 0

  if (idleWarmupTimeout) {
    clearTimeout(idleWarmupTimeout)
    idleWarmupTimeout = 0
  }

  if (deferredMountTimeout) {
    clearTimeout(deferredMountTimeout)
    deferredMountTimeout = 0
  }
}

function scheduleMountCanvas() {
  if (shouldRenderCanvas.value || deferredMountTimeout) return
  // Defer past any in-progress scroll animation frame so WebGL init
  // doesn't compete with GSAP tween updates.
  deferredMountTimeout = window.setTimeout(mountCanvas, 150)
}

onMounted(() => {
  const sectionEl = pricingSectionRef.value
  if (!sectionEl) {
    mountCanvas()
    return
  }

  // Large margin so the canvas warms up well before the section is in view,
  // reducing the chance the IO fires while a scroll animation is active.
  const WARMUP_MARGIN_PX = 2500
  canvasWarmupObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          scheduleMountCanvas()
          return
        }
      }
    },
    {
      rootMargin: `${WARMUP_MARGIN_PX}px 0px`,
      threshold: 0,
    }
  )

  canvasWarmupObserver.observe(sectionEl)

  if ('requestIdleCallback' in window) {
    idleWarmupHandle = window.requestIdleCallback(() => {
      mountCanvas()
    }, { timeout: 3500 })
  } else {
    idleWarmupTimeout = window.setTimeout(mountCanvas, 2000)
  }
})

onBeforeUnmount(() => {
  canvasWarmupObserver?.disconnect()
  canvasWarmupObserver = null

  if (idleWarmupHandle && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(idleWarmupHandle)
  }
  idleWarmupHandle = 0

  if (idleWarmupTimeout) {
    clearTimeout(idleWarmupTimeout)
    idleWarmupTimeout = 0
  }

  if (deferredMountTimeout) {
    clearTimeout(deferredMountTimeout)
    deferredMountTimeout = 0
  }
})

function trackLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead')
  }
}

function handlePlanCta(plan) {
  if (plan?.ctaLabel?.toLowerCase().startsWith('contact')) {
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
  }

  trackLead()
  emit('open-booking')
}
</script>

<template>
  <section id="pricing" ref="pricingSectionRef" class="section pricing-section">
    <HeroCanvas v-if="shouldRenderCanvas" :intro="false" :palette-variant="props.service" />
    <div class="pricing-scrim"></div>
    <div class="pricing-edge-fade pricing-edge-fade--top" aria-hidden="true"></div>
    <div class="pricing-edge-fade pricing-edge-fade--bottom" aria-hidden="true"></div>
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">Pricing</div>
        <LiquidHeading class="pricing-heading">
          {{ pricingCopy.heading }}
        </LiquidHeading>
        <p class="section-sub">
          {{ pricingCopy.sub }}
        </p>
      </div>

      <div class="base-plan-banner" ref="bannerRef">
        <span class="base-plan-pill">BASE PLAN</span>
        <p class="base-plan-text">
          {{ pricingCopy.baseBanner }}
        </p>
      </div>

      <p class="plans-label">PLAN COMPARISON</p>

      <div class="comparison-table-wrap" ref="tableRef">
        <table class="comparison-table">
          <thead>
            <tr>
              <th class="comparison-feature-head">
                <div class="comparison-feature-header">
                  <div class="comparison-feature-kicker">Included</div>
                  <div class="comparison-feature-title">Features</div>
                  <p class="comparison-feature-sub">Plan comparisons</p>
                </div>
              </th>
              <th
                v-for="plan in comparisonPlans"
                :key="plan.tier"
                class="comparison-col-head"
                :class="{ 'is-featured-col': plan.featured }"
              >
                <span v-if="plan.discountText" class="comparison-plan-corner-badge">
                  {{ plan.discountText }}
                </span>
                <div class="comparison-plan-header">
                  <div class="comparison-plan-tier">{{ plan.tier }}</div>
                  <div class="comparison-plan-price-row">
                    <span class="comparison-plan-price">{{ plan.price }}</span>
                    <span class="comparison-plan-meta">
                      <span v-if="plan.originalPrice" class="comparison-plan-old-price comparison-plan-old-price--stacked">
                        {{ plan.originalPrice }}
                      </span>
                      <span class="comparison-plan-period">/ mo</span>
                    </span>
                  </div>
                  <p class="comparison-plan-minutes">{{ plan.minutes }}</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparisonRows" :key="row.feature">
              <th>{{ row.feature }}</th>
              <td
                v-for="plan in comparisonPlans"
                :key="`${row.feature}-${plan.tier}`"
                :class="{ 'is-featured-col': plan.featured }"
              >
                <span
                  class="comparison-value"
                  :class="{ 'comparison-value-muted': isMutedComparisonValue(getComparisonValue(row, plan.tier)) }"
                >
                  {{ getComparisonValue(row, plan.tier) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="isOutbound && customPlan" ref="customRef" class="custom-plan-section">
        <div class="custom-plan-copy">
          <span class="custom-plan-pill">Custom option</span>
          <h3 class="custom-plan-title">Need a fully tailored outbound setup?</h3>
          <p class="custom-plan-text">
            {{ customPlan.description }}. We can customize call volume, workflows, integrations, and campaign logic around your team.
          </p>
        </div>

        <div class="custom-plan-card">
          <div class="custom-plan-card-head">
            <div>
              <div class="pricing-tier">{{ customPlan.tier }}</div>
              <p class="pricing-desc">Built for specialized workflows and large-scale campaigns.</p>
            </div>
            <div class="custom-plan-meta">
              <span class="custom-plan-price">{{ customPlan.price }}</span>
              <span class="custom-plan-minutes">{{ customPlan.minutes }}</span>
            </div>
          </div>

          <ul class="custom-plan-features">
            <li v-for="feature in customPlan.features" :key="feature.label" class="custom-plan-feature">
              {{ feature.label }}
            </li>
          </ul>

          <button class="btn-primary btn-shine custom-plan-cta" @click="handlePlanCta(customPlan)">
            {{ customPlan.ctaLabel || 'Book a Demo' }}
          </button>
        </div>
      </div>

      <p class="pricing-footer">
        {{
          isOutbound
            ? 'All plans include full setup and onboarding. Prices + tax. No hidden fees.'
            : 'Need tailored minutes or workflow requirements? Book a demo and we will map the right plan for your team.'
        }}
      </p>

      <div class="referral-callout" ref="referralRef">
        <span class="referral-pill">Referral Bonus</span>
        <h3 class="referral-title">Refer a friend. Get up to $150.</h3>
        <p class="referral-copy">
          If someone you refer becomes a NAP client,
          <br> 
          we send you up to $150 as a thank-you.
        </p>
        <p class="referral-note">Offer applies after your referral signs and completes onboarding.</p>
        <button class="btn-primary btn-shine referral-cta" @click="$emit('open-booking')">
          Refer a Friend
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  position: relative;
  overflow: hidden;
  background: var(--surface-tint);
}

.pricing-section::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.032;
  pointer-events: none;
  mix-blend-mode: multiply;
}

.pricing-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.42);
}

.pricing-edge-fade {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  height: clamp(56px, 9vw, 132px);
  pointer-events: none;
}

.pricing-edge-fade--top {
  top: 0;
  background: linear-gradient(
    180deg,
    var(--surface-base) 0%,
    rgba(245, 248, 253, 0.86) 28%,
    rgba(244, 248, 255, 0) 100%
  );
}

.pricing-edge-fade--bottom {
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(244, 248, 255, 0) 0%,
    rgba(248, 251, 255, 0.74) 60%,
    #fff 100%
  );
}

.pricing-section .section-inner {
  position: relative;
  z-index: 3;
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

.pricing-heading :deep(.liquid-heading-layer--fill .liquid-heading-content) {
  background: none;
  -webkit-text-fill-color: var(--text-main);
  color: var(--text-main);
  text-shadow: none;
}

.base-plan-banner {
  background: #fff;
  border: 1.5px solid rgba(var(--accent-ink-rgb), 0.2);
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
  background: linear-gradient(135deg, rgba(var(--accent-ink-rgb), 0.9), var(--accent-ink));
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
  margin-bottom: 8px;
}

/* Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: clamp(0.5rem, 1.4vw, 0.9rem);
  align-items: start;
  padding-top: 24px; /* room for floating badges */
}

.pricing-plan {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 18px; /* space above card for badge */
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

.comparison-table-wrap {
  margin-top: clamp(0.5rem, 1.4vw, 0.9rem);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.comparison-table-wrap[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.comparison-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 38px rgba(var(--accent-ink-rgb), 0.09);
}

.comparison-table thead th {
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main);
  padding: 18px 20px;
  border-bottom: 1px solid rgba(10, 15, 30, 0.09);
  white-space: nowrap;
}

.comparison-feature-head {
  width: 24%;
  vertical-align: top;
}

.comparison-col-head {
  width: 19%;
  vertical-align: top;
  position: relative;
}

.comparison-feature-header {
  display: grid;
  gap: 6px;
  max-width: 20ch;
}

.comparison-feature-kicker {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent-ink-text, var(--accent-ink));
}

.comparison-feature-title {
  font-size: 28px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.comparison-feature-sub {
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-muted);
}

.comparison-table tbody th,
.comparison-table tbody td {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.35;
  color: var(--text-body);
  border-bottom: 1px solid rgba(10, 15, 30, 0.07);
}

.comparison-table thead th + th,
.comparison-table tbody th + td,
.comparison-table tbody td + td {
  border-left: 1px solid rgba(10, 15, 30, 0.07);
}

.comparison-table tbody th {
  text-align: left;
  font-weight: 500;
  color: var(--text-main);
}

.comparison-table tbody td {
  text-align: left;
  font-weight: 500;
}

.comparison-value {
  display: inline-block;
}

.comparison-value-muted {
  color: var(--text-muted);
}

.is-featured-col {
  background: linear-gradient(180deg, rgba(var(--accent-ink-rgb), 0.07), rgba(255, 255, 255, 0));
}

.comparison-plan-header {
  display: grid;
  gap: 6px;
}

.comparison-plan-corner-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: var(--accent-ink);
  border-radius: 999px;
  padding: 4px 8px;
}

.comparison-plan-tier {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-ink-text, var(--accent-ink));
  text-transform: uppercase;
}

.comparison-plan-price-row {
  display: flex;
  align-items: flex-end;
  gap: 6px;
}

.comparison-plan-meta {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  line-height: 1;
  padding-bottom: 2px;
}

.comparison-plan-price {
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text-main);
}

.comparison-plan-period {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-muted);
  line-height: 1;
}

.comparison-plan-old-price {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: line-through;
}

.comparison-plan-old-price--stacked {
  line-height: 1;
}

.comparison-plan-minutes {
  margin: 2px 0 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.comparison-table tbody tr:last-child th,
.comparison-table tbody tr:last-child td {
  border-bottom: none;
}

/* Badge sits above the card, centered, overlapping the top border */
.plan-badge-wrap {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  white-space: nowrap;
  transition: transform 0.25s ease;
}
.pricing-plan:hover .plan-badge-wrap {
  transform: translateX(-50%) translateY(-4px);
}
.plan-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  padding: 5px 16px;
  border-radius: 100px;
  background: #fff;
  color: var(--accent-ink-text, var(--accent-ink));
  border: 1.5px solid rgba(var(--accent-ink-rgb), 0.38);
}
.plan-badge.badge-popular {
  background: var(--accent-ink);
  color: #fff;
  border: none;
}

/* Card - full border on all sides, same shape for all plans */
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
  border-color: rgba(var(--accent-ink-rgb), 0.38);
  box-shadow: 0 12px 36px rgba(var(--accent-ink-rgb), 0.16);
  transform: translateY(-4px);
}
.pricing-card.featured {
  border-color: transparent;
  border-width: 1.5px;
  box-shadow: 0 8px 28px rgba(var(--accent-ink-rgb), 0.2);
}

.pricing-card.featured::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1.5px;
  background-image: radial-gradient(
    transparent, transparent,
    rgba(var(--accent-ink-rgb), 0.84), var(--accent-ink), rgba(var(--accent-ink-rgb), 0.92),
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
    rgba(var(--accent-ink-rgb), 0.84), var(--accent-ink), rgba(var(--accent-ink-rgb), 0.92),
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
  color: var(--accent-ink-text, var(--accent-ink));
  margin-bottom: 4px;
}
.pricing-card.featured .pricing-tier {
  color: var(--accent-ink-text, var(--accent-ink));
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
  background: var(--accent-ink);
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
  color: var(--accent-ink-text, var(--accent-ink));
  background: rgba(var(--accent-ink-rgb), 0.15);
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
  background: rgba(var(--accent-ink-rgb), 0.15);
  color: var(--accent-ink-text, var(--accent-ink));
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

.custom-plan-section {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 24px;
  align-items: start;
  margin-top: 28px;
  padding: clamp(24px, 4vw, 34px);
  border-radius: 18px;
  border: 1.5px solid rgba(var(--accent-ink-rgb), 0.22);
  background:
    linear-gradient(135deg, rgba(var(--accent-ink-rgb), 0.08), rgba(255, 255, 255, 0.94)),
    #fff;
  box-shadow: 0 16px 38px rgba(var(--accent-ink-rgb), 0.08);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.custom-plan-section[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.custom-plan-copy {
  display: grid;
  gap: 12px;
  align-content: start;
}

.custom-plan-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-ink-text, var(--accent-ink));
  background: rgba(var(--accent-ink-rgb), 0.12);
  border: 1px solid rgba(var(--accent-ink-rgb), 0.16);
  border-radius: 999px;
  padding: 5px 12px;
}

.custom-plan-title {
  margin: 0;
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--text-main);
}

.custom-plan-text {
  margin: 0;
  max-width: 46ch;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-body);
}

.custom-plan-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(var(--accent-ink-rgb), 0.14);
  border-radius: 16px;
  padding: 22px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.custom-plan-card-head {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: flex-start;
}

.custom-plan-meta {
  display: grid;
  justify-items: end;
  gap: 6px;
  text-align: right;
}

.custom-plan-price {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text-main);
}

.custom-plan-minutes {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.custom-plan-features {
  list-style: none;
  padding: 0;
  margin: 22px 0 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;
}

.custom-plan-feature {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--text-body);
}

.custom-plan-feature::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.52em;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-ink);
}

.custom-plan-cta {
  margin-top: 22px;
  width: 100%;
}

.referral-callout {
  margin: 24px auto 0;
  max-width: 760px;
  text-align: center;
  background: linear-gradient(135deg, rgba(var(--accent-ink-rgb), 0.08), rgba(255, 255, 255, 0.96));
  border: 1.5px solid rgba(var(--accent-ink-rgb), 0.28);
  border-radius: 16px;
  padding: clamp(24px, 4vw, 34px);
  box-shadow: 0 14px 32px rgba(var(--accent-ink-rgb), 0.1);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.referral-callout[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.referral-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  background: var(--accent-ink);
  border: 1px solid var(--accent-ink);
  border-radius: 100px;
  padding: 5px 12px;
  margin-bottom: 14px;
}

.referral-title {
  margin: 0;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.14;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.referral-copy {
  margin: 12px auto 0;
  max-width: 54ch;
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-body);
}

.referral-note {
  margin: 12px auto 0;
  max-width: 58ch;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
}

.referral-cta {
  margin: 18px auto 0;
  min-width: 210px;
}

/* Responsive */
@media (max-width: 1024px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .custom-plan-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .reveal-header {
    width: min(100%, 24rem);
    margin-inline: auto;
  }

  .reveal-header :deep(.liquid-heading-stack),
  .reveal-header .section-sub {
    margin-inline: 0;
  }

  .reveal-header .section-sub {
    width: min(100%, 24rem);
  }

  .comparison-table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin-inline: -4px;
    padding-inline: 4px;
  }

  .comparison-table {
    min-width: 760px;
    border-radius: 14px;
  }

  .comparison-table thead th {
    font-size: 14px;
    padding: 16px 18px;
  }

  .comparison-table tbody th,
  .comparison-table tbody td {
    font-size: 14px;
    padding: 14px 18px;
  }

  .comparison-plan-price {
    font-size: 34px;
  }

  .comparison-plan-period {
    font-size: 16px;
  }

  .comparison-feature-title {
    font-size: 22px;
  }

  .custom-plan-card-head {
    flex-direction: column;
  }

  .custom-plan-meta {
    justify-items: start;
    text-align: left;
  }

  .custom-plan-features {
    grid-template-columns: 1fr;
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
  .referral-callout {
    text-align: left;
  }
  .referral-copy,
  .referral-note {
    margin-left: 0;
    margin-right: 0;
  }
  .referral-cta {
    width: 100%;
    min-width: 0;
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

