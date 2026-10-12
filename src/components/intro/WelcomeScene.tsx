import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WELCOME_WORDS } from '../../content'
import { sound } from '../../lib/audio'

type WelcomeSceneProps = {
  elapsed: number
  startTime: number
}

export function WelcomeScene({ elapsed, startTime }: WelcomeSceneProps) {
  const localTime = Math.max(0, elapsed - startTime)

  // Stagger delays for words arriving one by one
  const wordSchedule = [0.2, 0.75, 1.35, 1.95]
  const [activeWords, setActiveWords] = useState<number[]>([])

  useEffect(() => {
    wordSchedule.forEach((time, index) => {
      if (localTime >= time && !activeWords.includes(index)) {
        setActiveWords((prev) => [...prev, index])
        sound.wordChime(index)
      }
    })
  }, [localTime, activeWords])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black select-none px-4">
      {/* Ambient background glow bursts */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(92,225,255,0.18) 0%, rgba(139,92,246,0.12) 45%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Subtle grid mesh in background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Decorative cybernetic corner accents */}
      <div className="pointer-events-none absolute inset-8 border border-white/5 sm:inset-14">
        <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute -top-1 -right-1 h-3 w-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-violet-400" />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-violet-400" />
      </div>

      {/* Main kinetic typography container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Category kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
          <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-cyan-200">
            System Online // Identity Confirmed
          </span>
        </motion.div>

        {/* The Words Appearing One By One */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-4xl">
          {WELCOME_WORDS.map((item, idx) => {
            const isVisible = localTime >= wordSchedule[idx]

            return (
              <AnimatePresence key={item.word}>
                {isVisible && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 35,
                      scale: 0.65,
                      filter: 'blur(16px)',
                      rotateX: 45,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: 'blur(0px)',
                      rotateX: 0,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative inline-block"
                  >
                    {/* Shockwave halo behind the word upon landing */}
                    <motion.span
                      initial={{ scale: 0.3, opacity: 0.9 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-md"
                      style={{
                        background: item.highlight
                          ? 'radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(92,225,255,0.3) 50%, transparent 80%)'
                          : 'radial-gradient(circle, rgba(92,225,255,0.4) 0%, transparent 70%)',
                      }}
                    />

                    {/* Word styling */}
                    <span
                      className={`inline-block font-display tracking-tight transition-all duration-300 ${
                        idx === 0
                          ? 'text-[clamp(2.5rem,7vw,5.5rem)] font-light italic text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                          : idx === 1
                            ? 'text-[clamp(2rem,5vw,4.5rem)] font-sans font-light tracking-widest text-cyan-200/90'
                            : idx === 2
                              ? 'text-[clamp(2.8rem,8vw,6.2rem)] font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(92,225,255,0.6)]'
                              : 'text-[clamp(2.8rem,8vw,6.2rem)] font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(139,92,246,0.7)]'
                      }`}
                      style={{
                        WebkitBackgroundClip: idx >= 2 ? 'text' : undefined,
                      }}
                    >
                      {item.word}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            )
          })}
        </div>

        {/* Subtitle reveal once words land */}
        {localTime >= 2.3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <div className="h-[1px] w-36 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-white/70 uppercase">
              Rudra Patel &bull; AI/ML &bull; Cybersecurity &bull; Full-Stack
            </p>
            <p className="font-sans text-xs tracking-wider text-cyan-300/80">
              Chandubhai S Patel Institute of Technology, CHARUSAT
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
