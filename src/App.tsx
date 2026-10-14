import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Dashboard } from './components/dashboard/Dashboard'
import { IntroController } from './components/intro/IntroController'
import { CustomCursor } from './components/ui/CustomCursor'
import { Loader } from './components/ui/Loader'
import { ParticleBackground } from './components/ui/ParticleBackground'
import { SESSION_KEY } from './content'
import { sound } from './lib/audio'
import { prefersReducedMotion } from './lib/motion'

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export default function App() {
  const [booting, setBooting] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    const played = sessionStorage.getItem(SESSION_KEY) === '1'
    const minWait = new Promise((r) => setTimeout(r, 650))

    void Promise.all([document.fonts.ready, preload('/profile_cutout.png'), minWait]).then(
      () => {
        setBooting(false)
        if (reduced || played) {
          setShowIntro(false)
        } else {
          setShowIntro(true)
        }
      },
    )
  }, [])

  function completeIntro() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setShowIntro(false)
  }

  function replayIntro() {
    sessionStorage.removeItem(SESSION_KEY)
    setShowIntro(true)
  }

  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    sound.setMuted(!next)
  }

  function toggleTheme() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    document.documentElement.classList.toggle('dark', !next)
  }

  return (
    <div className="relative min-h-svh bg-ink">
      <ParticleBackground />
      <CustomCursor />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(59,130,246,0.16), transparent 45%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.12), transparent 40%)',
        }}
      />

      {booting && <Loader />}

      {!booting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Dashboard
            soundOn={soundOn}
            onToggleSound={toggleSound}
            onToggleTheme={toggleTheme}
            isLight={isLight}
            onReplayIntro={replayIntro}
          />
        </motion.div>
      )}

      {showIntro && (
        <IntroController
          soundOn={soundOn}
          onToggleSound={toggleSound}
          onComplete={completeIntro}
        />
      )}
    </div>
  )
}
