# NAP Solutions Site Redesign — Design Spec

**Date:** 2026-03-26
**Approach:** Targeted High-Impact Redesign (Approach 1)
**Scope:** All existing components updated in place. Two new sections added. One section split. Section order unchanged.

---

## 1. Overview

A component-level redesign of the NAP Solutions landing page. No section reordering. Every section gets meaningfully improved. The goal is a cleaner, more professional SaaS feel with better conversion flow and a clear path to adding social proof when client relationships are confirmed.

### What is NOT changing
- Section order: NavBar → Hero → Marquee → Problem → Cost → Solution → HowItWorks → Pricing → FAQ → CTA → Footer
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
- H1 letter-spacing: `-0.03em` (tighter than Orbitron's `0.02em`)
- H2 letter-spacing: `-0.025em`
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
| HowItWorks — Call Received | `PhoneCall` |
| HowItWorks — Caller Qualified | `MessageCircle` |
| HowItWorks — Appointment Booked | `CalendarCheck` |
| HowItWorks — Escalated If Needed | `ShieldCheck` |
| Dashboard widget (hero) | `Bot` (AI avatar) |
| FAQ toggle open/closed | `Plus` (rotated 45° when open) |
| Trust signal checks | `Check` (small, in cyan circle) |
| Contact form confirmation | `Check` |
| Chat widget send button | `Send` |
| Hero pill live dot | CSS only (no icon) |

---

## 4. Section-by-Section Spec

### 4.1 NavBar
**Change type: Tweak**

- Font → Inter. Remove all `font-family: 'Orbitron'` from `.nav-wordmark`; use Inter 800 with `letter-spacing: 0.18em`
- Nav link font → Inter 500 (was DM Sans 500 — functionally same)
- `.nav-cta` button → Inter 700 (was DM Sans 700)
- `.nav-mobile-cta` → Inter 700
- No structural changes

---

### 4.2 Hero Section
**Change type: Full redesign**

#### Left column (unchanged structure, updated typography)
- H1: Inter 800, `font-size: clamp(2.3rem, 6vw, 5.1rem)`, `letter-spacing: -0.03em`, `line-height: 1.08`
- "NEVER MISS" line: `color: #0a0f1e` (no gradient on first line)
- "A CALL AGAIN." line: gradient `linear-gradient(90deg, #7b2fff, #00d4c0)` — keep this moment
- Sub copy: Inter 400, same size/color as current
- "ALWAYS ON" pill: Inter 700 for text, Inter 700 for badge
- CTAs: unchanged

#### New — Trust signals row
Add below `.hero-actions`, separated by a 1px border-top:

```
[✓ No contracts]  [✓ Setup included]  [✓ Cancel anytime]
```

- Cyan checkmark in a 16px circle (rgba(0,212,192,0.12) bg, rgba(0,212,192,0.3) border)
- Text: Inter 500, 12px, `#8892b0`
- Row: `display: flex; gap: 20px; flex-wrap: wrap`
- On mobile (<520px): stack to column, align left

#### Right column — Dashboard Widget (replaces orb)
Replace `.orb-card` and all orb/chip/waveform markup with a new `.dash-widget` component.

**Widget structure:**
```
┌─ Dark topbar (#0a0f1e) ────────────────────────────────┐
│  [● ● ●]  NAP Receptionist              [● LIVE]        │
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
│  [📅] Booking Confirmed  Dental · Thu 10am    2m ago    │
│  [📞] Call Answered      New patient inquiry  7m ago    │
│  [📅] Booking Confirmed  Follow-up · Wed 2pm  14m ago   │
├─ Widget footer ─────────────────────────────────────────┤
│  Est. revenue recovered tonight          $2,750          │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Widget: `width: clamp(280px, 28vw, 340px)`, white bg, `border-radius: 18px`, `border: 1.5px solid rgba(10,15,30,0.09)`, `box-shadow: 0 16px 56px rgba(0,0,0,0.1)`
- Topbar: `background: #0a0f1e`, `border-radius: 18px 18px 0 0`, `padding: 12px 18px`
- Traffic light dots: decorative only, grey/grey/cyan
- LIVE badge: cyan text, no background pill needed
- Stats grid: 2 columns, `background: #f8f9fb`, border-radius 10px, purple stat number Inter 800
- Activity icons: Lucide `CalendarCheck` (cyan container) and `Phone` (purple container), 26×26px containers
- Footer: `background: linear-gradient(135deg, rgba(123,47,255,0.04), rgba(0,212,192,0.04))`, border-top
- Revenue figure: Inter 700, `#7b2fff`

**Responsive:**
- <960px: widget moves below content, `justify-self: start`
- <760px: widget hidden (`display: none`) — hero is text-only on mobile

---

### 4.3 Marquee Bar
**Change type: Tweak**

- Font → Inter 700, `letter-spacing: clamp(2px, 0.6vw, 5px)`
- Remove `font-family: 'Space Mono'`
- All other styles unchanged

---

### 4.4 Social Proof Placeholder *(New Section)*
**Change type: New component — `SocialProofBar.vue`**

Position: between `<MarqueeBar />` and `<ProblemSection />` in `App.vue`

**Structure:**
```
"Trusted by appointment-based businesses"
[Logo] Business Name  ×5 slots  (greyscale, 28% opacity)
─────────────────────────────────────────────────────
● Client logos coming soon — currently in active onboarding
```

**Styling:**
- Section bg: `#ffffff`
- `border-top: 1px solid rgba(10,15,30,0.08)` / `border-bottom: 1px solid rgba(10,15,30,0.08)`
- `padding-block: 28px`
- Label: Inter 600, 10px, `letter-spacing: 0.18em`, `#b0b8cc`
- Logo slots: flex row, centered, `gap: 32px`, `flex-wrap: wrap`
- Each slot: `opacity: 0.28`, `filter: grayscale(1)`
- "Coming soon" line: Inter 500, 11px, `#b0b8cc`, with cyan pulsing dot

**Future-proofing:** When real logos arrive, remove `opacity` + `filter: grayscale(1)` from slots and remove the "coming soon" line. Zero layout change required.

---

### 4.5 Problem Section
**Change type: Tweak**

- All font references → Inter
- Stat card `.big` number: Inter 800, remove `font-family: 'Orbitron'`
- `.problem-item p`: Inter 400
- `.problem-arrow`: Inter 700 for the arrow character
- No structural changes

---

### 4.6 Cost / Revenue Section
**Change type: Tweak**

- `.cost-big`: Inter 800 replaces Orbitron 900
- `.cost-op`: Inter 800 replaces Orbitron 900
- `.cost-lbl`: Inter 500
- All other styles unchanged — the equation layout works well

---

### 4.7 Solution Section
**Change type: Full redesign**

Replace the current vertical checklist with a **2×2 feature card grid**.

**New structure:**
```
[eyebrow] The Solution
[H2] An AI Receptionist That Never Clocks Out.
[sub] NAP Solutions answers every call, qualifies the caller, and books the appointment...

┌──────────────────┐  ┌──────────────────┐
│ [PhoneIncoming]  │  │ [CalendarCheck]   │
│ Answers Every    │  │ Books in          │
│ Call             │  │ Real Time         │
│ Picks up         │  │ Qualifies and     │
│ instantly...     │  │ confirms...       │
└──────────────────┘  └──────────────────┘
┌──────────────────┐  ┌──────────────────┐
│ [Clock]          │  │ [Users]           │
│ Always On — 24/7 │  │ Escalates         │
│ Evenings,        │  │ When Needed       │
│ weekends...      │  │ Complex cases...  │
└──────────────────┘  └──────────────────┘

┌─ Inline CTA strip ───────────────────────────────────────┐
│  Ready to put your front desk on autopilot? Let's talk.  │
│                                               [Book Demo] │
└──────────────────────────────────────────────────────────┘
```

**Card styling:**
- Background: `#f8f9fb`, border: `1.5px solid rgba(10,15,30,0.06)`, border-radius: 12px
- Top gradient bar (2px, purple→cyan, `opacity: 0` at rest, `opacity: 1` on hover)
- Icon container: 38×38px, border-radius 10px, alternating purple/cyan tint
- Purple icon containers: `rgba(123,47,255,0.08)` bg, `rgba(123,47,255,0.15)` border, purple icon stroke
- Cyan icon containers: `rgba(0,212,192,0.08)` bg, `rgba(0,212,192,0.2)` border, `#00b8a6` icon stroke
- Title: Inter 700, 15px, `#0a0f1e`, `letter-spacing: -0.01em`
- Description: Inter 400, 13px, `#8892b0`, `line-height: 1.7`
- Grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 14px`
- Responsive: single column at <640px

**Inline CTA strip:**
- `background: linear-gradient(135deg, rgba(123,47,255,0.05), rgba(0,212,192,0.05))`
- `border: 1.5px solid rgba(123,47,255,0.12)`, border-radius 12px
- `padding: 14px 18px`, `margin-top: 18px`
- Flex row, space-between, wraps on mobile
- Text: Inter 600, 13px; "Let's talk." in `#7b2fff`
- Button: `.btn-primary` at reduced size (12px, padding 9px 18px)

---

### 4.8 How It Works Section
**Change type: Redesign**

Replace the auto-fit card grid with a **two-column layout**: step cards left, chat UI right.

**Layout:**
```
grid-template-columns: 1fr 300px
gap: 36px
```

**Step cards (left):**
- Stack of 4 cards, `gap: 12px`, white bg, `border-radius: 14px`
- Each card: flex row, icon-wrap left + content right
- Icon wrap: Lucide icon in 42×42 container + step number below
- Step number: Inter 700, 9px, `#00d4c0`, `letter-spacing: 0.1em`
- Left accent bar: 3px gradient, `opacity: 0` → `opacity: 1` on hover
- 4 steps: Call Received / Caller Qualified / Appointment Booked / Escalated If Needed

**Chat widget (right) — Hybrid light/dark:**
- Overall: white card, `border-radius: 18px`, `border: 1.5px solid rgba(10,15,30,0.14)`, strong shadow
- **Header** (`#0a0f1e`): traffic light dots + Bot avatar (gradient circle) + name/sub + LIVE badge
- **Chat body** (`#f0f2f8`): tinted background to separate from white step cards
  - AI bubbles: white card, `border: 1px solid rgba(10,15,30,0.09)`, dark text
  - Caller bubbles: `#1a2240`, light text, right-aligned
  - Bubble meta: Inter 500, 9px, `#9aa0b8`
- **Confirmation card**: white, `border: 1.5px solid rgba(0,212,192,0.3)`, Check icon in cyan container
- **Footer**: `#f8f9fc`, input mock + Send button (gradient)
- **Sticky on desktop**: `position: sticky; top: 100px` so it stays visible while scrolling steps
- **Filler card removed**: "POWERED BY AI" card gone entirely

**Responsive:**
- <960px: single column, chat widget below steps
- <640px: chat widget hidden, steps only

---

### 4.9 Pricing Section
**Change type: Tweak**

- `.pricing-tier`: Inter 700, `letter-spacing: 0.2em` (remove Space Mono)
- `.pricing-mins`: Inter 500
- `.pricing-footer`: Inter 500
- All other styles unchanged

---

### 4.10 FAQ Section
**Change type: Simplify**

**Remove entirely:**
- `.faq-search-wrap` and `faq-search` input
- `.faq-tabs` and all tab/category logic
- `searchQuery`, `activeTab`, category filtering from `<script setup>`
- `faqCategories` import from faqData
- Related CSS

**Keep:**
- `openIndex` accordion toggle logic
- `faqItems` data (all questions, no category filtering needed)
- Inline CTA block at bottom

**Updated `filteredItems`:** Remove — just use `faqItems` directly, no computed filtering needed.

**Icon update:**
- Replace `<span class="faq-icon">+</span>` with Lucide `Plus` component
- Add `display: block` to icon SVG to prevent baseline offset
- Rotate 45° on open state via CSS transform

---

### 4.11 CTA Section
**Change type: Simplify**

**Remove from `CtaSection.vue`:**
- Entire `.contact-wrap` div (label, form, success state, disclaimer)
- `name`, `email`, `message`, `sending`, `sent` refs
- `submitForm` function
- Formspree fetch call
- All contact form CSS

**Keep:**
- Eyebrow, H2, sub copy, primary CTA button
- Background gradient and mesh
- Trust signals row (same as hero — add here too for conversion reinforcement)

---

### 4.12 Contact Section *(New — split from CTA)*
**Change type: New component — `ContactSection.vue`**

Position: between `<CtaSection />` and `<SiteFooter />` in `App.vue`

Move all contact form logic from `CtaSection.vue` into this new component.

**Structure (horizontal band):**
```
┌─ Left: copy ─────────────────────────────────────────────┐
│  HAVE A QUESTION?                                         │
│  We'll get back to you within 24 hours.                   │
│  Not ready to book? Send us a message...                  │
└───────────────────────────────────────────────────────────┘
┌─ Right: form (260px wide) ───────────────────────────────┐
│  [Your name          ]                                    │
│  [Your email         ]                                    │
│  [Your question...   ]                                    │
│  [        Send Message        ]                           │
└───────────────────────────────────────────────────────────┘
```

**Styling:**
- `background: #ffffff`, `border-top: 1px solid rgba(10,15,30,0.07)`
- `padding-block: 48px`
- Layout: flex row, space-between, `gap: 48px`
- Left max-width: 400px
- Right: fixed 300px wide form
- Responsive (<960px): stack to column

**Formspree:** Move the existing fetch logic from `CtaSection.vue` into this component unchanged.

---

### 4.13 Site Footer
**Change type: Tweak**

- `.footer-wordmark`: Inter 800, `letter-spacing: 0.18em` (remove Orbitron)
- `.footer-tagline`: Inter 700, `letter-spacing: 0.14em` (remove Space Mono)
- `.footer-col h4`: Inter 700
- All other styles unchanged

---

## 5. New Dependencies

```bash
npm install lucide-vue-next
```

Import per component as needed:
```js
import { PhoneIncoming, CalendarCheck, Clock, Users, PhoneCall, MessageCircle, ShieldCheck, Plus, Check, Send, Bot } from 'lucide-vue-next'
```

---

## 6. Global CSS Changes (`main.css`)

1. Remove Google Fonts import for Orbitron, DM Sans, Space Mono
2. Add Inter import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap')`
3. Update `body { font-family: 'Inter', sans-serif; }`
4. H1 and H2 base styles: remove `font-family: 'Orbitron'`, update `letter-spacing` to `-0.025em`
5. `.btn-primary` and `.btn-ghost`: remove `font-family: 'DM Sans'` (will inherit Inter from body)

---

## 7. `tailwind.config.js` Changes

```js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  // Remove: orbitron, mono
},
```

---

## 8. `App.vue` Changes

```vue
import SocialProofBar from './components/SocialProofBar.vue'
import ContactSection from './components/ContactSection.vue'

// Template order:
<NavBar />
<HeroSection />
<MarqueeBar />
<SocialProofBar />         // NEW
<ProblemSection />
<CostSection />
<SolutionSection />
<HowItWorksSection />
<PricingSection />
<FaqSection />
<CtaSection />
<ContactSection />         // NEW (form moved here from CtaSection)
<SiteFooter />
<BookingModal />
```

---

## 9. What Is Explicitly Out of Scope

- Pricing data or plan structure changes
- FAQ content changes (questions/answers)
- Booking modal redesign
- Any backend or Formspree configuration changes
- Animations beyond what currently exists
- Dark mode
- Any new pages or routes
- Testimonials/social proof content (placeholder only)

---

## 10. Design Decisions Log

| Decision | Choice | Reason |
|---|---|---|
| Typography | Full Inter (A) | Cleaner SaaS feel, single font system, easier maintenance |
| Social proof | Placeholder only | No confirmed clients yet; space reserved for future |
| Hero visual | Dashboard widget (C) | Shows outcomes (calls answered, bookings made) without explaining the product |
| Chat UI in HowItWorks | Phone/chat UI (B) per user request | Shows product in action mid-funnel |
| Chat UI style | Hybrid (dark header, tinted body) | Too dark was jarring; too light blended with step cards |
| FAQ | Remove search + tabs | Landing page FAQ needs zero friction; 6–8 questions is sufficient |
| CTA / Contact | Split into two sections | Eliminates decision paralysis; CTA stays conversion-focused |
| Icon library | Lucide (`lucide-vue-next`) | Clean SVGs, Vue-native, consistent with site's geometric style |
| Section order | Unchanged | Current narrative (Problem → Cost → Solution → HowItWorks → Pricing → FAQ → CTA) is solid |
