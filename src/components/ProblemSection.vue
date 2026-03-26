<script setup>
import { problemItems, statCards } from '../data/problemData'
</script>

<template>
  <section id="problem" class="section bg-white">
    <div class="section-inner">
      <div class="section-eyebrow">The Problem</div>
      <h2 class="grad-text">
        Your Phone Stops Working<br />When Clients Need It Most.
      </h2>
      <p class="section-sub">
        Businesses are losing bookings every night, every weekend, and most do
        not even realize it.
      </p>
      <div class="problem-layout">
        <div class="problem-list">
          <div
            v-for="(item, i) in problemItems"
            :key="i"
            class="problem-item"
          >
            <div class="problem-arrow">&rarr;</div>
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="stats-col">
          <div v-for="(stat, i) in statCards" :key="i" class="stat-card">
            <div class="big">{{ stat.big }}</div>
            <div class="lbl">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1.4rem, 4vw, 3rem);
  align-items: start;
}
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.problem-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
  cursor: default;
}
.problem-item:hover {
  background: rgba(123, 47, 255, 0.03);
  border-color: rgba(123, 47, 255, 0.1);
}
.problem-arrow {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  flex-shrink: 0;
  background: rgba(123, 47, 255, 0.08);
  border: 1px solid rgba(123, 47, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #7b2fff;
  font-weight: 700;
}
.problem-item p {
  font-size: 17px;
  line-height: 1.7;
  color: #4a5580;
  text-wrap: pretty;
}
.stats-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.stat-card {
  padding: 30px 32px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid rgba(10, 15, 30, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}
.stat-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #7b2fff, #00d4c0);
  border-radius: 3px 3px 0 0;
}
.stat-card .big {
  font-size: 42px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-card .lbl {
  font-size: 16px;
  color: #8892b0;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .problem-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .problem-item {
    padding: 16px 16px;
    gap: 12px;
  }

  .problem-item p {
    font-size: 15px;
    line-height: 1.62;
  }

  .problem-arrow {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }

  .stat-card {
    padding: 22px 18px;
  }

  .stat-card .big {
    font-size: 34px;
  }
}
</style>
