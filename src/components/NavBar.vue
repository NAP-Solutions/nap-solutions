<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logoImg from '../assets/NAP-BLACK-BOX-LOGO-WHITE.png'
import { useScrollToSection } from '../composables/useScrollToSection'

const props = defineProps({
  minimal: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['open-booking'])

const mobileOpen = ref(false)
const scrolled   = ref(false)
let scrollRaf = 0
const router = useRouter()
const { scrollToSection } = useScrollToSection()

function toggleMobileMenu() { mobileOpen.value = !mobileOpen.value }
function closeMobileMenu()  { mobileOpen.value = false }

function onKeydown(e) { if (e.key === 'Escape') closeMobileMenu() }
function onResize()   { if (window.innerWidth > 960) closeMobileMenu() }
function onScroll() {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = 0
    const next = window.scrollY > 40
    if (next !== scrolled.value) {
      scrolled.value = next
    }
  })
}
function goTo(hash, e) {
  const target = document.querySelector(hash)
  if (target) {
    scrollToSection(hash, e)
  } else {
    if (e) e.preventDefault()
    const normalizedHash = hash.startsWith('#') ? hash : `#${hash}`
    router.push(`/ai-receptionist${normalizedHash}`)
  }
  closeMobileMenu()
}
function goToAIReceptionist() {
  router.push('/ai-receptionist')
  closeMobileMenu()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize',   onResize)
  window.addEventListener('scroll',   onScroll, { passive: true })
  onScroll() // sync on first render
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize',   onResize)
  window.removeEventListener('scroll',   onScroll)
  cancelAnimationFrame(scrollRaf)
  scrollRaf = 0
})
</script>

<template>
  <nav class="nav" :class="{ scrolled, 'mobile-open': mobileOpen }">
    <div class="nav-inner">
      <a class="nav-logo" href="#hero" @click.prevent="goTo('#hero', $event)">
        <img :src="logoImg" alt="NAP Solutions" class="nav-logo-img" />
        <span class="nav-wordmark">NAP SOLUTIONS</span>
      </a>

      <ul class="nav-links">
        <template v-if="props.minimal">
          <li>
            <button class="nav-cta btn-shine nav-link-btn" type="button" @click="goToAIReceptionist">
              AI Receptionist
            </button>
          </li>
          <li>
            <span
              class="nav-wip-wrap"
              tabindex="0"
              role="note"
              aria-label="Outbound Agent is a work in progress and coming soon."
            >
              <button class="nav-cta nav-cta-disabled nav-link-btn" type="button" disabled aria-disabled="true">
                Outbound Agent
              </button>
              <span class="nav-wip-tooltip" role="tooltip">Work in progress, coming soon.</span>
            </span>
          </li>
        </template>
        <template v-else>
          <li><a href="#problem" @click.prevent="goTo('#problem', $event)">The Problem</a></li>
          <li><a href="#solution" @click.prevent="goTo('#solution', $event)">The Solution</a></li>
          <li><a href="#how" @click.prevent="goTo('#how', $event)">How It Works</a></li>
          <li><a href="#pricing" @click.prevent="goTo('#pricing', $event)">Pricing</a></li>
          <li><a href="#faq" @click.prevent="goTo('#faq', $event)">FAQ</a></li>
          <li>
            <a href="#" class="nav-cta btn-shine" @click.prevent="$emit('open-booking')">
              Book a Demo
            </a>
          </li>
        </template>
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
      <template v-if="props.minimal">
        <button class="nav-mobile-cta btn-shine" type="button" @click="goToAIReceptionist">
          AI Receptionist
        </button>
        <span
          class="nav-wip-wrap nav-wip-wrap-mobile"
          tabindex="0"
          role="note"
          aria-label="Outbound Agent is a work in progress and coming soon."
        >
          <button class="nav-mobile-cta nav-mobile-cta-disabled" type="button" disabled aria-disabled="true">
            Outbound Agent
          </button>
          <span class="nav-wip-tooltip nav-wip-tooltip-mobile" role="tooltip">Work in progress, coming soon.</span>
        </span>
      </template>
      <template v-else>
        <a href="#problem" @click.prevent="goTo('#problem', $event)">The Problem</a>
        <a href="#solution" @click.prevent="goTo('#solution', $event)">The Solution</a>
        <a href="#how" @click.prevent="goTo('#how', $event)">How It Works</a>
        <a href="#pricing" @click.prevent="goTo('#pricing', $event)">Pricing</a>
        <a href="#faq" @click.prevent="goTo('#faq', $event)">FAQ</a>
        <button
          class="nav-mobile-cta btn-shine"
          type="button"
          @click="$emit('open-booking'); closeMobileMenu()"
        >
          Book a Demo
        </button>
      </template>
    </div>
  </nav>
</template>

<style scoped>
/* ── Floating pill container ──────────────────────────── */
.nav {
  position: fixed;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100vw - 24px);
  z-index: 100;
  isolation: isolate;
  border-radius: 22px;
  border: 1px solid transparent;
  background: transparent;
  overflow: visible;
  transition:
    background   0.3s ease,
    border-color 0.3s ease,
    box-shadow   0.3s ease;
  box-shadow: none;
}

.nav::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.16) 42%, rgba(255, 255, 255, 0.46) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  pointer-events: none;
  z-index: -1;
  background: radial-gradient(140% 120% at 16% -18%, rgba(var(--brand-rgb), 0.28) 0%, rgba(255, 255, 255, 0) 52%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Glass state — triggered once the user scrolls */
.nav.scrolled {
  background: linear-gradient(145deg, rgba(var(--accent-rgb), 0.26) 0%, rgba(var(--brand-rgb), 0.2) 48%, rgba(255, 255, 255, 0.62) 100%);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
  border-color: rgba(255, 255, 255, 0.84);
  box-shadow:
    0 10px 28px rgba(var(--brand-rgb), 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.84),
    inset 0 -8px 16px rgba(255, 255, 255, 0.16);
}

.nav.scrolled::before {
  opacity: 0.82;
}

.nav.scrolled::after {
  opacity: 0.62;
}

/* ── Inner row ────────────────────────────────────────── */
.nav-inner {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 0 10px 0 18px;
  min-height: 62px;
}

/* ── Logo ─────────────────────────────────────────────── */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: 12px;
  flex-shrink: 0;
}
.nav-logo-img {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  object-fit: cover;
}
.nav-wordmark {
  display: inline-flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 15px;
  line-height: 1;
  letter-spacing: 0.18em;
  white-space: nowrap;
  color: #000;
}

/* ── Desktop links ────────────────────────────────────── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0 12px 0 auto;
  min-width: 0;
}
.nav-links a {
  display: inline-flex;
  align-items: center;
  color: var(--text-body);
  text-decoration: none;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1;
  padding: 6px 12px;
  border-radius: 10px;
  transition: color 0.18s, background 0.18s;
  white-space: nowrap;
}
.nav-links a:hover {
  color: var(--text-main);
  background: rgba(var(--brand-rgb), 0.06);
}

/* ── CTA button ───────────────────────────────────────── */
.nav-cta {
  background: linear-gradient(145deg, rgba(var(--accent-rgb), 0.44) 0%, rgba(var(--brand-rgb), 0.34) 48%, rgba(255, 255, 255, 0.4) 100%) !important;
  color: #000 !important;
  border: 1px solid rgba(255, 255, 255, 0.72);
  padding: 10px 22px;
  border-radius: 12px;
  font-weight: 700 !important;
  font-size: 14.5px !important;
  line-height: 1;
  white-space: nowrap;
  box-shadow:
    0 8px 20px rgba(var(--brand-rgb), 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    inset 0 -8px 14px rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px) saturate(140%);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  transition: opacity 0.18s, transform 0.18s, box-shadow 0.18s, border-color 0.18s !important;
}
.nav-cta:hover {
  opacity: 0.96;
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 10px 24px rgba(var(--brand-rgb), 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    inset 0 -8px 14px rgba(255, 255, 255, 0.24) !important;
}
.nav-link-btn {
  border: 0;
  cursor: pointer;
}
.nav-cta-disabled {
  background: linear-gradient(160deg, rgba(176, 183, 196, 0.36) 0%, rgba(149, 157, 171, 0.32) 52%, rgba(236, 240, 246, 0.38) 100%) !important;
  border-color: rgba(245, 248, 255, 0.62) !important;
  color: rgba(72, 79, 91, 0.92) !important;
  box-shadow:
    0 8px 18px rgba(96, 106, 123, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    inset 0 -8px 14px rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(10px) saturate(116%);
  -webkit-backdrop-filter: blur(10px) saturate(116%);
  opacity: 1 !important;
  cursor: not-allowed !important;
}
.nav-cta-disabled:hover {
  transform: none;
  border-color: rgba(245, 248, 255, 0.62) !important;
}

/* ── Hamburger ────────────────────────────────────────── */
.nav-toggle {
  display: none;
  border: 1px solid rgba(10, 15, 30, 0.14);
  border-radius: 10px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
  cursor: pointer;
  flex-shrink: 0;
}
.nav-toggle span {
  width: 17px;
  height: 2px;
  border-radius: 2px;
  background: var(--text-main);
  transition: opacity 0.18s;
}

/* ── Mobile dropdown ──────────────────────────────────── */
.mobile-menu {
  display: none;
}
.nav-mobile-cta {
  background: linear-gradient(145deg, rgba(var(--accent-rgb), 0.42) 0%, rgba(var(--brand-rgb), 0.32) 50%, rgba(255, 255, 255, 0.38) 100%);
  color: #000;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 16px;
  cursor: pointer;
  box-shadow:
    0 8px 18px rgba(var(--brand-rgb), 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.84);
  backdrop-filter: blur(9px) saturate(140%);
  -webkit-backdrop-filter: blur(9px) saturate(140%);
}
.nav-mobile-cta-disabled {
  background: linear-gradient(160deg, rgba(176, 183, 196, 0.36) 0%, rgba(149, 157, 171, 0.32) 52%, rgba(236, 240, 246, 0.38) 100%);
  border-color: rgba(245, 248, 255, 0.62);
  color: rgba(72, 79, 91, 0.92);
  box-shadow:
    0 8px 18px rgba(96, 106, 123, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    inset 0 -8px 14px rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px) saturate(116%);
  -webkit-backdrop-filter: blur(10px) saturate(116%);
  opacity: 1;
  cursor: not-allowed;
}
.nav-wip-wrap {
  position: relative;
  display: inline-flex;
}
.nav-wip-wrap-mobile {
  width: 100%;
}
.nav-wip-tooltip {
  position: absolute;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%) translateY(4px);
  background: rgba(12, 16, 24, 0.94);
  color: #f4f7ff;
  font-size: 12px;
  line-height: 1.25;
  white-space: nowrap;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 20;
}
.nav-wip-tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-bottom-color: rgba(12, 16, 24, 0.94);
}
.nav-wip-wrap:hover .nav-wip-tooltip,
.nav-wip-wrap:focus-visible .nav-wip-tooltip,
.nav-wip-wrap:focus-within .nav-wip-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.nav-wip-tooltip-mobile {
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  transform: translateY(4px);
  text-align: center;
  white-space: normal;
}
.nav-wip-tooltip-mobile::after {
  bottom: 100%;
  left: 24px;
  transform: none;
}
.nav-wip-wrap-mobile:hover .nav-wip-tooltip-mobile,
.nav-wip-wrap-mobile:focus-visible .nav-wip-tooltip-mobile,
.nav-wip-wrap-mobile:focus-within .nav-wip-tooltip-mobile {
  transform: translateY(0);
}

/* ── Responsive: tablet / mobile ─────────────────────── */
@media (max-width: 1200px) and (min-width: 961px) {
  .nav-inner {
    min-height: 58px;
    padding: 0 8px 0 14px;
    gap: 6px;
  }
  .nav-logo {
    gap: 8px;
    margin-right: 6px;
  }
  .nav-logo-img {
    width: 33px;
    height: 33px;
  }
  .nav-wordmark {
    font-size: 13px;
    letter-spacing: 0.12em;
  }
  .nav-links {
    gap: 2px;
    margin-right: 6px;
  }
  .nav-links a {
    font-size: 13px;
    padding: 6px 8px;
  }
  .nav-cta {
    font-size: 13px !important;
    padding: 9px 14px;
  }
}

@media (max-width: 960px) {
  /* On mobile the pill stretches edge-to-edge with a gap */
  .nav {
    left: 14px;
    right: 14px;
    top: 12px;
    transform: none;
    border-radius: 18px;
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
  .nav.scrolled {
    background: linear-gradient(145deg, rgba(var(--accent-rgb), 0.26) 0%, rgba(var(--brand-rgb), 0.2) 48%, rgba(255, 255, 255, 0.64) 100%);
    border-color: rgba(255, 255, 255, 0.88);
    box-shadow:
      0 8px 24px rgba(var(--brand-rgb), 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.84),
      inset 0 -7px 14px rgba(255, 255, 255, 0.14);
  }
  .nav-inner {
    min-height: 60px;
    padding: 0 10px 0 14px;
    justify-content: space-between;
  }
  .nav-links { display: none; }
  .nav-wordmark { font-size: 13px; letter-spacing: 0.14em; }
  .nav-toggle { display: inline-flex; }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    padding: 0 14px;
    border-radius: 16px;
    border: 1px solid rgba(10, 15, 30, 0.08);
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transform-origin: top center;
    transform: scale(0.97) translateY(-6px);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    pointer-events: none;
    transition:
      transform 0.22s ease,
      opacity   0.22s ease,
      max-height 0.28s ease,
      padding   0.22s ease;
  }
  .mobile-menu.open {
    gap: 2px;
    padding: 8px 14px 14px;
    transform: scale(1) translateY(0);
    opacity: 1;
    max-height: 80vh;
    overflow-y: auto;
    pointer-events: auto;
  }
  .mobile-menu a {
    text-decoration: none;
    color: var(--text-body);
    font-size: 15px;
    font-weight: 500;
    padding: 0 4px;
    min-height: 46px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(10, 15, 30, 0.05);
  }
  .mobile-menu a:last-of-type {
    border-bottom: none;
  }
}

@media (max-width: 640px) {
  .nav-wordmark { font-size: 12px; letter-spacing: 0.1em; }
  .nav-logo { gap: 8px; }
  .nav-logo-img { width: 32px; height: 32px; }
  .nav-inner { min-height: 56px; }
}

@media (max-width: 390px) {
  .nav-wordmark { display: none; }
}
</style>

