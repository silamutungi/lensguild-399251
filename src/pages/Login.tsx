import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Those credentials did not work. Please check your email and password.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-bold text-ink mb-2">Welcome back</h1>
        <p className="font-mono text-sm text-ink/60 mb-8">Sign in to your LensGuild account.</p>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-mono text-xs text-ink uppercase tracking-wider">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-ink/20 bg-white px-4 py-3 font-mono text-sm text-ink min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-mono text-xs text-ink uppercase tracking-wider">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-ink/20 bg-white px-4 py-3 font-mono text-sm text-ink min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              autoComplete="current-password"
              maxLength={128}
            />
          </div>
          {error && (
            <p role="alert" className="font-mono text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-mono text-sm font-medium px-6 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="font-mono text-sm text-ink/60 mt-6">
          No account yet?{' '}
          <Link to="/signup" className="text-primary underline hover:text-primary-dark">Join LensGuild</Link>
        </p>
      </div>
    </div>
  )
}
