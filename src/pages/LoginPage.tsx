import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import logoBlack from '@/assets/logo-black.png'

const LoginPage = () => {
  const { signIn, profile } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If already logged in, redirect
  if (profile) {
    navigate(profile.role === 'admin' ? '/admin' : '/client', { replace: true })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      // onAuthStateChange will update profile; redirect handled above on re-render
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a0010] flex-col justify-between p-14">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 40% 40%, hsl(260 80% 40% / 0.7), transparent), radial-gradient(ellipse 60% 80% at 80% 80%, hsl(260 100% 60% / 0.3), transparent)',
          }}
        />
        <div className="relative z-10">
          <img src={logoBlack} alt="KLENTEC" className="h-12 w-auto brightness-0 invert" />
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-display text-white leading-tight">
            Your growth partner —<br />
            <em className="not-italic" style={{ background: 'linear-gradient(135deg,#c084fc,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              from idea to empire.
            </em>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Access your personalised portal to track projects, deliverables, invoices and stay connected with your KLENTEC team.
          </p>
          <div className="flex gap-6 pt-4 border-t border-white/10">
            {[['150+', 'Projects'], ['95%', 'Retention'], ['4.2×', 'Avg ROAS']].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-display text-white">{v}</p>
                <p className="text-xs text-white/40 tracking-widest uppercase mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <img src={logoBlack} alt="KLENTEC" className="h-10 w-auto" />
          </div>

          <div className="mb-8">
            <span className="badge-dreamy mb-4 inline-flex">
              <Sparkles className="w-3 h-3" /> Client & Admin Portal
            </span>
            <h1 className="text-3xl font-display tracking-tight text-foreground">Welcome back.</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your KLENTEC portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/20 text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-dreamy w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Not a client yet?{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              Contact KLENTEC
            </Link>
          </p>

          <div className="mt-6 flex justify-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to website
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
