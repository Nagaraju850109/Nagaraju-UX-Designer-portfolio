import { motion } from 'framer-motion'
import Hero from '@/components/sections/Hero'
import ProjectCard from '@/components/ui/ProjectCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer, scaleIn } from '@/utils/animations'
import { projects } from '@/data/projects'

// ── Featured Projects ──────────────────────────────────────────────────────
function FeaturedProjects() {
  const { ref, inView } = useScrollAnimation()
  const featured = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="flex items-end justify-between mb-14">
            <div>
              <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">
                Selected Work
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Latest Projects
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} className="hidden md:block">
              <MagneticButton
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-sm text-secondary border border-border px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-all duration-300"
              >
                View All Work
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          <motion.div variants={fadeUp} className="md:hidden mt-8 text-center">
            <MagneticButton
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-sm text-secondary border border-border px-5 py-2.5 rounded-full hover:border-accent hover:text-accent transition-all duration-300"
            >
              View All Work →
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Showreel ──────────────────────────────────────────────────────────────
function ShowreelSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden border border-border min-h-[300px] md:min-h-[380px] flex items-center justify-center group cursor-none"
            style={{ background: 'var(--color-surface)' }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 60%, rgba(249,115,22,0.04) 100%)' }}
            />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
              <motion.div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ borderColor: 'var(--color-accent)' }}
                whileHover={{ scale: 1.1 }}
              >
                <svg
                  className="w-7 h-7 ml-0.5 transition-colors duration-300"
                  style={{ color: 'var(--color-accent)' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>

              <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">Portfolio</p>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Design Showreel 2025
              </h3>
              <p className="text-secondary text-sm max-w-md mx-auto leading-relaxed">
                A curated showcase of UX/UI design work — from healthcare apps to enterprise
                design systems and accessible interfaces.
              </p>
              <p className="font-mono text-xs text-muted mt-5 tracking-widest">COMING SOON</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Trusted / Companies ────────────────────────────────────────────────────
const companies = [
  { name: 'Falls Rx LLC (Ultra Care)', tag: 'Current · 2025' },
  { name: 'Ravin IT Solutions', tag: '2025' },
  { name: 'Avira Systems', tag: '2024–25' },
  { name: 'XtracIT, Inc.', tag: '2024' },
  { name: 'Mars by GHC', tag: '2021' },
  { name: 'Kovida Ltd', tag: '2020–21' },
]

const tools = ['Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Axure', 'Storybook', 'HTML/CSS', 'Jira']

function TrustedSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-28 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">
              Experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Companies I've Worked With
            </motion.h2>
          </div>

          {/* Company pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-16">
            {companies.map((c) => (
              <div
                key={c.name}
                className="group flex items-center gap-2.5 border border-border rounded-full px-5 py-2.5 bg-background hover:border-accent transition-all duration-300 cursor-none"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300"
                  style={{ background: 'var(--color-accent)' }}
                />
                <span className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                  {c.name}
                </span>
                <span className="font-mono text-[10px] text-muted">{c.tag}</span>
              </div>
            ))}
          </motion.div>

          {/* Tools divider */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex-1 h-px bg-border" />
            <motion.p variants={fadeUp} className="font-mono text-xs text-muted tracking-widest uppercase whitespace-nowrap">
              Tools & Technologies
            </motion.p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-xs text-secondary border border-border bg-background px-4 py-2 rounded-lg hover:border-accent hover:text-accent transition-all duration-300 cursor-none"
              >
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Design Impact ─────────────────────────────────────────────────────────
const impacts = [
  {
    metric: '≥90%',
    label: 'Task Success Rate',
    desc: 'Achieved through evidence-based UX design, moderated usability tests, and data-driven iteration at Falls Rx LLC.',
    tag: 'Healthcare UX',
    color: '#f97316',
  },
  {
    metric: '+15%',
    label: 'Engagement Uplift',
    desc: 'Increased user engagement by 15% and improved retention by 10% by developing user personas and journey maps at Ravin IT Solutions.',
    tag: 'Product Design',
    color: '#ea580c',
  },
  {
    metric: '−20%',
    label: 'Handoff Time',
    desc: 'Reduced design-to-dev handoff time by building and maintaining comprehensive Figma component libraries and symbol sets.',
    tag: 'Design Systems',
    color: '#fb923c',
  },
]

function ImpactSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">
              Results
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Design That{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Makes a Difference
              </span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impacts.map((item) => (
              <motion.div
                key={item.label}
                variants={scaleIn}
                className="group relative rounded-2xl border border-border p-8 hover:border-accent transition-all duration-300 overflow-hidden"
                style={{ background: 'var(--color-surface)' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${item.color}08, transparent)` }}
                />

                <p className="font-mono text-xs text-accent mb-2 tracking-widest relative z-10">{item.tag}</p>
                <p
                  className="font-display font-black mb-2 relative z-10"
                  style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', color: item.color, lineHeight: 1 }}
                >
                  {item.metric}
                </p>
                <p className="font-display text-lg font-semibold text-foreground mb-3 relative z-10">{item.label}</p>
                <p className="text-secondary text-sm leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Contact CTA ───────────────────────────────────────────────────────────
function HomeContactCTA() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-28 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
            Let's Work Together
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Have a project or{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              opportunity in mind?
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-secondary leading-relaxed mb-10 max-w-lg mx-auto">
            I'm currently available for new UX/UI design roles and freelance opportunities.
            Let's build something meaningful together.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <MagneticButton
              href="/contact"
              className="px-8 py-4 bg-accent text-white font-medium rounded-full text-sm hover:bg-accent-dim transition-all duration-300"
              style={{ boxShadow: '0 8px 30px var(--color-accent-soft)' }}
            >
              Let's Connect
            </MagneticButton>
            <MagneticButton
              href="mailto:uppalanagaraju18@gmail.com"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-full text-sm hover:border-accent hover:text-accent transition-all duration-300"
            >
              Send Email
            </MagneticButton>
          </motion.div>

          <motion.p variants={fadeUp} className="font-mono text-xs text-muted">
            uppalanagaraju18@gmail.com
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ShowreelSection />
      <TrustedSection />
      <ImpactSection />
      <HomeContactCTA />
    </>
  )
}
