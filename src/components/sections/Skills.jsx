import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer } from '@/utils/animations'
import { skills } from '@/data/skills'

function SkillBar({ name, level, index }) {
  const { ref, inView } = useScrollAnimation()

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-foreground">{name}</span>
        <span className="font-mono text-xs text-accent">{level}%</span>
      </div>
      <div className="h-px bg-border relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useScrollAnimation()

  return (
    <section id="skills" className="py-32 px-6 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="text-center mb-20">
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
              Expertise
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold">
              Skills & <span className="text-gradient">Technologies</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-xs text-muted tracking-widest uppercase mb-6 pb-3 border-b border-border">
                  {group.category}
                </h3>
                {group.items.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
