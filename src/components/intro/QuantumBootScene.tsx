import { useEffect, useRef } from 'react'
import { TERMINAL_LINES } from '../../content'
import { sound } from '../../lib/audio'

type QuantumBootSceneProps = {
  elapsed: number
}

export function QuantumBootScene({ elapsed }: QuantumBootSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastLineCount = useRef(0)

  // Compute how many terminal lines to display
  // 0.2s -> 2.6s
  const speed = 0.55 // seconds per line
  const activeLineIndex = Math.min(
    TERMINAL_LINES.length,
    Math.floor((elapsed - 0.2) / speed) + 1,
  )
  const visibleLines = elapsed > 0.2 ? TERMINAL_LINES.slice(0, activeLineIndex) : []

  useEffect(() => {
    if (visibleLines.length > lastLineCount.current) {
      lastLineCount.current = visibleLines.length
      sound.typeClick()
    }
  }, [visibleLines.length])

  // Canvas particle starfield & laser mesh
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.clientWidth * window.devicePixelRatio)
    let h = (canvas.height = canvas.clientHeight * window.devicePixelRatio)

    type Point = { x: number; y: number; z: number; speed: number; size: number }
    const points: Point[] = Array.from({ length: 80 }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * 1000 + 1,
      speed: Math.random() * 4 + 2,
      size: Math.random() * 1.5 + 0.8,
    }))

    let raf = 0
    let running = true

    const tick = () => {
      if (!running) return
      ctx.fillStyle = 'rgba(5, 7, 13, 0.25)'
      ctx.fillRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      ctx.fillStyle = '#5ce1ff'
      for (const p of points) {
        p.z -= p.speed
        if (p.z <= 0) {
          p.z = 1000
          p.x = (Math.random() - 0.5) * w
          p.y = (Math.random() - 0.5) * h
        }

        const k = 400 / p.z
        const px = cx + p.x * k
        const py = cy + p.y * k

        if (px >= 0 && px < w && py >= 0 && py < h) {
          const alpha = Math.min(1, (1000 - p.z) / 400)
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(px, py, p.size * k * 0.7, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const handleResize = () => {
      w = canvas.width = canvas.clientWidth * window.devicePixelRatio
      h = canvas.height = canvas.clientHeight * window.devicePixelRatio
    }
    window.addEventListener('resize', handleResize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#05070d]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Cybernetic grid horizon */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.18), transparent 60%)',
        }}
      />

      {/* Rotating Holographic Tech Rings */}
      <div className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[460px] sm:w-[460px] rounded-full border border-cyan-400/20 animate-[spin_24s_linear_infinite]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#5ce1ff]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_#8b5cf6]" />
      </div>

      <div className="pointer-events-none absolute h-[240px] w-[240px] sm:h-[350px] sm:w-[350px] rounded-full border border-dashed border-violet-400/30 animate-[spin_16s_linear_infinite_reverse]" />

      <div className="pointer-events-none absolute h-[160px] w-[160px] sm:h-[240px] sm:w-[240px] rounded-full border border-cyan-300/30 shadow-[0_0_30px_rgba(92,225,255,0.15)] animate-[pulse_3s_ease-in-out_infinite]" />

      {/* Center Glass Terminal Telemetry HUD */}
      <div className="relative z-10 w-[90%] max-w-[560px] rounded-2xl border border-white/15 bg-black/60 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(92,225,255,0.15)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
              core_init.sys
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-300/80">
            SECURE PROTOCOL 256
          </span>
        </div>

        {/* Typing Terminal Lines */}
        <div className="space-y-2 font-mono text-xs sm:text-sm text-cyan-200">
          {visibleLines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-violet-400 select-none">&gt;&gt;</span>
              <span
                className={
                  i === visibleLines.length - 1 &&
                  visibleLines.length === TERMINAL_LINES.length
                    ? 'text-emerald-300 font-semibold'
                    : 'text-white/90'
                }
              >
                {line}
              </span>
            </div>
          ))}

          {visibleLines.length < TERMINAL_LINES.length && (
            <div className="flex items-center gap-2">
              <span className="text-violet-400 select-none">&gt;&gt;</span>
              <span className="h-4 w-2 animate-pulse bg-cyan-400 inline-block align-middle" />
            </div>
          )}
        </div>

        {/* Bottom Hardware Telemetry */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-mono text-white/40">
          <div>NODE: CHARUSAT // CSPIT</div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            LIVE LINK ESTABLISHED
          </div>
        </div>
      </div>
    </div>
  )
}
