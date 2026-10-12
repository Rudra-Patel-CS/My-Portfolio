import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '../../content'

export function Stats() {
  return (
    <section id="numbers" className="relative mx-auto max-w-6xl px-5 py-12 sm:py-20">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
          TRACK RECORD
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          By the numbers
        </h2>
      </div>

      {/* Grid of stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            suffix={s.suffix}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  )
}

function StatCard({
  label,
  value,
  suffix,
  delay,
}: {
  label: string
  value: number
  suffix?: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const dur = 1400
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(92,225,255,0.2)]"
    >
      {/* Background glow on hover */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl transition-opacity group-hover:opacity-100 opacity-20" />

      {/* Number with suffix */}
      <div className="flex items-baseline gap-1 font-mono text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-violet-300">
        <span>{n}</span>
        <span>{suffix}</span>
      </div>

      {/* Label */}
      <div className="mt-3 text-sm font-medium tracking-wide text-white/75 group-hover:text-white transition-colors">
        {label}
      </div>

      {/* Micro-meter line */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-500"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  )
}
