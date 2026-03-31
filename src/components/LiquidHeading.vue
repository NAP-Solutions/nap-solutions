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
  -webkit-text-stroke: var(--liquid-stroke-width) var(--brand);
  text-shadow: 0 0 2px rgba(var(--brand-rgb), 0.2);
  -webkit-mask-image: radial-gradient(
    transparent, transparent,
    rgba(255, 255, 255, 0.72), #fff, rgba(255, 255, 255, 0.72),
    transparent, transparent
  );
  mask-image: radial-gradient(
    transparent, transparent,
    rgba(255, 255, 255, 0.72), #fff, rgba(255, 255, 255, 0.72),
    transparent, transparent
  );
  -webkit-mask-size: 300% 300%;
  mask-size: 300% 300%;
  -webkit-mask-position: 0% 0%;
  mask-position: 0% 0%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  animation: liquid-heading-shine-pulse 5s infinite linear, liquid-heading-shine-color 5s infinite linear;
  will-change: -webkit-mask-position, mask-position, -webkit-text-stroke-color, text-shadow;
}

.liquid-heading-layer--fill {
  position: relative;
  z-index: 2;
}

.liquid-heading-content {
  display: block;
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
  background-image: var(--heading-gradient);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-shadow: none;
}

@keyframes liquid-heading-shine-pulse {
  0% {
    -webkit-mask-position: 0% 0%;
    mask-position: 0% 0%;
  }
  50% {
    -webkit-mask-position: 100% 100%;
    mask-position: 100% 100%;
  }
  100% {
    -webkit-mask-position: 0% 0%;
    mask-position: 0% 0%;
  }
}

@keyframes liquid-heading-shine-color {
  0% {
    -webkit-text-stroke-color: var(--brand);
    text-shadow: 0 0 2px rgba(var(--brand-rgb), 0.2);
  }
  50% {
    -webkit-text-stroke-color: var(--accent);
    text-shadow:
      0 0 6px rgba(var(--accent-rgb), 0.35),
      0 0 2px rgba(255, 255, 255, 0.2);
  }
  100% {
    -webkit-text-stroke-color: var(--brand-strong);
    text-shadow:
      0 0 6px rgba(var(--brand-rgb), 0.3),
      0 0 2px rgba(255, 255, 255, 0.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .liquid-heading-layer--shine {
    animation: none;
  }
}
</style>
