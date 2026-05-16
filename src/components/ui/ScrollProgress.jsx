import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 h-0.5 bg-accent z-[9998] origin-left"
      style={{ scaleX: scrollYProgress, width: '100%' }}
    />
  )
}
