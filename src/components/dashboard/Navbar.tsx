import { NAV_LINKS, PERSON } from '../../content'

type NavbarProps = {
  soundOn: boolean
  onToggleSound: () => void
  onToggleTheme: () => void
  isLight: boolean
  onReplayIntro: () => void
}

export function Navbar({
  soundOn,
  onToggleSound,
  onToggleTheme,
  isLight,
  onReplayIntro,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 font-mono text-sm font-bold text-cyan-200 shadow-[0_0_18px_rgba(92,225,255,0.25)] transition group-hover:scale-105 group-hover:border-cyan-300">
            {PERSON.initials}
          </div>
          <div className="hidden sm:block">
            <span className="font-sans text-sm font-bold text-white group-hover:text-cyan-200 transition">
              {PERSON.name}
            </span>
            <span className="block font-mono text-[10px] text-white/50">
              {PERSON.institution}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-cyan-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReplayIntro}
            className="hidden rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 transition hover:border-cyan-400/50 hover:text-cyan-200 sm:inline"
            title="Watch the cinematic intro again"
          >
            Replay Intro
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 transition hover:border-white/40 hover:text-white"
            aria-label="Toggle sound"
          >
            {soundOn ? 'Audio On' : 'Muted'}
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/70 transition hover:border-white/40 hover:text-white"
            aria-label="Toggle theme"
          >
            {isLight ? 'Dark' : 'Light'}
          </button>

          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-1.5 text-xs font-semibold text-[#05070d] shadow-[0_0_20px_rgba(92,225,255,0.35)] transition hover:scale-105"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
