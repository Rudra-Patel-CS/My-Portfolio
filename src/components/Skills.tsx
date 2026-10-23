import { useState, type CSSProperties } from 'react'
import { COLLAB, LEARNING, SKILLS } from '../content'
import { useSpotlight } from '../lib/fx'
import { Icon, SectionHead } from './fx'

function SkillCard({ group, icon, items, i }: { group: string; icon: string; items: string[]; i: number }) {
  const ref = useSpotlight<HTMLElement>()
  return (
    <article ref={ref} className="card skill-card" data-reveal style={{ '--d': `${(i % 3) * 90}ms` } as CSSProperties}>
      <h3>
        <span className="skill-icon">
          <Icon name={icon} size={18} />
        </span>
        {group}
      </h3>
      <ul className="chips">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </article>
  )
}

function Collab() {
  const [open, setOpen] = useState(0)
  return (
    <div className="card collab" data-reveal>
      <h3 className="side-title">Let's work together</h3>
      {COLLAB.map((c, i) => (
        <div key={c.q} className={`acc ${open === i ? 'is-open' : ''}`}>
          <button className="acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} aria-controls={`acc-${i}`}>
            {c.q}
            <span className="acc-sign" aria-hidden="true" />
          </button>
          <div id={`acc-${i}`} className="acc-a" role="region">
            <div>
              <p>{c.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHead eyebrow="Skills & tools" title="Depth over" accent="breadth." intro="Tools I've used in real projects and can talk through in an interview." />
      <div className="skill-grid">
        {SKILLS.map((s, i) => (
          <SkillCard key={s.group} {...s} i={i} />
        ))}
      </div>
      <div className="learn-grid">
        <div className="card learn" data-reveal>
          <h3 className="side-title">Currently learning</h3>
          <ol>
            {LEARNING.map((l, i) => (
              <li key={l.topic} style={{ '--i': i } as CSSProperties}>
                <span className="learn-hex">0x0{i}</span>
                <div>
                  <strong>{l.topic}</strong>
                  <span>{l.note}</span>
                </div>
                <i className="learn-bar" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
        <Collab />
      </div>
    </section>
  )
}
