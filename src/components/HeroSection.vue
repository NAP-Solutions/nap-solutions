<script setup>
import { Bot, CalendarCheck, PhoneCall, Check } from 'lucide-vue-next'

defineEmits(['open-booking'])

function scrollToHow() {
  document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-mesh"></div>
    <div class="hero-grid"></div>

    <div class="hero-inner section-inner">
      <!-- LEFT: content -->
      <div class="hero-content">
        <div class="always-on-pill">
          <span class="aop-dot"></span>
          <span class="aop-text">ALWAYS ON</span>
          <span class="aop-badge">24/7</span>
        </div>

        <h1>
          <span class="h1-light">NEVER MISS</span>
          <span class="h1-grad">A CALL AGAIN.</span>
        </h1>

        <p class="hero-sub">
          NAP Solutions deploys intelligent AI receptionists that answer every
          call, book appointments, and automate your front desk around the
          clock at a fraction of the cost.
        </p>

        <div class="hero-actions">
          <button class="btn-primary" @click="$emit('open-booking')">
            Book a Demo
          </button>
          <button class="btn-ghost" @click="scrollToHow">
            See How It Works →
          </button>
        </div>

        <div class="hero-trust">
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            No contracts
          </div>
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            Setup included
          </div>
          <div class="trust-item">
            <span class="trust-check"><Check :size="9" /></span>
            Cancel anytime
          </div>
        </div>
      </div>

      <!-- RIGHT: dashboard widget -->
      <div class="hero-right">
        <div class="dash-widget">
          <!-- Topbar -->
          <div class="dash-topbar">
            <div class="dash-dots">
              <span class="dot dot-dim"></span>
              <span class="dot dot-dim"></span>
              <span class="dot dot-cyan"></span>
            </div>
            <div class="dash-ai">
              <span class="dash-avatar"><Bot :size="15" /></span>
              <div class="dash-ai-info">
                <span class="dash-ai-name">NAP Receptionist</span>
                <span class="dash-ai-sub">Dr. Smith Dental</span>
              </div>
            </div>
            <div class="dash-live">
              <span class="dash-live-dot"></span>
              LIVE
            </div>
          </div>

          <!-- Body -->
          <div class="dash-body">
            <p class="dash-date">Tonight's performance · 6pm – now</p>

            <div class="dash-stats">
              <div class="dash-stat">
                <div class="stat-num">14</div>
                <div class="stat-lbl">Calls<br />Answered</div>
                <div class="stat-trend">↑ 100% answered</div>
              </div>
              <div class="dash-stat">
                <div class="stat-num stat-cyan">11</div>
                <div class="stat-lbl">Appointments<br />Booked</div>
                <div class="stat-trend">↑ 79% conversion</div>
              </div>
            </div>

            <div class="dash-divider"></div>
            <p class="dash-act-label">Recent Activity</p>

            <div class="dash-act-item">
              <span class="act-icon act-cyan"><CalendarCheck :size="13" /></span>
              <div class="act-meta">
                <span class="act-title">Booking Confirmed</span>
                <span class="act-sub">Dental cleaning · Thu 10am</span>
              </div>
              <span class="act-time">2m ago</span>
            </div>
            <div class="dash-act-item">
              <span class="act-icon act-purple"><PhoneCall :size="13" /></span>
              <div class="act-meta">
                <span class="act-title">Call Answered</span>
                <span class="act-sub">New patient inquiry</span>
              </div>
              <span class="act-time">7m ago</span>
            </div>
            <div class="dash-act-item" style="border-bottom: none">
              <span class="act-icon act-cyan"><CalendarCheck :size="13" /></span>
              <div class="act-meta">
                <span class="act-title">Booking Confirmed</span>
                <span class="act-sub">Follow-up · Wed 2pm</span>
              </div>
              <span class="act-time">14m ago</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 96vh;
  padding-block: clamp(7.5rem, 13vh, 10.5rem) clamp(5rem, 9vh, 7rem);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f5ff 50%, #f0faff 100%);
}
.hero-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(ellipse 70% 60% at 75% 40%, rgba(123, 47, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 15% 80%, rgba(0, 191, 255, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 85% 85%, rgba(0, 212, 192, 0.07) 0%, transparent 50%);
}
.hero-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(rgba(123, 47, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 47, 255, 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%);
}
.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 620px;
}

/* Pill */
.always-on-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(123, 47, 255, 0.06);
  border: 1px solid rgba(123, 47, 255, 0.2);
  border-radius: 100px;
  padding: 8px 20px;
  margin-bottom: 36px;
  animation: fadeUp 0.7s ease both;
}
.aop-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00d4c0;
  box-shadow: 0 0 8px #00d4c0;
  animation: pulse 2s infinite;
}
.aop-text {
  font-size: 13px;
  font-weight: 700;
  color: #7b2fff;
  letter-spacing: 0.12em;
}
.aop-badge {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 3px 12px;
  border-radius: 100px;
}

/* H1 */
h1 {
  font-size: clamp(2.3rem, 6vw, 5.1rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 22px;
  animation: fadeUp 0.7s 0.1s ease both;
  text-wrap: balance;
}
.h1-light {
  display: block;
  color: #0a0f1e;
}
.h1-grad {
  display: block;
  background: linear-gradient(90deg, #7b2fff 0%, #00d4c0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Sub */
.hero-sub {
  font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.22rem);
  line-height: 1.8;
  color: #4a5580;
  font-weight: 400;
  max-width: 58ch;
  margin-bottom: 36px;
  animation: fadeUp 0.7s 0.2s ease both;
  text-wrap: pretty;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeUp 0.7s 0.3s ease both;
}

/* Trust signals */
.hero-trust {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 24px;
  margin-top: 28px;
  border-top: 1px solid rgba(10, 15, 30, 0.07);
  animation: fadeUp 0.7s 0.4s ease both;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #8892b0;
}
.trust-check {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(0, 212, 192, 0.12);
  border: 1px solid rgba(0, 212, 192, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #00b8a6;
}
.trust-check :deep(svg) {
  display: block;
}

/* Dashboard widget */
.hero-right {
  justify-self: end;
  z-index: 2;
  animation: fadeIn 1s 0.4s ease both;
}
.dash-widget {
  width: clamp(280px, 28vw, 340px);
  border-radius: 18px;
  border: 1.5px solid rgba(10, 15, 30, 0.09);
  box-shadow: 0 16px 56px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(123, 47, 255, 0.06);
  overflow: hidden;
  background: #fff;
}

/* Topbar */
.dash-topbar {
  background: #0a0f1e;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dash-dots {
  display: flex;
  gap: 5px;
  margin-right: 4px;
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot-dim { background: rgba(255, 255, 255, 0.12); }
.dot-cyan { background: rgba(0, 212, 192, 0.5); }
.dash-ai {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.dash-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}
.dash-avatar :deep(svg) { display: block; }
.dash-ai-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.dash-ai-name {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dash-ai-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.38);
  white-space: nowrap;
}
.dash-live {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #00d4c0;
  white-space: nowrap;
}
.dash-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4c0;
  box-shadow: 0 0 6px #00d4c0;
  animation: pulse 2s infinite;
}

/* Body */
.dash-body {
  padding: 16px;
}
.dash-date {
  font-size: 11px;
  font-weight: 600;
  color: #8892b0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.dash-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}
.dash-stat {
  background: #f8f9fb;
  border-radius: 10px;
  padding: 11px 10px;
  border: 1px solid rgba(10, 15, 30, 0.06);
}
.stat-num {
  font-size: 24px;
  font-weight: 800;
  color: #7b2fff;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-num.stat-cyan { color: #00b8a6; }
.stat-lbl {
  font-size: 12px;
  color: #8892b0;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 4px;
}
.stat-trend {
  font-size: 11px;
  font-weight: 700;
  color: #00b8a6;
}
.dash-divider {
  height: 1px;
  background: rgba(10, 15, 30, 0.06);
  margin-bottom: 12px;
}
.dash-act-label {
  font-size: 11px;
  font-weight: 700;
  color: #8892b0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.dash-act-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(10, 15, 30, 0.05);
}
.act-icon {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.act-icon :deep(svg) { display: block; }
.act-cyan { background: rgba(0, 212, 192, 0.12); color: #00b8a6; }
.act-purple { background: rgba(123, 47, 255, 0.1); color: #7b2fff; }
.act-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}
.act-title {
  font-size: 13px;
  font-weight: 600;
  color: #0a0f1e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.act-sub {
  font-size: 11px;
  color: #8892b0;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.act-time {
  font-size: 11px;
  color: #8892b0;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding-block: 6rem 4rem;
  }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .hero-right {
    justify-self: start;
  }
  .dash-widget {
    width: clamp(280px, 70vw, 340px);
  }
}
@media (max-width: 760px) {
  .hero-right {
    display: none;
  }
  .hero-sub {
    margin-bottom: 28px;
  }
  .always-on-pill {
    margin-bottom: 24px;
  }
}
@media (max-width: 480px) {
  .hero {
    padding-block: 5.5rem 3.5rem;
  }
}
@media (max-width: 520px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .hero-trust {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
