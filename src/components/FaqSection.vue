<script setup>
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import { faqItems } from '../data/faqData'

defineEmits(['open-booking'])

const openIndex = ref(-1)

function toggleItem(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}
</script>

<template>
  <section id="faq" class="section bg-alt">
    <div class="section-inner">
      <div class="section-eyebrow">FAQ</div>
      <h2 class="grad-text">Got Questions?<br />We Have Answers.</h2>
      <p class="section-sub">
        Everything you need to know about NAP Solutions.
      </p>

      <div class="faq-list">
        <div
          v-for="(item, i) in faqItems"
          :key="i"
          class="faq-item"
          :class="{ open: openIndex === i }"
        >
          <button
            class="faq-q"
            :aria-expanded="openIndex === i"
            @click="toggleItem(i)"
          >
            {{ item.q }}
            <span class="faq-icon" aria-hidden="true">
              <Plus :size="13" />
            </span>
          </button>
          <div class="faq-a">{{ item.a }}</div>
        </div>
      </div>

      <div class="faq-cta">
        <div class="faq-cta-text">
          <h3>STILL HAVE QUESTIONS?</h3>
          <p>Book a free demo and we will walk you through everything in person.</p>
        </div>
        <button class="btn-primary" @click="$emit('open-booking')">
          Book a Demo
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-alt {
  background: #f5f7fb;
}
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 880px;
}
.faq-item {
  background: #fff;
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.faq-item.open {
  border-color: rgba(123, 47, 255, 0.25);
  box-shadow: 0 6px 24px rgba(123, 47, 255, 0.08);
}
.faq-q {
  width: 100%;
  background: none;
  border: none;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  color: #0a0f1e;
  transition: color 0.2s;
}
.faq-item.open .faq-q {
  color: #7b2fff;
}
.faq-icon {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f7fb;
  border: 1px solid rgba(10, 15, 30, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5580;
  transition: all 0.3s, transform 0.3s;
}
.faq-icon :deep(svg) {
  display: block;
}
.faq-item.open .faq-icon {
  background: linear-gradient(135deg, #7b2fff, #00d4c0);
  border-color: transparent;
  color: #fff;
  transform: rotate(45deg);
}
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.3s ease;
  font-size: 16px;
  line-height: 1.8;
  color: #4a5580;
  padding: 0 24px;
}
.faq-item.open .faq-a {
  max-height: 340px;
  padding: 0 24px 20px;
}
.faq-cta {
  margin-top: 48px;
  padding: 34px 36px;
  background: linear-gradient(135deg, rgba(123, 47, 255, 0.06), rgba(0, 212, 192, 0.06));
  border: 1.5px solid rgba(123, 47, 255, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 880px;
}
.faq-cta-text h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0a0f1e;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}
.faq-cta-text p {
  font-size: 16px;
  color: #4a5580;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .faq-cta {
    flex-direction: column;
    text-align: center;
  }
}
@media (max-width: 640px) {
  .faq-q {
    padding: 16px;
    font-size: 15px;
    line-height: 1.45;
  }
  .faq-a {
    font-size: 14px;
    line-height: 1.7;
    padding: 0 16px;
  }
  .faq-item.open .faq-a {
    padding: 0 16px 16px;
  }
  .faq-cta {
    margin-top: 34px;
    padding: 24px 16px;
    gap: 16px;
  }
  .faq-cta-text h3 {
    font-size: 16px;
  }
  .faq-cta-text p {
    font-size: 15px;
  }
}
</style>
