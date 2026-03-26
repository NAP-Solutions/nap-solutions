<script setup>
import { pricingPlans } from '../data/pricingData'

defineEmits(['open-booking'])
</script>

<template>
  <section id="pricing" class="section bg-white">
    <div class="section-inner">
      <div class="section-eyebrow">Pricing</div>
      <h2 class="grad-text">
        Simple. Transparent.<br />No Hidden Fees.
      </h2>
      <p class="section-sub">
        All plans include full setup, onboarding, and calendar integration. Book
        a demo and we will walk you through everything.
      </p>
      <div class="pricing-grid">
        <div
          v-for="plan in pricingPlans"
          :key="plan.tier"
          class="pricing-card"
          :class="{ featured: plan.featured }"
        >
          <div v-if="plan.featured" class="popular-badge">MOST POPULAR</div>
          <div class="pricing-tier">{{ plan.tier }}</div>
          <div class="pricing-mins">{{ plan.minutes }}</div>
          <div class="pricing-divider"></div>
          <ul class="pricing-features">
            <li v-for="(feat, i) in plan.features" :key="i">{{ feat }}</li>
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
        All plans include full setup, onboarding, and calendar integration. No
        hidden fees.
      </p>
    </div>
  </section>
</template>

<style scoped>
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
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}
.pricing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(123, 47, 255, 0.1);
}
.pricing-card.featured {
  background: linear-gradient(135deg, #faf8ff, #f0faff);
  border-color: rgba(123, 47, 255, 0.3);
  box-shadow: 0 8px 40px rgba(123, 47, 255, 0.12);
}
.popular-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 5px 13px;
  border-radius: 100px;
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
  margin-bottom: 18px;
  letter-spacing: 1px;
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

  .popular-badge {
    top: 14px;
    right: 14px;
    letter-spacing: 1.2px;
  }

  .pricing-features {
    margin-bottom: 22px;
  }

  .pricing-features li {
    font-size: 15px;
    padding: 8px 0;
  }
}
</style>
