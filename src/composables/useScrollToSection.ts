import { scrollToSection as baseScrollToSection } from './gsapScrollTo'

export function useScrollToSection() {
  return {
    scrollToSection: baseScrollToSection,
  }
}

export const scrollToSection = baseScrollToSection
