import { motion } from 'framer-motion'
import { DISCIPLINES, PERSON } from '../../content'

export function BuildingDisciplines() {
  return (
    <section id="disciplines" className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 text-xs font-mono text-violet-300">
          <span>PILLARS & EXPLORATION</span>
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Building across disciplines
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/70">
          {PERSON.disciplinesBio}
        </p>
      </div>

      {/* 3 Discipline Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {DISCIPLINES.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(92,225,255,0.12)]`}
          >
            {/* Ambient corner glow */}
            <div
              className={`pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br ${d.accent} blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-40`}
            />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-200">
                  {d.tag}
                </span>
                <span className="font-mono text-xs text-white/30">0{i + 1}</span>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                {d.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {d.description}
              </p>
            </div>

            {/* Tags footer */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-mono text-white/80"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collaborative builder callout banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-violet-950/30 p-6 backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
              ⚡
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Hackathons & CTFs Enthusiast
              </p>
              <p className="text-xs text-white/60">
                Solving problems under time-pressure, collaborating in teams, and building practical systems.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-cyan-200 hover:border-cyan-300 transition-colors"
          >
            Collaborate With Me &rarr;
          </a>
        </div>
      </motion.div>
    </section>
  )
}
