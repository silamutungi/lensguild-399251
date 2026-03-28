import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-ink border-b border-white/10" role="navigation" aria-label="Main navigation">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-xl font-bold text-paper focus:outline-none focus:ring-2 focus:ring-paper">
          LensGuild
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {email ? (
            <>
              <Link to="/dashboard" className="font-mono text-sm text-paper/70 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper">Dashboard</Link>
              <span className="font-mono text-xs text-paper/40 truncate max-w-[160px]">{email}</span>
              <button
                onClick={handleLogout}
                className="font-mono text-sm text-paper/70 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper min-h-[44px] px-2"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-mono text-sm text-paper/70 hover:text-paper focus:outline-none focus:ring-2 focus:ring-paper min-h-[44px] flex items-center">Sign in</Link>
              <Link to="/signup" className="font-mono text-sm bg-primary text-white px-4 py-2 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-paper hover:bg-primary-dark transition-colors">Join</Link>
            </>
          )}
        </div>
        <button
          className="sm:hidden text-paper focus:outline-none focus:ring-2 focus:ring-paper min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="font-mono text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-ink border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {email ? (
            <>
              <Link to="/dashboard" className="font-mono text-sm text-paper/80" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="font-mono text-sm text-paper/80 text-left min-h-[44px]">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-mono text-sm text-paper/80 min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>Sign in</Link>
              <Link to="/signup" className="font-mono text-sm text-paper/80 min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>Join LensGuild</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
