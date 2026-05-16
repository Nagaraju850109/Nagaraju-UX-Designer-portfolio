import { Link } from 'react-router-dom'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  external = false,
  type,
}) {
  const ref = useMagneticEffect(0.3)

  // External link or anchor (mailto:, tel:, etc.)
  if (href && (external || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.endsWith('.pdf'))) {
    return (
      <a
        ref={ref}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center justify-center cursor-none ${className}`}
      >
        {children}
      </a>
    )
  }

  // Internal router link
  if (href) {
    return (
      <Link
        ref={ref}
        to={href}
        className={`inline-flex items-center justify-center cursor-none ${className}`}
      >
        {children}
      </Link>
    )
  }

  // Button
  return (
    <button
      ref={ref}
      type={type || 'button'}
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-none ${className}`}
    >
      {children}
    </button>
  )
}
