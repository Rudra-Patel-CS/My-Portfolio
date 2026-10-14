/**
 * Futuristic Web Audio synth — zero external assets required.
 * Audio stays silent until user clicks audio toggle.
 */
export class SoundEngine {
  private ctx: AudioContext | null = null
  muted = true

  private ensure(): AudioContext | null {
    if (this.muted) return null
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      this.ctx = new Ctx()
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    return this.ctx
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (!muted) this.ensure()
    if (muted && this.ctx) void this.ctx.suspend()
  }

  /** Soft mechanical click used while the terminal types. */
  typeClick() {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 540 + Math.random() * 120
    gain.gain.setValueAtTime(0.02, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.04)
  }

  /** Water-drop plink on impact */
  plink() {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1120, t)
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.55)
    gain.gain.setValueAtTime(0.12, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.68)
  }

  /** Shimmering sparkle chime */
  sparkle() {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    const freqs = [1318.5, 1567.98, 1760.0, 2093.0, 2637.0]
    const f = freqs[Math.floor(Math.random() * freqs.length)]
    osc.frequency.setValueAtTime(f, t)
    gain.gain.setValueAtTime(0.03, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.28)
  }

  /** High-tech harmonic chime for word appearance in Welcome */
  wordChime(index = 0) {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    // Pentatonic scale frequencies for harmonious sound
    const notes = [440, 523.25, 659.25, 783.99, 880, 1046.5]
    const freq = notes[index % notes.length] ?? 660

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, t)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.4)

    gain.gain.setValueAtTime(0.08, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.65)
  }

  /** Futuristic warp whoosh */
  warp() {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, t)
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.4)
    osc.frequency.exponentialRampToValueAtTime(220, t + 0.8)
    gain.gain.setValueAtTime(0.07, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.9)
  }

  /** Subtle UI click */
  click() {
    const ctx = this.ensure()
    if (!ctx) return
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, t)
    gain.gain.setValueAtTime(0.02, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.035)
  }
}

export const sound = new SoundEngine()
