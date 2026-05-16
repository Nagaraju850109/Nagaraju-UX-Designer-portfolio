import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer } from '@/utils/animations'
import { experience } from '@/data/skills'

export default function Experience() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="mb-20">
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
              Career
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold">
              Work <span className="text-gradient">Experience</span>
            </motion.h2>
          </div>

          <div className="space-y-0">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                variants={fadeUp}
                className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 border-t border-border hover:border-accent/30 transition-colors duration-300"
              >
                <div>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">
                      {job.role}
                    </h3>
                    <p className="font-mono text-sm text-accent mb-3">{job.company}</p>
                    <p className="text-secondary text-sm leading-relaxed max-w-xl">{job.description}</p>
                  </div>
                  <span className="font-mono text-xs text-muted border border-border px-3 py-1 rounded-full h-fit whitespace-nowrap">
                    {String(i + 1).padStart(2, '0')}
                  </span>
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
