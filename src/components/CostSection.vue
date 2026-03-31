<template>
  <section id="cost" class="section bg-alt">
    <div class="section-inner">
      <div class="section-eyebrow">Revenue Impact</div>
      <h2 class="grad-text">What Silence Is<br />Costing You.</h2>
      <p class="section-sub">
        Conservative monthly estimate for a mid-size business:
      </p>

      <div class="cost-scroll">
        <div class="cost-row">
          <div class="cost-cell">
            <div class="cost-big">4</div>
            <div class="cost-lbl">Missed calls<br />per night</div>
          </div>
          <div class="cost-op">&times;</div>
          <div class="cost-cell">
            <div class="cost-big">30</div>
            <div class="cost-lbl">Nights<br />per month</div>
          </div>
          <div class="cost-op">&times;</div>
          <div class="cost-cell">
            <div class="cost-big">$250</div>
            <div class="cost-lbl">Avg booking<br />value</div>
          </div>
          <div class="cost-op">=</div>
          <div class="cost-cell cost-cell-highlight">
            <div class="cost-big cost-big-highlight">$30K</div>
            <div class="cost-lbl">Lost revenue<br />per month</div>
          </div>
        </div>
      </div>

      <p class="cost-note">
        That is up to <strong>$30,000+ in walkaway revenue</strong> every single
        month. NAP Solutions captures it back.
      </p>
    </div>
  </section>
</template>

<style scoped>
.bg-alt {
  background: var(--surface-base);
}
.cost-scroll {
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}
.cost-row {
  display: flex;
  align-items: stretch;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.76);
  margin: clamp(2rem, 5vw, 3rem) 0 28px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 46%, rgba(var(--accent-rgb), 0.16) 100%);
  box-shadow:
    0 10px 28px rgba(12, 18, 38, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -10px 16px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(132%);
  -webkit-backdrop-filter: blur(10px) saturate(132%);
}
.cost-cell {
  flex: 1;
  min-width: 180px;
  padding: 32px 22px;
  text-align: center;
  background: rgba(255, 255, 255, 0.22);
  border-right: 1px solid rgba(255, 255, 255, 0.6);
  border-left: 1px solid rgba(255, 255, 255, 0.6);
}
.cost-cell-highlight {
  background: linear-gradient(135deg, rgba(var(--brand-rgb), 0.2), rgba(var(--accent-rgb), 0.18));
}
.cost-big {
  font-size: clamp(1.9rem, 1.6rem + 0.8vw, 2.4rem);
  font-weight: 800;
  color: var(--brand);
  margin-bottom: 10px;
  line-height: 1;
}
.cost-big-highlight {
  background: linear-gradient(135deg, var(--brand), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.cost-lbl {
  font-size: 15px;
  color: var(--text-body);
  letter-spacing: 1px;
  line-height: 1.6;
}
.cost-op {
  font-size: 24px;
  font-weight: 800;
  color: rgba(var(--brand-rgb), 0.2);
  display: flex;
  align-items: center;
  padding: 0 4px;
}
.cost-note {
  font-size: 18px;
  color: var(--text-body);
  line-height: 1.8;
  max-width: 62ch;
}
.cost-note strong {
  color: var(--brand);
  font-weight: 700;
}

@media (max-width: 960px) {
  .cost-row {
    flex-direction: column;
  }
  .cost-cell {
    min-width: 0;
  }
  .cost-op {
    padding: 10px 0;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .cost-cell {
    padding: 24px 14px;
  }

  .cost-lbl {
    font-size: 13px;
    letter-spacing: 0.04em;
  }

  .cost-note {
    font-size: 16px;
    line-height: 1.7;
  }
}
</style>
