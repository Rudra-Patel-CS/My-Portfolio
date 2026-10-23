import { useEffect, useRef } from 'react'
import { finePointer, reducedMotion } from '../lib/fx'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label'
const TRAIL_MS = 240

/**
 * Neon cursor: a dot pinned exactly to the pointer (moved inside the pointer
 * event, never smoothed), a ring that follows quickly, and a fading comet
 * trail. Grows over links, turns into a "View" bubble over [data-cursor].
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const trail = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!finePointer()) return
    const root = document.documentElement
    const canvas = trail.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !dot.current || !ring.current) return
    const dotEl = dot.current
    const ringEl = ring.current
    root.classList.add('has-cursor')

    const still = reducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const p = { x: -200, y: -200 }
    const r = { x: -200, y: -200 }
    const pts: { x: number; y: number; t: number }[] = []
    let raf = 0
    let running = false

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const loop = (now: number) => {
      r.x += (p.x - r.x) * 0.34
      r.y += (p.y - r.y) * 0.34
      ringEl.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`

      while (pts.length && now - pts[0].t > TRAIL_MS) pts.shift()
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.lineCap = 'round'
      for (let i = 1; i < pts.length; i++) {
        const k = i / pts.length
        const a = pts[i - 1]
        const b = pts[i]
        ctx.strokeStyle = `hsla(${275 - 85 * k}, 95%, 66%, ${(k * 0.85).toFixed(3)})`
        ctx.lineWidth = 0.5 + k * 4
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      if (pts.length || Math.abs(p.x - r.x) + Math.abs(p.y - r.y) > 0.4) {
        raf = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }
    const kick = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      p.x = e.clientX
      p.y = e.clientY
      dotEl.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      if (!root.classList.contains('cursor-on')) {
        r.x = p.x
        r.y = p.y
        root.classList.add('cursor-on')
      }
      if (!still) pts.push({ x: p.x, y: p.y, t: performance.now() })
      kick()
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element
      // Pointer events stop at an iframe edge, so hand control back to the system cursor there.
      root.classList.toggle('cursor-off', t.tagName === 'IFRAME')
      const view = t.closest?.('[data-cursor]')
      const hover = !view && t.closest?.(INTERACTIVE)
      root.classList.toggle('cursor-view', !!view)
      root.classList.toggle('cursor-hover', !!hover)
      if (view && label.current) label.current.textContent = view.getAttribute('data-cursor') ?? ''
    }
    const leave = () => root.classList.remove('cursor-on')
    const down = () => root.classList.add('cursor-down')
    const up = () => root.classList.remove('cursor-down')

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor', 'cursor-on', 'cursor-off', 'cursor-view', 'cursor-hover', 'cursor-down')
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <canvas ref={trail} className="cursor-trail" />
      <div ref={ring} className="cursor-ring">
        <span className="cursor-ring-shape">
          <span ref={label} className="cursor-label" />
        </span>
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  )
}
