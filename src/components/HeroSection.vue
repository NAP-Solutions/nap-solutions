<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { Check } from 'lucide-vue-next'
import { gsap } from 'gsap'
import HeroCanvas from './HeroCanvas.vue'
import { createSplitTextAnimation } from '../composables/useSplitTextAnimation'
import { useScrollToSection } from '../composables/useScrollToSection'

defineEmits(['open-booking'])

const revealed = ref(false)
const headingRef = ref(null)
const subRef = ref(null)
const actionsRef = ref(null)
const trustRef = ref(null)
const { scrollToSection } = useScrollToSection()

const cycleWords = ['call', 'lead', 'booking', 'client']
let cycleIdx = 0
let cycleTimer = null
let cycleTween = null
const cycleWord = ref(cycleWords[0])

let safetyTimer = null
let heroTimeline = null
let cleanupHeroSplit = () => {}

function animateCycleWord(nextWord, onDone) {
  const currentWord = cycleWord.value
  cycleTween?.kill()

  const erase = { count: currentWord.length }
  const type = { count: 0 }

  cycleTween = gsap.timeline({
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
      duration: Math.max(0.22, nextWord.length * 0.055),
      count: nextWord.length,
      ease: 'sine.out',
      onUpdate: () => {
        cycleWord.value = nextWord.slice(0, Math.max(0, Math.round(type.count)))
      },
    })
}

function scheduleCycle() {
  cycleTimer = setTimeout(() => {
    cycleIdx = (cycleIdx + 1) % cycleWords.length
    animateCycleWord(cycleWords[cycleIdx], scheduleCycle)
  }, 2200)
}

function onIntroDone() {
  revealed.value = true
  if (safetyTimer) clearTimeout(safetyTimer)
}

function playHeroAnimation() {
  if (!headingRef.value || !subRef.value || !actionsRef.value || !trustRef.value) return

  cleanupHeroSplit()
  heroTimeline?.kill()

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (shouldReduceMotion) {
    gsap.set([headingRef.value, subRef.value, actionsRef.value, trustRef.value], { clearProps: 'all' })
    return
  }

  gsap.set([headingRef.value, actionsRef.value, trustRef.value], { autoAlpha: 0, y: 18 })
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

  heroTimeline = gsap.timeline()
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

  cleanupHeroSplit = splitControl.destroy
}

onMounted(() => {
  safetyTimer = setTimeout(() => { revealed.value = true }, 3000)
})

watch(revealed, async (isRevealed) => {
  if (!isRevealed) return
  await nextTick()
  playHeroAnimation()
})

onBeforeUnmount(() => {
  if (safetyTimer) clearTimeout(safetyTimer)
  if (cycleTimer) clearTimeout(cycleTimer)
  cycleTween?.kill()
  heroTimeline?.kill()
  cleanupHeroSplit()
})

function scrollToHow() {
  scrollToSection('how')
}
</script>

<template>
  <section id="hero" class="hero" :class="{ 'hero--intro': !revealed }">
    <HeroCanvas @intro-done="onIntroDone" />
    <div class="hero-scrim"></div>

    <div v-if="revealed" class="hero-inner section-inner">
      <div class="hero-content">
        <h1 ref="headingRef" class="hero-title-stack">
          <span class="hero-title-layer hero-title-layer--stroke" aria-hidden="true">
            <span class="h1-light">Never miss</span>
            <span class="h1-grad">a <span class="cycle-word">{{ cycleWord }}</span> again.</span>
          </span>
          <span class="hero-title-layer hero-title-layer--stroke-shine" aria-hidden="true">
            <span class="h1-light">Never miss</span>
            <span class="h1-grad">a <span class="cycle-word">{{ cycleWord }}</span> again.</span>
          </span>
          <span class="hero-title-layer hero-title-layer--fill">
            <span class="h1-light">Never miss</span>
            <span class="h1-grad">a <span class="cycle-word">{{ cycleWord }}</span> again.</span>
          </span>
        </h1>

        <p ref="subRef" class="hero-sub">
          Your AI receptionist answers every call, books appointments, and
          handles your front desk - around the clock, at a fraction of the cost.
        </p>

        <div ref="actionsRef" class="hero-actions">
          <button class="btn-primary" @click="$emit('open-booking')">
            Book a Free Demo
          </button>
          <button class="btn-ghost" @click="scrollToHow">
            See how it works &rarr;
          </button>
        </div>

        <div ref="trustRef" class="hero-trust">
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            No contracts
          </div>
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            Setup included
          </div>
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            Cancel anytime
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

h1 {
  font-size: clamp(2.6rem, 6.2vw, 5.4rem);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: -0.03em;
  margin-bottom: 22px;
  text-wrap: balance;
}

.hero-title-stack {
  --hero-stroke-color: #fff;
  --hero-stroke-width: clamp(2.0px, 0.03em, 2.1px);
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

.hero-title-layer--stroke-shine {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: var(--hero-stroke-width) var(--brand);
  paint-order: stroke fill;
  text-shadow: 0 0 2px rgba(var(--brand-rgb), 0.2);
  filter: none;
  opacity: 1;
  -webkit-mask-image: radial-gradient(
    transparent, transparent,
    rgba(255, 255, 255, 0.72), #fff, rgba(255, 255, 255, 0.72),
    transparent, transparent
  );
  mask-image: radial-gradient(
    transparent, transparent,
    rgba(255, 255, 255, 0.72), #fff, rgba(255, 255, 255, 0.72),
    transparent, transparent
  );
  -webkit-mask-size: 300% 300%;
  mask-size: 300% 300%;
  -webkit-mask-position: 0% 0%;
  mask-position: 0% 0%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  animation: hero-shine-pulse 5s infinite linear, hero-stroke-shine-color 5s infinite linear;
  will-change: -webkit-mask-position, mask-position, -webkit-text-stroke-color, text-shadow;
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

.hero-title-layer--fill .h1-grad {
  -webkit-text-stroke: 0;
  background-image: var(--heading-gradient);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  mix-blend-mode: normal;
  filter: none;
  text-shadow: none;
}

@keyframes hero-shine-pulse {
  0% {
    -webkit-mask-position: 0% 0%;
    mask-position: 0% 0%;
  }
  50% {
    -webkit-mask-position: 100% 100%;
    mask-position: 100% 100%;
  }
  100% {
    -webkit-mask-position: 0% 0%;
    mask-position: 0% 0%;
  }
}

@keyframes hero-stroke-shine-color {
  0% {
    -webkit-text-stroke-color: var(--brand);
    text-shadow: 0 0 2px rgba(var(--brand-rgb), 0.2);
  }
  50% {
    -webkit-text-stroke-color: var(--accent);
    text-shadow:
      0 0 6px rgba(var(--accent-rgb), 0.35),
      0 0 2px rgba(255, 255, 255, 0.2);
  }
  100% {
    -webkit-text-stroke-color: var(--brand-strong);
    text-shadow:
      0 0 6px rgba(var(--brand-rgb), 0.3),
      0 0 2px rgba(255, 255, 255, 0.18);
  }
}


.hero-sub {
  font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.2rem);
  line-height: 1.78;
  color: #000000;
  max-width: 56ch;
  margin-bottom: 36px;
  text-wrap: pretty;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
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
  font-size: 14.5px;
  font-weight: 500;
  color: #000000;
}

.trust-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.12);
  border: 1px solid rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #000000;
}

.trust-check :deep(svg) {
  display: block;
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

@media (max-width: 520px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .hero-trust {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-block: 5.5rem 3.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero {
    transition: none;
  }

  .hero-title-layer--stroke-shine {
    animation: none;
  }
}
</style>
