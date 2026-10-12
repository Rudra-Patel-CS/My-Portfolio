import { useEffect, useRef, useState } from 'react'
import { QuantumBootScene } from './QuantumBootScene'
import { WelcomeScene } from './WelcomeScene'
import { sound } from '../../lib/audio'

export const INTRO_TIMELINE = {
  bootDuration: 2.6,
  warpDuration: 0.8,
  welcomeDuration: 3.4,
  revealDuration: 0.8,
}

const T_WARP = INTRO_TIMELINE.bootDuration
const T_WELCOME = T_WARP + INTRO_TIMELINE.warpDuration
const T_REVEAL = T_WELCOME + INTRO_TIMELINE.welcomeDuration
const T_TOTAL = T_REVEAL + INTRO_TIMELINE.revealDuration

type IntroControllerProps = {
  soundOn: boolean
  onToggleSound: () => void
  onComplete: () => void
}

export function IntroController({
  soundOn,
  onToggleSound,
  onComplete,
}: IntroControllerProps) {
  const [elapsed, setElapsed] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete
  const warpPlayed = useRef(false)

  useEffect(() => {
    let start: number | null = null
    let raf = 0
    let mounted = true

    const loop = (timestamp: number) => {
      if (!mounted) return
      if (start === null) start = timestamp
      const cur = (timestamp - start) / 1000
      setElapsed(cur)

      // Trigger warp sound
      if (cur >= T_WARP && !warpPlayed.current) {
        warpPlayed.current = true
        sound.warp()
      }

      if (cur >= T_TOTAL) {
        completeRef.current()
        return
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    // Show skip button after brief moment
    const skipTimer = window.setTimeout(() => setShowSkip(true), 600)

    // Keyboard shortcut to skip
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        completeRef.current()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      mounted = false
      cancelAnimationFrame(raf)
      window.clearTimeout(skipTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  // Hole punch iris expand into the portfolio
  const hole =
    elapsed >= T_REVEAL
      ? Math.min(
          160,
          ((elapsed - T_REVEAL) / INTRO_TIMELINE.revealDuration) * 160,
        )
      : 0

  const isBoot = elapsed < T_WELCOME
  const isWarp = elapsed >= T_WARP && elapsed < T_WELCOME
  const isWelcome = elapsed >= T_WELCOME

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black transition-opacity duration-300"
      style={{
        WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${hole}%, #000 ${hole}%)`,
        maskImage: `radial-gradient(circle at 50% 50%, transparent ${hole}%, #000 ${hole}%)`,
      }}
    >
      {/* Boot scene */}
      {isBoot && <QuantumBootScene elapsed={elapsed} />}

      {/* Warp flare flash effect */}
      {isWarp && (
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(circle, rgba(92,225,255,0.45) 0%, rgba(139,92,246,0.3) 40%, transparent 80%)',
            opacity: Math.sin(((elapsed - T_WARP) / INTRO_TIMELINE.warpDuration) * Math.PI),
          }}
        >
          <div className="h-[2px] w-full bg-cyan-200 shadow-[0_0_50px_#5ce1ff]" />
        </div>
      )}

      {/* Artistic Welcome scene with words arriving one by one */}
      {isWelcome && (
        <div className="absolute inset-0 z-30">
          <WelcomeScene elapsed={elapsed} startTime={T_WELCOME} />
        </div>
      )}

      {/* Skip Button */}
      {showSkip && (
        <button
          type="button"
          onClick={() => completeRef.current()}
          className="group absolute bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md transition-all hover:border-cyan-300/80 hover:bg-black/80 hover:text-cyan-200 hover:shadow-[0_0_20px_rgba(92,225,255,0.35)]"
        >
          <span>Skip Intro</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/50 group-hover:text-cyan-300">
            ESC
          </span>
        </button>
      )}

      {/* Sound Toggle */}
      <button
        type="button"
        onClick={onToggleSound}
        className="absolute bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition hover:border-white/40 hover:text-white"
        aria-label={soundOn ? 'Mute' : 'Unmute'}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            soundOn ? 'bg-emerald-400 animate-pulse' : 'bg-white/40'
          }`}
        />
        {soundOn ? 'Sound On' : 'Sound Off'}
      </button>
    </div>
  )
}
