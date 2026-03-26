import { onMounted, onUnmounted } from 'vue'

/**
 * Observes a list of elements and sets `data-revealed=""` on each
 * when it enters the viewport. CSS handles the actual animation.
 *
 * @param {() => (Element | null)[]} getTargets - called onMounted to get elements
 * @param {{ threshold?: number, once?: boolean }} options
 */
export function useScrollReveal(getTargets, { threshold = 0.06, once = true } = {}) {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.revealed = ''
            if (once) observer?.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const targets = getTargets()
    if (targets) {
      targets.forEach((el) => el && observer.observe(el))
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
