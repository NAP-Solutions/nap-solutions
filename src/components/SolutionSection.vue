<script setup>
import { solutionItems } from '../data/solutionData'
</script>

<template>
  <section id="solution" class="section bg-white">
    <div class="section-inner">
      <div class="section-eyebrow">The Solution</div>
      <h2 class="grad-text">
        An AI Receptionist<br />That Never Clocks Out.
      </h2>
      <p class="section-sub">
        NAP Solutions answers every call, qualifies the caller, and books the
        appointment 24/7, 365 days a year.
      </p>
      <div class="solution-list">
        <div
          v-for="(item, i) in solutionItems"
          :key="i"
          class="solution-item"
        >
          <div class="sol-check">&check;</div>
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 760px;
}
.solution-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background 0.2s, border-color 0.2s;
}
.solution-item:hover {
  background: rgba(0, 212, 192, 0.04);
  border-color: rgba(0, 212, 192, 0.15);
}
.sol-check {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(123, 47, 255, 0.1), rgba(0, 212, 192, 0.1));
  border: 1px solid rgba(123, 47, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #7b2fff;
  font-weight: 700;
}
.solution-item p {
  font-size: 17px;
  line-height: 1.7;
  color: #4a5580;
  text-wrap: pretty;
}

@media (max-width: 640px) {
  .solution-item {
    padding: 16px 16px;
    gap: 12px;
  }

  .solution-item p {
    font-size: 15px;
    line-height: 1.62;
  }

  .sol-check {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }
}
</style>
