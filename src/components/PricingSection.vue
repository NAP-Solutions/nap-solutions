<script setup>
import { pricingPlans } from '../data/pricingData'

defineEmits(['open-booking'])
</script>

<template>
  <section id="pricing" class="section bg-white" style="overflow: hidden">
    <div class="section-inner">
      <div class="section-eyebrow">Pricing</div>
      <h2 class="grad-text">
        Simple. Transparent.<br />No Hidden Fees.
      </h2>

      <!-- Starting price banner -->
      <div class="starting-banner">
        <span class="banner-tag">BASE PLAN</span>
        <span class="banner-text">Starting at <strong>$475/mo</strong> — 2,000 mins · 24/7 receptionist &amp; calendar integration included</span>
      </div>

      <div class="plans-label">MONTHLY PLANS</div>

      <div class="pricing-grid">
        <div
          v-for="plan in pricingPlans"
          :key="plan.tier"
          class="pricing-card"
          :class="{ featured: plan.featured }"
        >
          <div v-if="plan.badge" class="plan-badge" :class="{ 'badge-start': plan.tier === 'BASE', 'badge-popular': plan.featured }">
            {{ plan.badge }}
          </div>
          <div class="pricing-tier">{{ plan.tier }}</div>
          <div class="pricing-mins">{{ plan.minutes }}</div>
          <div class="pricing-price">
            {{ plan.price }}<span class="pricing-tax">/mo + tax</span>
          </div>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li v-for="(feat, i) in plan.features" :key="i">
              <span class="check-icon">✓</span>{{ feat }}
            </li>
          </ul>
          <button
            class="btn-primary"
            style="width: 100%"
            @click="$emit('open-booking')">
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
/* Starting price banner */
.starting-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #faf8ff, #f0faff);
  border: 1.5px solid rgba(123, 47, 255, 0.2);
  border-radius: 14px;
  padding: 14px 22px;
  margin: 1.6rem auto 2rem;
  max-width: 620px;
  flex-wrap: wrap;
}
.banner-tag {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #fff;
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  padding: 4px 12px;
  border-radius: 100px;
  white-space: nowrap;
  text-transform: uppercase;
}
.banner-text {
  font-size: 15px;
  color: #4a5580;
}
.banner-text strong {
  color: #7b2fff;
  font-weight: 700;
}

/* Plans label */
.plans-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #8892b0;
  margin-bottom: 1.2rem;
  text-transform: uppercase;
}

/* Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: 20px;
  margin-top: 0;
}

/* Cards */
.pricing-card {
  border-radius: 20px;
  padding: 36px 28px;
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
}
.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(123, 47, 255, 0.1);
}
.pricing-card.featured {
  background: linear-gradient(160deg, #faf8ff 0%, #f3f0ff 100%);
  border-color: rgba(123, 47, 255, 0.35);
  border-width: 2px;
  box-shadow: 0 8px 24px rgba(123, 47, 255, 0.1);
}

/* Badges */
.plan-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  padding: 5px 16px;
  border-radius: 100px;
  white-space: nowrap;
  text-transform: uppercase;
}
.badge-popular {
  background: linear-gradient(135deg, #7b2fff, #5b1fd4);
  color: #fff;
}
.badge-start {
  background: linear-gradient(135deg, #7b2fff, #5b1fd4);
  color: #fff;
}

/* Tier */
.pricing-tier {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #7b2fff;
  margin-bottom: 6px;
  text-transform: uppercase;
  text-align: center;
}
.pricing-card.featured .pricing-tier {
  color: #00a896;
}

/* Minutes */
.pricing-mins {
  font-size: 12px;
  color: #8892b0;
  margin-bottom: 16px;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
}

/* Price */
.pricing-price {
  font-size: clamp(2.4rem, 5vw, 3rem);
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  color: #0a0f1e;
  line-height: 1;
  margin-bottom: 4px;
  text-align: center;
}
.pricing-tax {
  font-size: 0.9rem;
  font-weight: 400;
  color: #8892b0;
  display: block;
  margin-top: 4px;
  font-size: 13px;
}

.pricing-divider {
  height: 1px;
  background: rgba(10, 15, 30, 0.08);
  margin: 20px 0 22px;
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
  color: #4a5580;
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
  background: #00d4c0;
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
  color: #8892b0;
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

  .pricing-card {
    padding: 28px 18px 20px;
    border-radius: 16px;
  }

  .starting-banner {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }

  .pricing-features li {
    font-size: 14px;
    padding: 9px 0;
  }
}
</style>
