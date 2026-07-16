import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, isLoading, error, clearError } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await signIn({ email, password, remember });
      showToast('success', 'Welcome back! Redirecting to your dashboard...');
      navigate('/dashboard');
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-sm space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-gradient-cta flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-h4 font-heading font-bold tracking-tight">
              Esi<span className="text-brand-500">Fit</span>
            </span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-h2 font-heading">Welcome back</h1>
            <p className="text-body-md text-[rgb(var(--text-secondary))]">
              Sign in to continue your fitness journey
            </p>
          </div>

          {/* Demo hint */}
          <div className="glass rounded-sm p-4 space-y-1">
            <p className="text-body-sm font-medium">Demo credentials:</p>
            <p className="text-body-sm text-[rgb(var(--text-secondary))]">
              Email: <span className="font-mono text-brand-500">aria@esifit.com</span>
            </p>
            <p className="text-body-sm text-[rgb(var(--text-secondary))]">
              Password: <span className="font-mono text-brand-500">password123</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                className="p-3 rounded-sm bg-red-500/10 border border-red-500/20 text-body-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError(); }}
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-[rgb(var(--surface-border))] text-brand-500 focus:ring-brand-500/30"
                />
                <span className="text-body-sm text-[rgb(var(--text-secondary))]">Remember me</span>
              </label>
              <a href="#" className="text-body-sm text-brand-500 hover:text-brand-400 transition-colors">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="gradient-glow" size="lg" className="w-full" loading={isLoading}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-body-sm text-[rgb(var(--text-secondary))]">
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
              Create one <ArrowRight size={14} className="inline" />
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden desktop:flex flex-1 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-950/20 dark:to-accent-950/20 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow dark:bg-hero-glow-dark" />
        <div className="relative z-10 max-w-md text-center space-y-6 p-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-cta flex items-center justify-center">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-h3 font-heading">Transform with EsiFit</h2>
          <p className="text-body-lg text-[rgb(var(--text-secondary))]">
            Track workouts, optimize nutrition, and unlock your full potential with AI-powered insights.
          </p>
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-data-lg font-heading text-gradient">50K+</p>
              <p className="text-caption text-[rgb(var(--text-tertiary))]">Active Members</p>
            </div>
            <div className="text-center">
              <p className="text-data-lg font-heading text-gradient">16</p>
              <p className="text-caption text-[rgb(var(--text-tertiary))]">Calculators</p>
            </div>
            <div className="text-center">
              <p className="text-data-lg font-heading text-gradient">98%</p>
              <p className="text-caption text-[rgb(var(--text-tertiary))]">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
