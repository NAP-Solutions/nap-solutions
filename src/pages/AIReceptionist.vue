<script setup>
import { ref } from 'vue'
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

function openBooking() {
  bookingOpen.value = true
}
function closeBooking() {
  bookingOpen.value = false
}
</script>

<template>
  <NavBar service="ai-receptionist" @open-booking="openBooking" />
  <main>
    <HeroSection service="ai-receptionist" @open-booking="openBooking" />
    <SocialProofBar service="ai-receptionist" />
    <ProblemSection service="ai-receptionist" />
    <CostSection service="ai-receptionist" />
    <SolutionSection service="ai-receptionist" />
    <HowItWorksSection service="ai-receptionist" />
    <PricingSection service="ai-receptionist" @open-booking="openBooking" />
    <FaqSection service="ai-receptionist" @open-booking="openBooking" />
    <CtaSection service="ai-receptionist" @open-booking="openBooking" />
    <ContactSection />
  </main>
  <SiteFooter service="ai-receptionist" @open-booking="openBooking" />
  <BookingModal :open="bookingOpen" @close="closeBooking" />
</template>
