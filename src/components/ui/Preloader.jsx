import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const NAGA = ['N', 'A', 'G', 'A']
const RAJU = ['R', 'A', 'J', 'U']

const STRIP_LEFT = [
  'linear-gradient(160deg,#f97316,#c2410c)',
  'linear-gradient(160deg,#1e293b,#0f172a)',
  'linear-gradient(160deg,#292524,#1c1917)',
  'linear-gradient(160deg,#ea580c,#f59e0b)',
  'linear-gradient(160deg,#78716c,#44403c)',
  'linear-gradient(160deg,#f97316,#ea580c)',
]
const STRIP_RIGHT = [
  'linear-gradient(160deg,#44403c,#1c1917)',
  'linear-gradient(160deg,#334155,#1e293b)',
  'linear-gradient(160deg,#ea580c,#c2410c)',
  'linear-gradient(160deg,#1e293b,#0f172a)',
  'linear-gradient(160deg,#f59e0b,#f97316)',
  'linear-gradient(160deg,#292524,#44403c)',
]

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const stripLeftRef = useRef(null)
  const stripRightRef = useRef(null)
  const charRefs = useRef([])
  const subtitleRef = useRef(null)
  const progressLineRef = useRef(null)
  const counterRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.()
      return
    }

    const chars = charRefs.current.filter(Boolean)
    const subtitle = subtitleRef.current
    const progressLine = progressLineRef.current
    const counter = counterRef.current
    const status = statusRef.current
    const stripL = stripLeftRef.current
    const stripR = stripRightRef.current
    const container = containerRef.current

    // ── Initial states ──────────────────────────────────────────────────────
    gsap.set(chars, { y: 80, opacity: 0 })
    gsap.set(subtitle, { opacity: 0, y: 14 })
    gsap.set(progressLine, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(counter, { opacity: 0 })
    gsap.set(status, { opacity: 0 })

    // ── Strips scroll throughout — opposite directions ──────────────────────
    gsap.to(stripL, { yPercent: -50, duration: 4, ease: 'none' })
    gsap.to(stripR, { yPercent: 50,  duration: 4, ease: 'none' })

    // ── Counter object ──────────────────────────────────────────────────────
    const obj = { val: 0 }
    const step1 = Math.floor(Math.random() * 15) + 22   // 22–36
    const step2 = Math.floor(Math.random() * 18) + 55   // 55–72

    const updateCounter = () => {
      counter.textContent = String(Math.round(obj.val)).padStart(2, '0')
    }

    // ── Master timeline (~5s before exit) ───────────────────────────────────
    const tl = gsap.timeline({
      onComplete() {
        gsap.to(container, {
          yPercent: -108,
          rotation: 6,
          duration: 1.1,
          ease: 'expo.inOut',
          onComplete: () => onComplete?.(),
        })
      },
    })

    tl
      // — Phase 1: Name characters stagger in
      .to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      }, 0.1)

      // — Phase 2: Subtitle rises
      .to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.6)

      // — Phase 3: Progress line draws over 2s
      .to(progressLine, {
        scaleX: 1,
        duration: 2.0,
        ease: 'power1.inOut',
      }, 0.8)

      // — Phase 4: Counter appears
      .to(counter, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.8)

      // — Phase 5: Status label appears
      .to(status, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, 1.0)

      // — Phase 6: Count 0 → step1 (0.6s)
      .to(obj, {
        val: step1,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: updateCounter,
      }, 0.9)

      // — Phase 7: Count step1 → step2 (0.8s)
      .to(obj, {
        val: step2,
        duration: 0.8,
        ease: 'power1.inOut',
        onUpdate: updateCounter,
      })

      // — Phase 8: Count step2 → 100 (0.5s)
      .to(obj, {
        val: 100,
        duration: 0.5,
        ease: 'power3.in',
        onUpdate: updateCounter,
      })

      // — Hold at 100
      .to({}, { duration: 0.3 })

      // — Status swaps to "Welcome"
      .to(status, { opacity: 0, y: -10, duration: 0.2 })
      .call(() => { if (status) status.textContent = 'Welcome' })
      .to(status, { opacity: 1, y: 0, duration: 0.2 })

      // — Final hold
      .to({}, { duration: 0.3 })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        background: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      {/* ── Left strip ────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          bottom: '-30%',
          left: '6vw',
          width: 88,
          overflow: 'hidden',
          opacity: 0.38,
          borderRadius: 8,
        }}
        className="hidden md:block"
      >
        <div
          ref={stripLeftRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, willChange: 'transform' }}
        >
          {[...STRIP_LEFT, ...STRIP_LEFT].map((g, i) => (
            <div key={i} style={{ width: 88, height: 140, borderRadius: 8, background: g, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* ── Right strip ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          bottom: '-30%',
          right: '6vw',
          width: 88,
          overflow: 'hidden',
          opacity: 0.38,
          borderRadius: 8,
        }}
        className="hidden md:block"
      >
        <div
          ref={stripRightRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, willChange: 'transform' }}
        >
          {[...STRIP_RIGHT, ...STRIP_RIGHT].map((g, i) => (
            <div key={i} style={{ width: 88, height: 140, borderRadius: 8, background: g, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* ── Center content ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Name */}
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          {NAGA.map((c, i) => (
            <span
              key={`n${i}`}
              ref={el => { charRefs.current[i] = el }}
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(4rem, 11vw, 9rem)',
                lineHeight: 1,
                color: '#f97316',
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
            >
              {c}
            </span>
          ))}
          {RAJU.map((c, i) => (
            <span
              key={`r${i}`}
              ref={el => { charRefs.current[4 + i] = el }}
              style={{
                fontFamily: '"Syne", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(4rem, 11vw, 9rem)',
                lineHeight: 1,
                color: '#ffffff',
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginTop: '0.9rem',
            willChange: 'transform, opacity',
          }}
        >
          UI / UX Designer &amp; Researcher
        </div>

        {/* Progress line */}
        <div
          style={{
            width: 'clamp(260px, 40vw, 500px)',
            height: 1,
            background: 'rgba(255,255,255,0.1)',
            marginTop: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressLineRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #f97316, #ea580c)',
              willChange: 'transform',
            }}
          />
        </div>

      </div>

      {/* ── Counter ───────────────────────────────────────────────────── */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          bottom: '5vh',
          left: '5vw',
          fontFamily: '"Syne", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(5rem, 14vw, 12rem)',
          lineHeight: 1,
          color: '#f97316',
          letterSpacing: '-0.04em',
          userSelect: 'none',
          willChange: 'opacity',
        }}
      >
        00
      </div>

      {/* ── Status text ───────────────────────────────────────────────── */}
      <div
        ref={statusRef}
        style={{
          position: 'absolute',
          bottom: '6.5vh',
          right: '5vw',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
          willChange: 'transform, opacity',
        }}
      >
        Loading Portfolio
      </div>

    </div>
  )
}
