import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { Menu, X, Moon, Sun, Dumbbell } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Calculators', href: '#calculators' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth)]',
        isScrolled
          ? 'glass shadow-resting'
          : 'bg-transparent',
      )}
    >
      <nav className="section-container flex items-center justify-between h-16 tablet:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-sm bg-gradient-cta flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="text-h4 font-heading font-bold tracking-tight">
            Esi<span className="text-brand-500">Fit</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden tablet:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-body-sm font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors duration-[var(--duration-fast)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden tablet:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-all duration-[var(--duration-fast)] focus-ring"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="gradient-glow" size="sm">
            Get Started Free
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="tablet:hidden p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] focus-ring"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="tablet:hidden glass border-t border-[rgb(var(--surface-border))] animate-fade-in-down">
          <div className="section-container py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-2 text-body-lg font-medium text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-[rgb(var(--surface-border))]">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] focus-ring"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Button variant="ghost" size="sm" className="flex-1">
                Sign In
              </Button>
              <Button variant="gradient-glow" size="sm" className="flex-1">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
