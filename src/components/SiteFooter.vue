<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useScrollToSection } from '../composables/useScrollToSection'

defineEmits(['open-booking'])

const innerRef = ref(null)
const { scrollToSection } = useScrollToSection()
useScrollReveal(() => [innerRef.value], { threshold: 0.05 })

function scrollTo(id) {
  scrollToSection(id)
}
</script>

<template>
  <footer class="footer">
    <div class="footer-inner" ref="innerRef">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand-row">
            <div class="footer-mark">
              <span class="footer-mark-dot"></span>
            </div>
            <span class="footer-wordmark">NAP SOLUTIONS</span>
          </div>
          <p>
            AI-powered receptionists that answer every call, book every
            appointment, and never clock out.
          </p>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li @click="scrollTo('pricing')">Pricing</li>
            <li @click="scrollTo('faq')">FAQ</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li @click="scrollTo('hero')">About NAP</li>
            <li @click="$emit('open-booking')">Book a Demo</li>
            <li @click="scrollTo('contact')">Contact</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            <li class="no-hover">
              <a href="mailto:info@getnapsolutions.com" class="footer-email">
                info@getnapsolutions.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="social-row">
        <a
          href="https://www.instagram.com/getnapsolutions"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          getnapsolutions
        </a>
        <a
          href="https://www.tiktok.com/@napsolutions"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
          </svg>
          napsolutions
        </a>
      </div>

      <div class="footer-bottom">
        <span>&copy; 2026 NAP SOLUTIONS · ALL RIGHTS RESERVED</span>
        <span class="footer-tagline">BOOK · ANSWER · AUTOMATE</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--text-main);
  padding: clamp(3rem, 6vw, 4.2rem) 0 32px;
  color: rgba(255, 255, 255, 0.6);
}
.footer-inner {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.footer-inner[data-revealed] {
  opacity: 1;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: clamp(1.5rem, 4vw, 3.2rem);
  margin-bottom: 48px;
}
.footer-brand .brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer-brand p {
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 16px;
  max-width: 290px;
}
.footer-mark {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--brand-rgb), 0.15));
  border: 1px solid rgba(var(--accent-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-mark-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.footer-wordmark {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 5px;
  background: linear-gradient(90deg, #fff 0%, var(--accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-col h4 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-bottom: 18px;
}
.footer-col ul {
  list-style: none;
  padding: 0;
}
.footer-col li {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.2s;
  width: fit-content;
  line-height: 1.4;
}
.footer-col li:hover {
  color: rgba(255, 255, 255, 0.8);
}
.footer-col li.no-hover {
  cursor: default;
}
.footer-email {
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-email:hover {
  color: rgba(255, 255, 255, 0.85);
}
.social-row {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 20px 0 0;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
}
.social-link {
  display: flex;
  align-items: center;
  gap: 9px;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s;
}
.social-link:hover {
  color: rgba(255, 255, 255, 0.8);
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.2);
  flex-wrap: wrap;
  gap: 10px;
}
.footer-tagline {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgba(var(--accent-rgb), 0.4);
}

@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-col li {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 960px) and (min-width: 641px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .footer-wordmark {
    font-size: 14px;
    letter-spacing: 0.14em;
  }

  .footer-brand p,
  .footer-col li {
    font-size: 15px;
  }

  .social-row {
    gap: 14px;
  }

  .social-link {
    font-size: 14px;
  }

  .footer-bottom {
    justify-content: center;
    text-align: center;
  }

  .footer-tagline {
    letter-spacing: 0.16em;
  }
}
</style>
