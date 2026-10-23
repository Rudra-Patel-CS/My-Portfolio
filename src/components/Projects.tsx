import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { PROJECTS, type Project } from '../content'
import { useSpotlight } from '../lib/fx'
import { Icon, SectionHead } from './fx'

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="frame">
      <div className="frame-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-url">{url.replace(/^https?:\/\//, '')}</span>
      </div>
      <div className="frame-view">{children}</div>
    </div>
  )
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useSpotlight<HTMLElement>()
  const page = `#/project/${p.id}`
  // The whole card opens the project page; inner links keep their own targets.
  const open = (e: MouseEvent) => {
    if ((e.target as Element).closest('a, button')) return
    window.location.hash = `/project/${p.id}`
  }
  return (
    <article
      ref={ref}
      className={`card proj ${i % 2 ? 'proj-flip' : ''}`}
      onClick={open}
      data-reveal
      aria-labelledby={`${p.id}-t`}
      style={{ '--d': '0ms' } as CSSProperties}
    >
      <a href={page} className="proj-shot" data-cursor="View" aria-label={`Open the ${p.title} project page`}>
        <BrowserFrame url={p.live || p.repo}>
          <img src={p.cover} alt={`${p.title} live site`} width={1200} height={750} loading="lazy" decoding="async" />
        </BrowserFrame>
        <span className="proj-open">
          View full project <Icon name="arrowRight" size={16} />
        </span>
      </a>
      <div className="proj-body">
        <p className="proj-kicker">
          <span className="proj-num">0{i + 1}</span> {p.kicker}
        </p>
        <h3 id={`${p.id}-t`} className="proj-title">
          <a href={page}>{p.title}</a>
        </h3>
        <p className="proj-tagline">{p.tagline}</p>
        <p className="proj-summary">{p.summary}</p>
        <ul className="chips" aria-label="Tech stack">
          {p.chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="proj-actions">
          <a href={page} className="btn btn-primary btn-sm">
            Explore project <Icon name="arrowRight" size={16} />
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
              Live site <Icon name="external" size={15} />
            </a>
          )}
          <a href={p.repo} target="_blank" rel="noreferrer" className="icon-btn" aria-label={`${p.title} source code on GitHub`} title="Source code">
            <Icon name="github" size={18} />
          </a>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHead
        eyebrow="Featured projects"
        title="Things I've built"
        accent="and shipped live."
        intro="Each one is deployed. Open a project to read how it works, the decisions behind it, and to use the live site right inside the page."
      />
      <div className="proj-list">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
      <p className="more-repos" data-reveal>
        <a href="https://github.com/Rudra-Patel-CS?tab=repositories" target="_blank" rel="noreferrer" className="link">
          <Icon name="github" size={18} /> See all 30 repositories on GitHub <Icon name="external" size={15} />
        </a>
      </p>
    </section>
  )
}
