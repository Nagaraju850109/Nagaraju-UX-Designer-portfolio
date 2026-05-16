import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal a single element when it enters the viewport.
 * @param {React.RefObject} ref - ref attached to the element
 * @param {object} opts - overrides for y, duration, delay, ease
 */
export function useScrollReveal(ref, opts = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: opts.y ?? 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: opts.duration ?? 0.8,
          ease: opts.ease ?? 'power3.out',
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref]) // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Reveal all [data-reveal] children of a container with stagger.
 * Add data-reveal-delay="0.1" on individual children for offsets.
 * @param {React.RefObject} containerRef
 */
export function useScrollRevealGroup(containerRef) {
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = [...container.querySelectorAll('[data-reveal]')]
    if (!els.length) return

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay ?? 0)
        gsap.fromTo(
          el,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        )
      })
    }, container)

    return () => ctx.revert()
  }, [containerRef]) // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Image clip-path wipe reveal: bottom → top.
 * Wrap your image/placeholder in a div and pass that div's ref.
 */
export function useClipReveal(ref, opts = {}) {
  useEffect(() => {
    const el = ref?.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { clipPath: 'inset(0% 0 0% 0)' })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0 0% 0)' },
        {
          clipPath: 'inset(0% 0 0% 0)',
          duration: opts.duration ?? 0.9,
          ease: opts.ease ?? 'power3.inOut',
          delay: opts.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref]) // eslint-disable-line react-hooks/exhaustive-deps
}
