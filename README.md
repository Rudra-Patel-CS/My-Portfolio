# Rudra Patel · Cinematic Portfolio (Part 1)

Opening intro (laptop → glitch → black lake → water drop → welcome) that reveals a glassmorphic dashboard.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Where to edit

| What | Where |
| --- | --- |
| Name, bio, socials, dummy projects | `src/content.ts` |
| Intro scene lengths | `src/components/intro/IntroController.tsx` → `DURATIONS` |
| Colors / glow | `src/index.css` (`@theme`) |
| Profile photo | replace `public/profile.jpg` |
| Resume download | drop a PDF at `public/resume.pdf` |

The intro plays **once per tab session** (`sessionStorage`). Use **Replay intro** in the navbar, or **Skip Intro** during the sequence. Sound is **off by default**. `prefers-reduced-motion` skips straight to the dashboard.
