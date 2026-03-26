# Mobile Responsiveness, Animations & Typography — Design Spec

**Date:** 2026-03-26
**Branch:** nap2
**Status:** Approved

---

## Overview

Improve the NAP Solutions landing page across three dimensions:

1. **Scroll-based animations** — elements fade and ease into view as the user scrolls, using a shared composable + per-component CSS.
2. **Typography standardization** — fix inconsistent and too-small font sizes across components.
3. **Mobile responsiveness & touch usability** — fix layout, spacing, stacking, and touch targets across all screen sizes.

The approach uses a single `useScrollReveal` composable (IntersectionObserver + `data-revealed` attribute) so animations are CSS-driven and each component retains full control over its own animation style. No animation libraries are added.

---

## 1. Scroll Reveal Architecture

### Composable: `src/composables/useScrollReveal.js`

```js
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(getTargets, { threshold = 0.12, once = true } = {}) {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.revealed = ''
          if (once) observer.unobserve(entry.target)
        }
      })
    }, { threshold })

    const targets = getTargets()
    targets?.forEach((el) => el && observer.observe(el))
  })

  onUnmounted(() => observer?.disconnect())
}
```

**Usage in a component:**

```vue
<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const cards = ref([])
useScrollReveal(() => cards.value)
</script>

<template>
  <div v-for="(card, i) in items" :key="i" :ref="el => cards[i] = el" class="card">
    ...
  </div>
</template>

<style scoped>
.card {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via nth-child delay */
.card:nth-child(2) { transition-delay: 0.08s; }
.card:nth-child(3) { transition-delay: 0.16s; }
</style>
```

**Key properties:**
- `once: true` — element reveals once and observer disconnects (no re-animation on scroll-up)
- `threshold: 0.12` — triggers when 12% of the element is visible
- Fully respects `prefers-reduced-motion` via the existing rule in `main.css` (transitions are suppressed to 0.01ms)
- No JS animation libraries; no runtime overhead beyond the observer

---

## 2. Per-Section Animation Plan

Each section uses `useScrollReveal` with its own CSS. The animation style is Option A (subtle fade-up) applied consistently, with per-section stagger and timing variation.

| Section | What animates | Style |
|---|---|---|
| HeroSection | Already animates on load | Unchanged — existing `fadeUp` CSS keyframes |
| SocialProofBar | Whole bar | `fadeIn` (0.6s ease) |
| ProblemSection | Section header + problem cards | Fade-up, 80ms stagger per card |
| SolutionSection | Section header + feature cards | Fade-up, 80ms stagger per card |
| HowItWorksSection | Section header + step cards | Fade-up, 100ms stagger per card |
| PricingSection | Section header + pricing cards | Fade-up, 100ms stagger per card |
| FaqSection | Section header + FAQ items | Fade-up, 60ms stagger per item |
| CtaSection | Whole inner block | `fadeIn` (0.7s ease) |
| ContactSection | Section header + form | Fade-up (no stagger) |
| SiteFooter | Whole footer | `fadeIn` (0.5s ease) |

**Section header pattern** (reused across sections): eyebrow label, `h2`, and `.section-sub` are wrapped in a single `ref` div and revealed together as a unit before the cards.

---

## 3. Typography Standardization

All sizes are updated to use `clamp()` or consistent pixel values. Hard-coded `14px` and `15px` for body copy and card text are bumped up to ensure readability at all screen sizes.

### Changes per component

**SolutionSection.vue**
- `.fc-title`: `15px` → `clamp(15px, 0.9rem + 0.2vw, 17px)`
- `.fc-desc`: `14px` → `clamp(14px, 0.85rem + 0.15vw, 15px)`
- `.solution-cta-btn`: font-size `12px` → `14px`, restore `min-height: 44px`
- `.solution-cta-text`: `15px` → `16px`

**HowItWorksSection.vue**
- `.step-title`: `15px` → `clamp(15px, 0.9rem + 0.2vw, 17px)`
- `.step-desc`: `14px` → `clamp(14px, 0.85rem + 0.15vw, 15px)`
- Mobile (≤640px): `.step-title` floor raised to `15px`, `.step-desc` to `14px`

**FaqSection.vue**
- `.faq-q`: `17px` → `clamp(16px, 0.95rem + 0.3vw, 18px)` (already good, just clamp-ify)
- `.faq-a`: `16px` → `clamp(15px, 0.9rem + 0.25vw, 16px)`
- `.faq-cta-text p`: `16px` → keep, but add clamp floor of `15px`

**HeroSection.vue**
- `.trust-item`: `14px` → `15px`

**CtaSection.vue**
- `.cta-sub`: already uses `19px`/`16px` — keep, it's intentionally large

**PricingSection.vue**
- `.pricing-features li`: `16px` — keep (already correct)
- `.base-plan-text`: `15px` → `16px`
- `.pricing-footer`: `14px` → `13px` (fine as fine-print)

---

## 4. Mobile Responsiveness Fixes

### NavBar.vue
- Mobile menu link `<a>` tags: add `min-height: 48px; display: flex; align-items: center` for full touch target
- Menu link font-size: `16px` → `16px` (keep) but ensure padding gives 48px tap height

### HeroSection.vue
- On `≤480px`: reduce top padding from `6.5rem` to `5.5rem` to give headline more breathing room below nav
- Trust signals already stack on `≤520px` — no change needed

### SocialProofBar.vue
- On `≤480px`: logos flex-wrap + tighter gap (`16px`), icon wrap reduced to `24px`, `sp-name` to `11px`
- `sp-coming` text: wraps naturally, no change needed

### SolutionSection.vue
- Feature cards already single-column on `≤640px`
- Fix card padding on mobile: `18px 16px` → `20px 18px` (slightly more breathing room)
- `solution-cta` on mobile: button stretches full-width (already does via `align-items: stretch`)

### HowItWorksSection.vue
- Chat widget hidden on `≤640px` (confirmed, keep)
- Step card padding on mobile: `16px 14px` → `18px 16px`
- Step card gap: `14px` → `16px` on mobile

### PricingSection.vue
- Add explicit `grid-template-columns: 1fr` at `≤520px` to prevent two cramped cards side-by-side at 375px
- Base plan banner: stack vertically on `≤480px` (pill above text)

### FaqSection.vue
- FAQ question buttons: already have good padding, but explicitly add `min-height: 48px` on `≤640px`
- FAQ CTA block: already stacks on mobile — add `align-items: stretch` so button goes full-width on `≤480px`

### CtaSection.vue
- CTA button: remove `max-width: 320px` constraint on `≤640px` — let it go full-width
- Reduce `.cta-sub` bottom margin on `≤480px` to `24px`

### ContactSection.vue
- Read component, apply the same fade-up pattern as other sections
- Fix any form field sizing or touch-target issues found during implementation (min 48px tap height on inputs/buttons)

### SiteFooter.vue
- Read component, apply a `fadeIn` reveal on the whole footer
- Fix any stacking or overflow issues found on mobile

---

## 5. Files Created / Modified

| File | Action |
|---|---|
| `src/composables/useScrollReveal.js` | **Create** |
| `src/assets/main.css` | No changes needed (already has reduced-motion rule) |
| `src/components/SocialProofBar.vue` | Mobile fix + animation |
| `src/components/ProblemSection.vue` | Animation |
| `src/components/SolutionSection.vue` | Typography + mobile fix + animation |
| `src/components/HowItWorksSection.vue` | Typography + mobile fix + animation |
| `src/components/PricingSection.vue` | Mobile fix + animation |
| `src/components/FaqSection.vue` | Typography + mobile fix + animation |
| `src/components/CtaSection.vue` | Mobile fix + animation |
| `src/components/ContactSection.vue` | Audit + mobile fix + animation |
| `src/components/SiteFooter.vue` | Audit + animation |
| `src/components/NavBar.vue` | Mobile touch target fix |
| `src/components/HeroSection.vue` | Minor mobile padding fix + typography |

---

## 6. Out of Scope

- Hero dashboard widget on mobile — stays hidden (confirmed)
- `CostSection.vue` — no animation or layout changes needed
- `MarqueeBar.vue` — already handles its own scroll animation; no changes needed
- Dark mode
- New sections or content changes
- Animation library dependencies
- Page transitions between routes
