import { useEffect, useMemo, useRef } from 'react'
import { TERMINAL_LINES } from '../../content'
import { sound } from '../../lib/audio'

const KEY_ROWS = [
  ['esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
  [' '],
]

type LaptopSceneProps = {
  elapsed: number
  glitch: boolean
  simplified: boolean
}

function typedState(elapsed: number) {
  const start = 0.3
  const t = Math.max(0, elapsed - start)
  const cps = 32
  const pause = 0.18
  let consumed = 0
  const lines: string[] = []
  let activeChar = ''

  for (let i = 0; i < TERMINAL_LINES.length; i++) {
    const line = TERMINAL_LINES[i]
    const need = line.length / cps
    if (t < consumed) break
    const local = t - consumed
    if (local >= need) {
      lines.push(line)
      consumed += need + pause
    } else {
      const n = Math.min(line.length, Math.floor(local * cps))
      const partial = line.slice(0, n)
      lines.push(partial)
      activeChar = line[n - 1] ?? ''
      consumed += need
      break
    }
  }
  return {
    lines,
    activeChar,
    done:
      lines.length === TERMINAL_LINES.length &&
      lines.at(-1) === TERMINAL_LINES.at(-1),
  }
}

export function LaptopScene({ elapsed, glitch, simplified }: LaptopSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastLen = useRef(0)
  const typed = useMemo(() => typedState(elapsed), [elapsed])

  useEffect(() => {
    const text = typed.lines.join('')
    if (text.length > lastLen.current) {
      lastLen.current = text.length
      sound.typeClick()
    }
  }, [typed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.clientWidth * 2)
    let h = (canvas.height = canvas.clientHeight * 2)
    const cols = Math.floor(w / 14)
    const drops = Array.from({ length: cols }, () => Math.random() * 40)
    const glyphs = '01アイウエオλΣµ<>/$#*MLCS'.split('')

    type Node = { x: number; y: number; vx: number; vy: number }
    const nodes: Node[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    let raf = 0
    let running = true
    const tick = () => {
      if (!running) return
      ctx.fillStyle = 'rgba(4, 10, 22, 0.28)'
      ctx.fillRect(0, 0, w, h)

      ctx.font = '20px "IBM Plex Mono", monospace'
      ctx.fillStyle = 'rgba(92, 225, 255, 0.55)'
      for (let i = 0; i < drops.length; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0]
        ctx.fillText(ch, i * 14, drops[i] * 14)
        if (drops[i] * 14 > h && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.35 + (glitch ? 1.2 : 0)
      }

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)'
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 16000) {
            ctx.globalAlpha = 1 - d2 / 16000
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = '#5ce1ff'
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2)
        ctx.fill()
      }

      if (glitch && Math.random() > 0.4) {
        const y = Math.random() * h
        ctx.drawImage(canvas, 0, y, w, 12, (Math.random() - 0.5) * 40, y, w, 12)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onResize = () => {
      w = canvas.width = canvas.clientWidth * 2
      h = canvas.height = canvas.clientHeight * 2
    }
    window.addEventListener('resize', onResize)
    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [glitch])

  const active = typed.activeChar.toLowerCase()

  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="vignette pointer-events-none absolute inset-0 z-10" />
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse at 50% 42%, rgba(59,130,246,0.22), transparent 55%)',
        }}
      />

      <div
        className={`laptop relative ${
          simplified ? 'w-[88vw] max-w-[420px]' : 'w-[min(72vw,720px)]'
        }`}
      >
        <div className="laptop-lid relative">
          <div
            className={`relative overflow-hidden rounded-t-[14px] border border-white/10 bg-[#0a0e16] p-[10px] shadow-[0_0_80px_rgba(59,130,246,0.25)] ${
              glitch ? 'rgb-split' : ''
            }`}
            style={{ animation: glitch ? 'flicker 0.18s infinite' : undefined }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-black">
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
              <div className="scanlines absolute inset-0 opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-cyan-400/5" />

              <div className="absolute inset-0 p-[6%] font-mono text-[clamp(8px,1.5vw,13px)] leading-relaxed text-cyan-200">
                {typed.lines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    <span className="text-violet-300">&gt; </span>
                    {line}
                    {i === typed.lines.length - 1 && !typed.done && (
                      <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] animate-pulse bg-cyan-300 align-[-2px]" />
                    )}
                  </div>
                ))}
                {typed.done && (
                  <div className="mt-2 text-emerald-300">
                    ACCESS GRANTED &bull; IDENTITY UNLOCKED
                  </div>
                )}
              </div>

              {glitch && (
                <div className="pointer-events-none absolute inset-0 mix-blend-screen">
                  <div className="absolute inset-0 translate-x-[3px] bg-cyan-400/20" />
                  <div className="absolute inset-0 -translate-x-[3px] bg-fuchsia-500/20" />
                </div>
              )}
            </div>
            <div className="mx-auto mt-1.5 h-1 w-1 rounded-full bg-white/25" />
          </div>
        </div>

        {!simplified && (
          <div className="laptop-base relative mt-[-2px] origin-top">
            <div className="rounded-b-[16px] border border-white/10 bg-gradient-to-b from-[#1a2233] to-[#0c111c] p-3 shadow-2xl">
              <div className="space-y-[4px]">
                {KEY_ROWS.map((row, ri) => (
                  <div key={ri} className="flex justify-center gap-[3px]">
                    {row.map((key) => {
                      const lit =
                        (key === ' ' && active === ' ') ||
                        (key !== ' ' && active === key)
                      return (
                        <div
                          key={key}
                          className={`grid h-[14px] place-items-center rounded-[3px] border text-[6px] uppercase tracking-tight transition-transform duration-75 ${
                            key === ' ' ? 'w-[42%]' : 'w-[6.2%]'
                          }`}
                          style={{
                            borderColor: lit
                              ? 'rgba(92,225,255,0.8)'
                              : 'rgba(255,255,255,0.1)',
                            backgroundColor: lit
                              ? 'rgba(92,225,255,0.8)'
                              : 'rgba(255,255,255,0.05)',
                            color: lit ? '#05070d' : 'rgba(255,255,255,0.4)',
                            boxShadow: lit ? '0 0 10px #5ce1ff' : 'none',
                            transform: lit ? 'translateY(1px)' : 'none',
                          }}
                        >
                          {key === ' ' ? '' : key}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <div className="mx-auto mt-3 h-8 w-[38%] rounded-md border border-white/10 bg-black/30" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
