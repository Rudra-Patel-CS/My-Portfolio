import { useRef, useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { PERSON } from '../../content'

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotX = ((y - centerY) / centerY) * -14
    const rotY = ((x - centerX) / centerX) * 14

    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSON.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2200)
  }

  return (
    <section
      id="home"
      className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 md:grid-cols-[1.15fr_0.85fr] md:pt-20 md:pb-28"
    >
      {/* Left text column */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Status chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono text-cyan-200 shadow-[0_0_20px_rgba(92,225,255,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span>B.Tech CSE &bull; CHARUSAT University</span>
        </div>

        {/* Main Headline */}
        <h1 className="mt-5 font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {PERSON.headline}
        </h1>

        {/* Subtitle / Discipline Tag */}
        <p className="mt-3 text-lg font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 sm:text-xl">
          {PERSON.subtitle}
        </p>

        {/* Bio paragraph */}
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          {PERSON.bio}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-[#05070d] shadow-[0_0_30px_rgba(92,225,255,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(92,225,255,0.6)]"
          >
            <span>Get in touch</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-white/10 hover:text-cyan-200"
          >
            <span>Explore my work</span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-3 font-mono text-xs text-white/70 transition-all hover:border-cyan-400/40 hover:text-cyan-300"
            title="Copy email to clipboard"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* Quick social icon pills */}
        <div className="mt-8 flex items-center gap-3 text-white/70">
          <SocialLink href={PERSON.socials.github} label="GitHub">
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 7.5c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
          </SocialLink>
          <SocialLink href={PERSON.socials.linkedin} label="LinkedIn">
            <path d="M6.94 8.5H3.75V20h3.19V8.5ZM5.34 3.5a1.85 1.85 0 1 0 0 3.7 1.85 1.85 0 0 0 0-3.7ZM20.25 20h-3.18v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.88V8.5h3.05v1.57h.04c.42-.8 1.46-1.65 3.01-1.65 3.22 0 3.82 2.12 3.82 4.87V20Z" />
          </SocialLink>
          <SocialLink href={PERSON.socials.leetcode} label="LeetCode">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.603l3.855-4.126 5.405-5.787a1.375 1.375 0 0 0-.99-2.378zm4.72 9.07a1.38 1.38 0 0 0-.974.405l-4.437 4.435a1.38 1.38 0 0 0 1.95 1.953l4.436-4.436a1.38 1.38 0 0 0-.975-2.357z" />
          </SocialLink>
          <SocialLink href={PERSON.socials.x} label="X (Twitter)">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </SocialLink>
        </div>
      </motion.div>

      {/* Right column: Extreme Level Attractive Photo Presentation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="relative mx-auto flex items-center justify-center"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="group relative w-full max-w-[340px] sm:max-w-[380px]"
        >
          {/* Multi-layered Animated Neon Energy Ring */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 opacity-60 blur-2xl transition-all duration-500 group-hover:opacity-90 group-hover:blur-3xl" />

          {/* Outer rotating conic aura */}
          <div className="pointer-events-none absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 opacity-75 blur-[2px] transition duration-500 group-hover:opacity-100" />

          {/* Card Frame */}
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#0a0f1d]/90 p-3 shadow-2xl backdrop-blur-2xl">
            {/* Tech Corner HUD Brackets */}
            <div className="pointer-events-none absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-cyan-400 z-20" />
            <div className="pointer-events-none absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-cyan-400 z-20" />
            <div className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-violet-400 z-20" />
            <div className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-violet-400 z-20" />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-900">
              <img
                src={PERSON.photoSrc}
                alt={`${PERSON.name} - Computer Engineering Student`}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Shimmer light sweep on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

              {/* Subtle vignette gradient at bottom of photo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Status Pill (Top Right) */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-black/70 px-3 py-1 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-200">
                Available to Collaborate
              </span>
            </div>

            {/* Floating Badge (Bottom Overlay) */}
            <div className="mt-3 flex items-center justify-between px-1">
              <div>
                <p className="font-sans text-sm font-bold text-white">
                  {PERSON.name}
                </p>
                <p className="font-mono text-[11px] text-cyan-300">
                  {PERSON.institutionFull}
                </p>
              </div>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-200">
                CORE TECH
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 transition-all hover:border-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200 hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        {children}
      </svg>
    </a>
  )
}
