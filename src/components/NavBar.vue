<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoImg from '../assets/logo.png'

defineEmits(['open-booking'])

const mobileOpen = ref(false)

function toggleMobileMenu() {
  mobileOpen.value = !mobileOpen.value
}

function closeMobileMenu() {
  mobileOpen.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    closeMobileMenu()
  }
}

function onResize() {
  if (window.innerWidth > 960) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <nav class="nav">
    <div class="nav-inner">
      <a class="nav-logo" href="#" @click="closeMobileMenu">
        <img :src="logoImg" alt="NAP Solutions" class="nav-logo-img" />
        <span class="nav-wordmark">NAP SOLUTIONS</span>
      </a>

      <ul class="nav-links">
        <li><a href="#problem">The Problem</a></li>
        <li><a href="#solution">The Solutions</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li>
          <a href="#" class="nav-cta" @click.prevent="$emit('open-booking')">
            Book a Demo
          </a>
        </li>
      </ul>

      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="mobile-nav" class="mobile-menu" :class="{ open: mobileOpen }">
      <a href="#problem" @click="closeMobileMenu">The Problem</a>
      <a href="#solution" @click="closeMobileMenu">The Solutions</a>
      <a href="#how" @click="closeMobileMenu">How It Works</a>
      <a href="#pricing" @click="closeMobileMenu">Pricing</a>
      <a href="#faq" @click="closeMobileMenu">FAQ</a>
      <button
        class="nav-mobile-cta"
        type="button"
        @click="$emit('open-booking'); closeMobileMenu()"
      >
        Book a Demo
      </button>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(10, 15, 30, 0.08);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.06);
  padding-top: env(safe-area-inset-top);
  overflow: visible;
}
.nav::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: calc(env(safe-area-inset-top) * -1);
  height: env(safe-area-inset-top);
  background: rgba(255, 255, 255, 0.92);
  pointer-events: none;
}
.nav-inner {
  width: min(var(--content-max), calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  min-width: 0;
}
.nav-logo-img {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: cover;
}
.nav-wordmark {
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 16px;
  letter-spacing: 0.24em;
  white-space: nowrap;
  background: linear-gradient(90deg, #0a0f1e 0%, #7B2FFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}
.nav-links a {
  color: #4a5580;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s, opacity 0.2s;
}
.nav-links a:hover {
  color: #0a0f1e;
}
.nav-cta {
  background: linear-gradient(135deg, #7B2FFF, #00D4C0) !important;
  color: #fff !important;
  padding: 11px 26px;
  border-radius: 9px;
  font-weight: 700 !important;
  font-size: 16px !important;
  box-shadow: 0 4px 15px rgba(123, 47, 255, 0.3);
  transition: all 0.2s !important;
}
.nav-cta:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(123, 47, 255, 0.4) !important;
}
.nav-toggle {
  display: none;
  border: 1px solid rgba(10, 15, 30, 0.12);
  border-radius: 10px;
  width: 42px;
  height: 42px;
  background: #fff;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
  cursor: pointer;
}
.nav-toggle span {
  width: 18px;
  height: 2px;
  border-radius: 2px;
  background: #0a0f1e;
}
.mobile-menu {
  display: none;
}
.nav-mobile-cta {
  background: linear-gradient(135deg, #7B2FFF, #00D4C0);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 16px;
}

@media (max-width: 960px) {
  .nav-inner {
    min-height: 68px;
  }
  .nav-links {
    display: none;
  }
  .nav-wordmark {
    font-size: 14px;
    letter-spacing: 0.18em;
  }
  .nav-toggle {
    display: inline-flex;
  }
  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 0 var(--gutter);
    border-top: 1px solid transparent;
    background: rgba(255, 255, 255, 0.98);
    transform-origin: top;
    transform: translateY(-8px);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    pointer-events: none;
    transition: transform 0.2s ease, opacity 0.2s ease, max-height 0.25s ease, padding 0.2s ease, border-color 0.2s ease;
  }
  .mobile-menu.open {
    gap: 14px;
    padding: 8px var(--gutter) 16px;
    border-top-color: rgba(10, 15, 30, 0.08);
    transform: translateY(0);
    opacity: 1;
    max-height: calc(100vh - 68px - env(safe-area-inset-top));
    overflow-y: auto;
    pointer-events: auto;
  }
  .mobile-menu a {
    text-decoration: none;
    color: #4a5580;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    padding: 4px 2px;
  }
}

@media (max-width: 640px) {
  .nav-wordmark {
    font-size: 12px;
    letter-spacing: 0.12em;
  }

  .nav-logo {
    gap: 9px;
  }

  .nav-logo-img {
    width: 34px;
    height: 34px;
  }

  .nav-inner {
    min-height: 64px;
  }

  .mobile-menu {
    max-height: calc(100vh - 64px - env(safe-area-inset-top));
  }
}

@media (max-width: 390px) {
  .nav-wordmark {
    display: none;
  }
}
</style>
