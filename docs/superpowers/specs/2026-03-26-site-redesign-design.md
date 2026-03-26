# NAP Solutions Site Redesign — Design Spec

**Date:** 2026-03-26
**Approach:** Targeted High-Impact Redesign (Approach 1)
**Scope:** All existing components updated in place. Two new sections added. One section split. Section order unchanged for existing sections; two new sections inserted.

---

## 1. Overview

A component-level redesign of the NAP Solutions landing page. No reordering of existing sections. Every section gets meaningfully improved. The goal is a cleaner, more professional SaaS feel with better conversion flow and a clear path to adding social proof when client relationships are confirmed.

### What is NOT changing
- Order of existing sections. Two new sections are inserted: `SocialProofBar` (after Marquee) and `ContactSection` (after CTA). Full order: NavBar → Hero → Marquee → **SocialProofBar** → Problem → Cost → Solution → HowItWorks → Pricing → FAQ → CTA → **ContactSection** → Footer
- Core brand color palette (purple `#7B2FFF`, cyan `#00D4C0`, dark `#0A0F1E`)
- Global CSS variables (`--content-max`, `--gutter`, `--section-space`)
- Booking modal behavior
- Formspree integration in the contact form

---

## 2. Typography System

**Decision: Full Inter replacement — no exceptions.**

All three current fonts (Orbitron, DM Sans, Space Mono) are removed and replaced with Inter at varying weights.

| Role | Weight | Usage |
|---|---|---|
| Display / H1 | Inter 800 | Hero headline only |
| Section headlines / H2 | Inter 800 | All section H2s |
| Card titles / H3 | Inter 700 | Feature cards, step titles, FAQ questions |
| Subheadings | Inter 600 | Eyebrow labels, pricing tiers, section sub-labels |
| Body copy | Inter 400 | Section sub text, card descriptions, paragraph copy |
| UI labels | Inter 700 | Buttons, badges, nav links, trust signals |
| Muted / supporting | Inter 500 | Metadata, timestamps, secondary labels |

### Implementation
- Update `tailwind.config.js`: `fontFamily.sans` → `['Inter', 'sans-serif']`
- Remove `fontFamily.orbitron` and `fontFamily.mono` entries
- Update Google Fonts import in `index.html`: load Inter weights 400, 500, 600, 700, 800
- Remove Orbitron, DM Sans, Space Mono from the font import
- Update `main.css` `body` font-family to Inter
- Global find-and-replace: remove all `font-family: 'Orbitron'`, `font-family: 'DM Sans'`, `font-family: 'Space Mono'` references across all `.vue` files

### Typography scale adjustments
- H1 letter-spacing: `-0.03em` (applies to HeroSection H1 only)
- H2 letter-spacing: `-0.025em` (applies globally in `main.css` to all `h2` elements)
- Card titles: `-0.01em`
- Eyebrow labels: `0.18–0.22em` (keep wide tracking for label legibility)
- All `font-size` values remain unchanged

---

## 3. Icon System

**Decision: Lucide icons throughout — no emoji, no text characters.**

- Library: `lucide-vue-next`
- All icon SVGs must have `display: block` set to prevent inline baseline offset
- Icon containers use flex centering: `display: flex; align-items: center; justify-content: center`
- Icon sizes: 18–20px inside 38–42px containers

### Icon assignments
| Location | Icon |
|---|---|
| Solution — Answers Every Call | `PhoneIncoming` |
| Solution — Books in Real Time | `CalendarCheck` |
| Solution — Always On 24/7 | `Clock` |
| Solution — Escalates When Needed | `Users` |
| HowItWorks steps — Call Received | `PhoneCall` |
| HowItWorks steps — Caller Qualified | `MessageCircle` |
| HowItWorks steps — Appointment Booked | `CalendarCheck` |
| HowItWorks steps — Escalated If Needed | `ShieldCheck` |
| HowItWorks chat widget activity — booking row | `CalendarCheck` (cyan container) |
| HowItWorks chat widget activity — call row | `PhoneCall` (purple container) |
| Dashboard widget hero — AI avatar | `Bot` |
| FAQ toggle open/closed | `Plus` (rotated 45° when open) |
| Trust signal checks | `Check` (small, in cyan circle) |
| Contact form confirmation | `Check` |
| Chat widget send button | `Send` |
| Hero pill live dot | CSS only (no icon) |

---

## 4. Section-by-Section Spec

### 4.1 NavBar
**Change type: Tweak**

- `.nav-wordmark`: remove `font-family: 'Orbitron'`; use Inter 800 with `letter-spacing: 0.18em` at desktop
- Update existing responsive overrides to maintain decreasing tracking: `0.14em` at `max-960`, `0.1em` at `max-640`. The `display: none` at `max-390px` is unchanged
- Nav link font: remove `font-family` declaration (inherits Inter from body)
- `.nav-cta`: remove `font-family: 'DM Sans'` (inherits Inter)
- `.nav-mobile-cta`: remove `font-family: 'DM Sans'` (inherits Inter)
- No structural changes

---

### 4.2 Hero Section
**Change type: Full redesign**

#### Left column (unchanged structure, updated typography)
- H1: Inter 800, `font-size: clamp(2.3rem, 6vw, 5.1rem)`, `letter-spacing: -0.03em`, `line-height: 1.08`
- "NEVER MISS" line: `color: #0a0f1e` (no gradient on first line)
- "A CALL AGAIN." line: gradient `linear-gradient(90deg, #7b2fff, #00d4c0)` — keep this moment
- Sub copy: Inter 400, same size/color as current
- "ALWAYS ON" pill: Inter 700 for text and badge — remove any DM Sans / Space Mono references
- CTAs: unchanged

#### New — Trust signals row
Add below `.hero-actions`, separated by a `1px solid rgba(10,15,30,0.07)` border-top, with `padding-top: 24px; margin-top: 28px`:

```
[✓ No contracts]  [✓ Setup included]  [✓ Cancel anytime]
```

- Each check: Lucide `Check` icon (12px) in a 16×16px circle — `background: rgba(0,212,192,0.12)`, `border: 1px solid rgba(0,212,192,0.3)`, `border-radius: 50%`, `display: flex; align-items: center; justify-content: center`
- Text: Inter 500, 12px, `#8892b0`
- Row: `display: flex; gap: 20px; flex-wrap: wrap; align-items: center`
- Each item: `display: flex; align-items: center; gap: 6px`
- On mobile (<520px): `flex-direction: column; align-items: flex-start; gap: 10px`

#### Right column — Dashboard Widget (replaces orb)
Remove `.orb-card` and all descendant elements: `.orb-core`, `.orb-label`, `.orb-nap`, `.orb-solutions`, `.waveform`, `.wave-bar`, `.orb-chip`, `.chip1`, `.chip2`, `.chip3`, and all their associated CSS. Replace with a new `.dash-widget` element.

**Widget structure:**
```
┌─ Dark topbar (#0a0f1e) ────────────────────────────────┐
│  [● ● ●]  [Bot avatar]  NAP Receptionist    [● LIVE]   │
├─ Widget body (white) ──────────────────────────────────┤
│  Tonight's performance · 6pm – now                      │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │  14           │  │  11           │                    │
│  │  Calls        │  │  Appointments │                    │
│  │  Answered     │  │  Booked       │                    │
│  │  ↑ 100%       │  │  ↑ 79% conv.  │                    │
│  └──────────────┘  └──────────────┘                    │
│  ─────────────────────────────────                      │
│  Recent Activity                                        │
│  [CalendarCheck] Booking Confirmed  Dental · Thu 10am   │
│  [PhoneCall]     Call Answered      New patient inquiry  │
│  [CalendarCheck] Booking Confirmed  Follow-up · Wed 2pm  │
├─ Widget footer ─────────────────────────────────────────┤
│  Est. revenue recovered tonight          $2,750          │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Widget wrapper: `width: clamp(280px, 28vw, 340px)`, `border-radius: 18px`, `border: 1.5px solid rgba(10,15,30,0.09)`, `box-shadow: 0 16px 56px rgba(0,0,0,0.1), 0 4px 16px rgba(123,47,255,0.06)`, `overflow: hidden`
- Topbar: `background: #0a0f1e`, `padding: 12px 18px`, flex row with `gap: 10px`, `align-items: center`
- Traffic light dots: three 8–9px circles — first two `rgba(255,255,255,0.12)`, third `rgba(0,212,192,0.5)`
- Bot avatar: 30×30px circle, `background: linear-gradient(135deg, #7b2fff, #00d4c0)`, `Bot` icon 15px white stroke
- LIVE badge: flex row with 6px cyan pulsing dot + "LIVE" text, Inter 700 9px `#00d4c0`, `letter-spacing: 0.1em`
- Body: white bg, `padding: 18px`
- Date label: Inter 600, 9px, `#8892b0`, `letter-spacing: 0.12em`, `text-transform: uppercase`
- Stats: 2-col grid, `gap: 10px`. Each stat card: `background: #f8f9fb`, `border-radius: 10px`, `padding: 12px`. Number: Inter 800, 26px, `#7b2fff` (calls) / `#00b8a6` (bookings), `letter-spacing: -0.03em`. Label: Inter 500, 10px, `#8892b0`. Trend line: Inter 700, 9px, `#00b8a6`
- Divider: `1px solid rgba(10,15,30,0.06)`, `margin: 14px 0`
- Activity label: Inter 700, 9px, `#8892b0`, `letter-spacing: 0.12em`, `text-transform: uppercase`
- Activity rows: flex, `align-items: center`, `gap: 10px`, `padding: 7px 0`, `border-bottom: 1px solid rgba(10,15,30,0.05)`. Icon container: 26×26px, `border-radius: 8px`. CalendarCheck container: `rgba(0,212,192,0.12)` bg. PhoneCall container: `rgba(123,47,255,0.1)` bg. Title: Inter 600, 11px, `#0a0f1e`. Sub: Inter 400, 9.5px, `#8892b0`. Time: Inter 400, 9px, `#8892b0`, `white-space: nowrap`
- Footer: `background: linear-gradient(135deg, rgba(123,47,255,0.04), rgba(0,212,192,0.04))`, `border-top: 1px solid rgba(10,15,30,0.06)`, `padding: 10px 18px`, flex space-between. Left text: Inter 500, 10px, `#8892b0`. Right value: Inter 700, 12px, `#7b2fff`

**Responsive:**
- <960px: grid collapses to `1fr`, widget moves below text content. Widget retains its `clamp(280px, 28vw, 340px)` width, `justify-self: start`
- <760px: widget hidden (`display: none`) — hero is text-only on mobile

---

### 4.3 Marquee Bar
**Change type: Tweak**

- Remove `font-family: 'Space Mono'` from `.marquee-item` — inherits Inter from body
- `letter-spacing: clamp(2px, 0.6vw, 5px)` — unchanged
- All other styles unchanged

---

### 4.4 Social Proof Placeholder *(New Section)*
**Change type: New component — `SocialProofBar.vue`**

Position: between `<MarqueeBar />` and `<ProblemSection />` in `App.vue`. Does not emit `open-booking`.

**Placeholder slot markup** — each of 5 slots is a `<div class="sp-slot">` containing:
- A 28×28px icon container (`background: #0a0f1e`, `border-radius: 6px`) with a relevant Lucide icon (white stroke, 16px): use `Activity`, `Home`, `Heart`, `Stethoscope`, `Briefcase` for the five slots respectively
- A `<span class="sp-name">` with placeholder business-type name text: "MedClinic", "LawGroup", "WellnessStudio", "DentalCare", "FitLife"
- Each slot: `display: flex; align-items: center; gap: 8px`
- All slots wrapped in `.sp-logos`: `display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap`
- Each slot has `opacity: 0.28` and `filter: grayscale(1)` — both removed when real logos arrive

**Full structure:**
```
"Trusted by appointment-based businesses"   ← Inter 600, 10px, #b0b8cc, letter-spacing 0.18em
[slot] [slot] [slot] [slot] [slot]          ← greyscale 28% opacity
────────────────────────────────────────    ← 1px border
● Client logos coming soon                  ← Inter 500, 11px, #b0b8cc + cyan pulse dot
```

**Styling:**
- Section bg: `#ffffff`
- `border-top: 1px solid rgba(10,15,30,0.08)` / `border-bottom: 1px solid rgba(10,15,30,0.08)`
- `padding-block: 28px`
- `.sp-name`: Inter 700, 13px, `#0a0f1e`
- "Coming soon" row: `border-top: 1px solid rgba(10,15,30,0.06)`, `padding-top: 18px`, `margin-top: 20px`, flex centered, `gap: 7px`. Dot: 6px cyan circle with `box-shadow: 0 0 5px #00d4c0`, `animation: pulse 2s infinite`

**Future-proofing:** When real logos arrive, remove `opacity: 0.28` + `filter: grayscale(1)` from `.sp-slot` and remove the "coming soon" row entirely. Zero layout change required.

---

### 4.5 Problem Section
**Change type: Tweak**

- All font references → Inter (remove `font-family: 'Orbitron'` from `.stat-card .big`)
- `.problem-item p`: inherits Inter from body — remove any explicit font-family
- No structural changes

---

### 4.6 Cost / Revenue Section
**Change type: Tweak**

- `.cost-big`: Inter 800 replaces Orbitron 900 — remove `font-family: 'Orbitron'`
- `.cost-op`: Inter 800 replaces Orbitron 900 — remove `font-family: 'Orbitron'`
- `.cost-lbl`: inherits Inter
- All other styles unchanged — the equation layout works well

---

### 4.7 Solution Section
**Change type: Full redesign**

**Data layer change:** Update `src/data/solutionData.js`. Replace the current flat `solutionItems` string array with a structured `solutionCards` array of objects:

```js
export const solutionCards = [
  {
    icon: 'PhoneIncoming',
    iconVariant: 'purple',
    title: 'Answers Every Call',
    desc: 'Picks up instantly — no hold time, no voicemail, no missed opportunity.',
  },
  {
    icon: 'CalendarCheck',
    iconVariant: 'cyan',
    title: 'Books in Real Time',
    desc: 'Qualifies the caller and confirms the appointment before the call ends.',
  },
  {
    icon: 'Clock',
    iconVariant: 'purple',
    title: 'Always On — 24/7',
    desc: 'Evenings, weekends, holidays. Your front desk never goes dark.',
  },
  {
    icon: 'Users',
    iconVariant: 'cyan',
    title: 'Escalates When Needed',
    desc: 'Complex cases are handed off to your team — nothing falls through.',
  },
]
```

Update the import in `SolutionSection.vue` from `solutionItems` to `solutionCards`.

**New template structure:**
```
[eyebrow] The Solution
[H2] An AI Receptionist That Never Clocks Out.
[sub] NAP Solutions answers every call...

[2×2 feature card grid]

[Inline CTA strip]
```

**Card styling:**
- Background: `#f8f9fb`, `border: 1.5px solid rgba(10,15,30,0.06)`, `border-radius: 12px`, `padding: 18px 16px`
- Top gradient bar: `::before` pseudo, `height: 2px`, `background: linear-gradient(90deg, #7b2fff, #00d4c0)`, `opacity: 0` at rest → `opacity: 1` on hover, `transition: opacity 0.2s`
- Purple icon containers (`iconVariant: 'purple'`): `background: rgba(123,47,255,0.08)`, `border: 1px solid rgba(123,47,255,0.15)`, icon stroke `#7b2fff`
- Cyan icon containers (`iconVariant: 'cyan'`): `background: rgba(0,212,192,0.08)`, `border: 1px solid rgba(0,212,192,0.2)`, icon stroke `#00b8a6`
- Icon container size: 38×38px, `border-radius: 10px`, `margin-bottom: 12px`
- Title: Inter 700, 13px (not 15px — matches card size), `#0a0f1e`, `letter-spacing: -0.01em`, `margin-bottom: 5px`
- Description: Inter 400, 12px, `#8892b0`, `line-height: 1.6`
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: clamp(1.8rem, 5vw, 3rem)`
- Responsive: `grid-template-columns: 1fr` at <640px

**Inline CTA strip:**
- `background: linear-gradient(135deg, rgba(123,47,255,0.05), rgba(0,212,192,0.05))`
- `border: 1.5px solid rgba(123,47,255,0.12)`, `border-radius: 12px`, `padding: 14px 18px`, `margin-top: 18px`
- `display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap`
- Text: Inter 600, 13px, `#0a0f1e`. "Let's talk." span: `color: #7b2fff`
- Button: `.btn-primary` with overriding `font-size: 12px; padding: 9px 18px; min-height: auto`

---

### 4.8 How It Works Section
**Change type: Redesign**

Remove the existing `functions-grid` auto-fit layout and the `func-card.filler` element entirely. Replace with a two-column layout.

**Layout:**
```css
display: grid;
grid-template-columns: 1fr 300px;
gap: 36px;
align-items: start;
margin-top: clamp(1.8rem, 5vw, 3rem);
```

**Step cards (left column):**
- `.steps-col`: `display: flex; flex-direction: column; gap: 12px`
- Each `.step-card`: white bg, `border-radius: 14px`, `border: 1.5px solid rgba(10,15,30,0.07)`, `padding: 20px 22px`, flex row, `gap: 18px`, `align-items: flex-start`, `box-shadow: 0 2px 12px rgba(0,0,0,0.04)`, `position: relative; overflow: hidden`
- Left accent bar via `::before`: `position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: linear-gradient(180deg, #7b2fff, #00d4c0); opacity: 0` → `opacity: 1` on hover
- Icon wrap: flex column, `align-items: center`, contains icon container + step number below
- Icon container: 42×42px, `border-radius: 11px`. Steps 1 & 3: purple variant. Steps 2 & 4: cyan variant (same tints as Solution cards)
- Step number: Inter 700, 9px, `#00d4c0`, `letter-spacing: 0.1em`, `margin-top: 6px`
- Step title: Inter 700, 15px, `#0a0f1e`, `letter-spacing: -0.01em`, `margin-bottom: 5px`
- Step description: Inter 400, 13px, `#8892b0`, `line-height: 1.7`

**Chat widget (right column):**
- `.chat-col`: `position: sticky; top: 100px`
- Widget overall: `border-radius: 18px`, `border: 1.5px solid rgba(10,15,30,0.14)`, `box-shadow: 0 16px 48px rgba(10,15,30,0.12), 0 3px 10px rgba(123,47,255,0.08)`, `overflow: hidden`
- **Header** (`background: #0a0f1e`, `padding: 14px 18px`): traffic light dots (3 dots: first two `rgba(255,255,255,0.12)`, third `rgba(0,212,192,0.5)`) + Bot avatar (30×30px gradient circle with `Bot` icon, white stroke, 15px) + name/sub (`ch-name`: Inter 700, 11px, `rgba(255,255,255,0.9)` / `ch-sub`: Inter 400, 9.5px, `rgba(255,255,255,0.38)`) + LIVE badge (6px cyan dot + Inter 700, 9px `#00d4c0`)
- **Chat body** (`background: #f0f2f8`, `padding: 16px 14px`): flex column, `gap: 6px`
  - AI bubbles: `background: #fff`, `border: 1.5px solid rgba(10,15,30,0.08)`, `color: #0a0f1e`, `border-bottom-left-radius: 4px`, `align-self: flex-start`, `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`. Inter 400, 12px, `line-height: 1.6`
  - Caller bubbles: `background: #1a2240`, `color: rgba(255,255,255,0.88)`, `border-bottom-right-radius: 4px`, `align-self: flex-end`, `text-align: right`
  - Bubble meta text: Inter 500, 9px, `#9aa0b8`
  - Both bubble types: `border-radius: 14px`, `padding: 10px 13px`, `max-width: 88%`
- **Confirmation card**: `background: #fff`, `border: 1.5px solid rgba(0,212,192,0.3)`, `border-radius: 14px`, `padding: 12px 14px`. Icon wrap: 24×24px, `border-radius: 7px`, `background: rgba(0,212,192,0.12)`, `border: 1px solid rgba(0,212,192,0.25)`. Label: Inter 700, 10px, `#00897b`, `letter-spacing: 0.08em`. Detail: Inter 400, 11px, `#4a5580`, `line-height: 1.65`. Strong tags: `color: #0a0f1e; font-weight: 600`
- **Footer** (`background: #f8f9fc`, `padding: 11px 14px`, `border-top: 1px solid rgba(10,15,30,0.07)`): input mock (Inter 400, 11px, `#b0b8cc`, `background: #fff`, `border: 1.5px solid rgba(10,15,30,0.09)`, `border-radius: 10px`) + Send button (32×32px, gradient, `border-radius: 9px`, `box-shadow: 0 3px 10px rgba(123,47,255,0.3)`)
- **Filler card**: remove `.func-card.filler` and all `.filler-label` / `.filler-text` CSS entirely

**Responsive:**
- <960px: `grid-template-columns: 1fr`. Chat widget goes below steps, loses sticky, retains full width
- <640px: chat widget `display: none`, steps only

---

### 4.9 Pricing Section
**Change type: Tweak**

- `.pricing-tier`: remove `font-family: 'Space Mono'` — inherits Inter. Keep `letter-spacing: 0.2em` and other styles
- `.pricing-mins`: inherits Inter
- `.pricing-footer`: inherits Inter
- All other styles unchanged

---

### 4.10 FAQ Section
**Change type: Simplify**

**Remove from `<script setup>`:**
- `searchQuery` ref
- `activeTab` ref
- `setTab` function
- `filteredItems` computed
- `visibleItems` computed
- `noResults` computed
- `faqCategories` import from `faqData`

**Remove from template:**
- `.faq-search-wrap` div and its `<input>` and `.faq-search-icon`
- `.faq-tabs` div and all `<button>` tab elements
- `v-if="noResults"` no-results div
- Change `v-for="item in visibleItems"` → `v-for="(item, i) in faqItems"` with `:key="i"` and `openIndex === i` for open state

**Remove from CSS:**
- `.faq-search-wrap`, `.faq-search`, `.faq-search:focus`, `.faq-search-icon`
- `.faq-tabs`, `.faq-tab`, `.faq-tab:hover`, `.faq-tab.active`
- `.no-results`
- Responsive overrides for `.faq-search-wrap` and `.faq-tabs` at `max-640`

**`faqData.js` cleanup:**
- Remove the `faqCategories` export entirely
- Remove the `cat` property from every `faqItem` object (dead code after tab removal)
- Keep all question/answer content unchanged

**FAQ icon update:**
- Replace `<span class="faq-icon" aria-hidden="true">+</span>` with `<Plus :size="13" class="faq-icon-svg" />`
- Keep the existing `.faq-icon` span as the container element — it retains its 30×30px circle, background, border, and `transform: rotate(45deg)` on open. Only the inner content changes from `+` text to the `Plus` component
- Add to scoped CSS: `.faq-icon :deep(svg) { display: block; }` to prevent baseline offset

**Keep unchanged:**
- `openIndex` ref and `toggleItem` function
- `faqItems` import
- All accordion item markup and open/close CSS
- Inline CTA block at bottom

---

### 4.11 CTA Section
**Change type: Simplify**

**Remove from `<script setup>`:**
- `name`, `email`, `message`, `sending`, `sent` refs
- `submitForm` function (moves to `ContactSection.vue`)

**Remove from template:**
- Entire `.contact-wrap` div and all descendants (`.contact-label`, `.form-success`, `.contact-form`, `.cta-disclaimer`)

**Remove from CSS:**
- `.contact-wrap`, `.contact-label`, `.form-success`, `.success-icon`, `.success-title`, `.success-sub`, `.contact-form`, `.form-input`, `.form-textarea`, `.cta-disclaimer`
- Responsive overrides for these at `max-640`

**Keep in template:**
- `.cta-bg` mesh div
- `.section-eyebrow.center` ("Get Started")
- `h2.grad-text.center` ("Ready to Stop Missing Revenue?")
- `.cta-sub` paragraph
- `.cta-btn` Book a Demo button

**Add to template** — trust signals row, identical content to hero, centered alignment:
```html
<div class="cta-trust">
  <div class="trust-item"><Check :size="11" class="trust-check-icon" />No contracts</div>
  <div class="trust-item"><Check :size="11" class="trust-check-icon" />Setup included</div>
  <div class="trust-item"><Check :size="11" class="trust-check-icon" />Cancel anytime</div>
</div>
```
- `.cta-trust`: `display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 20px`
- `.trust-item`: `display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: #8892b0`
- `.trust-check-icon`: wrap in a 16×16px flex circle container — same cyan circle as hero version. No border-top separator here (CTA section is already visually separated by the section background)

---

### 4.12 Contact Section *(New — split from CTA)*
**Change type: New component — `ContactSection.vue`**

Position: between `<CtaSection />` and `<SiteFooter />` in `App.vue`. Does not emit `open-booking`.

Move all form logic from `CtaSection.vue` into this component: `name`, `email`, `message`, `sending`, `sent` refs, `submitForm` function, and Formspree fetch — all unchanged.

**Desktop layout (≥960px):** flex row, `justify-content: space-between`, `align-items: flex-start`, `gap: 48px`
- Left copy block: `max-width: 400px`
- Right form: `width: 300px`, `flex-shrink: 0`

**Responsive (<960px):** `flex-direction: column`, `gap: 32px`. Both blocks go full width. Left block loses its `max-width` constraint. `padding-block` reduces from 48px to `clamp(2rem, 5vw, 3rem)`.

**Success state:** When `sent === true`, replace only the right-side form column with the success card (same markup and CSS as the current `CtaSection.vue` `.form-success` block). The left copy block remains visible at all times.

**Styling:**
- `background: #ffffff`, `border-top: 1px solid rgba(10,15,30,0.07)`
- `padding-block: 48px`
- Left eyebrow label: Inter 700, 10px, `#7b2fff`, `letter-spacing: 0.16em`, `text-transform: uppercase`, `margin-bottom: 6px`
- Left heading: Inter 700, 18px, `#0a0f1e`, `letter-spacing: -0.01em`, `margin-bottom: 8px`
- Left body text: Inter 400, 14px, `#8892b0`, `line-height: 1.65`
- Form inputs: same `.form-input` styles as current `CtaSection.vue` — keep scoped CSS identical
- Textarea: `resize: vertical`, `min-height: 80px`
- Submit button: `.btn-primary`, `width: 100%`
- Disclaimer ("NO CONTRACTS · CANCEL ANYTIME"): Inter 500, 12px, `#8892b0`, `text-align: center`, `margin-top: 12px`, `letter-spacing: 0.06em`

---

### 4.13 Site Footer
**Change type: Tweak**

- `.footer-wordmark`: remove `font-family: 'Orbitron'`; use Inter 800 with `letter-spacing: 0.18em` at desktop. Responsive overrides: `0.14em` at `max-640` (keep existing responsive rule, just remove Orbitron)
- `.footer-tagline`: remove `font-family: 'Space Mono'`; Inter 700, `letter-spacing: 0.14em`
- `.footer-col h4`: inherits Inter (remove any explicit font-family)
- All other styles unchanged

---

## 5. New Dependencies

```bash
npm install lucide-vue-next
```

Import per component as needed — example for `SolutionSection.vue`:
```js
import { PhoneIncoming, CalendarCheck, Clock, Users } from 'lucide-vue-next'
```

Full import list across all components:
`PhoneIncoming`, `CalendarCheck`, `Clock`, `Users`, `PhoneCall`, `MessageCircle`, `ShieldCheck`, `Plus`, `Check`, `Send`, `Bot`, `Activity`, `Home`, `Heart`, `Stethoscope`, `Briefcase`

---

## 6. Global CSS Changes (`main.css`)

1. Remove Google Fonts `@import` for Orbitron, DM Sans, Space Mono
2. Add: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap')`
3. Update `body { font-family: 'Inter', sans-serif; }`
4. Update `h2` base rule: remove `font-family: 'Orbitron'`; set `letter-spacing: -0.025em` (H2 only — H1 is set per-component at `-0.03em`)
5. Remove `font-family: 'DM Sans'` from `.btn-primary` and `.btn-ghost` (both inherit Inter from body)

---

## 7. `tailwind.config.js` Changes

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  // orbitron and mono entries removed
},
```

---

## 8. `App.vue` Changes

```vue
<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBar from './components/MarqueeBar.vue'
import SocialProofBar from './components/SocialProofBar.vue'       // NEW
import ProblemSection from './components/ProblemSection.vue'
import CostSection from './components/CostSection.vue'
import SolutionSection from './components/SolutionSection.vue'
import HowItWorksSection from './components/HowItWorksSection.vue'
import PricingSection from './components/PricingSection.vue'
import FaqSection from './components/FaqSection.vue'
import CtaSection from './components/CtaSection.vue'
import ContactSection from './components/ContactSection.vue'        // NEW
import SiteFooter from './components/SiteFooter.vue'
import BookingModal from './components/BookingModal.vue'

const bookingOpen = ref(false)
function openBooking() { bookingOpen.value = true }
function closeBooking() { bookingOpen.value = false }
</script>

<template>
  <NavBar @open-booking="openBooking" />
  <main>
    <HeroSection @open-booking="openBooking" />
    <MarqueeBar />
    <SocialProofBar />
    <ProblemSection />
    <CostSection />
    <SolutionSection />
    <HowItWorksSection />
    <PricingSection @open-booking="openBooking" />
    <FaqSection @open-booking="openBooking" />
    <CtaSection @open-booking="openBooking" />
    <ContactSection />
  </main>
  <SiteFooter @open-booking="openBooking" />
  <BookingModal :open="bookingOpen" @close="closeBooking" />
</template>
```

`SocialProofBar` and `ContactSection` do not emit `open-booking` — no event binding needed on them.

---

## 9. What Is Explicitly Out of Scope

- Pricing data or plan structure changes
- FAQ question/answer content changes
- Booking modal redesign
- Any backend or Formspree configuration changes
- Animations beyond what currently exists
- Dark mode
- Any new pages or routes
- Testimonials/social proof content (placeholder only — no real client data)

---

## 10. Design Decisions Log

| Decision | Choice | Reason |
|---|---|---|
| Typography | Full Inter (A) | Cleaner SaaS feel, single font system, easier maintenance |
| Social proof | Placeholder only | No confirmed clients yet; space reserved for future |
| Hero visual | Dashboard widget (C) | Shows outcomes (calls answered, bookings made) concretely |
| Chat UI in HowItWorks | Added per user request | Shows product in action mid-funnel |
| Chat UI style | Hybrid (dark header, tinted body) | Too dark was jarring; too light blended with step cards |
| FAQ | Remove search + tabs | Landing page FAQ needs zero friction; accordion only is sufficient |
| CTA / Contact | Split into two sections | Eliminates decision paralysis; CTA stays conversion-focused |
| Icon library | Lucide (`lucide-vue-next`) | Clean SVGs, Vue-native, consistent with site's geometric style |
| Section order | Unchanged for existing sections | Current narrative (Problem → Cost → Solution → HowItWorks → Pricing → FAQ → CTA) is solid |
