import { motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer, scaleIn, slideLeft } from '@/utils/animations'
import { experience } from '@/data/skills'

// ── Shared label ─────────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <p className="font-mono text-xs text-accent mb-3 tracking-widest uppercase">{children}</p>
)

// ── 1. Hero (minimal) ─────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section className="pt-32 pb-16 px-6 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-30"
        style={{ background: 'var(--color-accent-soft)' }}
      />
      <div className="max-w-7xl mx-auto relative">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 border border-border glass px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-secondary">Open to UX/UI Design opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-foreground mb-5 max-w-4xl"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)', lineHeight: 1.07 }}
          >
            UX/UI Designer focused on{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              clean, accessible
            </span>
            , and user-centered digital experiences.
          </motion.h1>

          {/* Sub-line */}
          <motion.p variants={fadeUp} className="text-secondary text-lg leading-relaxed max-w-2xl">
            I combine research, visual design, prototyping, and usability testing to design
            meaningful web and mobile experiences.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

// ── 2. Auto-scrolling Work Preview Strip ──────────────────────────────────
const previewCards = [
  { title: 'Healthcare UX', sub: 'Falls Rx LLC · 2025', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
  { title: 'Web Dashboard', sub: 'Enterprise UI · 2024', gradient: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)' },
  { title: 'Mobile App Design', sub: 'iOS & Android · 2024', gradient: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)' },
  { title: 'Design System', sub: 'Component Library · 2025', gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)' },
  { title: 'Branding Project', sub: 'Visual Identity · 2021', gradient: 'linear-gradient(135deg, #292524 0%, #1c1917 100%)' },
  { title: 'Case Study', sub: 'UX Research · 2025', gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)' },
  { title: 'Wireframe Preview', sub: 'Low-fi to Hi-fi · 2024', gradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)' },
  { title: 'UX Research Report', sub: 'Personas & Journeys', gradient: 'linear-gradient(135deg, #78716c 0%, #57534e 100%)' },
]

function WorkPreviewStrip() {
  return (
    <section className="pb-16 overflow-hidden">
      {/* First row — left to right */}
      <div className="relative overflow-hidden mb-4">
        <div
          className="flex gap-4 py-2"
          style={{
            animation: 'marquee-left 30s linear infinite',
            width: 'max-content',
          }}
        >
          {[...previewCards, ...previewCards].map((card, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden relative group cursor-none"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="absolute inset-0" style={{ background: card.gradient }} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: 'inset 0 0 0 1.5px var(--color-accent)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-white text-base mb-0.5">{card.title}</p>
                <p className="font-mono text-[10px] text-white/70">{card.sub}</p>
              </div>
              {/* Coming soon badge */}
              <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                <p className="font-mono text-[9px] text-white">Preview</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second row — right to left (reversed) */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 py-2"
          style={{
            animation: 'marquee-right 35s linear infinite',
            width: 'max-content',
          }}
        >
          {[...previewCards.slice(4), ...previewCards.slice(0, 4), ...previewCards.slice(4), ...previewCards.slice(0, 4)].map((card, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-64 h-40 rounded-2xl overflow-hidden relative group cursor-none"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="absolute inset-0" style={{ background: card.gradient }} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: 'inset 0 0 0 1.5px var(--color-accent)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-white text-base mb-0.5">{card.title}</p>
                <p className="font-mono text-[10px] text-white/70">{card.sub}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                <p className="font-mono text-[9px] text-white">Preview</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 3. Personal Intro ─────────────────────────────────────────────────────
function PersonalIntro() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          <div>
            <motion.div variants={fadeUp}><SectionLabel>About Me</SectionLabel></motion.div>
            <motion.blockquote
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight"
            >
              "I design with empathy, build with precision, and iterate with data."
            </motion.blockquote>
          </div>
          <div>
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed mb-5">
              I'm Nagaraju Uppala, a UI/UX Designer with 6+ years of experience creating
              user-centered digital experiences across web, mobile, healthcare, branding, and
              product design. My M.A. in Web & Multimedia Design from Touro University helps me
              combine research, visual design, interaction design, and usability testing to create
              clear and meaningful experiences.
            </motion.p>
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed mb-8">
              I thrive in collaborative environments — partnering with PMs, developers, and
              stakeholders to translate complex requirements into intuitive interfaces and
              scalable design systems. Currently building WCAG 2.2 AA compliant healthcare UX at
              Falls Rx LLC (Ultra Care) in Maryland.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <MagneticButton
                href="/work"
                className="px-6 py-3 bg-accent text-white font-medium rounded-full text-sm hover:bg-accent-dim transition-all duration-300"
                style={{ boxShadow: '0 8px 24px var(--color-accent-soft)' }}
              >
                View My Work
              </MagneticButton>
              <MagneticButton
                href="/Nagaraju_Resume_UX_Desinger.pdf"
                className="px-6 py-3 border border-border text-foreground font-medium rounded-full text-sm hover:border-accent hover:text-accent transition-all duration-300"
              >
                Download Resume
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 4. Experience ─────────────────────────────────────────────────────────
function ExperienceSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Career</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Work Experience
            </motion.h2>
          </div>

          <div className="space-y-0">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                variants={fadeUp}
                className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3 md:gap-10 py-8 border-t border-border hover:border-accent/40 transition-colors duration-300"
              >
                <span className="font-mono text-xs text-muted pt-1">{job.period}</span>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-0.5 group-hover:text-accent transition-colors duration-300">
                    {job.role}
                  </h3>
                  <p className="font-mono text-xs text-accent mb-2">{job.company}</p>
                  <p className="text-secondary text-sm leading-relaxed max-w-xl">{job.description}</p>
                </div>
                <span className="hidden md:flex font-mono text-xs text-border group-hover:text-accent/40 transition-colors duration-300 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 5. Skills ─────────────────────────────────────────────────────────────
const skillGroups = [
  {
    category: 'UX Skills',
    color: '#f97316',
    skills: [
      'User Research', 'Wireframing', 'User Flows', 'Information Architecture',
      'Usability Testing', 'Prototyping', 'Personas', 'Journey Maps',
      'Card Sorting', 'Competitive Analysis',
    ],
  },
  {
    category: 'UI Skills',
    color: '#ea580c',
    skills: [
      'Visual Design', 'Design Systems', 'Responsive Design',
      'Accessibility (WCAG 2.2)', 'Interaction Design',
      'Microcopy & UX Writing', 'Component Libraries',
    ],
  },
  {
    category: 'Tools',
    color: '#fb923c',
    skills: [
      'Figma', 'Adobe Photoshop', 'Adobe Illustrator',
      'Adobe InDesign', 'Adobe XD', 'Sketch', 'InVision', 'Axure', 'Canva',
    ],
  },
  {
    category: 'Technical Skills',
    color: '#c2410c',
    skills: ['HTML5', 'CSS3', 'Bootstrap', 'WordPress', 'JavaScript', 'React', 'Angular'],
  },
]

function SkillsSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Expertise</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Skills & Tools
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: group.color }} />
                  <p className="font-mono text-xs tracking-widest uppercase" style={{ color: group.color }}>
                    {group.category}
                  </p>
                </div>
                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="font-mono text-xs text-secondary border border-border bg-background px-3 py-2 rounded-lg transition-all duration-200 cursor-none"
                      whileHover={{
                        borderColor: group.color,
                        color: group.color,
                        y: -2,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 6. Design Approach ────────────────────────────────────────────────────
const philosophy = [
  { num: '01', title: 'Research First', desc: 'Every design decision starts with understanding users — their goals, pain points, and context — through interviews, surveys, and usability testing.' },
  { num: '02', title: 'Clear Information Architecture', desc: 'Well-organized content and navigation reduce cognitive load and help users accomplish tasks quickly and confidently.' },
  { num: '03', title: 'Accessible by Default', desc: 'WCAG 2.2 AA compliance, keyboard navigation, and health-literacy standards are baked in from the start — not added as an afterthought.' },
  { num: '04', title: 'Testing & Iteration', desc: 'Designs improve through moderated usability tests, data dashboards, and continuous iteration — not guesswork.' },
]

function DesignApproach() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Process</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              My Design Approach
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophy.map((item) => (
              <motion.div
                key={item.num}
                variants={scaleIn}
                className="group rounded-2xl border border-border p-8 hover:border-accent transition-all duration-300 relative overflow-hidden"
                style={{ background: 'var(--color-surface)' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.05), transparent)' }}
                />
                <span className="font-mono text-4xl font-black text-border group-hover:text-accent transition-colors duration-300 block mb-4">
                  {item.num}
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 7. Education & Awards ─────────────────────────────────────────────────
const credentials = [
  { year: '2024', title: 'Academic Excellence Award', org: 'Touro University, New York', type: 'Award', detail: 'Outstanding academic performance in the Web and Multimedia Department.' },
  { year: '2024', title: 'M.A., Web & Multimedia Design', org: 'Touro University, New York', type: 'Education', detail: 'Graduate studies in interaction design, digital media, and UX strategy.' },
  { year: '2019', title: 'PGDM, Game Art & Design', org: 'Backstage Pass Institute', type: 'Education', detail: 'Post-graduate diploma in visual design, game art, and interactive media.' },
  { year: '2018', title: 'B.Sc., Animation Design', org: 'Loyola Academy Degree College', type: 'Education', detail: 'Bachelor of Science in animation, design fundamentals, and digital arts.' },
]

const typeColors = { Award: '#f97316', Education: '#ea580c' }

function EducationSection() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-24 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Background</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Education & Awards
            </motion.h2>
          </div>
          <div className="space-y-0">
            {credentials.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group grid grid-cols-1 md:grid-cols-[90px_110px_1fr] gap-3 md:gap-10 py-7 border-t border-border hover:border-accent/40 transition-colors duration-300"
              >
                <span className="font-mono text-xs text-muted pt-1">{item.year}</span>
                <span
                  className="font-mono text-xs px-3 py-1 rounded-full border h-fit self-start w-fit"
                  style={{ color: typeColors[item.type], borderColor: `${typeColors[item.type]}40`, background: `${typeColors[item.type]}10` }}
                >
                  {item.type}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-0.5 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                  <p className="font-mono text-xs text-accent mb-2">{item.org}</p>
                  <p className="text-secondary text-sm leading-relaxed max-w-xl">{item.detail}</p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-border" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── 8. Contact CTA ────────────────────────────────────────────────────────
function AboutContactCTA() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeUp}><SectionLabel>Get In Touch</SectionLabel></motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-foreground mb-6 leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              Have a project, role, or{' '}
              <span style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                collaboration
              </span>{' '}
              in mind?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed mb-8">
              Currently available for full-time UX/UI design roles and freelance projects.
              Let's create something impactful together.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <MagneticButton
                href="/contact"
                className="px-7 py-3.5 bg-accent text-white font-medium rounded-full text-sm hover:bg-accent-dim transition-all duration-300"
                style={{ boxShadow: '0 8px 30px var(--color-accent-soft)' }}
              >
                Let's Connect
              </MagneticButton>
              <MagneticButton
                href="/work"
                className="px-7 py-3.5 border border-border text-foreground font-medium rounded-full text-sm hover:border-accent hover:text-accent transition-all duration-300"
              >
                View My Work
              </MagneticButton>
            </motion.div>
          </div>
          <motion.div variants={slideLeft} className="space-y-0">
            {[
              { label: 'Email', value: 'uppalanagaraju18@gmail.com', href: 'mailto:uppalanagaraju18@gmail.com' },
              { label: 'LinkedIn', value: 'Update your LinkedIn URL', href: '#' },
              { label: 'Behance', value: 'Update your Behance URL', href: '#' },
              { label: 'Location', value: 'Maryland, USA', href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-4 border-b border-border">
                <span className="font-mono text-xs text-muted tracking-widest uppercase">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="font-body text-sm text-secondary hover:text-accent transition-colors duration-200 cursor-none">
                    {item.value}
                  </a>
                ) : (
                  <span className="font-body text-sm text-secondary">{item.value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PersonalIntro />
      <ExperienceSection />
      <SkillsSection />
      <DesignApproach />
      <EducationSection />
      <AboutContactCTA />
    </>
  )
}
