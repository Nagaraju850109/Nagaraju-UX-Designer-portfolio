import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export function useScrollAnimation(threshold = 0.15) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  })
  return { ref, inView }
}

export function useParallax(speed = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrolled = window.scrollY
      const offset = (rect.top + scrolled) * speed
      el.style.transform = `translateY(${offset * 0.1}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
