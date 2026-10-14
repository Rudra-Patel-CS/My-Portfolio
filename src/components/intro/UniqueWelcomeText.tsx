import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { WELCOME_TEXT } from '../../content'
import { sound } from '../../lib/audio'

type UniqueWelcomeTextProps = {
  startDelay?: number
  charSpeed?: number
}

export function UniqueWelcomeText({
  startDelay = 150,
  charSpeed = 85,
}: UniqueWelcomeTextProps) {
  const [count, setCount] = useState(0)
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([])
  const soundThrottle = useRef(0)

  useEffect(() => {
    let timeout: number
    let interval: number

    timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((prev) => {
          if (prev < WELCOME_TEXT.length) {
            const next = prev + 1

            // Audio click / chime
            const now = Date.now()
            if (now - soundThrottle.current > 110) {
              soundThrottle.current = now
              sound.typeClick()
            }

            // Spawn floating sparkle around active writing tip
            setSparkles((sp) => [
              ...sp.slice(-18),
              {
                id: Math.random(),
                x: (Math.random() - 0.5) * 32,
                y: (Math.random() - 0.5) * 24,
                size: Math.random() * 4 + 2,
              },
            ])

            return next
          } else {
            window.clearInterval(interval)
            return prev
          }
        })
      }, charSpeed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [startDelay, charSpeed])

  const visibleChars = WELCOME_TEXT.slice(0, count).split('')
  const isComplete = count >= WELCOME_TEXT.length

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center select-none px-6">
      {/* Ambient background bloom */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[420px] w-[700px] rounded-full blur-[100px] opacity-45"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(92,225,255,0.22) 0%, rgba(139,92,246,0.18) 50%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative text-center max-w-5xl">
        {/* Subtle luxury kicker */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-200/90">
            PORTFOLIO // IMMERSIVE ENTRANCE
          </span>
        </motion.div>

        {/* Unique Luxury Display Typography (Matching user reference images: MAKNA / Ambroise / NAOMI / STARIXO) */}
        <h2
          className="relative text-[clamp(2.5rem,7.5vw,5.2rem)] font-bold tracking-tight text-white leading-tight"
          style={{
            fontFamily:
              '"Bodoni Moda", "Cinzel Decorative", "Playfair Display", "Syne", serif',
            textShadow:
              '0 0 20px rgba(255,255,255,0.7), 0 0 45px rgba(92,225,255,0.5), 0 0 80px rgba(139,92,246,0.3)',
          }}
        >
          {visibleChars.map((char, index) => {
            const isHighlight =
              index >= 11 && index < 18 // "Rudra's"
            return (
              <motion.span
                key={`${char}-${index}`}
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.8,
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`inline-block ${
                  isHighlight
                    ? 'bg-gradient-to-r from-cyan-300 via-sky-100 to-violet-300 bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}

          {/* Active glowing sparkle cursor */}
          {!isComplete && (
            <span className="relative inline-block ml-1 align-baseline">
              <span className="inline-block h-3.5 w-3.5 rounded-full bg-cyan-200 shadow-[0_0_18px_#5ce1ff] animate-ping" />
              <span className="absolute inset-0 h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_24px_#ffffff]" />
              {sparkles.map((sp) => (
                <span
                  key={sp.id}
                  className="pointer-events-none absolute rounded-full bg-cyan-200 shadow-[0_0_10px_#5ce1ff] animate-ping"
                  style={{
                    left: `${sp.x}px`,
                    top: `${sp.y}px`,
                    width: `${sp.size}px`,
                    height: `${sp.size}px`,
                  }}
                />
              ))}
            </span>
          )}
        </h2>

        {/* Liquid Water Surface Reflection (Mirrored upside down with wave blur) */}
        <div
          aria-hidden="true"
          className="mt-1 select-none text-[clamp(2.5rem,7.5vw,5.2rem)] font-bold tracking-tight opacity-20"
          style={{
            fontFamily:
              '"Bodoni Moda", "Cinzel Decorative", "Playfair Display", "Syne", serif',
            transform: 'scaleY(-1)',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 70%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 70%)',
            textShadow: '0 0 30px rgba(92,225,255,0.4)',
          }}
        >
          {visibleChars.join('')}
        </div>

        {/* Subtitle once text completes */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/80">
              Rudra Patel &bull; AI/ML &bull; Cybersecurity &bull; Full-Stack
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
