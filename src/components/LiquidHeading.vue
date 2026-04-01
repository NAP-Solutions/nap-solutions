<script setup>
defineProps({
  as: {
    type: String,
    default: 'h2',
  },
})

const layers = [
  { className: 'liquid-heading-layer liquid-heading-layer--stroke', ariaHidden: true },
  { className: 'liquid-heading-layer liquid-heading-layer--shine', ariaHidden: true },
  { className: 'liquid-heading-layer liquid-heading-layer--fill', ariaHidden: false },
]
</script>

<template>
  <component :is="as" class="liquid-heading-stack">
    <span
      v-for="layer in layers"
      :key="layer.className"
      :class="layer.className"
      :aria-hidden="layer.ariaHidden ? 'true' : null"
    >
      <span class="liquid-heading-content"><slot /></span>
    </span>
  </component>
</template>

<style scoped>
.liquid-heading-stack {
  --liquid-stroke-width: clamp(1.6px, 0.03em, 2.1px);
  position: relative;
  display: block;
  width: fit-content;
  max-width: 100%;
}

.liquid-heading-layer {
  display: block;
}

.liquid-heading-layer--stroke,
.liquid-heading-layer--shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;
  color: transparent;
  -webkit-text-fill-color: transparent;
  paint-order: stroke fill;
}

.liquid-heading-layer--stroke {
  z-index: 0;
  -webkit-text-stroke: var(--liquid-stroke-width) #fff;
  text-shadow: none;
}

.liquid-heading-layer--shine {
  z-index: 1;
  -webkit-text-stroke: var(--liquid-stroke-width) rgba(var(--brand-rgb), 0.76);
  text-shadow: 0 0 1px rgba(var(--brand-rgb), 0.18);
  -webkit-mask-image: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.94) 50%,
    transparent 62%
  );
  mask-image: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.94) 50%,
    transparent 62%
  );
  -webkit-mask-size: 220% 100%;
  mask-size: 220% 100%;
  -webkit-mask-position: -120% 0%;
  mask-position: -120% 0%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  animation: liquid-heading-shine-sweep 9s infinite linear;
  will-change: -webkit-mask-position, mask-position;
}

.liquid-heading-layer--fill {
  position: relative;
  z-index: 2;
}

.liquid-heading-content {
  display: inline;
  line-height: inherit;
  padding-bottom: 0.08em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.liquid-heading-layer--stroke .liquid-heading-content,
.liquid-heading-layer--shine .liquid-heading-content {
  color: transparent;
  background: none;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
}

.liquid-heading-layer--fill .liquid-heading-content {
  -webkit-text-stroke: 0;
  background: none;
  -webkit-background-clip: border-box;
  background-clip: border-box;
  -webkit-text-fill-color: var(--text-main);
  color: var(--text-main);
  text-shadow: none;
}

@keyframes liquid-heading-shine-sweep {
  0% {
    -webkit-mask-position: -120% 0%;
    mask-position: -120% 0%;
  }
  100% {
    -webkit-mask-position: 120% 0%;
    mask-position: 120% 0%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .liquid-heading-layer--shine {
    animation: none;
    opacity: 0.26;
  }
}

@media (max-width: 768px) {
  .liquid-heading-layer--shine {
    animation: none;
    opacity: 0.32;
  }
}
</style>
