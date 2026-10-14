import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS, SOCIAL_PLATFORMS } from '../../content'

export function WorkProjects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-2xl mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
          TRACK RECORD & WORK
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Work (Projects)
        </h2>
        <p className="mt-3 text-base text-white/70">
          From machine-learning pipelines and full-stack web applications to competitive cybersecurity CTFs.
        </p>
      </div>

      {/* Part 1: By the Numbers */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>By the numbers</span>
          <span className="h-1 w-8 bg-cyan-400 rounded-full" />
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              suffix={s.suffix}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>

      {/* Part 2: Explore my work (Profiles & Repositories) */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>Explore my work</span>
          <span className="h-1 w-8 bg-violet-400 rounded-full" />
        </h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOCIAL_PLATFORMS.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(92,225,255,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-cyan-200">
                    {platform.badge}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 transition-all group-hover:bg-cyan-400 group-hover:text-black group-hover:scale-110">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </div>

                <h4 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {platform.name}
                </h4>
                <p className="mt-1 font-mono text-xs text-violet-300">
                  {platform.handle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {platform.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-white/40 group-hover:text-cyan-300/80 transition-colors">
                {platform.url.replace(/^https?:\/\//, '')}
              </div>
            </motion.a>
          ))}
        </div>
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
    const dur = 1300
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(92,225,255,0.2)]"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl transition-opacity group-hover:opacity-100 opacity-20" />

      <div className="flex items-baseline gap-1 font-mono text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-100 to-violet-300">
        <span>{n}</span>
        <span>{suffix}</span>
      </div>

      <div className="mt-3 text-sm font-medium tracking-wide text-white/75 group-hover:text-white transition-colors">
        {label}
      </div>

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
