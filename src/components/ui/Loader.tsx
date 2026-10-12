export function Loader() {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 rounded-full border border-cyan-300/30 border-t-cyan-300 animate-spin" />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
          booting interface
        </p>
      </div>
    </div>
  )
}
