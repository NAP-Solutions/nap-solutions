<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import SiteFooter from '../components/SiteFooter.vue'
import BookingModal from '../components/BookingModal.vue'

const bookingOpen = ref(false)
const HOME_SCROLL_CLASS = 'home-page-theme'

function openBooking() {
  bookingOpen.value = true
}
function closeBooking() {
  bookingOpen.value = false
}

onMounted(() => {
  document.body.classList.add(HOME_SCROLL_CLASS)
  document.documentElement.classList.add(HOME_SCROLL_CLASS)
})

onBeforeUnmount(() => {
  document.body.classList.remove(HOME_SCROLL_CLASS)
  document.documentElement.classList.remove(HOME_SCROLL_CLASS)
})
</script>

<template>
  <NavBar minimal @open-booking="openBooking" />
  <main>
    <HeroSection minimal @open-booking="openBooking" />
  </main>
  <SiteFooter minimal @open-booking="openBooking" />
  <BookingModal :open="bookingOpen" @close="closeBooking" />
</template>

<style scoped>
:global(html.home-page-theme),
:global(body.home-page-theme) {
  --brand-rgb: 0, 212, 192;
}
</style>
