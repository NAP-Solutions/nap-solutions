# Mobile Responsiveness, Animations & Typography — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the NAP Solutions landing page fully mobile-responsive, add scroll-triggered fade-up animations to every section, and standardize typography across all components.

**Architecture:** A single `useScrollReveal` Vue 3 composable uses `IntersectionObserver` to set a `data-revealed` attribute on elements as they enter the viewport. Each component defines its own CSS transitions triggered by `[data-revealed]`, giving per-section animation control with zero JS animation library overhead. Typography and mobile fixes are applied per-component using existing scoped CSS patterns.

**Tech Stack:** Vue 3 Composition API, Vite, scoped CSS (no new dependencies). No test runner — verification is visual via `npm run dev` + browser DevTools device simulation.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/composables/useScrollReveal.js` | **Create** | IntersectionObserver trigger, sets `data-revealed` on elements |
| `src/components/NavBar.vue` | **Modify** | Mobile menu touch targets (48px min-height) |
| `src/components/HeroSection.vue` | **Modify** | Minor mobile top padding fix, trust-item font bump |
| `src/components/SocialProofBar.vue` | **Modify** | fadeIn animation, small-screen logo row fix |
| `src/components/ProblemSection.vue` | **Modify** | Fade-up animation on section header + items + stats |
| `src/components/SolutionSection.vue` | **Modify** | Fade-up animation, typography fixes, CTA button fix |
| `src/components/HowItWorksSection.vue` | **Modify** | Fade-up animation, typography fixes, step card mobile fix |
| `src/components/PricingSection.vue` | **Modify** | Fade-up animation, single-col grid on ≤520px, base plan banner stack |
| `src/components/FaqSection.vue` | **Modify** | Fade-up animation, typography fixes, 48px FAQ button touch target |
| `src/components/CtaSection.vue` | **Modify** | fadeIn animation, full-width button on mobile |
| `src/components/ContactSection.vue` | **Modify** | Fade-up animation, typography fixes (eyebrow 10px→12px, body 14px→15px) |
| `src/components/SiteFooter.vue` | **Modify** | fadeIn animation, footer grid 2-col intermediate breakpoint at 640px |

---

## Task 1: Create `useScrollReveal` composable

**Files:**
- Create: `src/composables/useScrollReveal.js`

- [ ] **Step 1: Create the file**

```js
// src/composables/useScrollReveal.js
import { onMounted, onUnmounted } from 'vue'

/**
 * Observes a list of elements and sets `data-revealed=""` on each
 * when it enters the viewport. CSS handles the actual animation.
 *
 * @param {() => (Element | null)[]} getTargets - called onMounted to get elements
 * @param {{ threshold?: number, once?: boolean }} options
 */
export function useScrollReveal(getTargets, { threshold = 0.12, once = true } = {}) {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = ''
            if (once) observer.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const targets = getTargets()
    if (targets) {
      targets.forEach((el) => el && observer.observe(el))
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls src/composables/useScrollReveal.js
```
Expected: file listed

- [ ] **Step 3: Commit**

```bash
git add src/composables/useScrollReveal.js
git commit -m "feat: add useScrollReveal composable"
```

---

## Task 2: Fix NavBar mobile touch targets

**Files:**
- Modify: `src/components/NavBar.vue` — mobile menu `<a>` tags need 48px tap height

- [ ] **Step 1: Update mobile menu link styles**

In `NavBar.vue`, in the `@media (max-width: 960px)` block, replace:

```css
.mobile-menu a {
  text-decoration: none;
  color: #4a5580;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  padding: 4px 2px;
}
```

With:

```css
.mobile-menu a {
  text-decoration: none;
  color: #4a5580;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  padding: 0 2px;
  min-height: 48px;
  display: flex;
  align-items: center;
}
```

- [ ] **Step 2: Verify visually**

Run `npm run dev`, open DevTools → mobile (375px), open the hamburger menu. Each nav link should have a comfortable tap area (~48px tall). Links should still look good.

- [ ] **Step 3: Commit**

```bash
git add src/components/NavBar.vue
git commit -m "fix: increase mobile nav link touch targets to 48px"
```

---

## Task 3: Fix HeroSection mobile padding & typography

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Fix mobile top padding and trust-item font size**

In `HeroSection.vue`, in `@media (max-width: 960px)`:

Change `.hero` padding from `6.5rem 4.2rem` to `6rem 4rem`.

Add a new breakpoint:

```css
@media (max-width: 480px) {
  .hero {
    padding-block: 5.5rem 3.5rem;
  }
}
```

Also update `.trust-item` font-size from `14px` to `15px` (in the non-media-query section):

```css
.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #8892b0;
}
```

- [ ] **Step 2: Verify visually**

Mobile (375px): hero headline should be fully visible without scrolling immediately. Trust signals ("No contracts" etc.) should be readable.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.vue
git commit -m "fix: hero mobile padding and trust-item font size"
```

---

## Task 4: Animate SocialProofBar

**Files:**
- Modify: `src/components/SocialProofBar.vue`

- [ ] **Step 1: Import composable and add refs**

Replace the `<script setup>` block:

```vue
<script setup>
import { ref } from 'vue'
import { Activity, Home, Heart, Stethoscope, Briefcase } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

const barRef = ref(null)
useScrollReveal(() => [barRef.value])
</script>
```

- [ ] **Step 2: Add ref to template root**

```vue
<div class="sp-bar" ref="barRef">
```

- [ ] **Step 3: Add reveal CSS**

In the `<style scoped>` block, add:

```css
.sp-bar {
  /* ... existing styles ... */
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.sp-bar[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
```

Also add the `≤480px` logo fix in the existing `@media (max-width: 640px)` block:

```css
@media (max-width: 480px) {
  .sp-logos {
    gap: 16px;
  }
  .sp-icon-wrap {
    width: 24px;
    height: 24px;
  }
  .sp-name {
    font-size: 11px;
  }
}
```

- [ ] **Step 4: Verify visually**

Desktop: bar should start invisible and fade up when scrolled into view (just below hero). Mobile (375px): logos should wrap cleanly without overflow.

- [ ] **Step 5: Commit**

```bash
git add src/components/SocialProofBar.vue
git commit -m "feat: add scroll reveal animation to SocialProofBar"
```

---

## Task 5: Animate ProblemSection

**Files:**
- Modify: `src/components/ProblemSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import { ref } from 'vue'
import { problemItems, statCards } from '../data/problemData'
import { useScrollReveal } from '../composables/useScrollReveal'

const headerRef = ref(null)
const itemRefs = ref([])
const statRefs = ref([])

useScrollReveal(() => [headerRef.value, ...itemRefs.value, ...statRefs.value])
</script>
```

- [ ] **Step 2: Update template**

Wrap header elements and add refs to cards:

```vue
<template>
  <section id="problem" class="section bg-white">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">The Problem</div>
        <h2 class="grad-text">
          Your Phone Stops Working<br />When Clients Need It Most.
        </h2>
        <p class="section-sub">
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
            <div class="big">{{ stat.big }}</div>
            <div class="lbl">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Add reveal CSS**

```css
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.problem-item,
.stat-card {
  opacity: 0;
  transform: translateY(18px);
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
```

- [ ] **Step 4: Verify visually**

Scroll down to Problem section: header fades up first, then problem items stagger in, stat cards stagger in on the right.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProblemSection.vue
git commit -m "feat: add scroll reveal animations to ProblemSection"
```

---

## Task 6: Animate SolutionSection + typography fixes

**Files:**
- Modify: `src/components/SolutionSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import { ref } from 'vue'
import { PhoneIncoming, CalendarCheck, Clock, Users } from 'lucide-vue-next'
import { solutionCards } from '../data/solutionData'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const iconMap = { PhoneIncoming, CalendarCheck, Clock, Users }

const headerRef = ref(null)
const cardRefs = ref([])
const ctaRef = ref(null)

useScrollReveal(() => [headerRef.value, ...cardRefs.value, ctaRef.value])
</script>
```

- [ ] **Step 2: Update template with refs**

```vue
<template>
  <section id="solution" class="section bg-white">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">The Solution</div>
        <h2 class="grad-text">
          An AI Receptionist<br />That Never Clocks Out.
        </h2>
        <p class="section-sub">
          NAP Solutions answers every call, qualifies the caller, and books the
          appointment — 24/7, 365 days a year.
        </p>
      </div>

      <div class="feature-grid">
        <div
          v-for="(card, i) in solutionCards"
          :key="i"
          class="feature-card"
          :ref="el => cardRefs[i] = el"
        >
          <div class="fc-icon" :class="`fc-icon--${card.iconVariant}`">
            <component :is="iconMap[card.icon]" :size="18" />
          </div>
          <h3 class="fc-title">{{ card.title }}</h3>
          <p class="fc-desc">{{ card.desc }}</p>
        </div>
      </div>

      <div class="solution-cta" ref="ctaRef">
        <p class="solution-cta-text">
          Ready to put your front desk on autopilot?
          <span>Let's talk.</span>
        </p>
        <button class="btn-primary solution-cta-btn" @click="$emit('open-booking')">
          Book a Demo
        </button>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Add reveal CSS + typography fixes**

In `<style scoped>`, update/add:

```css
/* Typography fixes */
.fc-title {
  font-size: clamp(15px, 0.9rem + 0.2vw, 17px);
  font-weight: 700;
  color: #0a0f1e;
  letter-spacing: -0.01em;
  margin-bottom: 5px;
}
.fc-desc {
  font-size: clamp(14px, 0.85rem + 0.15vw, 15px);
  color: #8892b0;
  line-height: 1.6;
}
.solution-cta-text {
  font-size: 16px;
  font-weight: 600;
  color: #0a0f1e;
}
.solution-cta-btn {
  font-size: 14px;
  padding: 11px 20px;
  min-height: 44px;
}

/* Reveal animations */
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.feature-card {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s;
}
.feature-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.feature-card:nth-child(2) { transition-delay: 0.08s; }
.feature-card:nth-child(3) { transition-delay: 0.16s; }
.feature-card:nth-child(4) { transition-delay: 0.24s; }

.solution-cta {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s 0.2s ease, transform 0.5s 0.2s ease;
}
.solution-cta[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Verify visually**

Desktop + mobile (375px): header fades in, cards stagger in, CTA bar fades in last. Card text should be readable (≥14px). CTA button should be a decent tap target.

- [ ] **Step 5: Commit**

```bash
git add src/components/SolutionSection.vue
git commit -m "feat: add scroll reveal and fix typography in SolutionSection"
```

---

## Task 7: Animate HowItWorksSection + typography + mobile fixes

**Files:**
- Modify: `src/components/HowItWorksSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import {
  PhoneCall, MessageCircle, CalendarCheck, ShieldCheck,
  Bot, Check, Send,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const headerRef = ref(null)
const stepRefs = ref([])
const chatRef = ref(null)

useScrollReveal(() => [headerRef.value, ...stepRefs.value, chatRef.value])
</script>
```

- [ ] **Step 2: Update template with refs**

Replace the entire `<template>` block with:

```vue
<template>
  <section id="how" class="section bg-alt">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">How It Works</div>
        <h2 class="grad-text">
          From First Ring<br />To Fully Booked.
        </h2>
        <p class="section-sub">
          Every call handled end-to-end. Here's exactly what our AI takes care
          of so you don't have to.
        </p>
      </div>

      <div class="hiw-layout">
        <!-- Step cards -->
        <div class="steps-col">
          <div class="step-card" :ref="el => stepRefs[0] = el">
            <div class="step-icon-wrap">
              <div class="step-icon si-purple"><PhoneCall :size="20" /></div>
              <span class="step-num">01</span>
            </div>
            <div class="step-content">
              <h3 class="step-title">Call Received</h3>
              <p class="step-desc">Your AI receptionist picks up on the first ring — any time of day, any day of the week. No hold music, no voicemail.</p>
            </div>
          </div>

          <div class="step-card" :ref="el => stepRefs[1] = el">
            <div class="step-icon-wrap">
              <div class="step-icon si-cyan"><MessageCircle :size="20" /></div>
              <span class="step-num">02</span>
            </div>
            <div class="step-content">
              <h3 class="step-title">Caller Qualified</h3>
              <p class="step-desc">The AI greets the caller naturally, understands their needs, and gathers everything needed to book — name, service, preferred time.</p>
            </div>
          </div>

          <div class="step-card" :ref="el => stepRefs[2] = el">
            <div class="step-icon-wrap">
              <div class="step-icon si-purple"><CalendarCheck :size="20" /></div>
              <span class="step-num">03</span>
            </div>
            <div class="step-content">
              <h3 class="step-title">Appointment Booked</h3>
              <p class="step-desc">The appointment is confirmed in real time, synced to your calendar, and the caller gets confirmation before the call ends.</p>
            </div>
          </div>

          <div class="step-card" :ref="el => stepRefs[3] = el">
            <div class="step-icon-wrap">
              <div class="step-icon si-cyan"><ShieldCheck :size="20" /></div>
              <span class="step-num">04</span>
            </div>
            <div class="step-content">
              <h3 class="step-title">Escalated If Needed</h3>
              <p class="step-desc">Complex cases or emergencies get handed off to your team immediately. Nothing falls through the cracks.</p>
            </div>
          </div>
        </div>

        <!-- Chat widget -->
        <div class="chat-col" ref="chatRef">
          <div class="chat-widget">
            <div class="chat-header">
              <div class="ch-dots">
                <span class="ch-dot ch-dot-dim"></span>
                <span class="ch-dot ch-dot-dim"></span>
                <span class="ch-dot ch-dot-cyan"></span>
              </div>
              <div class="ch-avatar"><Bot :size="15" /></div>
              <div class="ch-info">
                <span class="ch-name">NAP Receptionist</span>
                <span class="ch-sub">Dr. Smith Dental · Incoming call</span>
              </div>
              <div class="ch-live">
                <span class="ch-live-dot"></span>
                LIVE
              </div>
            </div>

            <div class="chat-body">
              <div class="bubble bubble-ai">Hi! Thanks for calling. How can I help you today?</div>
              <p class="bubble-meta">NAP AI · just now</p>
              <div class="bubble bubble-user">I need to book a cleaning. Do you have anything this week?</div>
              <p class="bubble-meta bubble-meta--right">Caller</p>
              <div class="bubble bubble-ai">Absolutely — Thursday at 10am or Friday at 2pm. Which works better?</div>
              <p class="bubble-meta">NAP AI</p>
              <div class="bubble bubble-user">Thursday please.</div>
              <p class="bubble-meta bubble-meta--right">Caller</p>
              <div class="confirm-card">
                <div class="confirm-top">
                  <span class="confirm-icon"><Check :size="13" /></span>
                  <span class="confirm-label">APPOINTMENT CONFIRMED</span>
                </div>
                <p class="confirm-detail">
                  <strong>Dental Cleaning</strong><br />
                  Thursday · 10:00 AM<br />
                  Synced to calendar
                </p>
              </div>
            </div>

            <div class="chat-footer">
              <div class="chat-input-mock">Message...</div>
              <button class="chat-send" type="button" aria-label="Send">
                <Send :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Add reveal CSS + typography + mobile fixes**

```css
/* Typography */
.step-title {
  font-size: clamp(15px, 0.9rem + 0.2vw, 17px);
  font-weight: 700;
  color: #0a0f1e;
  letter-spacing: -0.01em;
  margin-bottom: 5px;
}
.step-desc {
  font-size: clamp(14px, 0.85rem + 0.15vw, 15px);
  color: #8892b0;
  line-height: 1.7;
}

/* Reveal animations */
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.step-card {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, box-shadow 0.2s;
}
.step-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.step-card:nth-child(2) { transition-delay: 0.1s; }
.step-card:nth-child(3) { transition-delay: 0.2s; }
.step-card:nth-child(4) { transition-delay: 0.3s; }

.chat-col {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease;
}
.chat-col[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile fix: better step card padding */
@media (max-width: 640px) {
  .chat-col {
    display: none;
  }
  .step-card {
    padding: 18px 16px;
    gap: 16px;
  }
}
```

- [ ] **Step 4: Verify visually**

Desktop: step cards stagger in, chat widget slides in alongside. Mobile (375px): chat widget hidden, step cards stack cleanly with comfortable padding.

- [ ] **Step 5: Commit**

```bash
git add src/components/HowItWorksSection.vue
git commit -m "feat: add scroll reveal, fix typography and mobile in HowItWorksSection"
```

---

## Task 8: Animate PricingSection + mobile grid fix

**Files:**
- Modify: `src/components/PricingSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import { ref } from 'vue'
import { pricingPlans } from '../data/pricingData'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const headerRef = ref(null)
const bannerRef = ref(null)
const cardRefs = ref([])

useScrollReveal(() => [headerRef.value, bannerRef.value, ...cardRefs.value])
</script>
```

- [ ] **Step 2: Update template with refs**

```vue
<div class="reveal-header" ref="headerRef">
  <div class="section-eyebrow">Pricing</div>
  <h2 class="grad-text">Simple. Transparent.<br />No Hidden Fees.</h2>
  <p class="section-sub">...</p>
</div>
<div class="base-plan-banner" ref="bannerRef">...</div>

<!-- pricing cards: add :ref="el => cardRefs[i] = el" to each .pricing-card div -->
```

- [ ] **Step 3: Add reveal CSS + mobile fix**

```css
/* Reveal animations */
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.base-plan-banner {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s 0.1s ease, transform 0.5s 0.1s ease;
}
.base-plan-banner[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.pricing-card {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
}
.pricing-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.pricing-card:nth-child(2) { transition-delay: 0.1s; }
.pricing-card:nth-child(3) { transition-delay: 0.2s; }

/* Typography fix */
.base-plan-text {
  font-size: 16px;  /* was 15px */
  color: #4a5580;
}

/* Mobile grid fix — force single column at small sizes */
@media (max-width: 520px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}

/* Stack base plan banner on very small screens */
@media (max-width: 480px) {
  .base-plan-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
```

- [ ] **Step 4: Verify visually**

Mobile (375px): pricing cards should each be full-width, not cramped two-up. Animations stagger in nicely on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/PricingSection.vue
git commit -m "feat: add scroll reveal, fix mobile grid in PricingSection"
```

---

## Task 9: Animate FaqSection + typography + mobile fixes

**Files:**
- Modify: `src/components/FaqSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { faqItems } from '../data/faqData'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const openIndex = ref(-1)
const showAll = ref(false)
const headerRef = ref(null)
const faqListRef = ref(null)
const ctaRef = ref(null)

useScrollReveal(() => [headerRef.value, faqListRef.value, ctaRef.value])

function toggleItem(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>
```

- [ ] **Step 2: Update template with refs**

```vue
<div class="faq-left">
  <div class="reveal-header" ref="headerRef">
    <div class="section-eyebrow">FAQ</div>
    <h2 class="grad-text">Got Questions?<br />We Have Answers.</h2>
    <p class="section-sub">Everything you need to know about NAP Solutions.</p>
  </div>

  <div class="faq-collapse" :class="{ collapsed: !showAll }" ref="faqListRef">
    ...
  </div>
  ...
  <div class="faq-cta" ref="ctaRef">...</div>
</div>
```

- [ ] **Step 3: Add reveal CSS + typography + mobile fixes**

```css
/* Typography */
.faq-q {
  /* ...existing styles... */
  font-size: clamp(16px, 0.95rem + 0.3vw, 18px);
}
.faq-a {
  /* ...existing styles... */
  font-size: clamp(15px, 0.9rem + 0.25vw, 16px);
}

/* Reveal animations */
.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.faq-collapse {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s 0.1s ease, transform 0.5s 0.1s ease;
}
.faq-collapse[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.faq-cta {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.5s 0.2s ease, transform 0.5s 0.2s ease;
}
.faq-cta[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile touch target fix */
@media (max-width: 640px) {
  .faq-q {
    padding: 0 16px;
    min-height: 56px;
    font-size: clamp(14px, 0.88rem + 0.2vw, 15px);
    line-height: 1.45;
  }
  .faq-cta {
    align-items: stretch;
  }
}
```

- [ ] **Step 4: Verify visually**

Mobile (375px): FAQ question rows should be easy to tap (≥56px tall). Answers should be readable. Animations trigger on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/FaqSection.vue
git commit -m "feat: add scroll reveal, fix typography and touch targets in FaqSection"
```

---

## Task 10: Animate CtaSection + mobile fix

**Files:**
- Modify: `src/components/CtaSection.vue`

- [ ] **Step 1: Add composable + ref**

```vue
<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const innerRef = ref(null)
useScrollReveal(() => [innerRef.value])
</script>
```

- [ ] **Step 2: Update template**

```vue
<div class="cta-inner" ref="innerRef">
  ...
</div>
```

- [ ] **Step 3: Add reveal CSS + mobile fix**

```css
/* Reveal */
.cta-inner {
  opacity: 0;
  transition: opacity 0.7s ease;
}
.cta-inner[data-revealed] {
  opacity: 1;
}

/* Mobile: full-width button, tighter sub margin */
@media (max-width: 640px) {
  .cta-sub {
    font-size: 16px;
    line-height: 1.72;
    margin-bottom: 30px;
  }
  .cta-btn {
    width: 100%;
    margin-bottom: 20px;
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .cta-sub {
    margin-bottom: 24px;
  }
}
```

- [ ] **Step 4: Verify visually**

Mobile (375px): CTA button is full-width. Section fades in cleanly on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/CtaSection.vue
git commit -m "feat: add scroll reveal and fix mobile CTA button in CtaSection"
```

---

## Task 11: Animate ContactSection + typography fixes

**Files:**
- Modify: `src/components/ContactSection.vue`

- [ ] **Step 1: Add composable + refs**

```vue
<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)

const leftRef = ref(null)
const rightRef = ref(null)

useScrollReveal(() => [leftRef.value, rightRef.value])

async function submitForm() {
  // ...existing code unchanged...
}
</script>
```

- [ ] **Step 2: Update template with refs**

```vue
<div class="contact-left" ref="leftRef">...</div>
<div class="contact-right" ref="rightRef">...</div>
```

- [ ] **Step 3: Add reveal CSS + typography fixes**

```css
/* Typography fixes */
.contact-eyebrow {
  font-size: 12px;  /* was 10px */
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7b2fff;
  margin-bottom: 8px;
}
.contact-body {
  font-size: 15px;  /* was 14px */
  color: #8892b0;
  line-height: 1.65;
}

/* Reveal animations */
.contact-left {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.contact-left[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.contact-right {
  /* ...existing styles... */
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s 0.1s ease, transform 0.5s 0.1s ease;
}
.contact-right[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Verify visually**

Mobile (375px): left text and form stack cleanly. Typography is readable. Animations trigger on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: add scroll reveal and fix typography in ContactSection"
```

---

## Task 12: Animate SiteFooter + mobile grid fix

**Files:**
- Modify: `src/components/SiteFooter.vue`

- [ ] **Step 1: Add composable + ref**

```vue
<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

defineEmits(['open-booking'])

const footerRef = ref(null)
useScrollReveal(() => [footerRef.value], { threshold: 0.05 })

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>
```

- [ ] **Step 2: Update template**

```vue
<footer class="footer" ref="footerRef">
```

- [ ] **Step 3: Add reveal CSS + mobile grid fix**

Add to the existing `<style scoped>`:

```css
/* Reveal */
.footer {
  /* ...existing styles... */
  opacity: 0;
  transition: opacity 0.5s ease;
}
.footer[data-revealed] {
  opacity: 1;
}

/* Mobile: 2-col grid at 640px before collapsing to 1-col */
@media (max-width: 960px) and (min-width: 641px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Footer link touch targets */
@media (max-width: 960px) {
  .footer-col li {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}
```

- [ ] **Step 4: Verify visually**

Tablet (768px): footer shows 2-col grid (brand + nav cols). Mobile (375px): single column, link rows have comfortable tap height. Footer fades in on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/components/SiteFooter.vue
git commit -m "feat: add scroll reveal and fix mobile grid in SiteFooter"
```

---

## Task 13: Final build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 2: Preview build**

```bash
npm run preview
```

Open browser at `http://localhost:4173`.

- [ ] **Step 3: Full scroll test**

Scroll from top to bottom:
- Each section's header should fade up when it enters view
- Cards/items should stagger in
- No elements stuck invisible (check at wide and narrow viewport)
- No layout overflow at 375px, 390px, 768px, 1280px

- [ ] **Step 4: Mobile-specific checks**

Using DevTools device emulation (375px):
- [ ] Nav hamburger menu links have adequate tap height
- [ ] Hero headline visible without scrolling on load
- [ ] Pricing cards single-column, not cramped
- [ ] FAQ accordion items easy to tap
- [ ] CTA button full-width
- [ ] Footer stacks cleanly

- [ ] **Step 5: Commit build output (optional)**

```bash
npm run build
git add dist
git commit -m "build: production build after mobile/animation polish"
```
