import { useRef, useState, type CSSProperties } from 'react'
import { PERSON } from '../content'
import { Button, Icon, SplitWords } from './fx'

const YEAR = new Date().getFullYear()

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PERSON.email)
    } catch {
      window.location.href = `mailto:${PERSON.email}`
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button className={`btn btn-ghost ${copied ? 'is-copied' : ''}`} onClick={copy}>
      <Icon name={copied ? 'check' : 'copy'} size={17} /> {copied ? 'Copied!' : 'Copy email'}
    </button>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="card contact-card" data-reveal>
        <p className="eyebrow">
          <span className="eyebrow-dot" />
          Contact
        </p>
        <h2 className="contact-title">
          <SplitWords text="Got a system that needs to be" /> <SplitWords text="harder to break?" delay={160} className="grad" />
        </h2>
        <p className="contact-lead">
          I'm open to internships, collaborations and interesting security or ML problems. The fastest way to reach me is email.
        </p>
        <a href={`mailto:${PERSON.email}`} className="mail">
          <Icon name="mail" size={22} />
          <span>{PERSON.email}</span>
        </a>
        <div className="contact-actions">
          <Button href={`mailto:${PERSON.email}`}>
            Say hello <Icon name="arrowRight" size={17} />
          </Button>
          <CopyEmail />
          <Button href={PERSON.resume} variant="ghost" external>
            <Icon name="download" size={17} /> Resume
          </Button>
        </div>
        <ul className="socials">
          {PERSON.socials.map((s, i) => (
            <li key={s.label} style={{ '--i': i } as CSSProperties}>
              <a href={s.url} target="_blank" rel="noreferrer">
                <Icon name={s.icon} size={20} />
                <span>
                  <strong>{s.label}</strong>
                  <small>{s.handle}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        © {YEAR} {PERSON.first} {PERSON.last} · Built with React, TypeScript and a lot of curiosity.
      </p>
      <a href="#top" className="link">
        Back to top <Icon name="arrowDown" size={15} />
      </a>
    </footer>
  )
}
