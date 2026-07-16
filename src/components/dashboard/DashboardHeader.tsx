import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Command,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/Badge';

interface DashboardHeaderProps {
  onCommandPaletteOpen: () => void;
}

const tierLabels: Record<string, { label: string; variant: 'free' | 'vip' | 'vip-plus' | 'coach' }> = {
  free: { label: 'Free', variant: 'free' },
  premium: { label: 'Premium', variant: 'vip' },
  vip_plus: { label: 'VIP+', variant: 'vip-plus' },
};

function getTierInfo(tier: string | undefined): { label: string; variant: 'free' | 'vip' | 'vip-plus' | 'coach' } {
  if (tier && tier in tierLabels) {
    return tierLabels[tier]!;
  }
  return tierLabels.free!;
}

export function DashboardHeader({ onCommandPaletteOpen }: DashboardHeaderProps) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const tierInfo = getTierInfo(user?.tier);
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 border-b border-[rgb(var(--surface-border))] bg-[rgb(var(--surface-base))] px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile menu hint */}
        <button
          onClick={onCommandPaletteOpen}
          className="hidden tablet:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-body-sm text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
        >
          <Command size={14} />
          <span className="hidden desktop:inline">Search</span>
          <kbd className="text-caption text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-overlay))] px-1 rounded ml-1">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-all focus-ring"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-all focus-ring">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-fitness-rose" />
        </button>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-sm hover:bg-[rgb(var(--surface-raised))] transition-colors focus-ring"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-cta flex items-center justify-center text-white text-caption font-bold">
              {initials || 'U'}
            </div>
            <div className="hidden tablet:block text-left">
              <p className="text-body-sm font-medium leading-tight">{user?.name || 'User'}</p>
              <p className="text-caption text-[rgb(var(--text-tertiary))] leading-tight">{user?.email}</p>
            </div>
            <ChevronDown size={14} className="hidden tablet:block text-[rgb(var(--text-tertiary))]" />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-56 rounded-sm bg-[rgb(var(--surface-base))] border border-[rgb(var(--surface-border))] shadow-floating overflow-hidden z-30"
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="p-3 border-b border-[rgb(var(--surface-border))]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-cta flex items-center justify-center text-white text-body-sm font-bold">
                      {initials || 'U'}
                    </div>
                    <div>
                      <p className="text-body-sm font-medium">{user?.name || 'User'}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant={tierInfo.variant} size="sm">
                          {tierInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-1">
                  {[
                    { icon: User, label: 'Profile', onClick: () => {} },
                    { icon: Settings, label: 'Settings', onClick: () => {} },
                    { icon: LogOut, label: 'Sign Out', onClick: signOut },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-body-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
