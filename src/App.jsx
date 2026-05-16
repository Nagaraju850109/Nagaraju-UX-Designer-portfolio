import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ThemeProvider } from '@/context/ThemeContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CursorFollower from '@/components/ui/CursorFollower'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Preloader from '@/components/ui/Preloader'
import PageTransition from '@/components/ui/PageTransition'

import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import WorkPage from '@/pages/WorkPage'
import WorkDetailPage from '@/pages/WorkDetailPage'
import SkillsPage from '@/pages/SkillsPage'
import ExperiencePage from '@/pages/ExperiencePage'
import ContactPage from '@/pages/ContactPage'

gsap.registerPlugin(ScrollTrigger)

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    // Refresh ScrollTrigger after route change so new elements are measured correctly
    ScrollTrigger.refresh()
  }, [location.pathname])

  return (
    <Routes location={location}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<WorkDetailPage />} />
      <Route path="/skills" element={<Navigate to="/about" replace />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [location.pathname])

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <CursorFollower />
      <ScrollProgress />
      <Navigation />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <PageTransition />
    </div>
  )
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(
    () => sessionStorage.getItem('nu-preloader') === '1'
  )

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('nu-preloader', '1')
    setPreloaderDone(true)
  }

  return (
    <ThemeProvider>
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  )
}
