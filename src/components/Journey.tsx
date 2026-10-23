import type { CSSProperties } from 'react'
import { JOURNEY, type Project } from '../content'
import { SectionHead } from './fx'

/** Vertical timeline built from real repository creation dates. */
export function Journey() {
  return (
    <section id="journey" className="section">
      <SectionHead
        eyebrow="Journey"
        title="The road"
        accent="so far."
        intro="Dated from when each project's repository was created on GitHub."
      />
      <ol className="journey">
        {JOURNEY.map((j, i) => (
          <li key={j.title} className={i % 2 ? 'j-right' : 'j-left'} data-reveal style={{ '--d': `${(i % 2) * 80}ms` } as CSSProperties}>
            <span className="j-dot" aria-hidden="true" />
            <div className="card j-card">
              <span className="j-when">{j.when}</span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Tiered system diagram for a project page: client → API → services → data. */
export function Architecture({ arch }: { arch: Project['arch'] }) {
  return (
    <div className="arch" role="list" aria-label="System architecture">
      {arch.map((t, i) => (
        <div key={t.tier} className="arch-tier" role="listitem" data-reveal style={{ '--d': `${i * 110}ms` } as CSSProperties}>
          <p className="arch-label">
            <span>{String(i + 1).padStart(2, '0')}</span> {t.tier}
          </p>
          <ul>
            {t.nodes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          {i < arch.length - 1 && <span className="arch-link" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}
