import { useEffect, useRef, useState } from 'react'
import { isCoarsePointer } from '../../lib/motion'

type Ripple = { id: number; x: number; y: number }

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (isCoarsePointer()) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-none')

    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }
    const click = (e: MouseEvent) => {
      const id = Date.now()
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }])
      window.setTimeout(() => {
        setRipples((r) => r.filter((x) => x.id !== id))
      }, 700)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', click)
    return () => {
      document.documentElement.classList.remove('cursor-none')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', click)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 mix-blend-difference"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 mix-blend-difference transition-transform duration-75"
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="blob-cursor-ripple pointer-events-none fixed z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/70"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  )
}
