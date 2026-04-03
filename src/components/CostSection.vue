<script setup>
import LiquidHeading from './LiquidHeading.vue'
</script>

<template>
  <section id="cost" class="section bg-alt">
    <div class="section-inner">
      <div class="cost-header">
        <div class="section-eyebrow">Revenue Impact</div>
        <LiquidHeading>What silence is<br />costing you.</LiquidHeading>
        <p class="section-sub">
          Conservative monthly estimate for a mid-size business:
        </p>
      </div>

      <div class="cost-scroll">
        <div class="cost-row">
          <div class="cost-cell cost-cell--times">
            <div class="cost-big">4</div>
            <div class="cost-lbl">Missed calls<br />per night</div>
          </div>
          <div class="cost-op">&times;</div>
          <div class="cost-cell cost-cell--times">
            <div class="cost-big">30</div>
            <div class="cost-lbl">Nights<br />per month</div>
          </div>
          <div class="cost-op">&times;</div>
          <div class="cost-cell cost-cell--equals">
            <div class="cost-big">$250</div>
            <div class="cost-lbl">Avg booking<br />value</div>
          </div>
          <div class="cost-op cost-op--equals">=</div>
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
  --problem-cost-blend: clamp(3rem, 7vw, 5.5rem);
  background: linear-gradient(
    to bottom,
    #ffffff 0,
    #ffffff clamp(0.75rem, 1.6vw, 1.25rem),
    var(--surface-base) var(--problem-cost-blend),
    var(--surface-base) 100%
  );
}

.cost-header {
  width: 100%;
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
  color: var(--accent-ink);
  margin-bottom: 10px;
  line-height: 1;
}
.cost-big-highlight {
  color: var(--accent-ink);
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
  color: var(--text-main);
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
  color: var(--accent-ink);
  font-weight: 700;
}

@media (max-width: 960px) {
  .cost-row {
    flex-direction: column;
    margin: clamp(1.5rem, 4vw, 2.25rem) 0 22px;
  }
  .cost-cell {
    min-width: 0;
    padding: 20px 16px;
  }
  .cost-op {
    font-size: 20px;
    padding: 6px 0;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .cost-header {
    width: min(100%, 24rem);
    margin-inline: auto;
  }

  .cost-header :deep(.liquid-heading-stack),
  .cost-header .section-sub {
    margin-inline: 0;
  }

  .cost-scroll {
    display: flex;
    justify-content: center;
  }

  .cost-row {
    width: min(100%, 23.5rem);
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.82);
    background: linear-gradient(150deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.62) 46%, rgba(var(--accent-rgb), 0.18) 100%);
    box-shadow:
      0 8px 18px rgba(12, 18, 38, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(8px) saturate(124%);
    -webkit-backdrop-filter: blur(8px) saturate(124%);
    gap: 0;
    overflow: hidden;
    margin: 18px 0 16px;
    margin-inline: auto;
  }

  .cost-cell {
    display: grid;
    grid-template-columns: 6.75rem minmax(0, 1fr);
    justify-content: center;
    align-items: center;
    gap: 12px;
    text-align: left;
    padding: 14px 34px 14px 14px;
    border-radius: 0;
    background: rgba(255, 255, 255, 0.34);
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.68);
    box-shadow: none;
    position: relative;
  }

  .cost-big {
    font-size: clamp(1.45rem, 7vw, 1.85rem);
    margin-bottom: 0;
    white-space: nowrap;
    width: 100%;
    justify-self: end;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .cost-lbl {
    font-size: 13px;
    letter-spacing: 0.02em;
    line-height: 1.4;
    text-align: left;
  }

  .cost-op {
    display: none;
  }

  .cost-cell--times::after,
  .cost-cell--equals::after {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 18px;
    font-weight: 800;
    line-height: 1;
    color: var(--text-main);
    opacity: 0.95;
  }

  .cost-cell--times::after {
    content: '\00d7';
  }

  .cost-cell--equals::after {
    content: '=';
    color: var(--text-main);
  }

  .cost-cell-highlight {
    background: linear-gradient(135deg, rgba(var(--brand-rgb), 0.22), rgba(var(--accent-rgb), 0.24));
    border-color: rgba(var(--accent-rgb), 0.42);
    border-bottom: 0;
  }

  .cost-big-highlight {
    font-size: clamp(1.7rem, 8.2vw, 2.25rem);
  }

  .cost-note {
    font-size: 15px;
    line-height: 1.6;
    text-align: center;
    margin-inline: auto;
  }
}

@media (max-width: 420px) {
  .cost-row {
    width: min(100%, 19.5rem);
  }
}
</style>
