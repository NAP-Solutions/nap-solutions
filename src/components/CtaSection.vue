<script setup>
import { ref } from 'vue'

defineEmits(['open-booking'])

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)

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
  <section id="cta" class="section cta-section">
    <div class="cta-bg"></div>

    <div class="cta-inner">
      <div class="section-eyebrow center">Get Started</div>
      <h2 class="grad-text center">Ready to Stop<br />Missing Revenue?</h2>
      <p class="cta-sub">
        NAP Solutions will help you invest in yourself. Pick a time that works
        for you and let us talk.
      </p>
      <button class="btn-primary cta-btn" @click="$emit('open-booking')">
        &#128197; Book a Demo
      </button>

      <div class="contact-wrap">
        <div class="contact-label">Have Any Questions?</div>
        <div v-if="sent" class="form-success">
          <div class="success-icon">&#9989;</div>
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
        </form>
        <div class="cta-disclaimer">NO CONTRACTS · CANCEL ANYTIME</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, #faf8ff 0%, #f0faff 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(123, 47, 255, 0.06) 0%, transparent 65%);
  pointer-events: none;
}
.center {
  justify-content: center;
}
.cta-sub {
  font-size: 19px;
  color: #4a5580;
  margin-bottom: 44px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.8;
  position: relative;
}
.cta-btn {
  font-size: 17px;
  padding: 20px 52px;
  margin-bottom: 48px;
  position: relative;
}
.contact-wrap {
  width: 100%;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.contact-label {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #8892b0;
  text-transform: uppercase;
  margin-bottom: 26px;
}
.form-success {
  background: rgba(0, 212, 192, 0.08);
  border: 1.5px solid rgba(0, 212, 192, 0.3);
  border-radius: 12px;
  padding: 22px 26px;
  text-align: center;
  margin-bottom: 16px;
}
.success-icon {
  font-size: 24px;
  margin-bottom: 8px;
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
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-input {
  width: 100%;
  background: #fff;
  border: 1.5px solid rgba(123, 47, 255, 0.2);
  border-radius: 11px;
  padding: 16px 20px;
  font-family: 'DM Sans', sans-serif;
  font-size: 17px;
  color: #0a0f1e;
  outline: none;
  transition: border-color 0.2s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}
.form-input:focus {
  border-color: #7b2fff;
}
.form-textarea {
  resize: vertical;
}
.cta-disclaimer {
  font-size: 13px;
  color: #8892b0;
  margin-top: 16px;
  letter-spacing: 1px;
}

@media (max-width: 640px) {
  .cta-sub {
    font-size: 16px;
    line-height: 1.72;
    margin-bottom: 30px;
  }

  .cta-btn {
    width: 100%;
    max-width: 320px;
    margin-bottom: 34px;
    padding: 16px 20px;
  }

  .contact-label {
    margin-bottom: 18px;
    letter-spacing: 0.16em;
  }

  .form-input {
    font-size: 16px;
    padding: 14px 14px;
  }
}
</style>
