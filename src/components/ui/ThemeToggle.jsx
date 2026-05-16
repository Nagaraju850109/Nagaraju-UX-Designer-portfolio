import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const SunIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
)

const MoonIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="cursor-none relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ background: dark ? 'var(--color-accent)' : 'var(--color-border)' }}
    >
      <motion.div
        className="absolute w-4 h-4 rounded-full shadow flex items-center justify-center"
        style={{
          background: dark ? '#fff' : 'var(--color-accent)',
          color: dark ? 'var(--color-accent)' : '#fff',
        }}
        animate={{ x: dark ? 26 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      >
        {dark ? <MoonIcon /> : <SunIcon />}
      </motion.div>

      {/* Track labels */}
      <span
        className="absolute left-1.5 font-mono text-[7px] font-bold tracking-wider transition-opacity duration-200"
        style={{
          color: dark ? 'transparent' : 'var(--color-secondary)',
          opacity: dark ? 0 : 1,
        }}
      />
    </button>
  )
}
