<script setup>
import { ref } from 'vue'
import { Check } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)
const error = ref('')

const leftRef = ref(null)
const rightRef = ref(null)

useScrollReveal(() => [leftRef.value, rightRef.value])

async function submitForm() {
  error.value = ''
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    error.value = 'Please fill in all fields before sending.'
    return
  }
  sending.value = true
  try {
    const res = await fetch('https://formspree.io/f/mdawendw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
      }),
    })
    if (res.ok) {
      sent.value = true
    } else {
      throw new Error('failed')
    }
  } catch {
    sending.value = false
    error.value = 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <section id="contact" class="contact-section noise-bg">
    <div class="contact-inner">
      <div class="contact-left" ref="leftRef">
        <div class="contact-eyebrow">Have a question?</div>
        <h3 class="contact-heading">We'll get back to you within 24 hours.</h3>
        <p class="contact-body">
          Not ready to book a demo yet? Send us a message and we'll answer
          anything you need to know.
        </p>
      </div>
      <div class="contact-right" ref="rightRef">
        <div v-if="sent" class="form-success">
          <div class="success-icon"><Check :size="22" /></div>
          <div class="success-title">Message Sent!</div>
          <div class="success-sub">We will get back to you within 24 hours.</div>
        </div>
        <form v-else class="contact-form" @submit.prevent="submitForm">
          <div class="form-fields-grid">
            <div class="form-fields-left">
              <input
                v-model="name"
                type="text"
                placeholder="Your name"
                class="form-input"
                required
              />
              <input
                v-model="email"
                type="email"
                placeholder="Your email"
                class="form-input"
                required
              />
            </div>
            <textarea
              v-model="message"
              placeholder="Your question or message..."
              class="form-input form-textarea"
              required
            ></textarea>
          </div>
          <p v-if="error" class="form-error">{{ error }}</p>
          <button
            type="submit"
            class="btn-primary btn-shine"
            style="width: 100%"
            :disabled="sending"
          >
            {{ sending ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: #ffffff;
  border-top: 1px solid rgba(10, 15, 30, 0.07);
  padding-block: 48px;
}
.contact-inner {
  width: min(var(--content-max), calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
}
.contact-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-ink);
  margin-bottom: 10px;
}
.contact-heading {
  font-size: 26px;
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 14px;
  line-height: 1.25;
}
.contact-body {
  font-size: 16px;
  color: var(--text-body);
  line-height: 1.65;
}
.contact-left {
  max-width: 400px;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.contact-left[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.contact-right {
  flex: 1;
  min-width: 0;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
}
.contact-right[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-fields-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 12px;
  align-items: stretch;
}
.form-fields-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-textarea {
  resize: none;
  height: 100%;
  min-height: 108px;
}
.form-input {
  width: 100%;
  background: var(--surface-base);
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  border-radius: 10px;
  padding: 13px 16px;
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: rgba(var(--brand-rgb), 0.4);
  background: #fff;
}

.form-error {
  font-size: 14px;
  color: #c0392b;
  margin: 0;
}

.form-success {
  background: rgba(var(--accent-rgb), 0.08);
  border: 1.5px solid rgba(var(--accent-rgb), 0.3);
  border-radius: 12px;
  padding: 22px 26px;
  text-align: center;
}
.success-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--brand), var(--accent));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
.success-icon :deep(svg) {
  display: block;
}
.success-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 4px;
}
.success-sub {
  font-size: 15px;
  color: var(--text-body);
}

@media (max-width: 960px) {
  .contact-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
  }
  .contact-left {
    max-width: 100%;
  }
  .contact-right {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding-block: clamp(2rem, 5vw, 3rem);
  }
  .form-fields-grid {
    grid-template-columns: 1fr;
  }
  .form-textarea {
    min-height: 120px;
    height: auto;
  }
  .form-input {
    font-size: 16px;
  }
}
</style>
