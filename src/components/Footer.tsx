import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-10 px-6" role="contentinfo">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-serif text-paper text-sm font-semibold">LensGuild</span>
        <nav aria-label="Footer navigation" className="flex gap-6">
          <Link to="/privacy" className="font-mono text-xs text-paper/50 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper">Privacy Policy</Link>
          <Link to="/terms" className="font-mono text-xs text-paper/50 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper">Terms of Service</Link>
          <a href="mailto:hello@lensguild.com" className="font-mono text-xs text-paper/50 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper">Contact</a>
        </nav>
        <span className="font-mono text-xs text-paper/30">&copy; {new Date().getFullYear()} LensGuild</span>
      </div>
    </footer>
  )
}
