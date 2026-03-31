<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  open: Boolean,
})
const emit = defineEmits(['close'])

const iframeSrc = ref('')

onMounted(() => {
  iframeSrc.value = 'https://cal.com/napsolutions/nap-solutions-demo'
})

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.open,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
  }
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="modal-overlay"
      @click="onOverlayClick"
      role="dialog"
      aria-modal="true"
      aria-label="Book a Demo"
    >
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-header-left">
            <div class="modal-icon">&var(--accent-ink);</div>
            <div>
              <span class="modal-title">BOOK A DEMO</span>
              <p class="modal-subtitle">
                NAP Solutions - Free 30-min call
              </p>
            </div>
          </div>
          <button
            class="modal-close"
            @click="emit('close')"
            aria-label="Close booking modal"
          >
            &times;
          </button>
        </div>
        <iframe
          v-if="iframeSrc"
          :src="iframeSrc"
          class="modal-iframe"
          loading="lazy"
          title="Book a demo with NAP Solutions"
        ></iframe>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 15, 30, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-box {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 940px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.3);
  animation: fadeUp 0.3s ease;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  border-bottom: 1px solid rgba(10, 15, 30, 0.08);
  flex-shrink: 0;
  background: #fff;
}
.modal-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.modal-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15), rgba(var(--brand-rgb), 0.15));
  border: 1px solid rgba(var(--brand-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.modal-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-main);
}
.modal-subtitle {
  font-size: 12px;
  color: var(--text-body);
  margin-top: 2px;
}
.modal-close {
  background: none;
  border: 1.5px solid rgba(10, 15, 30, 0.08);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-body);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.modal-close:hover {
  background: var(--surface-base);
  color: var(--text-main);
}
.modal-iframe {
  flex: 1;
  width: 100%;
  border: none;
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .modal-box {
    max-width: none;
    height: min(92vh, 820px);
    border-radius: 18px 18px 0 0;
  }

  .modal-header {
    padding: 14px 16px;
  }

  .modal-subtitle {
    line-height: 1.4;
  }
}

@media (max-width: 520px) {
  .modal-box {
    height: 100vh;
    border-radius: 0;
  }

  .modal-title {
    letter-spacing: 1px;
    font-size: 12px;
  }

  .modal-icon {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }
}
</style>