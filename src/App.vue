<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import SocialProofBar from './components/SocialProofBar.vue'
import ProblemSection from './components/ProblemSection.vue'
import CostSection from './components/CostSection.vue'
import SolutionSection from './components/SolutionSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import PricingSection from './components/PricingSection.vue'
import FaqSection from './components/FaqSection.vue'
import CtaSection from './components/CtaSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import BookingModal from './components/BookingModal.vue'

const bookingOpen = ref(false)

function openBooking() {
  bookingOpen.value = true
}
function closeBooking() {
  bookingOpen.value = false
}
</script>

<template>
  <NavBar @open-booking="openBooking" />
  <main>
    <HeroSection @open-booking="openBooking" />
    <SocialProofBar />
    <ProblemSection />
    <CostSection />
    <SolutionSection />
    <HowItWorksSection />
    <PricingSection @open-booking="openBooking" />
    <FaqSection @open-booking="openBooking" />
    <CtaSection @open-booking="openBooking" />
    <ContactSection />
  </main>
  <SiteFooter @open-booking="openBooking" />
  <BookingModal :open="bookingOpen" @close="closeBooking" />
</template>
