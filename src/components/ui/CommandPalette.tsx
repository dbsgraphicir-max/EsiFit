import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  Dumbbell,
  Apple,
  Calculator,
  Users,
  Settings,
  LogOut,
  Command,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  category: 'navigation' | 'actions' | 'quick';
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'View your fitness overview',
      icon: <LayoutDashboard size={16} />,
      action: () => { navigate('/dashboard'); onClose(); },
      category: 'navigation',
    },
    {
      id: 'workout',
      label: 'Start Workout',
      description: 'Begin a new training session',
      icon: <Dumbbell size={16} />,
      action: () => { navigate('/dashboard?tab=workout'); onClose(); },
      category: 'actions',
    },
    {
      id: 'nutrition',
      label: 'Log Nutrition',
      description: 'Track your meals and macros',
      icon: <Apple size={16} />,
      action: () => { navigate('/dashboard?tab=nutrition'); onClose(); },
      category: 'actions',
    },
    {
      id: 'calculators',
      label: 'Open Calculators',
      description: 'Access all 16 fitness calculators',
      icon: <Calculator size={16} />,
      action: () => { navigate('/dashboard?tab=calculators'); onClose(); },
      category: 'navigation',
    },
    {
      id: 'community',
      label: 'Community',
      description: 'Challenges, leaderboards, and feed',
      icon: <Users size={16} />,
      action: () => { navigate('/dashboard?tab=community'); onClose(); },
      category: 'navigation',
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Account and preferences',
      icon: <Settings size={16} />,
      action: () => { navigate('/dashboard?tab=settings'); onClose(); },
      category: 'navigation',
    },
    {
      id: 'signout',
      label: 'Sign Out',
      description: 'End your current session',
      icon: <LogOut size={16} />,
      action: () => { signOut(); navigate('/'); onClose(); },
      category: 'actions',
    },
  ];

  // Filter commands based on query
  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(q) ||
      cmd.description?.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          filtered[selectedIndex]?.action();
          break;
        case 'Escape':
          onClose();
          break;
      }
    },
    [filtered, selectedIndex, onClose],
  );

  // Scroll selected item into view
  useEffect(() => {
    const selected = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    selected?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="relative w-full max-w-lg mx-4"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="glass-elevated rounded-lg overflow-hidden shadow-floating">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgb(var(--surface-border))]">
                <Search size={18} className="text-[rgb(var(--text-tertiary))] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-body-md text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-tertiary))] outline-none"
                  aria-label="Search commands"
                />
                <kbd className="hidden tablet:inline-flex items-center gap-1 px-1.5 py-0.5 text-caption text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-overlay))] rounded">
                  <Command size={12} />
                  K
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-72 overflow-y-auto p-2 space-y-0.5">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-body-sm text-[rgb(var(--text-tertiary))]">No results found</p>
                    <p className="text-caption text-[rgb(var(--text-tertiary))] mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  filtered.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-colors',
                        index === selectedIndex
                          ? 'bg-brand-500/10 text-[rgb(var(--text-primary))]'
                          : 'text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex-shrink-0',
                          index === selectedIndex ? 'text-brand-500' : 'text-[rgb(var(--text-tertiary))]',
                        )}
                      >
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium truncate">{cmd.label}</p>
                        {cmd.description && (
                          <p className="text-caption text-[rgb(var(--text-tertiary))] truncate">
                            {cmd.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        size={14}
                        className={cn(
                          'flex-shrink-0 transition-opacity',
                          index === selectedIndex ? 'opacity-100 text-brand-500' : 'opacity-0',
                        )}
                      />
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center gap-3 px-4 py-2 border-t border-[rgb(var(--surface-border))] bg-[rgb(var(--surface-raised))]">
                <span className="text-caption text-[rgb(var(--text-tertiary))]">
                  <kbd className="px-1 py-0.5 bg-[rgb(var(--surface-overlay))] rounded text-caption">↑↓</kbd> Navigate
                </span>
                <span className="text-caption text-[rgb(var(--text-tertiary))]">
                  <kbd className="px-1 py-0.5 bg-[rgb(var(--surface-overlay))] rounded text-caption">↵</kbd> Select
                </span>
                <span className="text-caption text-[rgb(var(--text-tertiary))]">
                  <kbd className="px-1 py-0.5 bg-[rgb(var(--surface-overlay))] rounded text-caption">Esc</kbd> Close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage command palette state globally
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close, setIsOpen };
}
