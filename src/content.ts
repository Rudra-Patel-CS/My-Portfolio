/**
 * ============================================================
 *  RUDRA PATEL — PORTFOLIO CONTENT
 *  Every piece of copy and every link lives in this file.
 *  Sources: github.com/Rudra-Patel-CS profile README and the
 *  source code of each featured repository.
 * ============================================================
 */

export const PERSON = {
  first: 'Rudra',
  last: 'Patel',
  initials: 'RP',
  role: 'B.Tech CSE · Semester 5',
  institute: 'CSPIT, CHARUSAT',
  location: 'Gujarat, India',
  focus: 'Cybersecurity × Machine Learning',
  photo: '/rudra.webp',
  lead: "Signature-based detection catches yesterday's attack.",
  payoff: "I'm training models to catch tomorrow's.",
  email: 'rudrakpatel7041@gmail.com',
  resume: '/resume.pdf',
  socials: [
    { label: 'GitHub', icon: 'github', handle: 'Rudra-Patel-CS', url: 'https://github.com/Rudra-Patel-CS' },
    { label: 'LinkedIn', icon: 'linkedin', handle: 'rudra-patel-cs', url: 'https://www.linkedin.com/in/rudra-patel-cs/' },
    { label: 'LeetCode', icon: 'leetcode', handle: 'rudrapatel047', url: 'https://leetcode.com/u/rudrapatel047/' },
    { label: 'X', icon: 'x', handle: '@RudraPatel43842', url: 'https://x.com/RudraPatel43842' },
  ],
}

/** Rotating line under the name in the hero. */
export const ROLES = ['Cybersecurity + ML explorer', 'Full-stack developer', 'Building systems that are harder to break']

export const MARQUEE = ['Cybersecurity', 'Machine Learning', 'Full-Stack', 'Phishing Detection', 'Secure Coding', 'Anomaly Detection']

export const NAV = [
  { id: 'projects', label: 'Work' },
  { id: 'focus', label: 'Focus' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export const ABOUT = [
  "I'm a Computer Science & Engineering student at CSPIT, CHARUSAT. I build practical software, study how systems fail, and work toward building systems that are harder to break.",
  'My focus is where machine learning meets cybersecurity — anomaly and intrusion detection, phishing and malware classification, and adversarial ML. I pair that with full-stack work, so the models I train end up inside products people can actually use.',
]

export const FACTS = [
  { k: 'Studying', v: 'B.Tech CSE, Semester 5' },
  { k: 'Institute', v: 'CSPIT, CHARUSAT' },
  { k: 'Focus', v: 'ML × Security' },
  { k: 'Based in', v: 'Gujarat, India' },
]

export const STATS = [
  { value: 4, suffix: '', label: 'Featured builds' },
  { value: 3, suffix: '', label: 'Live deployments' },
  { value: 30, suffix: '', label: 'Public repos' },
]

export const WHAT_I_DO = [
  {
    icon: 'shield',
    title: 'Cybersecurity',
    text: 'Vulnerability classes, exploitation and defense, threat modeling and secure coding — learning to break systems so I can protect them.',
  },
  {
    icon: 'brain',
    title: 'Machine Learning',
    text: 'Supervised learning, feature design and model evaluation, aimed at security problems like phishing and anomaly detection.',
  },
  {
    icon: 'code',
    title: 'Full-Stack Development',
    text: 'React, Next.js, Node.js and Python back ends with Firebase, Supabase or MySQL — shipped and deployed, not left in a notebook.',
  },
]

/** Dates are when each repository was created on GitHub. */
export const JOURNEY = [
  { when: '2024', title: 'Started B.Tech CSE', text: 'Joined CSPIT, CHARUSAT — Computer Science & Engineering, class of 2028.' },
  { when: 'Jun 2025', title: 'First web builds & DSA', text: 'Student Portal in HTML/CSS and a repository of every DSA lab practical with its output.' },
  { when: 'Sep 2025', title: 'Algorithms in practice', text: 'Maths project: a matching algorithm for assigning work.' },
  { when: 'Mar 2026', title: 'Aryam Maps & COA simulation', text: 'Started the wooden-map e-commerce store (SGP) and a 3D simulation of how multicore CPUs split work.' },
  { when: 'Jun 2026', title: 'VendorBridge & KarnaKavach', text: 'A procurement ERP with RBAC, and the start of my ML × Security work: hybrid phishing detection.' },
  { when: 'Aug 2026', title: 'Model v2 & GlobeTrotter', text: 'Retrained KarnaKavach on user feedback (recall 0.89 → 1.0 on the test split) and co-built an AI travel planner.' },
  { when: 'Oct 2026', title: 'SerpApi hackathon & launches', text: 'Built KrishiIntel with a teammate; Aryam Maps went live on Vercel.' },
]

/* ─── ML × SECURITY ─────────────────────────────────────────── */

export const VENN = {
  ml: ['feature design', 'supervised learning', 'model evaluation', 'data pipelines'],
  sec: ['vulnerability classes', 'exploitation', 'threat modeling', 'secure coding'],
  both: ['anomaly detection', 'intrusion detection', 'malware & phishing', 'adversarial ML'],
}

/* ─── PROJECTS ──────────────────────────────────────────────── */

export type Project = {
  id: string
  title: string
  kicker: string
  tagline: string
  summary: string
  cover: string
  /** Empty when the project isn't deployed — the page shows the screens gallery instead. */
  live: string
  liveNote?: string
  repo: string
  meta: { k: string; v: string }[]
  chips: string[]
  stats: { value: string; label: string }[]
  problem: string
  solution: string
  arch: { tier: string; nodes: string[] }[]
  flow: { title: string; detail: string }[]
  features: { title: string; detail: string }[]
  tech: { group: string; items: string[]; why: string }[]
  decisions: { title: string; detail: string }[]
  shots?: { src: string; caption: string }[]
  next: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'karnakavach',
    title: 'KarnaKavach',
    kicker: 'ML × Security · Phishing defense',
    tagline: 'AI and machine-learning phishing email and malicious URL detection.',
    summary:
      'Paste a suspicious email or link and get one clear risk score. A 20-rule engine, a TF-IDF + Logistic Regression model and Google Gemini each analyse it, and their verdicts are fused with an explanation you can act on.',
    cover: '/projects/karnakavach.webp',
    live: 'https://karna-kavach.vercel.app',
    liveNote: 'Sign-in with Google or GitHub opens a popup, which works best in the full site.',
    repo: 'https://github.com/Rudra-Patel-CS/Karna_Kavach',
    meta: [
      { k: 'Type', v: 'Security · ML platform' },
      { k: 'Team', v: 'Solo build' },
      { k: 'My role', v: 'ML pipeline, back end, UI' },
      { k: 'Status', v: 'Live on Vercel' },
    ],
    chips: ['React', 'TypeScript', 'Python', 'scikit-learn', 'Gemini API', 'Firebase'],
    stats: [
      { value: '20', label: 'detection rules' },
      { value: '3', label: 'engines fused into one score' },
      { value: '8', label: 'threat categories' },
      { value: '17', label: 'API endpoints' },
    ],
    problem:
      'Phishing emails slip past basic filters by imitating brands, creating urgency and hiding links behind shorteners or look-alike domains. Any single signal — a blocklist, a keyword list or an ML score on its own — either misses too much or flags too much, and it rarely tells the user why an email is dangerous.',
    solution:
      'KarnaKavach examines the sender, subject, body, reply-to address, links and attachments with three independent engines, then fuses them into a single 0–100 risk score. Every result comes with the triggered rules, the model’s reasons, a threat category and concrete recommendations — and user feedback flows back into retraining the model.',
    arch: [
      { tier: 'Client', nodes: ['React dashboard', 'Firebase Auth'] },
      { tier: 'API', nodes: ['Express server', '/api/hybrid-analyze', '17 endpoints'] },
      { tier: 'Engines', nodes: ['Rule engine · 20 rules', 'TF-IDF + LogReg', 'Gemini reasoning'] },
      { tier: 'Data', nodes: ['Cloud Firestore', 'Versioned model .pkl', 'Feedback dataset'] },
    ],
    flow: [
      { title: 'Sign in', detail: 'Firebase Authentication with email/password, Google or GitHub.' },
      { title: 'Submit an email or URL', detail: 'A parser pulls out the sender, reply-to, subject, body, every link and the attachment names.' },
      {
        title: 'Rule engine',
        detail:
          '20 deterministic rules score the input: IP-based and HTTP links, URL shorteners, punycode/homograph domains, risky TLDs, credential requests, urgency and lottery language, reply-to mismatch, brand impersonation and dangerous attachments.',
      },
      {
        title: 'Machine-learning model',
        detail:
          'A TF-IDF vectoriser (1–3-word n-grams, 8,000 features) feeds a class-balanced Logistic Regression that returns a phishing probability and the phrases that drove it.',
      },
      {
        title: 'Gemini reasoning',
        detail:
          'Gemini receives the email together with the rule and ML findings and returns structured JSON: risk score, threat vectors, category and recommendations — including whether it agrees with the ML verdict.',
      },
      {
        title: 'Fusion',
        detail: 'Final score = 25% rules + 35% ML + 40% Gemini. If Gemini is unavailable it automatically re-weights to 40% rules + 60% ML, so a scan never fails.',
      },
      { title: 'Report & history', detail: 'Each scan is stored in Firestore and can be exported as a PDF security report.' },
      { title: 'Feedback → retraining', detail: 'Users confirm or correct verdicts; that feedback grows the dataset and a retraining pipeline produces a new, versioned model with logged metrics.' },
    ],
    features: [
      { title: 'Email analyzer', detail: 'Full header + body analysis with a breakdown of what each engine found.' },
      { title: 'URL analyzer', detail: 'Lexical URL inspection for shorteners, IP hosts, homographs and suspicious TLDs.' },
      { title: 'Hybrid risk score', detail: 'One 0–100 score with the rule / ML / AI contribution shown side by side.' },
      {
        title: 'Threat categories',
        detail: 'Credential theft, business email compromise, bank, delivery, lottery, invoice, crypto and tech-support scams.',
      },
      { title: 'Intelligence view', detail: 'Gemini’s plain-language explanation, threat vectors and recommended next steps.' },
      { title: 'Scan history & dashboard', detail: 'Every past scan with charts of risk levels and categories over time.' },
      { title: 'ML Center', detail: 'Current model version, accuracy / precision / recall / F1 / ROC-AUC and a one-click retrain.' },
      { title: 'Dataset manager', detail: 'Browse and export the training data and the feedback collected from users.' },
      { title: 'PDF reports', detail: 'Shareable security reports generated in the browser with jsPDF.' },
    ],
    tech: [
      {
        group: 'Machine learning',
        items: ['Python', 'scikit-learn', 'TF-IDF', 'Logistic Regression'],
        why: 'With 138 labelled emails, a linear model on n-grams is fast, hard to overfit and explainable — its top-weighted phrases become the “reasons”. A deep model wouldn’t pay off at this data size.',
      },
      {
        group: 'AI',
        items: ['Google Gemini'],
        why: 'Adds context that rules and n-grams can’t see. A fallback chain (2.5-flash → 2.0-flash → 1.5-flash) keeps scans working when one model is rate-limited.',
      },
      {
        group: 'Back end',
        items: ['Node.js', 'Express'],
        why: 'One API orchestrates the Python engine and Gemini, so the browser never holds API keys or model files.',
      },
      {
        group: 'Frontend',
        items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts'],
        why: 'Typed components and a fast dev loop for a data-heavy dashboard with charts.',
      },
      {
        group: 'Data & auth',
        items: ['Firebase Auth', 'Cloud Firestore'],
        why: 'Managed Google/GitHub sign-in and per-user security rules, without running an auth server.',
      },
      {
        group: 'Deploy',
        items: ['Vercel', 'Docker', 'Render config'],
        why: 'The UI ships from a CDN; the Python + Node service is containerised because it needs a real runtime.',
      },
    ],
    decisions: [
      {
        title: 'Three engines instead of one',
        detail: 'Rules are instant and explainable, the ML model catches wording patterns rules miss, and Gemini adds context. Weighting all three gives a score that is both accurate and explainable.',
      },
      {
        title: 'Degrade, don’t fail',
        detail: 'Gemini calls retry down a model fallback chain, and if AI is unavailable the score is re-weighted to rules + ML so the user still gets a verdict.',
      },
      {
        title: 'Honest model metrics',
        detail:
          'Model v2 was trained on 138 labelled emails (89 legitimate, 49 phishing). On the held-out 20% split, recall improved from 0.89 in v1 to 1.0 after feedback-driven retraining. The dataset is still small, so a larger public corpus is the next step.',
      },
      {
        title: 'Least-privilege data access',
        detail: 'Firestore security rules let each signed-in user read and write only their own documents, and deletes are disabled to keep an audit trail.',
      },
    ],
    next: ['Browser extension', 'Gmail add-on and Outlook plugin', 'VirusTotal and Google Safe Browsing lookups', 'Real-time inbox monitoring'],
  },
  {
    id: 'aryam',
    title: 'Aryam Maps',
    kicker: 'Full-stack · E-commerce',
    tagline: 'A complete online store for handcrafted wooden wall maps — from custom design to paid order.',
    summary:
      'A Next.js store where customers design their own wooden map, pay through Razorpay and track their order, while the owner runs products, orders, customers, blog and reports from a 2FA-protected admin console.',
    cover: '/projects/aryam.webp',
    live: 'https://aryam-creation.vercel.app',
    repo: 'https://github.com/Rudra-Patel-CS/Aryam-Creation-SGP',
    meta: [
      { k: 'Type', v: 'E-commerce platform' },
      { k: 'Context', v: 'SGP academic project' },
      { k: 'My role', v: 'Full-stack development' },
      { k: 'Status', v: 'Live on Vercel' },
    ],
    chips: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'Tailwind CSS', 'Radix UI'],
    stats: [
      { value: '28', label: 'pages' },
      { value: '24', label: 'API routes' },
      { value: '13', label: 'admin screens' },
      { value: '2FA', label: 'protected admin console' },
    ],
    problem:
      'A handcrafted wooden-map business needs more than a catalogue. Customers want to customise a map before buying, pay securely and follow their order; the owner needs to manage products, orders, customers, blog posts and reviews without touching code.',
    solution:
      'Aryam Maps is a Next.js App Router store with a live product customiser, cart and Razorpay checkout on the customer side, and a full admin console with analytics, printable reports, two-factor login and content management on the business side — all backed by Supabase.',
    arch: [
      { tier: 'Client', nodes: ['Storefront & shop', 'Map customiser', 'Admin console'] },
      { tier: 'Server', nodes: ['Next.js route handlers', '24 API routes', 'TOTP 2FA'] },
      { tier: 'Services', nodes: ['Razorpay + webhook', 'Supabase Storage'] },
      { tier: 'Data', nodes: ['Supabase Postgres', 'Orders · payments · refunds', 'Reviews · site config'] },
    ],
    flow: [
      { title: 'Browse', detail: 'Home, shop with filters and badges, product pages with specifications, reviews and ratings.' },
      {
        title: 'Customise',
        detail: 'Pick a world, country or city map, one of 4 sizes (30×20 cm up to 120×80 cm), 4 wood finishes, 6 label languages and an optional LED backlight — the price updates live.',
      },
      { title: 'Cart & checkout', detail: 'The cart persists on the device; checkout creates the order in Supabase with status “pending”.' },
      {
        title: 'Secure payment',
        detail: 'A Razorpay order is created on the server. After payment, the server verifies the HMAC-SHA256 signature and confirms the payment is captured before marking the order paid; a webhook keeps it in sync.',
      },
      { title: 'Track', detail: 'Customers follow their order from paid → shipped → delivered on the order-status page and in their profile.' },
      { title: 'Run the business', detail: 'Admins manage products, categories, orders, customers, messages, reviews, blog posts, ads and site settings from /admin.' },
    ],
    features: [
      { title: 'Live product customiser', detail: 'Map type, size, wood finish, language and LED options with instant pricing.' },
      { title: 'Shop, wishlist & reviews', detail: 'Filters, product badges, favourites and verified customer reviews.' },
      { title: 'Razorpay payments', detail: 'Server-side order creation, signature verification, webhooks and a refunds table.' },
      { title: 'Admin dashboard', detail: 'Revenue, orders and customer stats with Recharts, plus a watchlist and help centre.' },
      { title: 'Two-factor admin login', detail: 'TOTP codes with QR-code enrolment for authenticator apps.' },
      { title: 'Printable business reports', detail: 'A4, ink-saving reports with repeating headers and page numbers via jsPDF.' },
      { title: 'Blog & content', detail: 'Admin-written blog posts with image uploads to Supabase Storage.' },
      { title: 'Instant repeat visits', detail: 'Products cached in the browser and refreshed in the background when stale.' },
      { title: 'Lighter uploads', detail: 'Images are compressed to WebP in the browser before upload.' },
    ],
    tech: [
      {
        group: 'Framework',
        items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript'],
        why: 'Server-rendered product pages help search ranking, and route handlers give me the API in the same codebase and deploy.',
      },
      {
        group: 'Database & storage',
        items: ['Supabase Postgres', 'Supabase Storage', 'SQL migrations'],
        why: 'Managed Postgres, storage and auth instead of running and backing up a database cluster myself; migrations keep the schema versioned.',
      },
      {
        group: 'Payments',
        items: ['Razorpay'],
        why: 'An India-first gateway with UPI and cards, and a signature scheme that makes server-side verification straightforward.',
      },
      {
        group: 'Security',
        items: ['otplib (TOTP)', 'QR codes'],
        why: 'Standard TOTP works with any authenticator app — no SMS cost or vendor lock-in for admin 2FA.',
      },
      {
        group: 'UI',
        items: ['Tailwind CSS 4', 'Radix UI', 'Framer Motion'],
        why: 'Accessible primitives (dialogs, tabs, sliders) with full control over the warm, crafted look.',
      },
      {
        group: 'Reporting & deploy',
        items: ['jsPDF', 'jspdf-autotable', 'Recharts', 'Vercel'],
        why: 'Reports are generated in the browser, so there’s no PDF server to run; Vercel is the native home for Next.js.',
      },
    ],
    decisions: [
      {
        title: 'Never trust the client with money',
        detail: 'An order only becomes “paid” after the server verifies Razorpay’s HMAC-SHA256 signature and confirms the payment was captured.',
      },
      {
        title: 'Stale-while-revalidate catalogue',
        detail: 'Products render instantly from a local cache on repeat visits and refresh silently in the background, so browsing never waits on the database.',
      },
      { title: 'Compress before upload', detail: 'Admin images are resized and converted to WebP in the browser, which keeps storage small and pages fast.' },
      { title: 'Reports designed for paper', detail: 'The business report targets A4 with no full-page colour fills, repeating table headers and page numbers.' },
    ],
    shots: [
      { src: '/projects/aryam/home.webp', caption: 'Home — hero and collections' },
      { src: '/projects/aryam/shop.webp', caption: 'Shop — filters, sizes and badges' },
      { src: '/projects/aryam/blog.webp', caption: 'Blog — admin-written stories' },
    ],
    next: ['Order-confirmation and shipping emails', 'Shipping cost calculator', 'Inventory alerts for low stock'],
  },
  {
    id: 'krishiintel',
    title: 'KrishiIntel',
    kicker: 'Hackathon · AgriTech intelligence',
    tagline: 'Market intelligence that tells farmers where, when and to whom to sell their harvest.',
    summary:
      'Compares APMC mandis by the money that actually reaches the farmer — after freight, handling and spoilage — and uses SerpApi’s Google Search, News and Maps to surface prices, alerts and bulk buyers in real time.',
    cover: '/projects/krishiintel.webp',
    live: 'https://krishi-intel-cody.onrender.com',
    liveNote: 'Hosted on Render’s free tier — the first load can take up to a minute while the server wakes up.',
    repo: 'https://github.com/Rudra-Patel-CS/Serp-Api-hackathon',
    meta: [
      { k: 'Type', v: 'SerpApi hackathon build' },
      { k: 'Team', v: 'With Abhishek Chikhaliya' },
      { k: 'My role', v: 'Co-creator, full-stack' },
      { k: 'Status', v: 'Live on Render' },
    ],
    chips: ['Next.js', 'Express', 'Prisma', 'MySQL', 'Socket.IO', 'SerpApi'],
    stats: [
      { value: '3', label: 'SerpApi engines' },
      { value: '3', label: 'role-based portals' },
      { value: '34', label: 'app screens' },
      { value: '17', label: 'database models' },
    ],
    problem:
      'Farmers usually sell at the nearest mandi at the headline price, but the money that reaches them depends on freight, handling, commission, distance and spoilage. Price bulletins, buyer leads and news about supply disruptions are scattered across the web and hard to compare.',
    solution:
      'KrishiIntel ranks markets by net realisation — real money in hand — pulls live prices, news and buyer leads through SerpApi, and gives farmers, FPO managers and admins their own portals with real-time shipment tracking.',
    arch: [
      { tier: 'Client', nodes: ['Farmer portal', 'FPO portal', 'Admin portal'] },
      { tier: 'API', nodes: ['Express + JWT', 'RBAC middleware', '10 controllers'] },
      { tier: 'Services', nodes: ['Net-realisation engine', 'Opportunity score', 'SerpApi + TTL cache', 'Socket.IO rooms'] },
      { tier: 'Data', nodes: ['MySQL via Prisma', '17 models'] },
    ],
    flow: [
      { title: 'Pick a role', detail: 'Farmer, FPO manager or platform admin — access is enforced server-side with JWT and RBAC middleware.' },
      { title: 'Add produce', detail: 'Crop, quantity (1 quintal = 100 kg) and location become a “lot” that can be offered to buyers.' },
      {
        title: 'Gather intelligence',
        detail: 'SerpApi Google Search finds mandi price bulletins, Google News finds disruptions and policy alerts, Google Maps finds processors, cold storage and transporters. Results are cached in memory with a 30-minute TTL.',
      },
      {
        title: 'Compute net realisation',
        detail: 'Gross price minus freight (≈ ₹1.45 per km per quintal, minimum ₹60), handling, cess and expected shrinkage. Pooling through an FPO cuts freight by 25%.',
      },
      { title: 'Score each opportunity', detail: 'Price signal 35%, buyer availability 25%, demand 20%, logistics 10% and stability 10%.' },
      { title: 'Sell & ship', detail: 'Offers, dispatches and GPS snapshots are pushed live over Socket.IO rooms per shipment and per user.' },
    ],
    features: [
      { title: 'Market comparison', detail: 'APMC and regional mandis side by side, ranked by net price, not headline price.' },
      { title: 'Net-realisation breakdown', detail: 'Every rupee of transport, handling, cess and loss shown line by line.' },
      { title: 'Buyer discovery', detail: 'Bulk buyers and processors from Google Maps, kept as candidates until an admin verifies them.' },
      { title: 'News & alerts', detail: 'Supply disruptions, weather and export-policy changes from Google News.' },
      { title: 'Data-source badges', detail: 'Every figure is labelled LIVE, CACHED, OFFICIAL or DEMO so users know what to trust.' },
      { title: 'Live logistics', detail: 'Real-time vehicle dispatch and location updates over WebSockets.' },
      { title: 'Admin console', detail: 'Users, farmers, FPOs, buyers, lots, offers, markets, tracking and audit logs.' },
      { title: 'Tested integration', detail: 'Unit tests for caching, net realisation and unit conversion, plus a live SerpApi smoke test.' },
    ],
    tech: [
      {
        group: 'Integrations',
        items: ['SerpApi: Google Search', 'Google News', 'Google Maps'],
        why: 'One API for three Google surfaces instead of three scrapers that break whenever a page layout changes.',
      },
      {
        group: 'Back end',
        items: ['Express', 'TypeScript', 'JWT', 'bcryptjs', 'Zod'],
        why: 'Explicit controller and route modules with JWT + RBAC middleware; Zod validates every request at the edge.',
      },
      {
        group: 'Database',
        items: ['Prisma', 'MySQL'],
        why: 'Lots, offers, markets and shipments are relational; Prisma gives typed queries and migrations over 17 models.',
      },
      {
        group: 'Realtime',
        items: ['Socket.IO'],
        why: 'Rooms per shipment and per user out of the box, with automatic reconnection on weak rural networks.',
      },
      {
        group: 'Frontend',
        items: ['Next.js 16', 'React 19', 'Tailwind CSS 4'],
        why: 'Three portals sharing layouts and routing in one app.',
      },
      {
        group: 'Deploy',
        items: ['Render'],
        why: 'Runs the long-lived Node server that WebSockets need, which serverless platforms don’t.',
      },
    ],
    decisions: [
      { title: 'Net, not gross', detail: 'Ranking by money in hand changes the answer — a farther mandi with a higher price can lose once freight and spoilage are counted.' },
      { title: 'Show where data comes from', detail: 'Provenance badges separate live web evidence from official records and demo data, so nobody mistakes a fallback for a real price.' },
      { title: 'Cache and fall back', detail: 'An in-memory TTL cache keeps SerpApi usage inside quota, and demo data keeps the app usable when keys are missing.' },
      { title: 'Rooms for realtime', detail: 'Socket.IO rooms per shipment and per user mean each person receives only the updates meant for them.' },
    ],
    next: ['Verified buyer onboarding from Maps leads', 'Coverage beyond Gujarat mandis'],
  },
  {
    id: 'globetrotter',
    title: 'GlobeTrotter',
    kicker: 'AI · Multi-city travel planning',
    tagline: 'A travel planner that drafts itineraries with Gemini and keeps the route, budget and weather in check.',
    summary:
      'Plan a multi-city trip on a map, let Gemini draft a day-by-day itinerary, and watch the budget, distances and forecast in one place — then share the trip publicly so others can copy it in one click.',
    cover: '/projects/globetrotter.webp',
    live: '',
    repo: 'https://github.com/Rudra-Patel-CS/Glob-Trotter',
    meta: [
      { k: 'Type', v: 'AI travel planner' },
      { k: 'Team', v: 'Team of 2 (with priyank197)' },
      { k: 'My role', v: 'Co-developer, full-stack' },
      { k: 'Status', v: 'Runs locally · demo mode' },
    ],
    chips: ['React', 'Vite', 'Supabase', 'Gemini API', 'Leaflet', 'Recharts'],
    stats: [
      { value: '14', label: 'app routes' },
      { value: '3', label: 'Gemini-powered features' },
      { value: '9', label: 'database tables' },
      { value: 'RLS', label: 'row-level security' },
    ],
    problem:
      'Planning a multi-city trip means juggling a map, a budget spreadsheet, a weather site and notes for every day. It’s hard to see whether the route makes sense or whether the budget still holds after each change.',
    solution:
      'GlobeTrotter keeps the whole trip in one place: add city stops on a map, drop activities into days, watch the budget update, and let Gemini draft the plan or suggest savings. Public trips can be shared and cloned in one click.',
    arch: [
      { tier: 'Client', nodes: ['React SPA · 14 routes', 'Leaflet map', 'Travel assistant chat'] },
      { tier: 'Services', nodes: ['Gemini (JSON itineraries)', 'Open-Meteo forecast', 'OpenStreetMap tiles'] },
      { tier: 'Data', nodes: ['Supabase Postgres + RLS', '9 tables', 'localStorage demo mode'] },
    ],
    flow: [
      { title: 'Sign in — or just try it', detail: 'Supabase Auth when a backend is configured; otherwise the app runs in a local demo mode on seed cities, activities and trips.' },
      { title: 'Create a trip', detail: 'A wizard collects dates, budget, currency and a short travel-personality quiz.' },
      {
        title: 'Draft with AI',
        detail: 'Gemini returns a strict-JSON day-by-day itinerary for the chosen cities, days, budget and interests, so it can be rendered and edited — not just read as text.',
      },
      { title: 'Build the route', detail: 'Add and reorder city stops, drop activities into each one and see the total route distance calculated with the Haversine formula.' },
      { title: 'Track the money', detail: 'Expenses by category in a donut chart, daily spend in a bar chart, over-budget alerts and Gemini cost-saving suggestions.' },
      { title: 'Check the calendar', detail: 'Day cells show an Open-Meteo forecast and flag rainy days for outdoor plans.' },
      { title: 'Share', detail: 'A public link with one-click “Copy this trip to my account”.' },
    ],
    features: [
      { title: 'AI trip generator', detail: 'Day-by-day plans from Gemini for any mix of cities, days, budget and interests.' },
      { title: 'AI budget optimizer', detail: 'Reads your expenses and suggests concrete ways to save.' },
      { title: 'Travel assistant', detail: 'A floating, trip-aware chatbot on itinerary pages.' },
      { title: 'Itinerary builder', detail: 'City stops, activity drawer with category filters and a running cost total.' },
      { title: 'Interactive map', detail: 'Leaflet + OpenStreetMap markers and route lines for every stop.' },
      { title: 'Budget analytics', detail: 'Category donut, daily spend bars and an over-budget banner.' },
      { title: 'Weather-aware calendar', detail: 'Forecast in each day cell with rain warnings.' },
      { title: 'Share & clone', detail: 'Public trip pages that anyone can copy into their own account.' },
      { title: 'Demo mode', detail: 'Fully explorable with seed data — no backend or API key required.' },
    ],
    tech: [
      {
        group: 'Frontend',
        items: ['React 19', 'Vite', 'React Router', 'Tailwind CSS 4'],
        why: 'A single-page app with 14 routes; Vite keeps builds and reloads fast.',
      },
      {
        group: 'Backend as a service',
        items: ['Supabase Auth', 'Supabase Postgres'],
        why: 'Postgres with row-level security enforces “owners edit, public trips are read-only” in the database itself, with no custom API server to maintain.',
      },
      {
        group: 'AI',
        items: ['Google Gemini'],
        why: 'Powers the trip generator, budget optimizer and assistant; strict JSON output makes AI plans editable data.',
      },
      {
        group: 'Maps & weather',
        items: ['Leaflet', 'OpenStreetMap', 'Open-Meteo'],
        why: 'Free and keyless — no billing account needed, unlike Google Maps or paid weather APIs.',
      },
      {
        group: 'Charts & UX',
        items: ['Recharts', 'react-hot-toast', 'lucide-react'],
        why: 'Budget visualisations and instant feedback on every save.',
      },
    ],
    decisions: [
      { title: 'Works without a backend', detail: 'Seed data plus a localStorage mode means anyone can explore the full app instantly; Supabase takes over when it’s configured.' },
      { title: 'Security in the database', detail: 'RLS policies give owners full access to their trips and the public read-only access to shared ones — enforced by Postgres, not the UI.' },
      { title: 'Structured AI output', detail: 'The prompt demands a fixed JSON schema, so generated itineraries drop straight into the builder instead of being plain text.' },
      {
        title: 'Honest about the optimiser',
        detail: 'Distances use real Haversine maths, but the “optimised route” suggestion is still a placeholder heuristic. Replacing it with a nearest-neighbour + 2-opt solver is the next step.',
      },
    ],
    shots: [
      { src: '/projects/globetrotter/dashboard.webp', caption: 'Dashboard — upcoming trips and budget highlights' },
      { src: '/projects/globetrotter/builder.webp', caption: 'Itinerary builder — stops, activities, route distance' },
      { src: '/projects/globetrotter/budget.webp', caption: 'Budget — category donut and daily spend' },
      { src: '/projects/globetrotter/ai.webp', caption: 'AI trip generator — cities, days, interests' },
      { src: '/projects/globetrotter/calendar.webp', caption: 'Calendar — Open-Meteo forecast and rain flags' },
      { src: '/projects/globetrotter/view.webp', caption: 'Trip view — public itinerary timeline' },
    ],
    next: ['Real nearest-neighbour + 2-opt route optimisation', 'Per-city weather (the calendar uses one forecast location today)', 'A public deployment'],
  },
]

/* ─── SKILLS ────────────────────────────────────────────────── */

export const SKILLS = [
  { group: 'Languages', icon: 'code', items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Bash'] },
  { group: 'Security', icon: 'shield', items: ['Linux', 'Wireshark', 'Burp Suite', 'Nmap', 'Metasploit'] },
  { group: 'ML & Data', icon: 'brain', items: ['scikit-learn', 'NumPy', 'pandas', 'Jupyter', 'Gemini API'] },
  { group: 'Web', icon: 'globe', items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'] },
  { group: 'Data & Cloud', icon: 'db', items: ['Supabase', 'Firebase', 'MySQL', 'Prisma', 'Vercel', 'Render'] },
  { group: 'Tools', icon: 'tool', items: ['Git', 'GitHub', 'Docker', 'VS Code'] },
]

export const LEARNING = [
  { topic: 'C++', note: 'depth over breadth; STL, memory model' },
  { topic: 'DSA / DAA', note: 'trees, graphs, DP — paired with LeetCode reps' },
  { topic: 'Cybersecurity', note: 'vulnerability classes, exploitation, defense' },
  { topic: 'ML foundations', note: 'supervised → anomaly detection, feature design' },
  { topic: 'Secure coding', note: 'input validation, authz patterns, threat modeling' },
]

export const COLLAB = [
  {
    q: 'Open to collaborating on',
    a: 'Security projects at the beginner-to-intermediate level, anything in C++, Java or JavaScript, and open-source work touching security, automation or problem solving. If you have a project that needs someone who will actually finish the task, reach out.',
  },
  {
    q: 'Looking for help with',
    a: 'Real-world attack and defense scenarios beyond lab conditions, practical ML applied to security problems rather than toy datasets, and system design plus secure-coding review from people further along than me.',
  },
  {
    q: 'Ask me about',
    a: 'DSA and LeetCode problem-solving strategy, a realistic cybersecurity learning roadmap for students, and what the B.Tech CSE path at CSPIT, CHARUSAT actually looks like from the inside.',
  },
]
