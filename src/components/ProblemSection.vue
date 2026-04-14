<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { problemItems, statCards } from '../data/problemData'
import { useScrollReveal } from '../composables/useScrollReveal'
import { createSplitTextAnimation } from '../composables/useSplitTextAnimation'
import { useTilt } from '../composables/useTilt'
import LiquidHeading from './LiquidHeading.vue'

const headerRef = ref(null)
const headingRef = ref(null)
const subRef = ref(null)
const itemRefs = ref([])
const statRefs = ref([])

let headerObserver
let headerTimeline
let cleanupHeaderSplit = () => {}

function getHeadingElement() {
  return headingRef.value?.$el ?? null
}

useScrollReveal(() => [...itemRefs.value, ...statRefs.value])
useTilt(() => statRefs.value)

function playHeaderAnimation() {
  const headingEl = getHeadingElement()
  if (!headingEl || !subRef.value) return

  cleanupHeaderSplit()
  headerTimeline?.kill()

  gsap.set(headingEl, { autoAlpha: 0, y: 18 })
  gsap.set(subRef.value, { opacity: 1 })

  const splitControl = createSplitTextAnimation(subRef.value, {
    type: 'words, lines',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.words, {
        autoAlpha: 0,
        y: 22,
        duration: 0.8,
        stagger: { amount: 0.68 },
        ease: 'power2.out',
      })
    },
  })

  headerTimeline = gsap.timeline()
    .to(headingEl, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
    })

  if (splitControl.animation) {
    headerTimeline.add(splitControl.animation, '-=0.1')
  }

  cleanupHeaderSplit = splitControl.destroy
}

onMounted(() => {
  headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.dataset.revealed = ''

        const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (shouldReduceMotion) {
          const headingEl = getHeadingElement()
          if (headingEl) {
            gsap.set([headingEl, subRef.value], { clearProps: 'all' })
          }
        } else {
          playHeaderAnimation()
        }

        headerObserver?.unobserve(entry.target)
      })
    },
    { threshold: 0.08 }
  )

  if (headerRef.value) {
    headerObserver.observe(headerRef.value)
  }
})

onBeforeUnmount(() => {
  headerObserver?.disconnect()
  headerTimeline?.kill()
  cleanupHeaderSplit()
})
</script>

<template>
  <section id="problem" class="section bg-white noise-bg noise-bg--fade-top">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">The Problem</div>
        <LiquidHeading ref="headingRef">
          Your phone stops <br class="problem-heading-break-mobile" />working
          <br class="problem-heading-break" />when clients <br class="problem-heading-break-mobile" />need it most.
        </LiquidHeading>
        <p ref="subRef" class="section-sub problem-sub">
          Businesses are losing bookings every night, every weekend, and most do
          not even realize it.
        </p>
      </div>
      <div class="problem-layout">
        <div class="problem-list">
          <div
            v-for="(item, i) in problemItems"
            :key="i"
            class="problem-item"
            :ref="el => itemRefs[i] = el"
          >
            <div class="problem-arrow">&rarr;</div>
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="stats-col">
          <div
            v-for="(stat, i) in statCards"
            :key="i"
            class="stat-card"
            :ref="el => statRefs[i] = el"
          >
            <div class="tilt-glare" aria-hidden="true"></div>
            <div class="big">{{ stat.big }}</div>
            <div class="lbl">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.problem-sub {
  opacity: 0;
}

.problem-item,
.stat-card {
  opacity: 0;
  transform: translateY(18px);
}
.stat-card {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.problem-item[data-revealed],
.stat-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.problem-item:nth-child(2) { transition-delay: 0.08s; }
.problem-item:nth-child(3) { transition-delay: 0.16s; }
.problem-item:nth-child(4) { transition-delay: 0.24s; }
.stat-card:nth-child(2) { transition-delay: 0.1s; }

.problem-heading-break-mobile {
  display: none;
}

.problem-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.4rem, 4vw, 3rem);
  align-items: start;
}
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.problem-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s, border-color 0.2s;
  cursor: default;
}
.problem-item:hover {
  background: rgba(var(--brand-rgb), 0.03);
  border-color: rgba(var(--brand-rgb), 0.1);
}
.problem-arrow {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  flex-shrink: 0;
  background: rgba(var(--brand-rgb), 0.08);
  border: 1px solid rgba(var(--brand-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: var(--accent-ink);
  font-weight: 700;
}
.problem-item p {
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-body);
  text-wrap: pretty;
}
.stats-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.stat-card {
  padding: 30px 32px;
  border-radius: 16px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.58) 46%, rgba(var(--accent-rgb), 0.15) 100%);
  border: 1px solid rgba(255, 255, 255, 0.74);
  box-shadow:
    0 10px 28px rgba(12, 18, 38, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -10px 16px rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
  position: relative;
  overflow: hidden;
}
.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--brand), var(--accent));
  border-radius: 3px 3px 0 0;
}
.stat-card .big {
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
  color: var(--accent-ink);
}
.stat-card .lbl {
  font-size: 16px;
  color: var(--text-body);
  line-height: 1.5;
}

@media (max-width: 960px) {
  .problem-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .reveal-header {
    width: min(100%, 24rem);
    margin-inline: auto;
  }

  .reveal-header :deep(.liquid-heading-stack),
  .problem-sub {
    margin-inline: 0;
  }

  .problem-heading-break {
    display: none;
  }

  .problem-heading-break-mobile {
    display: block;
  }

  .problem-item {
    padding: 16px 16px;
    gap: 12px;
  }

  .problem-item p {
    font-size: 15px;
    line-height: 1.62;
  }

  .problem-arrow {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }

  .stat-card {
    padding: 22px 18px;
  }

  .stat-card .big {
    font-size: 34px;
  }
}
</style>
