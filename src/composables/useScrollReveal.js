import { onMounted, onUnmounted } from 'vue'

const observerPool = new Map()

function getPool(threshold, once) {
  const key = `${threshold}|${once ? 1 : 0}`
  const existing = observerPool.get(key)
  if (existing) return existing

  const targets = new Set()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.dataset.revealed = ''
        if (once) {
          observer.unobserve(entry.target)
          targets.delete(entry.target)
        }
      })
    },
    { threshold }
  )

  const pool = { key, observer, targets }
  observerPool.set(key, pool)
  return pool
}

function maybeDisposePool(pool) {
  if (pool.targets.size > 0) return
  pool.observer.disconnect()
  observerPool.delete(pool.key)
}

/**
 * Observes a list of elements and sets `data-revealed=""` on each
 * when it enters the viewport. CSS handles the actual animation.
 *
 * @param {() => (Element | null)[]} getTargets - called onMounted to get elements
 * @param {{ threshold?: number, once?: boolean }} options
 */
export function useScrollReveal(getTargets, { threshold = 0.06, once = true } = {}) {
  let pool
  let observedTargets = []

  onMounted(() => {
    pool = getPool(threshold, once)

    const targets = getTargets()
    if (targets) {
      observedTargets = targets.filter(Boolean)
      observedTargets.forEach((el) => {
        pool.targets.add(el)
        pool.observer.observe(el)
      })
    }
  })

  onUnmounted(() => {
    if (!pool) return
    observedTargets.forEach((el) => {
      pool.observer.unobserve(el)
      pool.targets.delete(el)
    })
    observedTargets = []
    maybeDisposePool(pool)
    pool = null
  })
}
