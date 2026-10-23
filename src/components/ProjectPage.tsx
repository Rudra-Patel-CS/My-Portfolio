import { useEffect, useState, type CSSProperties } from 'react'
import { PROJECTS, type Project } from '../content'
import { Icon, SplitWords } from './fx'
import { Architecture } from './Journey'
import { BrowserFrame } from './Projects'

function LivePreview({ p }: { p: Project }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [loaded, setLoaded] = useState(false)
  const [nonce, setNonce] = useState(0)

  const reload = () => {
    setLoaded(false)
    setNonce((n) => n + 1)
  }

  return (
    <section className="pp-section" aria-labelledby="live-title">
      <div className="live-head" data-reveal>
        <div>
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Live preview
          </p>
          <h2 id="live-title" className="pp-h2">
            Use the real app <span className="grad">right here</span>
          </h2>
        </div>
        <div className="live-tools">
          <div className="seg" role="group" aria-label="Preview size">
            <button className={device === 'desktop' ? 'is-on' : ''} onClick={() => setDevice('desktop')} aria-pressed={device === 'desktop'}>
              <Icon name="monitor" size={16} /> Desktop
            </button>
            <button className={device === 'mobile' ? 'is-on' : ''} onClick={() => setDevice('mobile')} aria-pressed={device === 'mobile'}>
              <Icon name="phone" size={16} /> Mobile
            </button>
          </div>
          <button className="icon-btn" onClick={reload} aria-label="Reload preview" title="Reload preview">
            <Icon name="refresh" size={17} />
          </button>
          <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
            Open full site <Icon name="external" size={15} />
          </a>
        </div>
      </div>

      <div className={`live-stage live-${device}`} data-reveal>
        <BrowserFrame url={p.live}>
          {!loaded && (
            <div className="live-loading">
              <span className="spinner" />
              Loading {p.title}…
            </div>
          )}
          <iframe
            key={nonce}
            src={p.live}
            title={`${p.title} — live site`}
            onLoad={() => setLoaded(true)}
            allow="clipboard-write; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </BrowserFrame>
      </div>
      <p className="live-note">
        {p.liveNote ?? 'Everything inside the frame is the deployed site — scroll, click and explore.'} If the preview stays blank,{' '}
        <a href={p.live} target="_blank" rel="noreferrer">
          open it in a new tab
        </a>
        .
      </p>
    </section>
  )
}

export function ProjectPage({ id }: { id: string }) {
  const index = PROJECTS.findIndex((x) => x.id === id)
  const p = PROJECTS[index]

  useEffect(() => {
    document.title = p ? `${p.title} — Rudra Patel` : 'Project not found — Rudra Patel'
    return () => {
      document.title = 'Rudra Patel — Cybersecurity × ML'
    }
  }, [p])

  if (!p) {
    return (
      <main id="main" className="pp pp-missing">
        <h1>Project not found</h1>
        <a href="#projects" className="btn btn-primary">
          <Icon name="arrowLeft" size={16} /> Back to projects
        </a>
      </main>
    )
  }

  const next = PROJECTS[(index + 1) % PROJECTS.length]

  return (
    <main id="main" className="pp">
      <a href="#projects" className="back" data-reveal>
        <Icon name="arrowLeft" size={16} /> All projects
      </a>

      <header className="pp-hero">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          {p.kicker}
        </p>
        <h1 className="pp-title">
          <SplitWords text={p.title} className="grad" />
        </h1>
        <p className="pp-tagline" data-reveal style={{ '--d': '120ms' } as CSSProperties}>
          {p.tagline}
        </p>
        <div className="pp-cta" data-reveal style={{ '--d': '200ms' } as CSSProperties}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary">
              Open live site <Icon name="external" size={16} />
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <Icon name="github" size={17} /> Source code
          </a>
        </div>
        <dl className="pp-meta" data-reveal style={{ '--d': '260ms' } as CSSProperties}>
          {p.meta.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <ul className="pp-stats">
        {p.stats.map((s, i) => (
          <li key={s.label} className="card" data-reveal style={{ '--d': `${i * 80}ms` } as CSSProperties}>
            <strong className="grad">{s.value}</strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>

      <section className="pp-section pp-overview" aria-label="Overview">
        <article className="card" data-reveal>
          <h2 className="pp-h3">
            <span className="tag tag-red">Problem</span>
          </h2>
          <p>{p.problem}</p>
        </article>
        <article className="card" data-reveal style={{ '--d': '100ms' } as CSSProperties}>
          <h2 className="pp-h3">
            <span className="tag tag-green">Solution</span>
          </h2>
          <p>{p.solution}</p>
        </article>
      </section>

      {p.live && <LivePreview p={p} />}

      {p.shots && (
        <section className="pp-section" aria-labelledby="shots-title">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow-dot" />
            Screens
          </p>
          <h2 id="shots-title" className="pp-h2" data-reveal>
            {p.live ? 'More of the app' : 'Inside the app'} <span className="grad">screen by screen</span>
          </h2>
          {!p.live && <p className="live-note shots-note">Not deployed publicly yet — these are captured from the app running locally in its demo mode.</p>}
          <ul className="shots">
            {p.shots.map((s, i) => (
              <li key={s.src} className="card" data-reveal style={{ '--d': `${(i % 2) * 80}ms` } as CSSProperties}>
                <a href={s.src} target="_blank" rel="noreferrer">
                  <img src={s.src} alt={s.caption} width={1200} height={750} loading="lazy" />
                </a>
                <p>{s.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="pp-section" aria-labelledby="arch-title">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          Architecture
        </p>
        <h2 id="arch-title" className="pp-h2" data-reveal>
          How the system <span className="grad">fits together</span>
        </h2>
        <Architecture arch={p.arch} />
      </section>

      <section className="pp-section" aria-labelledby="flow-title">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          How it works
        </p>
        <h2 id="flow-title" className="pp-h2" data-reveal>
          From input to <span className="grad">result</span>, step by step
        </h2>
        <ol className="flow">
          {p.flow.map((f, i) => (
            <li key={f.title} data-reveal style={{ '--d': `${i * 60}ms` } as CSSProperties}>
              <span className="flow-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pp-section" aria-labelledby="feat-title">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          Key features
        </p>
        <h2 id="feat-title" className="pp-h2" data-reveal>
          What you can <span className="grad">do with it</span>
        </h2>
        <ul className="feat-grid">
          {p.features.map((f, i) => (
            <li key={f.title} className="card feat" data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
              <span className="feat-check">
                <Icon name="check" size={16} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pp-section" aria-labelledby="tech-title">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          Tech stack
        </p>
        <h2 id="tech-title" className="pp-h2" data-reveal>
          What it's <span className="grad">built with</span>
        </h2>
        <div className="tech-grid">
          {p.tech.map((t, i) => (
            <article key={t.group} className="card tech" data-reveal style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
              <h3>{t.group}</h3>
              <ul className="chips">
                {t.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <p>{t.why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pp-section" aria-labelledby="dec-title">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow-dot" />
          Engineering decisions
        </p>
        <h2 id="dec-title" className="pp-h2" data-reveal>
          Why it's <span className="grad">built this way</span>
        </h2>
        <div className="dec-grid">
          {p.decisions.map((d, i) => (
            <article key={d.title} className="card dec" data-reveal style={{ '--d': `${(i % 2) * 90}ms` } as CSSProperties}>
              <span className="dec-n">0{i + 1}</span>
              <h3>{d.title}</h3>
              <p>{d.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pp-section pp-next" aria-labelledby="next-title">
        <div className="card" data-reveal>
          <h2 id="next-title" className="pp-h3">What's next</h2>
          <ul className="next-list">
            {p.next.map((n) => (
              <li key={n}>
                <Icon name="arrowRight" size={15} /> {n}
              </li>
            ))}
          </ul>
        </div>
        <a href={`#/project/${next.id}`} className="card next-proj" data-reveal style={{ '--d': '100ms' } as CSSProperties}>
          <span className="next-label">Next project</span>
          <strong className="grad">{next.title}</strong>
          <span className="next-tag">{next.tagline}</span>
          <img src={next.cover} alt="" width={1200} height={750} loading="lazy" />
          <span className="next-go">
            Open <Icon name="arrowRight" size={16} />
          </span>
        </a>
      </section>
    </main>
  )
}
