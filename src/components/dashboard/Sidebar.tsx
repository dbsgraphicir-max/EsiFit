import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Calculator,
  TrendingUp,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Dumbbell as LogoIcon,
  Command,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
  { label: 'Workouts', icon: <Dumbbell size={18} />, href: '/dashboard?tab=workouts' },
  { label: 'Nutrition', icon: <Apple size={18} />, href: '/dashboard?tab=nutrition' },
  { label: 'Calculators', icon: <Calculator size={18} />, href: '/dashboard?tab=calculators', badge: '16' },
  { label: 'Analytics', icon: <TrendingUp size={18} />, href: '/dashboard?tab=analytics' },
  { label: 'Community', icon: <Users size={18} />, href: '/dashboard?tab=community' },
  { label: 'Settings', icon: <Settings size={18} />, href: '/dashboard?tab=settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  onCommandPaletteOpen: () => void;
}

export function Sidebar({ isCollapsed, onToggle, onCommandPaletteOpen }: SidebarProps) {
  const location = useLocation();
  const activeTab = new URLSearchParams(location.search).get('tab') || 'dashboard';
  const [isHovering, setIsHovering] = useState(false);

  // On mobile, sidebar is either hidden or shown as overlay
  const showExpanded = !isCollapsed || isHovering;

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 tablet:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed tablet:relative z-50 h-full flex flex-col bg-[rgb(var(--surface-base))] border-r border-[rgb(var(--surface-border))] transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth)]',
          isCollapsed ? 'w-0 tablet:w-[60px] -translate-x-full tablet:translate-x-0' : 'w-[240px] translate-x-0',
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-[rgb(var(--surface-border))]">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-sm bg-gradient-cta flex items-center justify-center flex-shrink-0">
              <LogoIcon className="w-4 h-4 text-white" />
            </div>
            <AnimatePresence>
              {showExpanded && (
                <motion.span
                  className="text-h4 font-heading font-bold tracking-tight whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Esi<span className="text-brand-500">Fit</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.href.split('tab=')[1]?.toLowerCase() ||
              (!item.href.includes('tab=') && activeTab === 'dashboard');
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-[var(--duration-fast)] group',
                  isActive
                    ? 'bg-brand-500/10 text-brand-500'
                    : 'text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]',
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {showExpanded && (
                    <motion.span
                      className="text-body-sm font-medium whitespace-nowrap flex-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {showExpanded && item.badge && (
                  <Badge variant="info" size="sm">{item.badge}</Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-2 border-t border-[rgb(var(--surface-border))] space-y-1">
          <button
            onClick={onCommandPaletteOpen}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-body-sm transition-colors',
              'text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--surface-raised))] hover:text-[rgb(var(--text-primary))]',
            )}
          >
            <Command size={16} className="flex-shrink-0" />
            <AnimatePresence>
              {showExpanded && (
                <motion.span
                  className="flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Command Palette
                </motion.span>
              )}
            </AnimatePresence>
            {showExpanded && (
              <kbd className="text-caption text-[rgb(var(--text-tertiary))] bg-[rgb(var(--surface-overlay))] px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            )}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={onToggle}
            className="hidden tablet:flex items-center justify-center w-full py-2 rounded-sm text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-raised))] transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>

      {/* Mobile toggle button (when sidebar is collapsed/hidden) */}
      {isCollapsed && (
        <button
          onClick={onToggle}
          className="fixed bottom-4 left-4 z-30 tablet:hidden w-10 h-10 rounded-full bg-brand-500 text-white shadow-raised flex items-center justify-center"
          aria-label="Open navigation"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </>
  );
}
