import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function PageTransition() {
  const overlayRef = useRef(null)
  const location = useLocation()
  const tlRef = useRef(null)
  const isFirst = useRef(true)

  useLayoutEffect(() => {
    // Skip on first render — preloader handles the initial entrance
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const el = overlayRef.current
    if (!el) return

    // Kill any in-progress transition
    if (tlRef.current) tlRef.current.kill()

    // Instantly cover the incoming page (fires before browser paints)
    gsap.set(el, { yPercent: 0, pointerEvents: 'all' })

    tlRef.current = gsap.timeline({
      onComplete: () => gsap.set(el, { pointerEvents: 'none' }),
    })
      .to(el, {
        yPercent: -100,
        duration: 0.6,
        ease: 'expo.inOut',
        delay: 0.05,
      })
      // Reset off-screen for next navigation
      .set(el, { yPercent: 100 })
  }, [location.pathname])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9985,
        background: '#f97316',
        transform: 'translateY(100%)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  )
}
