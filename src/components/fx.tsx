import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { useMagnetic } from '../lib/fx'

const PATHS: Record<string, ReactNode> = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  external: <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" />,
  brain: (
    <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V6a2 2 0 0 0-3-2Zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1" />
  ),
  code: <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  tool: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z" />,
  monitor: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  refresh: <path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7" />,
  github: (
    <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  leetcode: <path d="M13.5 3 6 10.5a3 3 0 0 0 0 4.2L9.4 18a3 3 0 0 0 4.2 0l2-2M8 13h11M14.5 7l2 2" />,
  x: <path d="M4 4l16 16M20 4 4 20" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-9 9" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
}

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.code}
    </svg>
  )
}

/** Splits a line into words that rise out of a mask one after another. */
export function SplitWords({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`split ${className}`} data-reveal style={{ '--d': `${delay}ms` } as CSSProperties} aria-label={text}>
      {text.split(' ').map((word, i, arr) => (
        <Fragment key={i}>
          <span className="split-w" aria-hidden="true">
            <span style={{ '--i': i } as CSSProperties}>{word}</span>
          </span>
          {i < arr.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}

/** Letters rise one by one — used for the giant hero name. */
export function SplitChars({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`split split-chars ${className}`} data-reveal style={{ '--d': `${delay}ms` } as CSSProperties} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} className="split-w" aria-hidden="true">
          <span style={{ '--i': i } as CSSProperties}>{c}</span>
        </span>
      ))}
    </span>
  )
}

export function SectionHead({ eyebrow, title, accent, intro }: { eyebrow: string; title: string; accent: string; intro?: string }) {
  return (
    <header className="sec-head">
      <p className="eyebrow" data-reveal>
        <span className="eyebrow-dot" />
        {eyebrow}
      </p>
      <h2 className="sec-title">
        <SplitWords text={title} /> <SplitWords text={accent} delay={120} className="accent" />
      </h2>
      {intro && (
        <p className="sec-intro" data-reveal style={{ '--d': '200ms' } as CSSProperties}>
          {intro}
        </p>
      )}
    </header>
  )
}

type ButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  download?: boolean
}

export function Button({ href, children, variant = 'primary', external, download }: ButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.22)
  return (
    <a
      ref={ref}
      href={href}
      className={`btn btn-${variant}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
    </a>
  )
}
