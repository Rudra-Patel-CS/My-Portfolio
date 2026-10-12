import { motion } from 'framer-motion'
import { SOCIAL_PLATFORMS } from '../../content'

export function ExploreWork() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
          PROFILES & REPOSITORIES
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explore my work
        </h2>
        <p className="mt-3 text-base text-white/70">
          Follow my code, competitive programming challenges, articles, and design boards across the web.
        </p>
      </div>

      {/* Grid of Work Platforms */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SOCIAL_PLATFORMS.map((platform, i) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(92,225,255,0.15)]"
          >
            {/* Top row: Platform name and external link arrow */}
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

              {/* Title & handle */}
              <h3 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                {platform.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-violet-300">
                {platform.handle}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                {platform.desc}
              </p>
            </div>

            {/* Bottom URL preview */}
            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-white/40 group-hover:text-cyan-300/80 transition-colors">
              {platform.url.replace(/^https?:\/\//, '')}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
