import { BuildingDisciplines } from './BuildingDisciplines'
import { Contact } from './Contact'
import { ExploreWork } from './ExploreWork'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Navbar } from './Navbar'
import { Stats } from './Stats'

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
        <Hero />
        <BuildingDisciplines />
        <Stats />
        <ExploreWork />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
