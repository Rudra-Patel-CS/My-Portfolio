/**
 * ============================================================
 *  RUDRA PATEL PORTFOLIO DATA & CONTENT CONFIGURATION
 * ============================================================
 */

export const SESSION_KEY = 'rp-intro-played'

export const PERSON = {
  name: 'Rudra Patel',
  shortName: 'Rudra',
  initials: 'RP',
  greeting: 'Hello, traveler —',
  headline: "Hi, I’m Rudra Patel",
  subtitle: 'Computer Engineering Student | AI/ML • Cybersecurity • Full-Stack Development',
  institution: 'CHARUSAT',
  institutionFull: 'CSPIT, CHARUSAT',
  photoSrc: '/profile.jpg',
  bio: 'I’m a computer engineering student at CHARUSAT who enjoys building practical technology from idea to implementation. My interests span artificial intelligence and machine learning, cybersecurity, and full-stack development. I’m especially interested in creating applications that are useful, understandable, and thoughtfully engineered.',
  disciplinesBio:
    'From machine-learning projects to full-stack applications, I use each project to explore how software, data, and security fit together. I also enjoy taking part in hackathons and CTFs, where I learn by solving problems and building with others.',
  email: 'rudrapatel2177@gmai.com',
  collegeEmail: '24cs074@charusat.edu.in',
  discord: 'rudra_07824',
  phone: '+91 70418 02201',
  phoneTel: '+917041802201',
  closingMessage:
    'I’m always glad to connect with fellow builders, learn about interesting projects, and explore opportunities to collaborate.',
  resumeHref: '/resume.pdf',
  socials: {
    github: 'https://github.com/Rudra-Patel-CS/',
    linkedin: 'https://www.linkedin.com/in/rudra-patel-cs/',
    leetcode: 'https://leetcode.com/u/rudrapatel047/',
    x: 'https://x.com/RudraPatel43842',
    pinterest: 'https://pin.it/55MMqRLhc',
  },
}

/** Typewriter roles in the hero */
export const ROLES = [
  'Computer Engineering Student @ CHARUSAT',
  'AI / Machine Learning Explorer',
  'Cybersecurity & CTF Enthusiast',
  'Full-Stack Systems Builder',
]

/** Terminal telemetry lines for the futuristic intro */
export const TERMINAL_LINES = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'AUTHENTICATING IDENTITY: RUDRA PATEL',
  'CSPIT, CHARUSAT — COMPUTER ENGINEERING',
  'SYNCHRONIZING MODULES: AI/ML • CYBERSEC • FULL-STACK',
  'ACCESS LEVEL: GRANTED · PORTFOLIO READY',
]

/** Words displayed sequentially in the artistic Welcome animation */
export const WELCOME_WORDS = [
  { word: 'Welcome', highlight: false },
  { word: 'To', highlight: false },
  { word: "Rudra's", highlight: true },
  { word: 'Universe', highlight: true },
]

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#disciplines', label: 'Disciplines' },
  { href: '#numbers', label: 'By The Numbers' },
  { href: '#work', label: 'Explore Work' },
  { href: '#contact', label: 'Get In Touch' },
] as const

export const STATS = [
  { label: 'Projects', value: 4, suffix: '+' },
  { label: 'CTFs participated in', value: 5, suffix: '+' },
  { label: 'Hackathons participated in', value: 12, suffix: '+' },
  { label: 'Technologies explored', value: 15, suffix: '+' },
]

export const DISCIPLINES = [
  {
    title: 'Artificial Intelligence & Machine Learning',
    tag: 'AI/ML',
    description:
      'Designing intelligent predictive pipelines, neural architectures, and applied machine learning models that turn raw data into actionable decision systems.',
    highlights: ['Model Engineering', 'Data Systems', 'Pattern Recognition'],
    accent: 'from-blue-500/20 via-cyan-500/20 to-teal-500/10',
    borderGlow: 'hover:border-cyan-400/50',
    icon: 'Brain',
  },
  {
    title: 'Cybersecurity & Offensive / Defensive Labs',
    tag: 'Security & CTFs',
    description:
      'Active CTF participant dissecting vulnerabilities, reverse engineering, web exploitation, and building defensive paradigms to keep systems resilient.',
    highlights: ['5+ CTFs', 'Web Exploits', 'Defensive Hardening'],
    accent: 'from-violet-500/20 via-purple-500/20 to-pink-500/10',
    borderGlow: 'hover:border-violet-400/50',
    icon: 'Shield',
  },
  {
    title: 'Full-Stack Software Development',
    tag: 'Engineering',
    description:
      'Architecting resilient web applications, intuitive client experiences, and scalable backend services with clean code and thoughtful UX engineering.',
    highlights: ['Modern Web', 'API Design', 'System Architecture'],
    accent: 'from-cyan-500/20 via-sky-500/20 to-indigo-500/10',
    borderGlow: 'hover:border-sky-400/50',
    icon: 'Code',
  },
]

export const SOCIAL_PLATFORMS = [
  {
    name: 'GitHub',
    handle: 'Rudra-Patel-CS',
    url: 'https://github.com/Rudra-Patel-CS/',
    desc: 'Open-source repositories, experiments, and codebases.',
    badge: 'Code & Repos',
    color: '#5ce1ff',
  },
  {
    name: 'LinkedIn',
    handle: 'rudra-patel-cs',
    url: 'https://www.linkedin.com/in/rudra-patel-cs/',
    desc: 'Professional network, milestones, and career journey.',
    badge: 'Connect',
    color: '#0077b5',
  },
  {
    name: 'LeetCode',
    handle: 'rudrapatel047',
    url: 'https://leetcode.com/u/rudrapatel047/',
    desc: 'Data structures, algorithms, and problem-solving reps.',
    badge: 'Problem Solving',
    color: '#ffa116',
  },
  {
    name: 'X (Twitter)',
    handle: '@RudraPatel43842',
    url: 'https://x.com/RudraPatel43842',
    desc: 'Tech thoughts, hackathon updates, and developer banter.',
    badge: 'Updates',
    color: '#1da1f2',
  },
  {
    name: 'Pinterest',
    handle: 'pin.it/55MMqRLhc',
    url: 'https://pin.it/55MMqRLhc',
    desc: 'Visual bookmarks, inspiration boards, and design aesthetics.',
    badge: 'Visuals',
    color: '#e60023',
  },
]
