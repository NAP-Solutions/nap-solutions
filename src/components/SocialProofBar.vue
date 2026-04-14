<script setup>
import { ref } from 'vue'
import { Activity, Home, Heart, Stethoscope, Briefcase } from 'lucide-vue-next'
import { useScrollReveal } from '../composables/useScrollReveal'

const props = defineProps({
  service: {
    type: String,
    default: 'ai-receptionist',
  },
})

const proofContent = {
  'ai-receptionist': {
    label: 'Trusted by appointment-based businesses',
    note: 'Client logos coming soon - currently in active onboarding',
  },
  'outbound-agent': {
    label: 'Built for teams that run on outbound pipeline',
    note: '24/7 outreach coverage - no lead left behind',
  },
}

const content = proofContent[props.service] ?? proofContent['ai-receptionist']
const barRef = ref(null)
useScrollReveal(() => [barRef.value])
</script>

<template>
  <div class="sp-bar" ref="barRef">
    <div class="sp-inner">
      <p class="sp-label">{{ content.label }}</p>
      <div class="sp-logos">
        <div class="sp-slot">
          <div class="sp-icon-wrap">
            <Activity :size="16" />
          </div>
          <span class="sp-name">MedClinic</span>
        </div>
        <div class="sp-slot">
          <div class="sp-icon-wrap">
            <Home :size="16" />
          </div>
          <span class="sp-name">LawGroup</span>
        </div>
        <div class="sp-slot">
          <div class="sp-icon-wrap">
            <Heart :size="16" />
          </div>
          <span class="sp-name">WellnessStudio</span>
        </div>
        <div class="sp-slot">
          <div class="sp-icon-wrap">
            <Stethoscope :size="16" />
          </div>
          <span class="sp-name">DentalCare</span>
        </div>
        <div class="sp-slot">
          <div class="sp-icon-wrap">
            <Briefcase :size="16" />
          </div>
          <span class="sp-name">FitLife</span>
        </div>
      </div>
      <div class="sp-coming">
        <span class="sp-dot"></span>
        {{ content.note }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sp-bar {
  background: #ffffff;
  padding-block: 28px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.sp-inner {
  width: min(var(--content-max), calc(100% - (var(--gutter) * 2)));
  margin-inline: auto;
  text-align: center;
}
.sp-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 18px;
}
.sp-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}
.sp-slot {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.28;
  filter: grayscale(1);
}
.sp-icon-wrap {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  flex-shrink: 0;
}
.sp-icon-wrap :deep(svg) {
  display: block;
}
.sp-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
}
.sp-coming {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding-top: 18px;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}
.sp-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 5px var(--accent);
  flex-shrink: 0;
  animation: pulse 2s infinite;
}
.sp-bar[data-revealed] {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .sp-logos {
    gap: 20px;
  }
  .sp-name {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .sp-logos {
    gap: 16px;
  }
  .sp-icon-wrap {
    width: 24px;
    height: 24px;
  }
  .sp-name {
    font-size: 11px;
  }
}
</style>
