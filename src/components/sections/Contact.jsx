import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { fadeUp, staggerContainer } from '@/utils/animations'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Contact() {
  const { ref, inView } = useScrollAnimation()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Replace with your form submission logic (e.g. Resend, Formspree)
    setSent(true)
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Big CTA heading */}
          <div className="text-center mb-20">
            <motion.p variants={fadeUp} className="font-mono text-xs text-accent mb-4 tracking-widest uppercase">
              Get In Touch
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Let's build <br />
              <span className="text-gradient">something great</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary max-w-lg mx-auto">
              Whether you have a project in mind or just want to say hello — my inbox is always open.
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-xs text-muted block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors text-sm cursor-none"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors text-sm cursor-none"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs text-muted block mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project..."
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors text-sm resize-none cursor-none"
              />
            </div>

            {sent ? (
              <div className="text-center py-4">
                <p className="text-accent font-medium">Message sent! I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="text-center pt-2">
                <MagneticButton
                  type="submit"
                  className="px-10 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-dim transition-all duration-300 shadow-accent-sm hover:shadow-accent-md"
                >
                  Send Message
                </MagneticButton>
              </div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
