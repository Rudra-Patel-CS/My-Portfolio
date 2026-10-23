import { useEffect, useRef } from 'react'
import { About } from './components/About'
import { ClickRipple, NetworkBackground } from './components/Background'
import { Contact, Footer } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Focus } from './components/Focus'
import { Hero, Marquee } from './components/Hero'
import { Journey } from './components/Journey'
import { Nav } from './components/Nav'
import { ProjectPage } from './components/ProjectPage'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { startReveals, useRoute } from './lib/fx'

function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Projects />
      <Focus />
      <About />
      <Journey />
      <Skills />
      <Contact />
    </main>
  )
}

export default function App() {
  const route = useRoute()
  const lastPage = useRef(route.page)

  // Switching between home and a project page jumps instantly; in-page anchors keep smooth scrolling.
  useEffect(() => {
    const switched = lastPage.current !== route.page
    lastPage.current = route.page
    const behavior: ScrollBehavior = switched ? 'instant' : 'smooth'
    if (route.page === 'project') {
      window.scrollTo({ top: 0, behavior })
    } else if (route.section) {
      requestAnimationFrame(() => document.getElementById(route.section)?.scrollIntoView({ behavior }))
    } else if (switched) {
      window.scrollTo({ top: 0, behavior })
    }
  }, [route])

  useEffect(() => startReveals(), [route])

  return (
    <>
      <NetworkBackground />
      <ClickRipple />
      <Cursor />
      <Nav page={route.page} />
      {route.page === 'project' ? <ProjectPage key={route.id} id={route.id} /> : <Home />}
      <Footer />
    </>
  )
}
