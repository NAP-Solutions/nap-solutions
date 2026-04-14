<script setup>
import {
  PhoneCall,
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
  Bot,
  Check,
  Send,
  Clock,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTilt } from '../composables/useTilt'
import LiquidHeading from './LiquidHeading.vue'

const props = defineProps({
  service: {
    type: String,
    default: 'ai-receptionist',
  },
})

const iconMap = {
  PhoneCall,
  MessageCircle,
  CalendarCheck,
  ShieldCheck,
  Clock,
}

const serviceContent = {
  'ai-receptionist': {
    eyebrow: 'How It Works',
    heading: 'From first ring to fully booked.',
    sub: "Every call handled end-to-end. Here's exactly what our AI takes care of so you don't have to.",
    steps: [
      {
        title: 'Call Received',
        desc: 'Your AI receptionist picks up on the first ring any time of day. No hold music, no voicemail.',
        icon: 'PhoneCall',
        iconVariant: 'purple',
      },
      {
        title: 'Caller Qualified',
        desc: 'The AI greets callers naturally, gathers details, and identifies what they need before booking.',
        icon: 'MessageCircle',
        iconVariant: 'cyan',
      },
      {
        title: 'Appointment Booked',
        desc: 'Appointments are confirmed in real time, synced to your calendar, and verified before the call ends.',
        icon: 'CalendarCheck',
        iconVariant: 'purple',
      },
      {
        title: 'Escalated If Needed',
        desc: 'Complex or urgent cases are handed off immediately so nothing falls through the cracks.',
        icon: 'ShieldCheck',
        iconVariant: 'cyan',
      },
    ],
    chat: {
      name: 'NAP Receptionist',
      sub: 'Dr. Smith Dental - Incoming call',
      messages: [
        { role: 'ai', text: 'Hi! Thanks for calling. How can I help you today?', meta: 'NAP AI - just now' },
        { role: 'user', text: 'I need to book a cleaning. Do you have anything this week?', meta: 'Caller' },
        { role: 'ai', text: 'Absolutely - Thursday at 10am or Friday at 2pm. Which works better?', meta: 'NAP AI' },
        { role: 'user', text: 'Thursday please.', meta: 'Caller' },
      ],
      confirmLabel: 'APPOINTMENT CONFIRMED',
      confirmTitle: 'Dental Cleaning',
      confirmLine2: 'Thursday - 10:00 AM',
      confirmLine3: 'Synced to calendar',
    },
  },
  'outbound-agent': {
    eyebrow: 'How It Works',
    heading: 'From first dial to booked meeting.',
    sub: 'The outbound agent runs your full outreach workflow automatically, from calling to qualification to calendar booking.',
    steps: [
      {
        title: 'Lead List Connected',
        desc: 'Upload your lead list or connect your CRM, and the agent prepares every contact automatically.',
        icon: 'ShieldCheck',
        iconVariant: 'purple',
      },
      {
        title: 'AI Places Calls',
        desc: 'The agent dials leads at optimal times and delivers your script in a natural, consistent voice.',
        icon: 'PhoneCall',
        iconVariant: 'cyan',
      },
      {
        title: 'Prospects Qualified',
        desc: 'Qualification questions and objection handling run in real time so high-intent leads are identified quickly.',
        icon: 'MessageCircle',
        iconVariant: 'purple',
      },
      {
        title: 'Meetings Booked',
        desc: 'Interested prospects are booked directly into your calendar and handed off with full call context.',
        icon: 'CalendarCheck',
        iconVariant: 'cyan',
      },
      {
        title: 'Follow-Ups Automated',
        desc: 'Unanswered leads are retried on schedule until every campaign gets full follow-through.',
        icon: 'Clock',
        iconVariant: 'purple',
      },
    ],
    chat: {
      name: 'NAP Outbound Agent',
      sub: 'Outbound campaign - Live call',
      messages: [
        { role: 'ai', text: 'Hi Alex, this is Maya from NAP Solutions. Do you have 30 seconds?', meta: 'NAP AI - just now' },
        { role: 'user', text: "Sure, what's this about?", meta: 'Prospect' },
        { role: 'ai', text: 'We help teams automate outbound follow-up and book more meetings without adding reps.', meta: 'NAP AI' },
        { role: 'user', text: 'Follow-up consistency is actually our biggest gap.', meta: 'Prospect' },
      ],
      confirmLabel: 'MEETING BOOKED',
      confirmTitle: 'Outbound Strategy Demo',
      confirmLine2: 'Friday - 2:00 PM',
      confirmLine3: 'Added to your calendar',
    },
  },
}

const activeContent = serviceContent[props.service] ?? serviceContent['ai-receptionist']

const headerRef = ref(null)
const stepRefs = ref([])
const chatRef = ref(null)
const chatWidgetRef = ref(null)

useScrollReveal(() => [headerRef.value, ...stepRefs.value, chatRef.value])
useTilt(() => stepRefs.value)
useTilt(() => [chatWidgetRef.value], { requireReveal: false })
</script>

<template>
  <section id="how" class="section bg-alt noise-bg noise-bg--fade-bottom">
    <div class="section-inner">
      <div class="reveal-header" ref="headerRef">
        <div class="section-eyebrow">{{ activeContent.eyebrow }}</div>
        <LiquidHeading>
          {{ activeContent.heading }}
        </LiquidHeading>
        <p class="section-sub">
          {{ activeContent.sub }}
        </p>
      </div>

      <div class="hiw-layout">
        <div class="steps-col">
          <div
            v-for="(step, i) in activeContent.steps"
            :key="step.title"
            class="step-card"
            :ref="el => stepRefs[i] = el"
          >
            <div class="tilt-glare" aria-hidden="true"></div>
            <div class="step-icon-wrap">
              <div class="step-icon" :class="`si-${step.iconVariant}`"><component :is="iconMap[step.icon]" :size="20" /></div>
              <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <div class="chat-col" ref="chatRef">
          <div class="chat-widget" ref="chatWidgetRef">
            <div class="tilt-glare" aria-hidden="true"></div>
            <div class="chat-header">
              <div class="ch-dots">
                <span class="ch-dot ch-dot-dim"></span>
                <span class="ch-dot ch-dot-dim"></span>
                <span class="ch-dot ch-dot-cyan"></span>
              </div>
              <div class="ch-avatar"><Bot :size="15" /></div>
              <div class="ch-info">
                <span class="ch-name">{{ activeContent.chat.name }}</span>
                <span class="ch-sub">{{ activeContent.chat.sub }}</span>
              </div>
              <div class="ch-live">
                <span class="ch-live-dot"></span>
                LIVE
              </div>
            </div>

            <div class="chat-body">
              <template v-for="(message, i) in activeContent.chat.messages" :key="i">
                <div class="bubble" :class="message.role === 'ai' ? 'bubble-ai' : 'bubble-user'">
                  {{ message.text }}
                </div>
                <p class="bubble-meta" :class="{ 'bubble-meta--right': message.role !== 'ai' }">{{ message.meta }}</p>
              </template>

              <div class="confirm-card">
                <div class="confirm-top">
                  <span class="confirm-icon"><Check :size="13" /></span>
                  <span class="confirm-label">{{ activeContent.chat.confirmLabel }}</span>
                </div>
                <p class="confirm-detail">
                  <strong>{{ activeContent.chat.confirmTitle }}</strong><br />
                  {{ activeContent.chat.confirmLine2 }}<br />
                  {{ activeContent.chat.confirmLine3 }}
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
<style scoped>
.bg-alt {
  --solution-how-blend: clamp(3rem, 7vw, 5.5rem);
  background: linear-gradient(
    to bottom,
    #ffffff 0,
    #ffffff clamp(0.75rem, 1.6vw, 1.25rem),
    var(--surface-base) var(--solution-how-blend),
    var(--surface-base) 100%
  );
}

/* Layout */
.hiw-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 380px);
  gap: 36px;
  align-items: start;
  margin-top: clamp(1.8rem, 5vw, 3rem);
}

/* Step cards */
.steps-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.step-card {
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.58) 46%, rgba(var(--accent-rgb), 0.15) 100%);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  padding: 20px 22px;
  display: flex;
  gap: 18px;
  align-items: flex-start;
  box-shadow:
    0 10px 24px rgba(12, 18, 38, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -8px 14px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, box-shadow 0.2s;
}
.step-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--brand), var(--accent));
  border-radius: 3px 0 0 3px;
  opacity: 0;
  transition: opacity 0.2s;
}
.step-card:hover {
  border-color: rgba(var(--brand-rgb), 0.3);
  box-shadow:
    0 14px 30px rgba(var(--brand-rgb), 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.94);
  transition-delay: 0s;
}
.step-card:hover::before {
  opacity: 1;
}
.step-icon-wrap {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.step-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step-icon :deep(svg) {
  display: block;
}
.si-purple {
  background: rgba(var(--accent-ink-rgb), 0.1);
  border: 1px solid rgba(var(--accent-ink-rgb), 0.24);
  color: var(--accent-ink);
}
.si-cyan {
  background: rgba(var(--accent-ink-rgb), 0.16);
  border: 1px solid rgba(var(--accent-ink-rgb), 0.32);
  color: var(--accent-ink);
}
.step-num {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-ink);
  letter-spacing: 0.1em;
}
.step-content {
  flex: 1;
  min-width: 0;
}
.step-title {
  font-size: clamp(15px, 0.9rem + 0.2vw, 17px);
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.01em;
  margin-bottom: 5px;
}
.step-desc {
  font-size: clamp(14px, 0.85rem + 0.15vw, 15px);
  color: var(--text-body);
  line-height: 1.7;
}

.reveal-header {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-header[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

.step-card[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.step-card:nth-child(2) { transition-delay: 0.1s; }
.step-card:nth-child(3) { transition-delay: 0.2s; }
.step-card:nth-child(4) { transition-delay: 0.3s; }

/* Chat widget */
.chat-col {
  position: sticky;
  top: 100px;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}
.chat-col[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}
.chat-widget {
  width: 100%;
  border-radius: 18px;
  border: 1.5px solid rgba(10, 15, 30, 0.14);
  box-shadow: 0 16px 48px rgba(10, 15, 30, 0.12), 0 3px 10px rgba(var(--brand-rgb), 0.08);
  overflow: hidden;
  position: relative;
}

/* Chat header */
.chat-header {
  background: var(--text-main);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ch-dots {
  display: flex;
  gap: 4px;
  margin-right: 4px;
}
.ch-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.ch-dot-dim { background: rgba(255, 255, 255, 0.12); }
.ch-dot-cyan { background: rgba(var(--accent-ink-rgb), 0.5); }
.ch-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(var(--accent-ink-rgb), 0.88), var(--accent-ink));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.ch-avatar :deep(svg) { display: block; }
.ch-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.ch-name {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ch-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.38);
}
.ch-live {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent-ink);
  white-space: nowrap;
}
.ch-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-ink);
  box-shadow: 0 0 6px var(--accent-ink);
  animation: pulse 2s infinite;
}

/* Chat body */
.chat-body {
  background: var(--surface-alt);
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bubble {
  border-radius: 14px;
  padding: 10px 13px;
  font-size: 13px;
  line-height: 1.6;
  max-width: 88%;
}
.bubble-ai {
  background: #fff;
  border: 1px solid rgba(10, 15, 30, 0.08);
  color: var(--text-main);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.bubble-user {
  background: #1a2240;
  color: rgba(255, 255, 255, 0.88);
  border-bottom-right-radius: 4px;
  align-self: flex-end;
  text-align: right;
}
.bubble-meta {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 0;
  margin-bottom: 4px;
  font-weight: 500;
}
.bubble-meta--right {
  text-align: right;
}

/* Confirmation card */
.confirm-card {
  background: #fff;
  border: 1.5px solid rgba(var(--accent-rgb), 0.3);
  border-radius: 14px;
  padding: 12px 14px;
  margin-top: 4px;
  box-shadow: 0 2px 10px rgba(var(--accent-rgb), 0.08);
}
.confirm-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.confirm-icon {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: rgba(var(--accent-ink-rgb), 0.12);
  border: 1px solid rgba(var(--accent-ink-rgb), 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--accent-ink);
}
.confirm-icon :deep(svg) { display: block; }
.confirm-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-ink);
  letter-spacing: 0.08em;
}
.confirm-detail {
  font-size: 13px;
  color: var(--text-body);
  line-height: 1.65;
}
.confirm-detail strong {
  color: var(--text-main);
  font-weight: 600;
}

/* Chat footer */
.chat-footer {
  background: var(--surface-base);
  border-top: 1px solid rgba(10, 15, 30, 0.07);
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.chat-input-mock {
  flex: 1;
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.09);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-muted);
}
.chat-send {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--accent-ink);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  cursor: default;
  box-shadow: 0 3px 10px rgba(var(--accent-ink-rgb), 0.32);
}
.chat-send :deep(svg) { display: block; }

/* Responsive */
@media (max-width: 960px) {
  .hiw-layout {
    grid-template-columns: 1fr;
  }
  .chat-col {
    position: static;
  }
}
@media (max-width: 640px) {
  .reveal-header {
    width: min(100%, 24rem);
    margin-inline: auto;
  }

  .reveal-header :deep(.liquid-heading-stack),
  .reveal-header .section-sub {
    margin-inline: 0;
  }

  .chat-col {
    display: none;
  }
  .step-card {
    padding: 18px 16px;
    gap: 16px;
  }
}
</style>

