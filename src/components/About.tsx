import { useEffect, useRef, type CSSProperties } from 'react'
import { ABOUT, FACTS, STATS, WHAT_I_DO } from '../content'
import { reducedMotion, useSpotlight } from '../lib/fx'
import { Icon, SectionHead } from './fx'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    el.textContent = '0'
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200)
        el.textContent = String(Math.round(value * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])
  return (
    <>
      <span ref={ref}>{value}</span>
      {suffix}
    </>
  )
}

function DoCard({ icon, title, text, i }: { icon: string; title: string; text: string; i: number }) {
  const ref = useSpotlight<HTMLElement>()
  return (
    <article ref={ref} className="card do-card" data-reveal style={{ '--d': `${i * 110}ms` } as CSSProperties}>
      <span className="do-icon">
        <Icon name={icon} size={24} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <SectionHead eyebrow="About me" title="Practical software," accent="studied for how it fails." />

      <div className="about-grid">
        <div className="about-text" data-reveal>
          {ABOUT.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <dl className="facts">
            {FACTS.map((f) => (
              <div key={f.k} className="fact">
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="stats">
          {STATS.map((s, i) => (
            <li key={s.label} className="card stat" data-reveal style={{ '--d': `${i * 100}ms` } as CSSProperties}>
              <strong className="grad">
                <Counter value={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="do-grid">
        {WHAT_I_DO.map((d, i) => (
          <DoCard key={d.title} {...d} i={i} />
        ))}
      </div>
    </section>
  )
}
