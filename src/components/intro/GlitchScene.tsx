import { useRef } from 'react'

export function GlitchScene({ progress }: { progress: number }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden mix-blend-screen"
      style={{
        opacity: Math.sin(progress * Math.PI),
        background: `radial-gradient(circle at 50% 50%, rgba(92,225,255,${0.4 * progress}) 0%, transparent 60%)`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 4px)',
        }}
      />
    </div>
  )
}
