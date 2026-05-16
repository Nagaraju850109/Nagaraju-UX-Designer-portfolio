import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { projects } from '@/data/projects'

const FILTERS = ['All', 'UI/UX', 'Branding', 'Web', 'Mobile']

// ── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="block group cursor-none"
        data-cursor="view"
      >
        {/* Image area */}
        <div
          className="relative w-full overflow-hidden rounded-2xl mb-4"
          style={{ aspectRatio: '4/3' }}
          data-cursor="view"
        >
          {/* Gradient placeholder (replace with <img> when real images are ready) */}
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ background: project.gradient }}
          />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Hover dim + View label */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0)' }}
            whileHover={{ background: 'rgba(0,0,0,0.35)' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <span className="font-display text-white font-bold text-lg">View</span>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Year badge */}
          <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="font-mono text-[10px] text-white/80">{project.year}</span>
          </div>
        </div>

        {/* Card metadata */}
        <div className="px-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200 leading-tight">
              {project.title}
            </h3>
          </div>
          <p className="font-mono text-xs text-muted">{project.category}</p>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Marquee ───────────────────────────────────────────────────────────────
const marqueeItems = [
  'Ultra Care · Falls Rx LLC',
  'Design System · Ravin IT',
  'Enterprise UX · Avira Systems',
  'Mars Health App · GHC',
  'Branding & Identity · XtracIT',
  'Healthcare UX · WCAG 2.2',
  'Figma · Research · Prototyping',
]

function MarqueeTicker() {
  return (
    <div className="py-6 border-y border-border overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'marquee-left 28s linear infinite', width: 'max-content' }}
      >
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 font-mono text-xs text-muted uppercase tracking-widest">
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: 'var(--color-accent)' }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Dark CTA ──────────────────────────────────────────────────────────────
function DarkCTA() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: '#0d0d0d' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: '#f97316' }}>
            Start a project
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#f0f0f0' }}>
            Have a project in mind?
          </h2>
        </div>
        <MagneticButton
          href="/contact"
          className="flex-shrink-0 px-8 py-4 font-medium rounded-full text-white transition-all duration-300"
          style={{ background: '#f97316', boxShadow: '0 8px 30px rgba(249,115,22,0.3)' }}
        >
          Let's Talk
        </MagneticButton>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.filterCategory === activeFilter)

  return (
    <>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">Portfolio</p>
            <h1 className="font-display font-bold text-foreground mb-10" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 1.05 }}>
              Selected Work
            </h1>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <motion.button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="cursor-none px-5 py-2 rounded-full font-mono text-xs tracking-wide transition-all duration-200"
                  animate={{
                    background: activeFilter === f ? 'var(--color-accent)' : 'transparent',
                    color: activeFilter === f ? '#ffffff' : 'var(--color-secondary)',
                    borderColor: activeFilter === f ? 'var(--color-accent)' : 'var(--color-border)',
                  }}
                  style={{ border: '1px solid var(--color-border)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {f}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 py-24 text-center"
                >
                  <p className="font-mono text-sm text-muted">No projects in this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <MarqueeTicker />
      <DarkCTA />
    </>
  )
}
