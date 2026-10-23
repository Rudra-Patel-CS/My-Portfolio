import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { NAV, PERSON } from '../content'
import { Icon } from './fx'

export function Nav({ page }: { page: string }) {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)

  // Hide on scroll down, reveal on scroll up; drive the progress bar.
  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        bar.current?.style.setProperty('transform', `scaleX(${max > 0 ? y / max : 0})`)
        setScrolled(y > 20)
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 300)
          last = y
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy on the home page: whichever section crosses the middle of the viewport.
  useEffect(() => {
    if (page !== 'home') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ['top', ...NAV.map((l) => l.id)]) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [page])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  // Project pages live under "Projects".
  const current = page === 'home' ? active : 'projects'

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <nav className={`nav ${hidden && !open ? 'nav-hidden' : ''} ${scrolled ? 'nav-solid' : ''}`} aria-label="Primary">
        <a href="#top" className="logo" aria-label="Rudra Patel — home">
          <span className="logo-mark">{PERSON.initials}</span>
          <span className="logo-name">
            Rudra<span className="grad">.dev</span>
          </span>
        </a>

        <ul className="nav-links">
          {NAV.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={current === l.id ? 'is-active' : ''}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={PERSON.resume} target="_blank" rel="noreferrer" className="nav-resume">
          <Icon name="download" size={16} /> Resume
        </a>

        <button
          className={`burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <i />
          <i />
          <i />
        </button>
      </nav>

      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul>
          {NAV.map((l, i) => (
            <li key={l.id} style={{ '--i': i } as CSSProperties}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                <span className="menu-num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={PERSON.resume} target="_blank" rel="noreferrer" className="btn btn-primary menu-resume" tabIndex={open ? 0 : -1}>
          <Icon name="download" size={16} /> Download Resume
        </a>
      </div>
    </>
  )
}
