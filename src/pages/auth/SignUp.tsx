import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/Toast';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, isLoading, error, clearError } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError();
  };

  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    match: form.confirmPassword === form.password && form.confirmPassword.length > 0,
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (!passwordChecks.length) newErrors.password = 'Password must be at least 8 characters';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (!passwordChecks.match) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await signUp(form);
      showToast('success', 'Account created! Welcome to EsiFit.');
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
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-sm bg-gradient-cta flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-h4 font-heading font-bold tracking-tight">
              Esi<span className="text-brand-500">Fit</span>
            </span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-h2 font-heading">Create your account</h1>
            <p className="text-body-md text-[rgb(var(--text-secondary))]">
              Start your transformation journey today
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
              label="Full Name"
              type="text"
              placeholder="Aria Chen"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                error={errors.password}
                autoComplete="new-password"
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

            {/* Password requirements */}
            <div className="space-y-1.5 px-1">
              {[
                { label: 'At least 8 characters', check: passwordChecks.length },
                { label: 'One uppercase letter', check: passwordChecks.upper },
                { label: 'One number', check: passwordChecks.number },
              ].map((req) => (
                <div key={req.label} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      req.check
                        ? 'bg-brand-500 border-brand-500 text-white'
                        : 'border-[rgb(var(--text-tertiary))]'
                    }`}
                  >
                    {req.check && <Check size={10} />}
                  </div>
                  <span
                    className={`text-body-sm transition-colors ${
                      req.check
                        ? 'text-[rgb(var(--text-primary))]'
                        : 'text-[rgb(var(--text-tertiary))]'
                    }`}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button type="submit" variant="gradient-glow" size="lg" className="w-full" loading={isLoading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-body-sm text-[rgb(var(--text-secondary))]">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-brand-500 hover:text-brand-400 font-medium transition-colors">
              Sign in <ArrowRight size={14} className="inline" />
            </Link>
          </p>

          <p className="text-caption text-[rgb(var(--text-tertiary))] text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="underline hover:text-[rgb(var(--text-primary))]">Terms</a> and{' '}
            <a href="#" className="underline hover:text-[rgb(var(--text-primary))]">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden desktop:flex flex-1 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-950/20 dark:to-brand-950/20 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow-dark" />
        <div className="relative z-10 max-w-md text-center space-y-6 p-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-h3 font-heading">Join 50,000+ members</h2>
          <p className="text-body-lg text-[rgb(var(--text-secondary))]">
            Free forever. No credit card required. Upgrade only when you&apos;re ready for premium.
          </p>
          <ul className="space-y-3 text-left max-w-xs mx-auto">
            {[
              '16 free science-based calculators',
              'AI-powered workout recommendations',
              'Advanced progress analytics',
              'Community challenges & leaderboards',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-body-sm">
                <Check size={16} className="text-brand-500 flex-shrink-0" />
                <span className="text-[rgb(var(--text-secondary))]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
