import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { isCoarsePointer } from '../../lib/motion'
import { LaptopScene } from './LaptopScene'
import { GlitchScene } from './GlitchScene'
import { WaterDropScene } from './WaterDropScene'
import { UniqueWelcomeText } from './UniqueWelcomeText'

export const DURATIONS = {
  laptop: 4.5,
  glitch: 1.5,
  lake: 2.5,
  welcome: 4.5,
  reveal: 1.5,
} as const

const T_GLITCH = DURATIONS.laptop // 4.5s
const T_LAKE = T_GLITCH + DURATIONS.glitch // 6.0s
const T_IMPACT = T_LAKE + 0.85 // 6.85s (drop hits water surface)
const T_WELCOME = T_LAKE + DURATIONS.lake // 8.5s
const T_REVEAL = T_WELCOME + DURATIONS.welcome // 13.0s
const TOTAL = T_REVEAL + DURATIONS.reveal // 14.5s

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
  const stageRef = useRef<HTMLDivElement>(null)
  const [elapsed, setElapsed] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete
  const simplified = useMemo(() => isCoarsePointer(), [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const proxy = { t: 0, zoom: 0.86, lid: -18, shake: 0 }
    const tl = gsap.timeline({
      onComplete: () => completeRef.current(),
    })

    // Scene 1: Laptop typing
    tl.to(proxy, {
      t: T_GLITCH,
      zoom: 1.06,
      lid: -14,
      duration: DURATIONS.laptop,
      ease: 'power1.inOut',
      onUpdate: () => apply(proxy, stage, setElapsed),
    })

    // Scene 2: Glitch zoom into screen
    tl.to(proxy, {
      t: T_LAKE,
      zoom: 14,
      lid: -8,
      shake: 1,
      duration: DURATIONS.glitch,
      ease: 'power3.in',
      onUpdate: () => apply(proxy, stage, setElapsed),
    })

    // Scene 3 & 4: Water Lake, Drop Impact, Sparkles, and Welcome Text
    tl.to(proxy, {
      t: TOTAL,
      zoom: 14,
      shake: 0,
      duration: DURATIONS.lake + DURATIONS.welcome + DURATIONS.reveal,
      ease: 'none',
      onUpdate: () => apply(proxy, stage, setElapsed),
    })

    const skipTimer = window.setTimeout(() => setShowSkip(true), 800)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        completeRef.current()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      tl.kill()
      window.clearTimeout(skipTimer)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const isGlitch = elapsed >= T_GLITCH && elapsed < T_LAKE
  const glitchProgress = isGlitch ? (elapsed - T_GLITCH) / DURATIONS.glitch : 0
  const showLaptop = elapsed < T_LAKE
  const showLake = elapsed >= T_LAKE - 0.4
  const dropVisible = elapsed >= T_LAKE && elapsed < T_IMPACT
  const impact = elapsed >= T_IMPACT
  const showWelcome = elapsed >= T_WELCOME

  const hole =
    elapsed >= T_REVEAL
      ? Math.min(160, ((elapsed - T_REVEAL) / DURATIONS.reveal) * 160)
      : 0

  return (
    <div
      ref={stageRef}
      className="laptop-stage fixed inset-0 z-50 overflow-hidden bg-black"
      style={{
        WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${hole}%, #000 ${hole}%)`,
        maskImage: `radial-gradient(circle at 50% 50%, transparent ${hole}%, #000 ${hole}%)`,
      }}
    >
      {/* 3D Laptop scene (Effect 1) */}
      {showLaptop && (
        <LaptopScene
          elapsed={elapsed}
          glitch={isGlitch}
          simplified={simplified}
        />
      )}

      {/* Glitch Transition */}
      {isGlitch && <GlitchScene progress={glitchProgress} />}

      {/* Water Drop & Ripple & Sparkles (Effect 2) */}
      {showLake && (
        <div
          className="absolute inset-0 z-30 transition-opacity duration-700"
          style={{
            opacity: Math.min(1, Math.max(0, (elapsed - (T_LAKE - 0.4)) / 0.5)),
          }}
        >
          <WaterDropScene impact={impact} dropVisible={dropVisible} />
          {showWelcome && <UniqueWelcomeText startDelay={100} charSpeed={85} />}
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

function apply(
  proxy: { t: number; zoom: number; lid: number; shake: number },
  stage: HTMLDivElement,
  setElapsed: (n: number) => void,
) {
  const sx = proxy.shake ? (Math.random() - 0.5) * 14 : 0
  const sy = proxy.shake ? (Math.random() - 0.5) * 10 : 0
  stage.style.setProperty('--zoom', String(proxy.zoom))
  stage.style.setProperty('--lid', `${proxy.lid}deg`)
  stage.style.setProperty('--shake-x', `${sx}px`)
  stage.style.setProperty('--shake-y', `${sy}px`)
  setElapsed(proxy.t)
}
