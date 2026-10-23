import { useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { VENN } from '../content'
import { classify, SAMPLES, type Verdict } from '../lib/phish'
import { Icon, SectionHead } from './fx'

function Venn() {
  const [hot, setHot] = useState<string | null>(null)
  return (
    <div className="venn" data-reveal>
      <div className="venn-col venn-ml">
        <h3>Machine Learning</h3>
        <ul>
          {VENN.ml.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className={`venn-stage ${hot ? 'is-hot' : ''}`}>
        <span className="venn-c venn-c1" />
        <span className="venn-c venn-c2" />
        <ul className="venn-both">
          {VENN.both.map((t, i) => (
            <li
              key={t}
              style={{ '--i': i } as CSSProperties}
              className={hot === t ? 'is-hot' : ''}
              onPointerEnter={() => setHot(t)}
              onPointerLeave={() => setHot(null)}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="venn-col venn-sec">
        <h3>Cybersecurity</h3>
        <ul>
          {VENN.sec.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const LEVEL_TEXT = { safe: 'Looks clean', suspicious: 'Suspicious', phishing: 'Likely phishing' }

function Gauge({ p, level }: { p: number; level: Verdict['level'] }) {
  return (
    <div className={`gauge gauge-${level}`}>
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path className="gauge-track" d="M10 62 A50 50 0 0 1 110 62" pathLength="1" />
        <path className="gauge-fill" d="M10 62 A50 50 0 0 1 110 62" pathLength="1" style={{ strokeDashoffset: 1 - p }} />
      </svg>
      <strong>
        {(p * 100).toFixed(0)}
        <small>%</small>
      </strong>
      <span>phishing probability</span>
    </div>
  )
}

function Probe() {
  const [value, setValue] = useState(SAMPLES[1])
  const [query, setQuery] = useState(SAMPLES[1])
  const [run, setRun] = useState(0)
  const result = useMemo(() => classify(query), [query])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setQuery(value)
    setRun((r) => r + 1)
  }
  const pick = (s: string) => {
    setValue(s)
    setQuery(s)
    setRun((r) => r + 1)
  }

  return (
    <div id="probe" className="probe card" data-reveal>
      <div className="probe-head">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>url-scanner — try it live</span>
        <span className="probe-local">runs in your browser · nothing is sent</span>
      </div>

      <form className="probe-form" onSubmit={submit}>
        <label htmlFor="probe-url" className="sr-only">
          URL to scan
        </label>
        <span className="probe-ps" aria-hidden="true">
          $ scan
        </span>
        <input
          id="probe-url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          placeholder="paste any URL…"
        />
        <button type="submit" className="btn btn-primary btn-sm">
          Scan <Icon name="arrowRight" size={16} />
        </button>
      </form>

      <div className="probe-samples">
        <span>try:</span>
        {SAMPLES.map((s) => {
          const label = s.replace(/^https?:\/\//, '')
          return (
            <button key={s} type="button" onClick={() => pick(s)} className={s === query ? 'is-on' : ''}>
              {label.length > 30 ? `${label.slice(0, 30)}…` : label}
            </button>
          )
        })}
      </div>

      <div className="probe-out" key={run} aria-live="polite">
        {result ? (
          <>
            <Gauge p={result.p} level={result.level} />
            <div className="probe-report">
              <p className={`probe-verdict v-${result.level}`}>
                <span className="dot-live" /> {LEVEL_TEXT[result.level]}
                <code>{result.host}</code>
              </p>
              <ul>
                {result.signals.length === 0 && <li className="sig-none">No risky signals found.</li>}
                {result.signals.slice(0, 6).map((s, i) => (
                  <li key={s.label} style={{ '--i': i } as CSSProperties} className={s.weight < 0 ? 'sig-good' : ''}>
                    <span>{s.label}</span>
                    <b>
                      {s.weight > 0 ? '+' : ''}
                      {s.weight.toFixed(2)}
                    </b>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="probe-empty">That doesn't parse as a URL — try something like example.com/login</p>
        )}
      </div>

      <p className="probe-foot">
        A 14-feature hand-weighted model for demonstration. The full{' '}
        <a href="#/project/karnakavach">KarnaKavach</a> platform adds a 20-rule engine, a trained TF-IDF + Logistic Regression model and Gemini.
      </p>
    </div>
  )
}

export function Focus() {
  return (
    <section id="focus" className="section">
      <SectionHead
        eyebrow="Focus · ML × Security"
        title="Break it first,"
        accent="then learn to catch it."
        intro="Signature-based tools only recognise attacks someone has already seen. I'm working on the overlap where machine learning spots the patterns behind new ones."
      />
      <Venn />
      <Probe />
    </section>
  )
}
