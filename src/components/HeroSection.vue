<script setup>
defineEmits(['open-booking'])

function scrollToHow() {
  document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero-mesh"></div>
    <div class="hero-grid"></div>

    <div class="hero-inner">
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
            See How It Works ->
          </button>
        </div>
      </div>

      <div class="hero-right">
        <div class="orb-card">
          <div class="orb-core">
            <div class="orb-label">
              <span class="orb-nap">NAP</span>
              <span class="orb-solutions">SOLUTIONS</span>
            </div>
            <div class="waveform">
              <span class="wave-bar" style="--d:0.6s;--delay:0s;--h:10px"></span>
              <span class="wave-bar" style="--d:0.8s;--delay:0.1s;--h:18px"></span>
              <span class="wave-bar" style="--d:0.7s;--delay:0.2s;--h:12px"></span>
              <span class="wave-bar" style="--d:0.9s;--delay:0.15s;--h:14px"></span>
              <span class="wave-bar" style="--d:0.6s;--delay:0.25s;--h:8px"></span>
            </div>
          </div>
          <div class="orb-chip chip1">
            <span class="chip-dot"></span>BOOKING CONFIRMED
          </div>
          <div class="orb-chip chip2">
            <span class="chip-dot"></span>CALL ANSWERED
          </div>
          <div class="orb-chip chip3">
            <span class="chip-dot"></span>24/7 ACTIVE
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
.hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 320px);
  align-items: center;
  gap: clamp(2rem, 6vw, 5rem);
}
.hero-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: radial-gradient(ellipse 70% 60% at 75% 40%, rgba(123, 47, 255, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 50% at 15% 80%, rgba(0, 191, 255, 0.06) 0%, transparent 55%),
    radial-gradient(ellipse 40% 40% at 85% 85%, rgba(0, 212, 192, 0.07) 0%, transparent 50%);
}
.hero-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: linear-gradient(rgba(123, 47, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(123, 47, 255, 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%);
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 620px;
}
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
  font-weight: 600;
  color: #7b2fff;
  letter-spacing: 1.5px;
}
.aop-badge {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 3px 12px;
  border-radius: 100px;
}
h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2.3rem, 6vw, 5.1rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0.02em;
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
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeUp 0.7s 0.3s ease both;
}

.hero-right {
  justify-self: end;
  z-index: 2;
  animation: fadeIn 1s 0.4s ease both;
}
.orb-card {
  width: clamp(240px, 28vw, 300px);
  height: clamp(240px, 28vw, 300px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.orb-core {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(123, 47, 255, 0.1), rgba(0, 212, 192, 0.1));
  border: 2px solid rgba(123, 47, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 60px rgba(123, 47, 255, 0.1), 0 0 120px rgba(0, 212, 192, 0.08), inset 0 0 40px rgba(123, 47, 255, 0.05);
  position: relative;
}
.orb-core::before {
  content: '';
  position: absolute;
  inset: -18px;
  border-radius: 50%;
  border: 1px dashed rgba(123, 47, 255, 0.18);
  animation: spin 8s linear infinite;
}
.orb-core::after {
  content: '';
  position: absolute;
  inset: -36px;
  border-radius: 50%;
  border: 1px solid rgba(0, 212, 192, 0.1);
  animation: spin 14s linear infinite reverse;
}
.orb-label {
  text-align: center;
}
.orb-nap {
  font-family: 'Orbitron', sans-serif;
  font-size: 34px;
  font-weight: 900;
  letter-spacing: 5px;
  display: block;
  background: linear-gradient(135deg, #0a0f1e, #7b2fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.orb-solutions {
  font-size: 10px;
  letter-spacing: 4px;
  color: #8892b0;
  margin-top: 4px;
  font-family: 'Space Mono', monospace;
}
.orb-chip {
  position: absolute;
  background: #fff;
  border: 1px solid rgba(10, 15, 30, 0.08);
  border-radius: 8px;
  padding: 9px 15px;
  font-size: 11px;
  font-family: 'Space Mono', monospace;
  letter-spacing: 1px;
  color: #4a5580;
  display: flex;
  align-items: center;
  gap: 7px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.chip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d4c0;
  box-shadow: 0 0 5px #00d4c0;
  animation: pulse 2s infinite;
}
.chip1 {
  top: 10px;
  right: -20px;
  animation: float 4s ease-in-out infinite;
}
.chip2 {
  bottom: 20px;
  left: -30px;
  animation: float 4s 1s ease-in-out infinite;
}
.chip3 {
  top: 50%;
  right: -40px;
  animation: float3 4s 0.5s ease-in-out infinite;
}
.waveform {
  display: flex;
  align-items: center;
  gap: 3px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.wave-bar {
  width: 3px;
  border-radius: 3px;
  background: #7b2fff;
  opacity: 0.5;
  animation: wave var(--d, 1s) var(--delay, 0s) ease-in-out infinite alternate;
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
    padding-block: 6.5rem 4.2rem;
  }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }

  .hero-right {
    justify-self: start;
    margin-top: 8px;
  }

  .orb-card {
    width: 220px;
    height: 220px;
  }

  .orb-core {
    width: 170px;
    height: 170px;
  }

  .chip1,
  .chip2,
  .chip3 {
    display: none;
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

@media (max-width: 520px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
}
</style>
