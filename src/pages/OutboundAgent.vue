<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import SocialProofBar from '../components/SocialProofBar.vue'
import ProblemSection from '../components/ProblemSection.vue'
import CostSection from '../components/CostSection.vue'
import SolutionSection from '../components/SolutionSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import PricingSection from '../components/PricingSection.vue'
import FaqSection from '../components/FaqSection.vue'
import CtaSection from '../components/CtaSection.vue'
import ContactSection from '../components/ContactSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import BookingModal from '../components/BookingModal.vue'

const bookingOpen = ref(false)
const OUTBOUND_SCROLL_CLASS = 'outbound-agent-theme'

function openBooking() {
  bookingOpen.value = true
}
function closeBooking() {
  bookingOpen.value = false
}

onMounted(() => {
  document.body.classList.add(OUTBOUND_SCROLL_CLASS)
  document.documentElement.classList.add(OUTBOUND_SCROLL_CLASS)
})

onBeforeUnmount(() => {
  document.body.classList.remove(OUTBOUND_SCROLL_CLASS)
  document.documentElement.classList.remove(OUTBOUND_SCROLL_CLASS)
})
</script>

<template>
  <div class="outbound-page">
    <NavBar service="outbound-agent" @open-booking="openBooking" />
    <main>
      <HeroSection service="outbound-agent" @open-booking="openBooking" />
      <SocialProofBar service="outbound-agent" />
      <ProblemSection service="outbound-agent" />
      <CostSection service="outbound-agent" />
      <SolutionSection service="outbound-agent" />
      <HowItWorksSection service="outbound-agent" />
      <PricingSection service="outbound-agent" @open-booking="openBooking" />
      <FaqSection service="outbound-agent" @open-booking="openBooking" />
      <CtaSection service="outbound-agent" @open-booking="openBooking" />
      <ContactSection />
    </main>
    <SiteFooter service="outbound-agent" @open-booking="openBooking" />
    <BookingModal :open="bookingOpen" @close="closeBooking" />
  </div>
</template>

<style scoped>
.outbound-page {
  --brand: #d8c4ff;
  --brand-strong: #c4a5ff;
  --brand-soft: #f3ecff;
  --brand-rgb: 216, 196, 255;

  --accent: #b48bff;
  --accent-strong: #a273ff;
  --accent-ink: #6f42c1;
  --accent-ink-text: #8358d6;
  --accent-ink-rgb: 111, 66, 193;
  --accent-rgb: 180, 139, 255;

  --surface-tint: #faf7ff;
  --surface-alt: #f3ecff;
  --surface-base: #fdfbff;
  --heading-gradient: linear-gradient(to top, #4b2c84 38%, #b48bff 100%);
}

:global(html.outbound-agent-theme),
:global(body.outbound-agent-theme) {
  --brand-rgb: 180, 139, 255;
}
</style>
