<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <div class="pp-page">
    <header class="pp-header">
      <div class="pp-header-inner">
        <button class="pp-back" @click="router.push('/')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </button>
        <div class="pp-wordmark">NAP SOLUTIONS</div>
      </div>
    </header>

    <main class="pp-main">
      <div class="pp-inner">
        <div class="pp-hero">
          <div class="pp-eyebrow">Legal</div>
          <h1>Privacy Policy</h1>
          <p class="pp-last-updated">Last updated: <span>Coming soon</span></p>
        </div>

        <div class="pp-placeholder">
          <div class="pp-placeholder-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2>Privacy policy coming soon</h2>
          <p>
            We are preparing our full privacy policy. It will be published here shortly.<br />
            In the meantime, if you have any questions about how we handle your data,
            please reach out to us directly.
          </p>
          <a href="mailto:info@getnapsolutions.com" class="pp-contact-link">
            info@getnapsolutions.com
          </a>
        </div>
      </div>
    </main>

    <footer class="pp-footer">
      <div class="pp-footer-inner">
        <span>&copy; 2026 NAP SOLUTIONS · ALL RIGHTS RESERVED</span>
        <button class="pp-footer-back" @click="router.push('/')">Back to Home</button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.pp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

/* Header */
.pp-header {
  border-bottom: 1px solid rgba(10, 15, 30, 0.08);
  padding: 16px 0;
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 50;
}
.pp-header-inner {
  width: min(1200px, calc(100% - 3rem));
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pp-back {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1.5px solid rgba(10, 15, 30, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-body);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.pp-back:hover {
  border-color: rgba(var(--brand-rgb), 0.4);
  color: var(--text-main);
}
.pp-back svg {
  display: block;
}
.pp-wordmark {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 4px;
  background: linear-gradient(90deg, var(--text-main) 0%, var(--accent-ink) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Main */
.pp-main {
  flex: 1;
  padding-block: clamp(3rem, 7vw, 5rem);
}
.pp-inner {
  width: min(760px, calc(100% - 3rem));
  margin-inline: auto;
}

/* Hero */
.pp-hero {
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
  border-bottom: 1px solid rgba(10, 15, 30, 0.08);
}
.pp-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--brand-strong);
  margin-bottom: 12px;
}
.pp-hero h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-main);
  margin-bottom: 12px;
  line-height: 1.1;
}
.pp-last-updated {
  font-size: 14px;
  color: var(--text-muted);
}
.pp-last-updated span {
  color: var(--text-body);
}

/* Placeholder */
.pp-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(3rem, 7vw, 5rem) 2rem;
  background: var(--surface-base);
  border: 1.5px dashed rgba(var(--brand-rgb), 0.25);
  border-radius: 20px;
}
.pp-placeholder-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(var(--brand-rgb), 0.1), rgba(var(--accent-rgb), 0.1));
  border: 1.5px solid rgba(var(--brand-rgb), 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand-strong);
  margin-bottom: 20px;
}
.pp-placeholder-icon svg {
  display: block;
}
.pp-placeholder h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
}
.pp-placeholder p {
  font-size: 16px;
  color: var(--text-body);
  line-height: 1.7;
  max-width: 46ch;
  margin-bottom: 24px;
}
.pp-contact-link {
  font-size: 15px;
  font-weight: 600;
  color: var(--accent-ink-text, var(--accent-ink));
  text-decoration: none;
  border-bottom: 1.5px solid rgba(var(--accent-rgb), 0.4);
  padding-bottom: 1px;
  transition: border-color 0.2s, color 0.2s;
}
.pp-contact-link:hover {
  color: var(--brand-strong);
  border-color: var(--brand-strong);
}

/* Footer */
.pp-footer {
  border-top: 1px solid rgba(10, 15, 30, 0.07);
  padding: 20px 0;
}
.pp-footer-inner {
  width: min(1200px, calc(100% - 3rem));
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: var(--text-muted);
  flex-wrap: wrap;
  gap: 12px;
}
.pp-footer-back {
  background: none;
  border: none;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}
.pp-footer-back:hover {
  color: var(--text-main);
}

@media (max-width: 640px) {
  .pp-footer-inner {
    justify-content: center;
    text-align: center;
  }
}
</style>
