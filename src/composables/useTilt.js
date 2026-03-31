import { onMounted, onBeforeUnmount } from 'vue'

const MAX_TILT    = 8    // degrees, measured from centre to edge
const PERSPECTIVE = 900  // px

/**
 * Adds a 3-D mouse-tracking tilt to a list of card elements.
 *
 * @param {() => (Element | null)[]} getElements - called onMounted
 * @param {{ requireReveal?: boolean }} options
 *   requireReveal (default true) — when true, tilt only activates once the
 *   element has `data-revealed` set, so it never fights a CSS translateY
 *   reveal animation. Pass false for elements that have no reveal animation
 *   of their own (e.g. cost-row, chat-widget whose parent does the reveal).
 */
export function useTilt(getElements, { requireReveal = true } = {}) {
  const cleanups = []

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const elements = getElements().filter(Boolean)

    for (const el of elements) {
      let resetTimer = 0

      function onMove(e) {
        // Don't fight a CSS translateY reveal animation on this element.
        if (requireReveal && !('revealed' in el.dataset)) return

        clearTimeout(resetTimer)

        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width  - 0.5  // −0.5 → +0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5  // −0.5 → +0.5

        const rotateX = -y * MAX_TILT * 2
        const rotateY =  x * MAX_TILT * 2

        el.style.transition = 'transform 0.08s ease-out'
        el.style.transform  = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

        // Drive the glare overlay position via CSS custom properties.
        el.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`)
        el.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`)
        el.dataset.tilting = ''
      }

      function onLeave() {
        clearTimeout(resetTimer)
        delete el.dataset.tilting

        // Spring the card back to flat.
        el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        el.style.transform  = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg)`

        // Once the spring animation finishes, hand transform back to CSS
        // so the card's normal hover/reveal rules apply unobstructed.
        resetTimer = window.setTimeout(() => {
          el.style.transition = ''
          el.style.transform  = ''
        }, 510)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)

      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        clearTimeout(resetTimer)
        el.style.transition = ''
        el.style.transform  = ''
        delete el.dataset.tilting
      })
    }
  })

  onBeforeUnmount(() => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  })
}
