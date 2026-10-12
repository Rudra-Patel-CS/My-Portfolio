import { PERSON } from '../../content'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04060b] px-5 py-10 text-center text-sm text-white/50">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{PERSON.name}</span>
          <span>&bull;</span>
          <span>{PERSON.institutionFull}</span>
        </div>
        <p className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} &bull; Built with passion & engineering rigor
        </p>
      </div>
    </footer>
  )
}
