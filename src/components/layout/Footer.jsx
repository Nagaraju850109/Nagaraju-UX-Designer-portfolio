const socials = [
  { label: "Email", href: "mailto:uppalanagaraju18@gmail.com" },
  { label: "LinkedIn", href: "www.linkedin.com/in/unr1996" },
  { label: "Behance", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Nagaraju Uppala — Designed & built with
          care
        </p>
        <ul className="flex items-center gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="font-mono text-xs text-secondary hover:text-accent transition-colors cursor-none"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
