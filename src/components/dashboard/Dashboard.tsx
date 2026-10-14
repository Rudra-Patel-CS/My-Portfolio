import { AboutMe } from './AboutMe'
import { Contact } from './Contact'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Navbar } from './Navbar'
import { WorkProjects } from './WorkProjects'

type DashboardProps = {
  soundOn: boolean
  onToggleSound: () => void
  onToggleTheme: () => void
  isLight: boolean
  onReplayIntro: () => void
}

export function Dashboard(props: DashboardProps) {
  return (
    <div className="relative z-10 min-h-svh selection:bg-cyan-400/30 selection:text-white">
      <Navbar {...props} />
      <main>
        {/* 1. Dashboard (Hero with frameless cutout photo joint with background) */}
        <Hero />

        {/* 2. About Me (Building across disciplines) */}
        <AboutMe />

        {/* 3. Work (Projects: By the numbers + Explore my work) */}
        <WorkProjects />

        {/* 4. Get in Touch (Coordinates + 1-click copy + form) */}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
