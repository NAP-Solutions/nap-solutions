<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
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
  <NavBar minimal @open-booking="openBooking" />
  <main>
    <HeroSection minimal @open-booking="openBooking" />
  </main>
  <SiteFooter minimal @open-booking="openBooking" />
  <BookingModal :open="bookingOpen" @close="closeBooking" />
</template>
