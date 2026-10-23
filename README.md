# Rudra Patel · Cybersecurity × ML Portfolio

Personal portfolio for Rudra Patel (B.Tech CSE, CSPIT CHARUSAT). Neon-cyber theme
with a live neural-network background, a full case-study page for every project,
and each project's real deployed site embedded inside its page.

React 19 + Vite + Tailwind v4 (reset only). No animation libraries — effects are CSS
or small `requestAnimationFrame` loops (~87 KB gzipped JS, ~10 KB CSS).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

| Page / piece | File |
| --- | --- |
| Home (hero, about, focus, projects, skills, contact) | `src/App.tsx` → `Home` |
| Project case-study page (`#/project/<id>`) | `src/components/ProjectPage.tsx` |
| Hash router (`useRoute`) and shared effects | `src/lib/fx.ts` |
| Starfield + network background, aurora, click ripple | `src/components/Background.tsx` |
| Neon cursor (exact dot, ring, comet trail, "View" bubble) | `src/components/Cursor.tsx` |
| Rotating dot-globe behind the hero photo | `src/components/Globe.tsx` |
| Journey timeline + project architecture diagram | `src/components/Journey.tsx` |
| Live URL phishing scanner (14-feature model, runs in-browser) | `src/lib/phish.ts`, `src/components/Focus.tsx` |
| Colours, fonts, every style | `src/index.css` (tokens at the top) |

## Editing content

Everything — copy, projects, skills, links — lives in **`src/content.ts`**.

- **Projects:** each entry in `PROJECTS` drives both its home-page card and its
  project page (problem, solution, step-by-step flow, features, tech stack,
  engineering decisions, what's next, live URL, repo).
- **Project screenshots:** `public/projects/<id>.webp` (1200×750); extra gallery screens in `public/projects/<id>/`.
- **No live site?** Leave `live: ''` — the page shows the `shots` gallery instead of the embedded preview (GlobeTrotter does this until it's deployed).
- **Photo:** `public/rudra.webp` (880 px WebP cut-out, ~34 KB).
- **Résumé:** `public/resume.pdf` — linked from the nav, hero and contact section.

## Before deploying

- Replace `[TODO-your-domain].com` in `public/robots.txt` and `public/sitemap.xml`.
- Once the domain is known, make `og:image` in `index.html` an absolute URL
  (`https://your-domain/og-image.jpg`) so link previews pick it up.
- Vercel: `npx vercel` — zero config for Vite.
