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
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    alert('Please fill in all fields before sending.')
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
    alert('Something went wrong. Please try again.')
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
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
          <textarea
            v-model="message"
            placeholder="Your question or message..."
            rows="4"
            class="form-input form-textarea"
            required
          ></textarea>
          <button
            type="submit"
            class="btn-primary"
            style="width: 100%"
            :disabled="sending"
          >
            {{ sending ? 'Sending...' : 'Send Message' }}
          </button>
          <p class="contact-disclaimer">NO CONTRACTS · CANCEL ANYTIME</p>
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
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
}
.contact-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7b2fff;
  margin-bottom: 8px;
}
.contact-heading {
  font-size: 20px;
  font-weight: 700;
  color: #0a0f1e;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  line-height: 1.3;
}
.contact-body {
  font-size: 15px;
  color: #8892b0;
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
  width: 300px;
  flex-shrink: 0;
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
.form-input {
  width: 100%;
  background: #f5f7fb;
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  border-radius: 10px;
  padding: 13px 16px;
  font-size: 15px;
  color: #0a0f1e;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: rgba(123, 47, 255, 0.4);
  background: #fff;
}
.form-textarea {
  resize: vertical;
  min-height: 80px;
}
.contact-disclaimer {
  font-size: 12px;
  font-weight: 500;
  color: #8892b0;
  text-align: center;
  letter-spacing: 0.06em;
}
.form-success {
  background: rgba(0, 212, 192, 0.08);
  border: 1.5px solid rgba(0, 212, 192, 0.3);
  border-radius: 12px;
  padding: 22px 26px;
  text-align: center;
}
.success-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
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
  color: #0a0f1e;
  margin-bottom: 4px;
}
.success-sub {
  font-size: 15px;
  color: #4a5580;
}

@media (max-width: 960px) {
  .contact-inner {
    flex-direction: column;
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
  .form-input {
    font-size: 16px;
  }
}
</style>
