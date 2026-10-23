import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/fx'

type V3 = [number, number, number]
type Arc = { a: V3; b: V3; born: number }

const POINTS = 760
const ARC_LIFE = 2600
const TILT = 0.38

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
function sphere(n: number): V3[] {
  const out: V3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = golden * i
    out.push([Math.cos(t) * r, y, Math.sin(t) * r])
  }
  return out
}

/**
 * A slowly turning planet of glowing dots with data "flight paths" arcing
 * between random points — drawn live on a canvas, so it costs no download.
 */
export function Globe() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const pts = sphere(POINTS)
    const arcs: Arc[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const still = reducedMotion()
    let size = 0
    let raf = 0
    let visible = true
    let lastArc = 0
    const start = performance.now()

    const resize = () => {
      size = canvas.clientWidth
      canvas.width = Math.round(size * dpr)
      canvas.height = Math.round(size * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const rotate = (v: V3, ang: number): V3 => {
      const cy = Math.cos(ang)
      const sy = Math.sin(ang)
      const x = v[0] * cy + v[2] * sy
      const z = -v[0] * sy + v[2] * cy
      const ct = Math.cos(TILT)
      const st = Math.sin(TILT)
      return [x, v[1] * ct - z * st, v[1] * st + z * ct]
    }

    const draw = (now: number) => {
      const t = now - start
      const ang = t * 0.00012
      const R = size * 0.46
      const c = size / 2
      ctx.clearRect(0, 0, size, size)

      const glow = ctx.createRadialGradient(c, c, R * 0.6, c, c, R * 1.12)
      glow.addColorStop(0, 'rgba(34, 211, 238, 0)')
      glow.addColorStop(0.75, 'rgba(34, 211, 238, 0.10)')
      glow.addColorStop(1, 'rgba(168, 85, 247, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, size, size)

      for (const v of pts) {
        const [x, y, z] = rotate(v, ang)
        const front = z > 0
        ctx.fillStyle = front ? `rgba(103, 232, 249, ${(0.35 + z * 0.6).toFixed(2)})` : 'rgba(168, 85, 247, 0.16)'
        const s = front ? 1 + z * 0.9 : 0.8
        ctx.fillRect(c + x * R - s / 2, c - y * R - s / 2, s, s)
      }

      if (!still && t - lastArc > 650 && arcs.length < 7) {
        lastArc = t
        arcs.push({ a: pts[(Math.random() * POINTS) | 0], b: pts[(Math.random() * POINTS) | 0], born: t })
      }
      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i]
        const life = (t - arc.born) / ARC_LIFE
        if (life >= 1) {
          arcs.splice(i, 1)
          continue
        }
        const head = Math.min(1, life * 1.8)
        const fade = life > 0.7 ? 1 - (life - 0.7) / 0.3 : 1
        ctx.lineWidth = 1.4
        ctx.beginPath()
        let px = 0
        let py = 0
        let drawn = false
        const steps = 28
        for (let s = 0; s <= steps * head; s++) {
          const k = s / steps
          const m: V3 = [arc.a[0] + (arc.b[0] - arc.a[0]) * k, arc.a[1] + (arc.b[1] - arc.a[1]) * k, arc.a[2] + (arc.b[2] - arc.a[2]) * k]
          const len = Math.hypot(m[0], m[1], m[2]) || 1
          const lift = 1 + 0.28 * Math.sin(Math.PI * k)
          const [x, y, z] = rotate([(m[0] / len) * lift, (m[1] / len) * lift, (m[2] / len) * lift], ang)
          if (z < -0.15) continue
          px = c + x * R
          py = c - y * R
          if (!drawn) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
          drawn = true
        }
        if (!drawn) continue
        const g = ctx.createLinearGradient(c - R, c, c + R, c)
        g.addColorStop(0, `rgba(34, 211, 238, ${fade.toFixed(2)})`)
        g.addColorStop(1, `rgba(192, 132, 252, ${fade.toFixed(2)})`)
        ctx.strokeStyle = g
        ctx.stroke()
        ctx.fillStyle = `rgba(255, 255, 255, ${fade.toFixed(2)})`
        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!still && visible && !document.hidden) raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (still) draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !still) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && visible && !still) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="globe" aria-hidden="true" />
}
