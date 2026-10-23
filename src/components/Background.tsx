import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/fx'

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string }
type Star = { x: number; y: number; z: number; phase: number }

const LINK = 130
const MOUSE_LINK = 190
const COLORS = ['34, 211, 238', '129, 140, 248', '168, 85, 247']

/**
 * Space behind the whole site: a twinkling starfield with mouse parallax and a
 * constellation network that links nearby nodes and reaches toward the cursor.
 * Pauses when the tab is hidden.
 */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const still = reducedMotion()
    const mouse = { x: -9999, y: -9999 }
    const par = { x: 0, y: 0 }
    let w = 0
    let h = 0
    let nodes: Node[] = []
    let stars: Star[] = []
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, Math.max(24, (w * h) / 20000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1 + Math.random() * 1.6,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }))
      stars = Array.from({ length: Math.round(Math.min(220, (w * h) / 7000)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      }))
      if (still) draw(0)
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)

      // Stars: nearer ones (higher z) are brighter and shift more with the mouse.
      par.x += ((mouse.x > -9000 ? mouse.x - w / 2 : 0) * 0.02 - par.x) * 0.05
      par.y += ((mouse.y > -9000 ? mouse.y - h / 2 : 0) * 0.02 - par.y) * 0.05
      for (const s of stars) {
        const a = 0.25 + 0.55 * s.z * (0.6 + 0.4 * Math.sin(now * 0.0015 + s.phase))
        ctx.fillStyle = `rgba(226, 232, 255, ${a.toFixed(2)})`
        const size = s.z > 0.85 ? 1.8 : 1.1
        ctx.fillRect(s.x - par.x * s.z, s.y - par.y * s.z, size, size)
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > LINK * LINK) continue
          ctx.strokeStyle = `rgba(${a.c}, ${((1 - Math.sqrt(d2) / LINK) * 0.26).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < MOUSE_LINK) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${((1 - md / MOUSE_LINK) * 0.55).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.c}, 0.85)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = (now: number) => {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < -20) n.x = w + 20
        else if (n.x > w + 20) n.x = -20
        if (n.y < -20) n.y = h + 20
        else if (n.y > h + 20) n.y = -20
      }
      draw(now)
      raf = requestAnimationFrame(step)
    }

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const out = () => {
      mouse.x = mouse.y = -9999
    }
    const visibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !still) raf = requestAnimationFrame(step)
    }

    resize()
    if (!still) raf = requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', out)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', out)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <canvas ref={ref} className="bg-net" />
    </div>
  )
}

/** Every click or tap leaves a neon ripple where it landed. */
export function ClickRipple() {
  useEffect(() => {
    if (reducedMotion()) return
    const down = (e: PointerEvent) => {
      const el = document.createElement('span')
      el.className = 'ripple'
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      el.addEventListener('animationend', () => el.remove())
      document.body.appendChild(el)
    }
    window.addEventListener('pointerdown', down, { passive: true })
    return () => window.removeEventListener('pointerdown', down)
  }, [])
  return null
}
