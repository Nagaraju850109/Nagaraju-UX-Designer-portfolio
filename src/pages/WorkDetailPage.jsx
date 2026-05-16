import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'
import { projects } from '@/data/projects'

// ── Wipe-reveal image placeholder ────────────────────────────────────────────
function CaseImage({ image, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: image.aspect || '16/9' }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="absolute inset-0"
          style={{ background: image.gradient }}
        />
        {image.label && (
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/50 to-transparent">
            <p className="font-mono text-[10px] text-white/70 tracking-wider">{image.label}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ── Section block ─────────────────────────────────────────────────────────────
function CaseSection({ section, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-16 border-t border-border"
    >
      {/* Label */}
      <div className="lg:col-span-3">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">{section.label}</span>
      </div>

      {/* Content */}
      <div className="lg:col-span-9 space-y-8">
        <p className="font-body text-secondary leading-relaxed text-base lg:text-lg">
          {section.content}
        </p>

        {/* Images */}
        {section.images?.length > 0 && (
          section.grid && section.images.length > 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.images.map((img, i) => (
                <CaseImage key={i} image={img} delay={i * 0.15} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {section.images.map((img, i) => (
                <CaseImage key={i} image={img} delay={i * 0.1} />
              ))}
            </div>
          )
        )}
      </div>
    </motion.div>
  )
}

// ── Next project card ─────────────────────────────────────────────────────────
function NextProjectCard({ project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group block cursor-none"
      data-cursor="view"
    >
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '16/6' }}>
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ background: project.gradient }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <p className="font-mono text-xs text-white/60 tracking-widest uppercase">Next Project</p>
          <h3 className="font-display text-white font-bold text-xl lg:text-2xl group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-xs text-white/80">View Case Study</span>
            <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function WorkDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = projects.find((p) => p.slug === slug)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  useEffect(() => {
    if (!project) navigate('/work', { replace: true })
  }, [project, navigate])

  if (!project) return null

  return (
    <>
      <article className="pt-32 pb-0 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 font-mono text-xs text-secondary hover:text-accent transition-colors duration-200 cursor-none group"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Works
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            <h1
              className="font-display font-bold text-foreground"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.05 }}
            >
              {project.title}
            </h1>
          </motion.div>

          {/* Metadata row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-border mb-10"
          >
            <div>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Category</p>
              <p className="font-body text-sm text-foreground font-medium">{project.category}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Year</p>
              <p className="font-body text-sm text-foreground font-medium">{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Deliverables</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.deliverables?.map((d) => (
                  <span key={d} className="font-mono text-[10px] text-secondary border border-border rounded-full px-2 py-0.5">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Tools</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tags?.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-secondary border border-border rounded-full px-2 py-0.5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-body text-secondary text-base lg:text-xl leading-relaxed max-w-3xl mb-12"
          >
            {project.overview}
          </motion.p>

          {/* Hero image — full bleed */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(8% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full overflow-hidden rounded-2xl mb-4"
            style={{ aspectRatio: '16/7' }}
          >
            <div className="w-full h-full" style={{ background: project.heroGradient }} />
          </motion.div>

          <p className="font-mono text-[10px] text-muted mb-16 text-center tracking-widest uppercase">
            {project.title} — Project Overview
          </p>

          {/* Case study sections */}
          <div className="mb-24">
            {project.sections?.map((section, i) => (
              <CaseSection key={section.label} section={section} index={i} />
            ))}
          </div>

          {/* Next project */}
          {nextProject && (
            <div className="mb-16">
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6 text-center">Continue Reading</p>
              <NextProjectCard project={nextProject} />
            </div>
          )}
        </div>
      </article>

      {/* Dark CTA */}
      <section className="py-24 px-6" style={{ background: '#0d0d0d' }}>
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
    </>
  )
}
