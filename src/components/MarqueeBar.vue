<template>
  <div class="marquee-wrap">
    <div class="marquee-track">
      <span v-for="i in 16" :key="i" class="marquee-item">
        BOOK <span class="marquee-sep">&middot;</span>
        ANSWER <span class="marquee-sep">&middot;</span>
        AUTOMATE
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  border-top: 1px solid rgba(10,15,30,0.08);
  border-bottom: 1px solid rgba(10,15,30,0.08);
  background: #f5f7fb;
  padding: 16px 0;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}
.marquee-item {
  font-size: clamp(10px, 0.6rem + 0.35vw, 12px);
  letter-spacing: clamp(2px, 0.6vw, 5px);
  color: #8892b0;
  padding: 0 clamp(18px, 2.8vw, 32px);
  white-space: nowrap;
  font-family: 'Space Mono', monospace;
}
.marquee-sep {
  color: #00D4C0;
}

@media (max-width: 640px) {
  .marquee-wrap {
    padding: 12px 0;
  }

  .marquee-track {
    animation-duration: 18s;
  }
}
</style>
