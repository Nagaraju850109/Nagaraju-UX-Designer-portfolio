import { motion } from 'framer-motion'

const letterVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function AnimatedText({ text, className = '', once = true }) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
            custom={wi}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
