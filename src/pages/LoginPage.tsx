import { useState, FormEvent, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Sparkles, ArrowLeft, Crown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import logoBlack from '@/assets/logo-black.png'

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const LoginPage = () => {
  const { user, signIn, signUp, signInWithGoogle, profile, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'client' | 'admin'>('client')
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  // If already logged in, redirect
  useEffect(() => {
    // Redirect if profile is loaded
    if (profile && !authLoading) {
      navigate(profile.role === 'admin' ? '/admin' : '/client', { replace: true })
    }
    // Also redirect if user exists but profile is null (fallback for new signups)
    if (user && !profile && !authLoading && authMode === 'signin') {
      // User signed in but profile might still be loading, wait a moment
      const timer = setTimeout(() => {
        navigate('/client', { replace: true })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [profile, user, authLoading, navigate, authMode])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (authMode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (!fullName.trim()) {
          throw new Error('Full name is required')
        }
        await signUp(email, password, fullName, mode)
      } else {
        await signIn(email, password)
      }
    } catch (err: unknown) {
      console.error('Auth error:', err)
      const errorMsg = err instanceof Error ? err.message : authMode === 'signup' ? 'Failed to create account.' : 'Invalid credentials. Please try again.'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google.')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mode toggle — floating top-right */}
      <div className="fixed top-6 right-6 z-50 flex gap-2 bg-background/80 backdrop-blur-md p-1 rounded-full border border-border">
        <button
          onClick={() => { setMode('client'); setAuthMode('signin') }}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
            mode === 'client'
              ? 'bg-primary text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Client
        </button>
        <button
          onClick={() => { setMode('admin'); setAuthMode('signin') }}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
            mode === 'admin'
              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Crown className="w-4 h-4" /> Admin
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'client' ? (
          <ClientPortal
            key="client"
            authMode={authMode}
            setAuthMode={setAuthMode}
            email={email}
            setEmail={setEmail}
            fullName={fullName}
            setFullName={setFullName}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            googleLoading={googleLoading}
            error={error}
            handleSubmit={handleSubmit}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        ) : (
          <AdminPortal
            key="admin"
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            loading={loading}
            googleLoading={googleLoading}
            error={error}
            handleSubmit={handleSubmit}
            handleGoogleSignIn={handleGoogleSignIn}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ClientPortal = ({ authMode, setAuthMode, email, setEmail, fullName, setFullName, password, setPassword, confirmPassword, setConfirmPassword, showPassword, setShowPassword, loading, googleLoading, error, handleSubmit, handleGoogleSignIn }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full flex lg:flex-row flex-col"
  >
    {/* Left panel — client branding */}
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0a0010] via-[#1a0033] to-[#2d0052] flex-col justify-between p-14">
      <div
        className="absolute inset-0 opacity-30"
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
        <div className="lg:hidden mb-10 flex justify-center">
          <img src={logoBlack} alt="KLENTEC" className="h-10 w-auto" />
        </div>

        <div className="mb-8">
          <span className="badge-dreamy mb-4 inline-flex">
            <Sparkles className="w-3 h-3" /> {authMode === 'signin' ? 'Sign in' : 'Join'}
          </span>
          <h1 className="text-3xl font-display tracking-tight text-foreground">
            {authMode === 'signin' ? 'Welcome back.' : 'Start your journey.'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {authMode === 'signin' ? 'Access your client portal.' : 'Create your account to get started.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                required={authMode === 'signup'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm"
              />
            </div>
          )}

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

          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          )}

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
                {authMode === 'signin' ? 'Signing in…' : 'Creating account…'}
              </>
            ) : authMode === 'signin' ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Google Sign-In */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full mt-4 px-4 py-3 rounded-xl border border-border hover:bg-background/50 transition-all disabled:opacity-60 flex items-center justify-center gap-2 font-medium text-sm"
        >
          {googleLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {authMode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setAuthMode('signup')} className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setAuthMode('signin')} className="text-primary hover:underline font-medium">
                Sign in
              </button>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  </motion.div>
)

const AdminPortal = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, loading, googleLoading, error, handleSubmit, handleGoogleSignIn }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
    className="w-full flex lg:flex-row flex-col"
  >
    {/* Left panel — premium admin branding */}
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-black flex-col justify-between p-14">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 40% 40%, hsl(260 100% 50% / 0.5), transparent), radial-gradient(ellipse 60% 80% at 80% 80%, hsl(280 100% 60% / 0.3), transparent)',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10">
        <img src={logoBlack} alt="KLENTEC" className="h-12 w-auto brightness-0 invert" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          <p className="text-xs font-display text-purple-300 tracking-widest uppercase">Executive Access</p>
        </div>

        <h2 className="text-5xl font-display text-white leading-tight">
          Lead the<br />
          <em className="not-italic" style={{ background: 'linear-gradient(135deg,#ec4899,#a855f7,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            operation.
          </em>
        </h2>

        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
          Oversee projects, manage clients, track invoices, and maintain direct communication — all from your command center.
        </p>

        <div className="space-y-3 pt-6 border-t border-white/10">
          {[
            { label: 'Clients', value: '50+' },
            { label: 'Projects', value: '150+' },
            { label: 'Team', value: 'Multi' }
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center text-sm">
              <span className="text-white/50">{label}</span>
              <span className="text-lg font-display text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right panel — exclusive form */}
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, hsl(260 80% 50% / 0.15), transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="lg:hidden mb-10 flex justify-center">
          <img src={logoBlack} alt="KLENTEC" className="h-10 w-auto" />
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 badge-dreamy mb-4">
            <Crown className="w-4 h-4" />
            <span>Admin Access</span>
          </div>
          <h1 className="text-4xl font-display tracking-tight text-foreground">Command Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your administrative credentials to access the control room.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@klentec.com"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/15 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Admin Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-background border border-border focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/15 transition-all text-sm"
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
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm transition-all disabled:opacity-60 hover:-translate-y-0.5 shadow-lg shadow-purple-500/30"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Accessing…
              </div>
            ) : (
              'Enter Command Center'
            )}
          </button>
        </form>

        {/* Google Sign-In */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full mt-4 px-4 py-3 rounded-xl border border-purple-500/30 hover:bg-purple-500/5 transition-all disabled:opacity-60 flex items-center justify-center gap-2 font-medium text-sm text-purple-600"
        >
          {googleLoading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-purple-600/30 border-t-purple-600 animate-spin" />
              Signing in…
            </>
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>

        <div className="mt-8 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-purple-600">Pro tip:</span> For first-time setup, sign up with your admin email on the Client portal first, then contact support to upgrade your account.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  </motion.div>
)

export default LoginPage
