import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { sound } from '../../lib/audio'

type WaterDropSceneProps = {
  impact: boolean
  dropVisible: boolean
}

type Sparkle = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

function gridForWidth(width: number) {
  if (width < 768) return { cols: 130, rows: 72 }
  if (width < 1280) return { cols: 210, rows: 118 }
  return { cols: 280, rows: 160 }
}

function bakeLake(cols: number, rows: number) {
  const data = new Uint8ClampedArray(cols * rows * 4)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4
      const nx = x / cols - 0.5
      const ny = y / rows - 0.5
      const r = Math.sqrt(nx * nx + ny * ny * 0.7)
      const sheen = Math.pow(Math.max(0, 1 - r * 1.8), 2) * 32
      const band = Math.sin(y * 0.35 + x * 0.02) * 4
      const n =
        Math.sin(x * 0.27) * Math.cos(y * 0.19) * 6 +
        Math.sin(x * 1.7 + y * 0.9) * 2
      const v = 5 + sheen + band + n
      data[i] = 4 + v * 0.35
      data[i + 1] = 8 + v * 0.55
      data[i + 2] = 20 + v * 0.95
      data[i + 3] = 255
    }
  }
  return data
}

export function WaterDropScene({ impact, dropVisible }: WaterDropSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparklesCanvasRef = useRef<HTMLCanvasElement>(null)
  const impactRef = useRef(false)
  const [sparklesTriggered, setSparklesTriggered] = useState(false)

  useEffect(() => {
    impactRef.current = impact
    if (impact && !sparklesTriggered) {
      setSparklesTriggered(true)
      sound.plink()
      sound.sparkle()
    }
  }, [impact, sparklesTriggered])

  // Sparkles particle system ("spraken")
  useEffect(() => {
    const canvas = sparklesCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.clientWidth)
    let h = (canvas.height = canvas.clientHeight)

    let sparkles: Sparkle[] = []

    // When impact triggers, spawn a fountain of sparkles
    if (impact) {
      const colors = ['#ffffff', '#a5f3fc', '#c4b5fd', '#38bdf8', '#fef08a']
      const count = 65

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 1.5
        sparkles.push({
          id: Math.random(),
          x: w / 2,
          y: h / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 2, // slight upward bounce
          size: Math.random() * 3.5 + 1.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    let raf = 0
    let running = true

    const tick = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      // Update & draw sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.04 // soft gravity
        s.vx *= 0.985
        s.alpha -= 0.009

        if (s.alpha <= 0) {
          sparkles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = s.alpha
        ctx.fillStyle = s.color
        ctx.shadowBlur = 12
        ctx.shadowColor = s.color

        // Draw 4-point star sparkle shape
        ctx.translate(s.x, s.y)
        ctx.beginPath()
        const r = s.size
        ctx.moveTo(0, -r * 2)
        ctx.quadraticCurveTo(0, 0, r * 2, 0)
        ctx.quadraticCurveTo(0, 0, 0, r * 2)
        ctx.quadraticCurveTo(0, 0, -r * 2, 0)
        ctx.quadraticCurveTo(0, 0, 0, -r * 2)
        ctx.fill()
        ctx.restore()
      }

      // Add gentle random ambient sparkles over water
      if (impact && Math.random() > 0.45 && sparkles.length < 90) {
        sparkles.push({
          id: Math.random(),
          x: w / 2 + (Math.random() - 0.5) * w * 0.7,
          y: h / 2 + (Math.random() - 0.5) * h * 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.6,
          size: Math.random() * 2.2 + 0.8,
          alpha: 0.9,
          color: '#a5f3fc',
        })
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const onResize = () => {
      w = canvas.width = canvas.clientWidth
      h = canvas.height = canvas.clientHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [impact])

  // Water Ripple Fluid Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const sim = document.createElement('canvas')
    const sctx = sim.getContext('2d', { alpha: false })
    if (!sctx) return

    let cols = 0
    let rows = 0
    let bufA = new Float32Array(0)
    let bufB = new Float32Array(0)
    let lake = new Uint8ClampedArray(0)
    let img = new ImageData(1, 1)
    let ringCount = 0
    let lastRing = 0
    let fired = false

    const fit = () => {
      canvas.width = Math.max(1, canvas.clientWidth)
      canvas.height = Math.max(1, canvas.clientHeight)
    }

    const rebuild = () => {
      const g = gridForWidth(window.innerWidth)
      cols = g.cols
      rows = g.rows
      bufA = new Float32Array(cols * rows)
      bufB = new Float32Array(cols * rows)
      lake = bakeLake(cols, rows)
      img = new ImageData(cols, rows)
      sim.width = cols
      sim.height = rows
      ringCount = 0
      fired = false
      lastRing = 0
    }

    const disturb = (
      cx: number,
      cy: number,
      radius: number,
      strength: number,
      target: Float32Array,
    ) => {
      const r2 = radius * radius
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const dx = x - cx
          const dy = y - cy
          const d2 = dx * dx + dy * dy
          if (d2 < r2) {
            const f = Math.cos((Math.sqrt(d2) / radius) * Math.PI)
            target[y * cols + x] += strength * f
          }
        }
      }
    }

    fit()
    rebuild()

    let raf = 0
    let running = true

    const tick = (now: number) => {
      if (!running) return

      if (impactRef.current && !fired) {
        fired = true
        disturb(cols / 2, rows / 2, Math.max(4, cols * 0.032), 260, bufA)
        ringCount = 1
        lastRing = now
      }
      if (impactRef.current && ringCount < 7 && now - lastRing > 160) {
        const amp = 160 - ringCount * 18
        disturb(cols / 2, rows / 2, 3 + ringCount, amp, bufA)
        ringCount += 1
        lastRing = now
      }

      if (!impactRef.current && Math.random() > 0.72) {
        const x = 2 + ((Math.random() * (cols - 4)) | 0)
        const y = 2 + ((Math.random() * (rows - 4)) | 0)
        bufA[y * cols + x] += (Math.random() - 0.5) * 1.1
      }

      const damp = 0.985
      for (let y = 1; y < rows - 1; y++) {
        const row = y * cols
        for (let x = 1; x < cols - 1; x++) {
          const i = row + x
          const n =
            (bufA[i - 1] + bufA[i + 1] + bufA[i - cols] + bufA[i + cols]) / 2 -
            bufB[i]
          bufB[i] = n * damp
        }
      }
      const swap = bufA
      bufA = bufB
      bufB = swap

      const k = 0.22
      const out = img.data
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x
          const dx = bufA[i + 1] - bufA[i - 1]
          const dy = bufA[i + cols] - bufA[i - cols]
          let sx = x + dx * k
          let sy = y + dy * k
          if (sx < 0) sx = 0
          if (sy < 0) sy = 0
          if (sx > cols - 1) sx = cols - 1
          if (sy > rows - 1) sy = rows - 1
          const si = ((sy | 0) * cols + (sx | 0)) * 4
          const oi = i * 4
          const highlight = Math.max(0, bufA[i]) * 0.95
          out[oi] = Math.min(255, lake[si] + highlight * 1.5)
          out[oi + 1] = Math.min(255, lake[si + 1] + highlight * 1.9)
          out[oi + 2] = Math.min(255, lake[si + 2] + highlight * 2.4)
          out[oi + 3] = 255
        }
      }

      sctx.putImageData(img, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(sim, 0, 0, canvas.width, canvas.height)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const onResize = () => {
      fit()
      rebuild()
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#04060b]">
      {/* Lake water simulation canvas */}
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* Sparkles Particle Canvas ("spraken") */}
      <canvas
        ref={sparklesCanvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full z-15"
      />

      {/* Ambient vignette and light reflection */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(120,200,255,0.08), transparent 50%), radial-gradient(ellipse at center, transparent 40%, rgba(4,6,11,0.8) 100%)',
        }}
      />

      {/* The Falling Droplet with Glowing Trail */}
      {dropVisible && (
        <motion.div
          className="pointer-events-none absolute left-1/2 z-20"
          initial={{ top: '-10%', opacity: 0 }}
          animate={{ top: '50%', opacity: 1 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: '-50%' }}
        >
          <div className="relative h-4 w-4">
            {/* Bright pearl-blue core */}
            <div className="absolute inset-0 rounded-full bg-cyan-100 shadow-[0_0_22px_8px_rgba(92,225,255,0.9)]" />
            {/* Luminous speed streak */}
            <div className="absolute left-1/2 top-[-36px] h-10 w-[2.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/60 to-cyan-100" />
            {/* Floating micro sparks around drop */}
            <span className="absolute -left-2 top-2 h-1 w-1 rounded-full bg-white shadow-[0_0_6px_#fff] animate-ping" />
            <span className="absolute -right-2 top-0 h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_6px_#5ce1ff] animate-ping" />
          </div>
        </motion.div>
      )}

      {/* Impact Flash and Shockwave Ring */}
      {impact && (
        <>
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100"
            initial={{ opacity: 0.95, scale: 0.15 }}
            animate={{ opacity: 0, scale: 3.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/80 shadow-[0_0_30px_#5ce1ff]"
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.8 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </>
      )}
    </div>
  )
}
