<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Check } from 'lucide-vue-next'
import { gsap } from 'gsap'
import HeroCanvas from './HeroCanvas.vue'
import { createSplitTextAnimation } from '../composables/useSplitTextAnimation'
import { useScrollToSection } from '../composables/useScrollToSection'

const props = defineProps({
  minimal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['open-booking'])

const revealed = ref(false)
const headingRef = ref(null)
const subRef = ref(null)
const actionsRef = ref(null)
const trustRef = ref(null)
const router = useRouter()
const { scrollToSection } = useScrollToSection()

const HERO_TITLE_START = 'Never miss'
const HERO_TITLE_END = 'again.'
const CYCLE_DELAY_MS = 2200
const CYCLE_MIN_DURATION = 0.22
const CYCLE_DURATION_PER_CHAR = 0.055
const SAFETY_REVEAL_MS = 3000

const titleLayers = [
  { className: 'hero-title-layer hero-title-layer--stroke', ariaHidden: true },
  { className: 'hero-title-layer hero-title-layer--stroke-shine', ariaHidden: true },
  { className: 'hero-title-layer hero-title-layer--fill', ariaHidden: false },
]

const cycleWords = ['call', 'lead', 'booking', 'client']
const trustItems = ['Setup included', 'Cancel anytime']

let cycleIdx = 0
let cycleTimer = 0
let cycleTween = null
const cycleWord = ref(cycleWords[0])

let safetyTimer = 0
let heroTimeline = null
let cleanupHeroSplit = () => {}

function clearSafetyTimer() {
  if (!safetyTimer) return
  clearTimeout(safetyTimer)
  safetyTimer = 0
}

function clearCycleTimer() {
  if (!cycleTimer) return
  clearTimeout(cycleTimer)
  cycleTimer = 0
}

function stopCycleAnimation() {
  clearCycleTimer()
  cycleTween?.kill()
  cycleTween = null
}

function cleanupHeroAnimation() {
  heroTimeline?.kill()
  heroTimeline = null
  cleanupHeroSplit()
  cleanupHeroSplit = () => {}
  stopCycleAnimation()
}

function animateCycleWord(nextWord, onDone) {
  const currentWord = cycleWord.value
  cycleTween?.kill()

  const erase = { count: currentWord.length }
  const type = { count: 0 }

  cycleTween = gsap
    .timeline({
      onComplete: () => {
        cycleTween = null
        onDone?.()
      },
    })
    .to(erase, {
      duration: 0.18,
      count: 0,
      ease: 'sine.out',
      onUpdate: () => {
        cycleWord.value = currentWord.slice(0, Math.max(0, Math.round(erase.count)))
      },
    })
    .to(type, {
      duration: Math.max(CYCLE_MIN_DURATION, nextWord.length * CYCLE_DURATION_PER_CHAR),
      count: nextWord.length,
      ease: 'sine.out',
      onUpdate: () => {
        cycleWord.value = nextWord.slice(0, Math.max(0, Math.round(type.count)))
      },
    })
}

function scheduleCycle() {
  clearCycleTimer()
  cycleTimer = window.setTimeout(() => {
    cycleIdx = (cycleIdx + 1) % cycleWords.length
    animateCycleWord(cycleWords[cycleIdx], scheduleCycle)
  }, CYCLE_DELAY_MS)
}

function revealHero() {
  if (revealed.value) return
  revealed.value = true
  clearSafetyTimer()
}

function onIntroDone() {
  revealHero()
}

function playHeroAnimation() {
  if (!headingRef.value || !subRef.value || !actionsRef.value) return
  if (!props.minimal && !trustRef.value) return

  cleanupHeroAnimation()

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const revealTargets = [headingRef.value, subRef.value, actionsRef.value, trustRef.value].filter(Boolean)

  if (shouldReduceMotion) {
    gsap.set(revealTargets, { clearProps: 'all' })
    return
  }

  gsap.set([headingRef.value, actionsRef.value, trustRef.value].filter(Boolean), { autoAlpha: 0, y: 18 })
  gsap.set(subRef.value, { opacity: 1 })

  const splitControl = createSplitTextAnimation(subRef.value, {
    type: 'words, lines',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        autoAlpha: 0,
        y: 22,
        duration: 0.8,
        stagger: { amount: 0.6 },
        ease: 'power2.out',
      })
    },
  })

  heroTimeline = gsap
    .timeline()
    .to(headingRef.value, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
    })

  if (splitControl.animation) {
    heroTimeline.add(splitControl.animation, '-=0.1')
  }

  heroTimeline
    .to(
      actionsRef.value,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=0.2'
    )
  if (!props.minimal && trustRef.value) {
    heroTimeline
      .to(
        trustRef.value,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.22'
      )
      .call(scheduleCycle)
  }

  cleanupHeroSplit = splitControl.destroy
}

onMounted(() => {
  if (props.minimal) {
    revealHero()
    return
  }
  safetyTimer = window.setTimeout(revealHero, SAFETY_REVEAL_MS)
})

watch(revealed, async (isRevealed, wasRevealed) => {
  if (!isRevealed || wasRevealed) return
  await nextTick()
  playHeroAnimation()
})

onBeforeUnmount(() => {
  clearSafetyTimer()
  cleanupHeroAnimation()
})

function scrollToHow() {
  const target = document.querySelector('#how')
  if (target) {
    scrollToSection('how')
    return
  }
  router.push('/ai-receptionist#how')
}

function goToAIReceptionist() {
  router.push('/ai-receptionist')
}

function trackLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead')
  }
}
</script>

<template>
  <section id="hero" class="hero" :class="{ 'hero--intro': !revealed }">
    <HeroCanvas
      :intro="!props.minimal"
      :palette-variant="props.minimal ? 'home' : 'ai-receptionist'"
      @intro-done="onIntroDone"
    />
    <div class="hero-scrim"></div>
    <div class="hero-edge-fade hero-edge-fade--bottom" aria-hidden="true"></div>

    <div v-if="revealed" class="hero-inner section-inner">
      <div class="hero-content">
        <h1 ref="headingRef" class="hero-title-stack">
          <template v-if="props.minimal">
            <span class="hero-title-simple-layer hero-title-simple-layer--stroke" aria-hidden="true">
              NAP Solutions
            </span>
            <span class="hero-title-simple-layer hero-title-simple-layer--fill">
              NAP Solutions
            </span>
          </template>
          <template v-else>
            <span
              v-for="layer in titleLayers"
              :key="layer.className"
              :class="layer.className"
              :aria-hidden="layer.ariaHidden ? 'true' : null"
            >
              <span class="h1-light">{{ HERO_TITLE_START }}</span>
              <span class="h1-grad">a <span class="cycle-word">{{ cycleWord }}</span> {{ HERO_TITLE_END }}</span>
            </span>
          </template>
        </h1>

        <p ref="subRef" class="hero-sub">
          <template v-if="props.minimal">
            Providing AI integrations for your business.
          </template>
          <template v-else>
            Your AI receptionist answers every call, books appointments, and
            handles your front desk - around the clock, at a <span class="hero-sub-fraction-break">fraction of the cost.</span>
          </template>
        </p>

        <div ref="actionsRef" class="hero-actions">
          <template v-if="props.minimal">
            <button class="btn-primary btn-shine" @click="goToAIReceptionist">
              AI Receptionist
            </button>
            <span
              class="wip-button-wrap"
              tabindex="0"
              role="note"
              aria-label="Outbound Agent is a work in progress and coming soon."
            >
              <button class="btn-primary btn-disabled btn-wip" type="button" disabled aria-disabled="true">
                Outbound Agent
              </button>
              <span class="wip-hangtag" aria-hidden="true">Construction</span>
              <span class="wip-tooltip" role="tooltip">Work in progress, coming soon.</span>
            </span>
          </template>
          <template v-else>
            <button class="btn-primary btn-shine" @click="trackLead(); emit('open-booking')">
              Book a Free Demo
            </button>
            <button class="btn-primary btn-shine" @click="scrollToHow">
              See how it works &rarr;
            </button>
          </template>
        </div>

        <div v-if="!props.minimal" ref="trustRef" class="hero-trust">
          <div v-for="item in trustItems" :key="item" class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: clamp(6rem, 10vh, 8rem);
  position: relative;
  overflow: hidden;
  background: var(--surface-tint);
}

.hero::before {
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

.hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.hero-edge-fade {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  height: clamp(56px, 9vw, 132px);
  pointer-events: none;
}

.hero-edge-fade--bottom {
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(244, 248, 255, 0) 0%,
    rgba(248, 251, 255, 0.74) 60%,
    #fff 100%
  );
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 3;
}

.hero-content {
  position: relative;
  max-width: 680px;
}

.hero-title-stack {
  --hero-stroke-color: #fff;
  --hero-stroke-width: clamp(2.0px, 0.03em, 2.1px);
  --hero-fill-color: #07090f;
  font-size: clamp(2.6rem, 6.2vw, 5.4rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.03em;
  margin-bottom: 22px;
  text-wrap: balance;
  position: relative;
}

.hero-title-layer {
  display: block;
}

.hero-title-layer--stroke {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: var(--hero-stroke-width) var(--hero-stroke-color);
  paint-order: stroke fill;
  text-shadow: none;
  filter: none;
}

.hero-title-layer--fill {
  position: relative;
  z-index: 2;
}

.hero-title-simple-layer {
  display: block;
}

.hero-title-simple-layer--stroke {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: var(--hero-stroke-width) var(--hero-stroke-color);
  paint-order: stroke fill;
}

.hero-title-simple-layer--fill {
  position: relative;
  z-index: 2;
  -webkit-text-fill-color: var(--hero-fill-color);
  color: var(--hero-fill-color);
}

.hero-title-layer--stroke-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: var(--hero-stroke-width) rgba(var(--brand-rgb), 0.76);
  paint-order: stroke fill;
  text-shadow: 0 0 1px rgba(var(--brand-rgb), 0.18);
  filter: none;
  opacity: 1;
  -webkit-mask-image: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.94) 50%,
    transparent 62%
  );
  mask-image: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.94) 50%,
    transparent 62%
  );
  -webkit-mask-size: 220% 100%;
  mask-size: 220% 100%;
  -webkit-mask-position: -120% 0%;
  mask-position: -120% 0%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  animation: hero-shine-sweep 9s infinite linear;
  will-change: -webkit-mask-position, mask-position;
}

.h1-light {
  display: block;
  color: var(--text-main);
}

.h1-grad {
  display: block;
  padding-bottom: 0.12em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.hero-title-layer--stroke .h1-light,
.hero-title-layer--stroke .h1-grad,
.hero-title-layer--stroke-shine .h1-light,
.hero-title-layer--stroke-shine .h1-grad {
  color: transparent;
  background: none;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-text-fill-color: transparent;
  mix-blend-mode: normal;
  text-shadow: none;
  filter: none;
}

.hero-title-layer--fill .h1-light,
.hero-title-layer--fill .h1-grad {
  -webkit-text-stroke: 0;
  background: none;
  -webkit-text-fill-color: var(--hero-fill-color);
  color: var(--hero-fill-color);
  mix-blend-mode: normal;
  filter: none;
  text-shadow: none;
}

@keyframes hero-shine-sweep {
  0% {
    -webkit-mask-position: -120% 0%;
    mask-position: -120% 0%;
  }
  100% {
    -webkit-mask-position: 120% 0%;
    mask-position: 120% 0%;
  }
}

.hero-sub {
  font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.2rem);
  line-height: 1.78;
  color: var(--text-main);
  max-width: 56ch;
  margin-bottom: 36px;
  text-wrap: pretty;
}

.hero-sub-fraction-break {
  display: inline;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.btn-disabled {
  background: linear-gradient(160deg, rgba(176, 183, 196, 0.38) 0%, rgba(149, 157, 171, 0.34) 52%, rgba(235, 239, 246, 0.4) 100%) !important;
  border-color: rgba(245, 248, 255, 0.62) !important;
  color: rgba(72, 79, 91, 0.92) !important;
  box-shadow:
    0 8px 18px rgba(96, 106, 123, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    inset 0 -8px 14px rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(12px) saturate(118%);
  -webkit-backdrop-filter: blur(12px) saturate(118%);
  opacity: 1 !important;
  cursor: not-allowed !important;
  pointer-events: none;
}

.btn-wip {
  position: relative;
}

.btn-wip::after {
  content: '';
  position: absolute;
  top: 2px;
  left: -8%;
  width: 116%;
  height: 7px;
  transform: rotate(-6deg);
  transform-origin: center;
  border-radius: 999px;
  background: repeating-linear-gradient(
    -45deg,
    #ffea00 0 8px,
    #111 8px 12px,
    #ff9b00 12px 20px,
    #111 20px 24px
  );
  opacity: 0.98;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(255, 165, 0, 0.32);
  pointer-events: none;
}

.wip-button-wrap {
  position: relative;
  display: inline-flex;
}

.wip-hangtag {
  position: absolute;
  top: calc(100% + 4.5px);
  right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  padding: 2px 8px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  background: linear-gradient(180deg, #ffd84a 0%, #ffbf00 100%);
  color: #111;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform: rotate(3deg);
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.wip-hangtag::before,
.wip-hangtag::after {
  content: '';
  position: absolute;
  bottom: 100%;
  width: 1.5px;
  height: 8px;
  background: linear-gradient(180deg, rgba(70, 70, 70, 0.92) 0%, rgba(20, 20, 20, 0.7) 100%);
}

.wip-hangtag::before {
  left: 9px;
}

.wip-hangtag::after {
  right: 9px;
}

.wip-tooltip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
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
  z-index: 12;
}

.wip-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(12, 16, 24, 0.94);
}

.wip-button-wrap:hover .wip-tooltip,
.wip-button-wrap:focus-visible .wip-tooltip,
.wip-button-wrap:focus-within .wip-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}


.hero-trust {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-main);
}

.trust-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--text-main);
  border: 1px solid var(--text-main);
  display: grid;
  place-items: center;
  line-height: 0;
  flex-shrink: 0;
  color: #ffffff;
}

.trust-check :deep(svg) {
  display: block;
  width: 10px;
  height: 10px;
  stroke-width: 5;
}

@media (max-width: 960px) {
  .hero {
    min-height: 86svh;
    padding-block: 6rem 4rem;
    transition: min-height 0.55s ease;
  }

  .hero--intro {
    min-height: 100svh;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 100svh;
    padding-block: 0;
  }

  .hero-inner {
    min-height: 100svh;
    align-items: center;
    justify-content: center;
  }

  .hero-content {
    width: min(100%, 36rem);
    margin-inline: auto;
  }

  .hero-title-stack {
    text-align: center;
  }

  .hero-sub {
    text-align: left;
    width: fit-content;
    max-width: min(100%, 33ch);
    margin-inline: auto;
  }

  .hero-sub-fraction-break {
    display: block;
  }

  .hero-title-stack {
    font-size: clamp(2.78rem, 10.9vw, 3.42rem);
    line-height: 1.02;
  }

  .hero-title-stack .h1-light {
    font-size: 1.35em;
  }
}

@media (max-width: 520px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    align-self: center;
    gap: 12px;
  }
  .hero-actions .btn-primary {
    width: min(100%, 340px);
    display: grid;
    place-items: center;
    height: 52px;
    min-height: 52px;
    padding: 0 20px !important;
    margin-inline: auto;
    line-height: 1;
    text-align: center;
    border-bottom-width: 1px;
  }

  .hero-actions .wip-button-wrap {
    width: min(100%, 340px);
    display: grid;
    place-items: center;
    margin-inline: auto;
  }

  .hero-actions .wip-button-wrap .btn-primary {
    width: 100%;
  }

  .hero-trust {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-self: center;
    width: 100%;
    gap: 14px;
  }

  .trust-item {
    min-height: 20px;
    line-height: 1.2;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-block: 5.5rem 3.5rem;
  }
}

@media (max-width: 768px) {
  .hero-title-layer--stroke-shine {
    animation: none;
    opacity: 0.32;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero {
    transition: none;
  }

  .hero-title-layer--stroke-shine {
    animation: none;
    opacity: 0.26;
  }
}
</style>

