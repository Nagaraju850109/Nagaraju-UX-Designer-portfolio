import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer } from '@/utils/animations'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Projects() {
  const { ref, inView } = useScrollAnimation()
  const [showAll, setShowAll] = useState(false)

  const displayed = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
                Selected Work
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold leading-tight">
                Projects that <br />
                <span className="text-gradient">make impact</span>
              </motion.h2>
            </div>
            <motion.button
              variants={fadeUp}
              onClick={() => setShowAll(!showAll)}
              className="hidden md:block font-mono text-sm text-secondary border border-border px-5 py-2 rounded-full hover:border-accent hover:text-accent transition-colors cursor-none"
            >
              {showAll ? 'Show Less' : 'View All'}
            </motion.button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm text-secondary border border-border px-5 py-2 rounded-full hover:border-accent hover:text-accent transition-colors cursor-none"
            >
              {showAll ? 'Show Less' : 'View All Projects'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
