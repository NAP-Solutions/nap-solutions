import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const SCROLL_EPSILON = 1

function normalizePath(pathname) {
  return pathname
    .replace(/\/index\.html$/i, '/')
    .replace(/\/+$/, '') || '/'
}

function getHeaderOffset() {
  const scrollPaddingTop = window.getComputedStyle(document.documentElement).scrollPaddingTop
  const parsed = Number.parseFloat(scrollPaddingTop)
  return Number.isFinite(parsed) ? parsed : 96
}

function getElementFromTarget(target) {
  if (!target) return null

  if (target instanceof Element) return target

  // Vue ref-like object support
  if (typeof target === 'object' && 'value' in target) {
    return target.value instanceof Element ? target.value : null
  }

  if (typeof target !== 'string') return null
  const trimmed = target.trim()
  if (!trimmed || trimmed === '#') return null

  const selector = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  try {
    return document.querySelector(selector)
  } catch {
    return null
  }
}

function isWindowScroller(el) {
  return el === document.documentElement || el === document.body
}

function isScrollableElement(el) {
  const style = window.getComputedStyle(el)
  const overflowY = style.overflowY
  const allowsScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay'
  return allowsScroll && el.scrollHeight - el.clientHeight > SCROLL_EPSILON
}

function resolveScrollContainer(targetElement) {
  let current = targetElement.parentElement

  while (current && current !== document.body && current !== document.documentElement) {
    if (isScrollableElement(current)) {
      return current
    }
    current = current.parentElement
  }

  const scrollingElement = document.scrollingElement || document.documentElement
  if (isWindowScroller(scrollingElement)) return window

  return isScrollableElement(scrollingElement) ? scrollingElement : window
}

function getScrollDestination(container, targetElement, offsetY) {
  const targetRect = targetElement.getBoundingClientRect()

  if (container === window) {
    return Math.max(0, window.pageYOffset + targetRect.top - offsetY)
  }

  const containerRect = container.getBoundingClientRect()
  return Math.max(0, container.scrollTop + (targetRect.top - containerRect.top) - offsetY)
}

function updateHashForElement(elem) {
  const elemId = elem.getAttribute('id')
  if (!elemId) return
  const nextHash = `#${elemId}`
  if (window.location.hash !== nextHash) {
    window.history.pushState(null, '', nextHash)
  }
}

// Shared app-level API.
export function scrollToSection(target, e, options = {}) {
  const elem = getElementFromTarget(target)
  if (!elem) {
    if (e) e.preventDefault()
    console.warn(`[scrollToSection] Missing target for "${String(target)}"`)
    return false
  }

  if (e) e.preventDefault()

  const container = options.container || resolveScrollContainer(elem)
  const offsetY = options.offsetY ?? getHeaderOffset()
  const destinationY = getScrollDestination(container, elem, offsetY)

  gsap.killTweensOf(container)
  gsap.to(container, {
    duration: options.duration ?? 0.9,
    ease: options.ease ?? 'power2.out',
    overwrite: 'auto',
    scrollTo: {
      y: destinationY,
      autoKill: true,
    },
    onComplete: () => {
      updateHashForElement(elem)
    },
  })

  return true
}

export function useScrollToSection() {
  return { scrollToSection }
}

// Detect if a link's href goes to the current page.
export function getSamePageAnchor(link) {
  const rawHref = link.getAttribute('href')
  if (!rawHref) return false

  let url
  try {
    url = new URL(rawHref, window.location.href)
  } catch {
    return false
  }

  if (
    url.origin !== window.location.origin ||
    normalizePath(url.pathname) !== normalizePath(window.location.pathname) ||
    url.search !== window.location.search
  ) {
    return false
  }

  const hash = url.hash
  if (!hash || hash === '#') return false
  return hash
}

export function scrollToHash(hash, e) {
  return scrollToSection(hash, e)
}

// If a link's href is within the current page, scroll to it instead.
export function initSamePageLinkScroll() {
  const onClick = (e) => {
    if (e.defaultPrevented) return

    const clickPath = typeof e.composedPath === 'function' ? e.composedPath() : []
    const pathAnchor = clickPath.find((node) => node instanceof HTMLAnchorElement && node.hasAttribute('href'))
    const targetAnchor = e.target instanceof Element ? e.target.closest('a[href]') : null
    const link = pathAnchor || targetAnchor
    if (!link) return

    const hash = getSamePageAnchor(link)
    if (!hash) return

    scrollToSection(hash, e)
  }

  document.addEventListener('click', onClick)

  if (window.location.hash) {
    requestAnimationFrame(() => {
      scrollToSection(window.location.hash)
    })
  }

  return () => {
    document.removeEventListener('click', onClick)
  }
}
