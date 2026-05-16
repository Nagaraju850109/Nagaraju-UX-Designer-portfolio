import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer } from '@/utils/animations'

const statItems = [
  ['6+', 'Years'],
  ['30+', 'Projects'],
  ['10+', 'Clients'],
]

const toolTags = ['Figma', 'Adobe', 'WCAG 2.2', 'Jira']

export default function Hero() {
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-grid-line', {
        opacity: 0.04,
        stagger: { each: 0.05, from: 'random' },
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.3,
      })
    }, gridRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden">

      {/* Animated grid background */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="hero-grid-line absolute top-0 bottom-0 border-l border-foreground opacity-0"
            style={{ left: `${(i + 1) * (100 / 13)}%` }}
          />
        ))}
      </div>

      {/* Orange ambient glow */}
      <div
        className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: 'var(--color-accent-soft)' }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: text content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 border border-border glass px-4 py-2 rounded-full mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-secondary">Available for new opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-display font-bold mb-6" style={{ lineHeight: 1.05 }}>
              <span className="block text-foreground" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}>
                UI/UX Designer
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                crafting clean,
              </span>
              <span className="block text-foreground" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}>
                accessible &
              </span>
              <span className="block text-foreground" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)' }}>
                human-centered
              </span>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                experiences.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed max-w-[480px] mb-10 text-[1.0625rem]">
              Product-driven designer with 6+ years translating complex user needs into
              intuitive interfaces, scalable design systems, and accessible digital products.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <MagneticButton
                href="/work"
                className="group relative overflow-hidden px-8 py-4 bg-accent text-white font-medium rounded-full text-sm transition-all duration-300"
                style={{ boxShadow: '0 8px 30px var(--color-accent-soft)' }}
              >
                <span className="relative z-10">View My Work</span>
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'var(--color-accent-dim)' }}
                />
              </MagneticButton>

              <MagneticButton
                href="/Nagaraju_Resume_UX_Desinger.pdf"
                className="px-8 py-4 border border-border text-foreground font-medium rounded-full text-sm hover:border-accent hover:text-accent transition-all duration-300"
              >
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="flex items-center gap-3 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)' }} />
              <span className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase">Scroll to explore</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: profile card ── */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Main card */}
            <div
              className="relative w-full max-w-[360px] rounded-3xl border border-border bg-surface p-8"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
              >
                <span className="font-display font-black text-2xl text-white">NU</span>
              </div>

              {/* Identity */}
              <div className="text-center mb-6 pb-6 border-b border-border">
                <h3 className="font-display font-bold text-xl text-foreground mb-1">Nagaraju Uppala</h3>
                <p className="font-mono text-xs text-accent">UI/UX Designer · 6+ Years</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {statItems.map(([val, label]) => (
                  <div key={label} className="bg-background rounded-xl p-3 text-center border border-border">
                    <p className="font-display font-bold text-accent text-lg leading-none">{val}</p>
                    <p className="font-mono text-[10px] text-muted mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-2 justify-center">
                {toolTags.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[10px] text-secondary border border-border px-3 py-1.5 rounded-full bg-background"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating: currently at */}
            <motion.div
              className="absolute -top-5 -right-6 bg-background border border-border rounded-2xl px-4 py-3"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="font-mono text-[10px] text-accent mb-0.5">Currently at</p>
              <p className="font-body text-xs font-semibold text-foreground">Falls Rx LLC</p>
            </motion.div>

            {/* Floating: open to work */}
            <motion.div
              className="absolute -bottom-5 -left-6 bg-background border border-border rounded-2xl px-4 py-3"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="font-mono text-[10px] text-foreground">Open to opportunities</p>
              </div>
            </motion.div>

            {/* Floating: WCAG badge */}
            <motion.div
              className="absolute top-1/2 -right-10 rounded-xl px-3 py-2"
              style={{
                background: 'var(--color-accent)',
                boxShadow: '0 6px 20px var(--color-accent-soft)',
              }}
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <p className="font-mono text-[10px] text-white font-bold">WCAG 2.2 AA</p>
            </motion.div>

            {/* Floating: Award badge */}
            <motion.div
              className="absolute top-8 -left-8 bg-background border border-border rounded-2xl px-3 py-2"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <p className="font-mono text-[10px] text-accent">★ Excellence Award</p>
              <p className="font-mono text-[9px] text-muted">Touro University 2024</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
