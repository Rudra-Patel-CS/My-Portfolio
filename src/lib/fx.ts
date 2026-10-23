import { useEffect, useRef, useState, type RefObject } from 'react'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * One shared IntersectionObserver for every `[data-reveal]` element.
 * Adds `.is-in` the first time an element enters the viewport.
 */
export function startReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')
  if (reducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'))
    return () => {}
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-in')
        io.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/** Pulls an element toward the pointer while hovered, springs back on leave. */
export function useMagnetic<T extends HTMLElement>(strength = 0.25): RefObject<T | null> {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const leave = () => {
      el.style.transform = ''
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [strength])
  return ref
}

/** Writes the pointer position (relative to the element) into --mx / --my for glow effects. */
export function useSpotlight<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])
  return ref
}

/** Types each phrase out, pauses, deletes it, then moves to the next. */
export function useTypewriter(phrases: string[], speed = 55) {
  const [text, setText] = useState(reducedMotion() ? phrases[0] : '')
  useEffect(() => {
    if (reducedMotion()) return
    let i = 0
    let len = 0
    let deleting = false
    let timer = 0
    const tick = () => {
      const phrase = phrases[i]
      len += deleting ? -1 : 1
      setText(phrase.slice(0, len))
      let delay = deleting ? speed / 2 : speed
      if (!deleting && len === phrase.length) {
        deleting = true
        delay = 1600
      } else if (deleting && len === 0) {
        deleting = false
        i = (i + 1) % phrases.length
        delay = 300
      }
      timer = window.setTimeout(tick, delay)
    }
    timer = window.setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [phrases, speed])
  return text
}

/** Hash routing: `#/project/<id>` opens a project page, anything else is the home page. */
export type Route = { page: 'home'; section: string } | { page: 'project'; id: string }

function parse(hash: string): Route {
  const m = hash.match(/^#\/project\/([\w-]+)/)
  return m ? { page: 'project', id: m[1] } : { page: 'home', section: hash.slice(1) }
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash))
  useEffect(() => {
    const onHash = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}
