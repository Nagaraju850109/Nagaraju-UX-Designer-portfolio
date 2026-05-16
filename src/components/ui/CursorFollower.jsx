import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'

const LERP_RING = 0.14
const LERP_DOT = 0.28

export default function CursorFollower() {
  // Motion values for position — updated by RAF, never trigger re-renders
  const ringX = useMotionValue(-200)
  const ringY = useMotionValue(-200)
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)

  const [mode, setMode] = useState('default')   // 'default' | 'hover' | 'view'
  const [visible, setVisible] = useState(false)

  const target = useRef({ x: -200, y: -200 })
  const rafId = useRef(null)
  const modeRef = useRef('default')
  const visibleRef = useRef(false)

  useEffect(() => {
    // Only activate on devices with a fine pointer (desktop mouse)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const lerp = (a, b, t) => a + (b - a) * t

    const loop = () => {
      const tx = target.current.x
      const ty = target.current.y

      // Ring lags behind (slower lerp = more cinematic lag)
      ringX.set(lerp(ringX.get(), tx - 20, LERP_RING))
      ringY.set(lerp(ringY.get(), ty - 20, LERP_RING))

      // Dot snaps faster — feels precise
      dotX.set(lerp(dotX.get(), tx - 3, LERP_DOT))
      dotY.set(lerp(dotY.get(), ty - 3, LERP_DOT))

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }

    const onOver = (e) => {
      const el = e.target
      let next = 'default'
      if (el.closest('[data-cursor="view"]')) next = 'view'
      else if (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.closest('a') ||
        el.closest('button')
      ) next = 'hover'

      if (next !== modeRef.current) {
        modeRef.current = next
        setMode(next)
      }
    }

    const onLeave = () => {
      visibleRef.current = false
      setVisible(false)
    }
    const onEnter = () => {
      visibleRef.current = true
      setVisible(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [ringX, ringY, dotX, dotY])

  return (
    <>
      {/* Ring — lerp-positioned, spring-scaled */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{ x: ringX, y: ringY, width: 40, height: 40, willChange: 'transform' }}
        animate={{
          scale: mode === 'view' ? 1.85 : mode === 'hover' ? 1.5 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === 'view'
              ? 'var(--color-accent)'
              : mode === 'hover'
              ? 'var(--color-accent-soft)'
              : 'transparent',
          borderColor: 'var(--color-accent)',
          borderWidth: mode === 'view' ? 0 : 1,
          borderStyle: 'solid',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 280, damping: 24 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.18 },
        }}
      >
        <motion.span
          className="font-mono text-white font-bold select-none"
          style={{ fontSize: 7, letterSpacing: '0.1em' }}
          animate={{ opacity: mode === 'view' ? 1 : 0, scale: mode === 'view' ? 1 : 0.5 }}
          transition={{ duration: 0.15 }}
        >
          VIEW
        </motion.span>
      </motion.div>

      {/* Dot — snappier lerp, disappears on hover/view */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          backgroundColor: 'var(--color-accent)',
          willChange: 'transform',
        }}
        animate={{ opacity: visible && mode === 'default' ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
