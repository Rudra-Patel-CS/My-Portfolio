import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { PERSON } from '../../content'

export function Contact() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [formSent, setFormSent] = useState(false)

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/80">
          REACH OUT
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/70">
          {PERSON.closingMessage}
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact coordinates cards */}
        <div className="space-y-4">
          {/* Personal Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 uppercase tracking-wider">Personal Email</p>
                <a
                  href={`mailto:${PERSON.email}`}
                  className="font-sans text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  {PERSON.email}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PERSON.email, 'personal')}
              className="self-start sm:self-center rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:border-cyan-300 hover:text-cyan-200 transition-colors"
            >
              {copiedKey === 'personal' ? '✓ Copied' : 'Copy'}
            </button>
          </motion.div>

          {/* College Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-violet-400/10 border border-violet-400/30 text-violet-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 uppercase tracking-wider">College Email (CHARUSAT)</p>
                <a
                  href={`mailto:${PERSON.collegeEmail}`}
                  className="font-sans text-base font-semibold text-white hover:text-violet-300 transition-colors"
                >
                  {PERSON.collegeEmail}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PERSON.collegeEmail, 'college')}
              className="self-start sm:self-center rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:border-violet-300 hover:text-violet-200 transition-colors"
            >
              {copiedKey === 'college' ? '✓ Copied' : 'Copy'}
            </button>
          </motion.div>

          {/* Discord Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-400/10 border border-indigo-400/30 text-indigo-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 uppercase tracking-wider">Discord</p>
                <p className="font-mono text-base font-semibold text-white">
                  {PERSON.discord}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PERSON.discord, 'discord')}
              className="self-start sm:self-center rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:border-indigo-300 hover:text-indigo-200 transition-colors"
            >
              {copiedKey === 'discord' ? '✓ Copied' : 'Copy'}
            </button>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs text-white/50 uppercase tracking-wider">Phone</p>
                <a
                  href={`tel:${PERSON.phoneTel}`}
                  className="font-mono text-base font-semibold text-white hover:text-emerald-300 transition-colors"
                >
                  {PERSON.phone}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(PERSON.phone, 'phone')}
              className="self-start sm:self-center rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:border-emerald-300 hover:text-emerald-200 transition-colors"
            >
              {copiedKey === 'phone' ? '✓ Copied' : 'Copy'}
            </button>
          </motion.div>
        </div>

        {/* Quick Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-xl"
        >
          <h3 className="text-xl font-bold text-white">Send a direct message</h3>
          <p className="mt-1 text-xs text-white/60">
            Have a project or opportunity? Send a note directly to Rudra.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1.5">
                YOUR NAME
              </label>
              <input
                required
                type="text"
                placeholder="Ada Lovelace"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400 focus:bg-black/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1.5">
                YOUR EMAIL
              </label>
              <input
                required
                type="email"
                placeholder="ada@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400 focus:bg-black/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1.5">
                MESSAGE / PROJECT DETAILS
              </label>
              <textarea
                required
                rows={4}
                placeholder="Let's build something impactful together..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-cyan-400 focus:bg-black/60"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 py-3 text-sm font-semibold text-[#05070d] shadow-[0_0_20px_rgba(92,225,255,0.3)] transition hover:shadow-[0_0_30px_rgba(92,225,255,0.5)]"
            >
              {formSent ? '✓ Thank you! Message sent.' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
