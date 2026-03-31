import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

/**
 * Wraps GSAP SplitText so its onSplit animation can be inserted into
 * an external timeline and safely replaced on responsive re-splits.
 */
export function createSplitTextAnimation(target, config) {
  let animation
  const onSplit = config.onSplit

  const split = SplitText.create(target, {
    ...config,
    onSplit(self) {
      let parent
      let startTime

      if (animation) {
        parent = animation.parent
        startTime = animation.startTime()
        animation.kill()
      }

      animation = onSplit ? onSplit(self) : null

      if (parent && animation) {
        parent.add(animation, startTime || 0)
      }

      return animation
    },
  })

  return {
    get animation() {
      return animation
    },
    destroy() {
      animation?.kill()
      split.revert()
    },
  }
}
