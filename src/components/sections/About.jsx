import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, slideLeft, staggerContainer } from '@/utils/animations'

const stats = [
  { value: '6+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Delivered' },
  { value: '10+', label: 'Happy Clients' },
  { value: '★', label: 'Academic Excellence Award' },
]

export default function About() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left — text */}
          <div>
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
              About Me
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Designing for the <br />
              <span className="text-gradient">human of today</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed mb-6">
              I'm a UI/UX Designer with 6+ years translating user needs into intuitive,
              accessible interfaces. I partner with PMs and developers to run research,
              build wireframes, and deliver pixel-perfect prototypes and design systems in Figma.
            </motion.p>
            <motion.p variants={fadeUp} className="text-secondary leading-relaxed">
              Outside client work, I focus on WCAG-compliant design systems, UX writing,
              and exploring the intersection of health-tech and inclusive design. M.A. in
              Web &amp; Multimedia Design from Touro University — Academic Excellence Award 2024.
            </motion.p>
          </div>

          {/* Right — stats grid */}
          <motion.div
            variants={slideLeft}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-gradient rounded-2xl p-8">
                <p className="font-display text-5xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
