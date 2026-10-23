/**
 * A deliberately small, explainable URL classifier for the portfolio demo.
 * Hand-weighted logistic model over lexical features — the same family of
 * signals KarnaKavach's rule layer uses, minus the trained model and Gemini.
 * Runs entirely in the browser; nothing is sent anywhere.
 */

export type Signal = { label: string; weight: number }
export type Verdict = { p: number; level: 'safe' | 'suspicious' | 'phishing'; signals: Signal[]; host: string }

const BIAS = -2.4
const BRANDS = ['paypal', 'google', 'microsoft', 'apple', 'amazon', 'facebook', 'instagram', 'netflix', 'sbi', 'hdfc', 'icici', 'paytm', 'github']
const LOOKALIKE = /(paypa1|g00gle|go0gle|goog1e|micr0soft|app1e|amaz0n|faceb00k|netf1ix|1nstagram)/
const RISKY_TLDS = ['xyz', 'top', 'tk', 'ml', 'ga', 'cf', 'gq', 'zip', 'mov', 'click', 'country', 'kim', 'work', 'rest', 'cam', 'support']
const SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'cutt.ly', 'rb.gy']
const BAIT = ['login', 'signin', 'verify', 'secure', 'account', 'update', 'confirm', 'password', 'wallet', 'unlock', 'suspend', 'kyc', 'reward']

export function classify(raw: string): Verdict | null {
  const input = raw.trim()
  if (!input) return null
  let url: URL
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(input) ? input : `http://${input}`)
  } catch {
    return null
  }
  const host = url.hostname.toLowerCase()
  if (!host.includes('.')) return null

  const full = input.toLowerCase()
  const labels = host.split('.')
  const tld = labels.at(-1) ?? ''
  const registrable = labels.slice(-2).join('.')
  const signals: Signal[] = []
  const add = (cond: boolean, label: string, weight: number) => cond && signals.push({ label, weight })

  add(/^\d{1,3}(\.\d{1,3}){3}$/.test(host), 'Raw IP address instead of a domain', 2.2)
  add(host.startsWith('xn--') || host.includes('.xn--'), 'Punycode host (possible homoglyph)', 1.6)
  add(LOOKALIKE.test(host), 'Look-alike brand spelling', 1.9)
  const brand = BRANDS.find((b) => host.includes(b))
  add(!!brand && !registrable.startsWith(`${brand}.`) && !LOOKALIKE.test(host), `“${brand}” used outside its real domain`, 1.6)
  add(RISKY_TLDS.includes(tld), `High-abuse TLD .${tld}`, 1.1)
  add(SHORTENERS.includes(host), 'URL shortener hides the destination', 0.9)
  add(url.username !== '' || /@/.test(url.pathname), '“@” trick in the URL', 1.5)
  add(labels.length >= 4, `Deep subdomain chain (${labels.length - 2} levels)`, 0.9)
  const hyphens = (host.match(/-/g) ?? []).length
  add(hyphens >= 2, `${hyphens} hyphens in the hostname`, 0.7)
  add(full.length > 75, `Long URL (${full.length} chars)`, 0.6)
  const bait = BAIT.filter((w) => full.includes(w)).slice(0, 3)
  add(bait.length > 0, `Bait words: ${bait.join(', ')}`, 0.55 * bait.length)
  add(url.protocol === 'http:' && /^https?:\/\//i.test(input), 'Plain HTTP, no TLS', 0.6)
  add(url.protocol === 'https:', 'Served over HTTPS', -0.3)
  add(/\/\/.*\/\//.test(full.replace(/^https?:\/\//, '//')), 'Embedded redirect “//” in path', 0.5)

  const z = BIAS + signals.reduce((s, x) => s + x.weight, 0)
  const p = 1 / (1 + Math.exp(-z))
  const level = p >= 0.7 ? 'phishing' : p >= 0.35 ? 'suspicious' : 'safe'
  signals.sort((a, b) => b.weight - a.weight)
  return { p, level, signals, host }
}

export const SAMPLES = [
  'https://github.com/Rudra-Patel-CS',
  'http://paypa1-secure-login.verify-account.xyz/signin',
  'bit.ly/kyc-update-reward',
  'http://192.168.4.20/hdfc/netbanking/login',
]
