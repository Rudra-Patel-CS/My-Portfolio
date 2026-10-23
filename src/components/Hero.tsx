import { useEffect, useRef, type CSSProperties } from 'react'
import { MARQUEE, PERSON, ROLES } from '../content'
import { finePointer, reducedMotion, useTypewriter } from '../lib/fx'
import { Button, Icon, SplitChars } from './fx'
import { Globe } from './Globe'

/** Large portrait in front of a turning dot-globe, inside a rotating neon ring. Tilts toward the pointer. */
function Portrait() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || reducedMotion()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
    }
    const leave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [])

  const badges = [
    { icon: 'shield', label: 'Cybersecurity', cls: 'b1' },
    { icon: 'brain', label: 'Machine Learning', cls: 'b2' },
    { icon: 'code', label: 'Full-Stack', cls: 'b3' },
  ]

  return (
    <div className="portrait" ref={ref} data-reveal style={{ '--d': '150ms' } as CSSProperties}>
      <div className="portrait-inner">
        <div className="ring-glow" />
        <div className="disc" />
        <div className="globe-wrap">
          <Globe />
        </div>
        <div className="ring" />
        <img
          src={PERSON.photo}
          alt={`${PERSON.first} ${PERSON.last} in a navy blazer with arms crossed`}
          width={880}
          height={880}
          fetchPriority="high"
          decoding="async"
        />
        {badges.map((b, i) => (
          <span key={b.label} className={`badge ${b.cls}`} style={{ '--i': i } as CSSProperties}>
            <Icon name={b.icon} size={16} />
            {b.label}
          </span>
        ))}
        <span className="badge-stat">
          <strong>3</strong> live projects
        </span>
      </div>
    </div>
  )
}

export function Hero() {
  const typed = useTypewriter(ROLES)
  return (
    <section id="top" className="hero">
      <div className="hero-floor" aria-hidden="true">
        <div className="hero-floor-plane" />
      </div>
      <div className="hero-copy">
        <p className="pill" data-reveal>
          <span className="dot-live" /> Open to internships & collaboration
        </p>
        <p className="hero-hi" data-reveal style={{ '--d': '60ms' } as CSSProperties}>
          Hi, I'm
        </p>
        <h1 className="hero-name" aria-label={`${PERSON.first} ${PERSON.last}`}>
          <SplitChars text={PERSON.first.toUpperCase()} delay={120} className="hn-solid" />
          <span className="hn-outline">
            <SplitChars text={PERSON.last.toUpperCase()} delay={320} />
          </span>
        </h1>
        <p className="typed" data-reveal style={{ '--d': '520ms' } as CSSProperties} aria-label={ROLES.join(', ')}>
          <span className="typed-prompt" aria-hidden="true">
            ~/rudra $
          </span>
          <span aria-hidden="true">{typed}</span>
          <b className="caret" aria-hidden="true" />
        </p>
        <p className="hero-lead" data-reveal style={{ '--d': '600ms' } as CSSProperties}>
          {PERSON.lead} <em>{PERSON.payoff}</em>
        </p>
        <div className="hero-cta" data-reveal style={{ '--d': '680ms' } as CSSProperties}>
          <Button href="#projects">
            See my work <Icon name="arrowDown" size={17} />
          </Button>
          <Button href={PERSON.resume} variant="ghost" external>
            <Icon name="download" size={17} /> Resume
          </Button>
        </div>
        <ul className="hero-social" data-reveal style={{ '--d': '760ms' } as CSSProperties}>
          {PERSON.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} title={s.label}>
                <Icon name={s.icon} size={19} />
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${PERSON.email}`} aria-label="Email" title="Email">
              <Icon name="mail" size={19} />
            </a>
          </li>
        </ul>
      </div>
      <Portrait />
    </section>
  )
}

/** Two rows of oversized outlined words drifting in opposite directions. */
export function Marquee() {
  const row = (reverse: boolean) => (
    <div className={`mq-row ${reverse ? 'mq-rev' : ''}`}>
      {[0, 1].map((k) => (
        <span key={k} className="mq-track">
          {MARQUEE.map((w) => (
            <span key={w} className="mq-item">
              {w}
              <i>✦</i>
            </span>
          ))}
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee" aria-hidden="true">
      {row(false)}
      {row(true)}
    </div>
  )
}
