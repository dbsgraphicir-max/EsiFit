import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { CommandPalette, useCommandPalette } from '@/components/ui/CommandPalette';
import { DashboardSkeleton } from '@/components/ui/Skeleton';
import { GreetingWidget } from '@/components/dashboard/widgets/GreetingWidget';
import { TodayWidget } from '@/components/dashboard/widgets/TodayWidget';
import { ReadinessScore } from '@/components/dashboard/widgets/ReadinessScore';
import { ActionWidget } from '@/components/dashboard/widgets/ActionWidget';
import { HistoryWidget } from '@/components/dashboard/widgets/HistoryWidget';

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const { isOpen, open, close } = useCommandPalette();
  const [pageLoaded, setPageLoaded] = useState(false);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Simulate dashboard loading
  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Responsive sidebar
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-gradient-cta flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-body-sm text-[rgb(var(--text-secondary))]">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[rgb(var(--surface-base))]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCommandPaletteOpen={open}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onCommandPaletteOpen={open} />

        <div className="flex-1 overflow-y-auto">
          {!pageLoaded ? (
            <DashboardSkeleton />
          ) : (
            <motion.div
              className="p-4 tablet:p-6 desktop:p-8 space-y-6 max-w-[1440px] mx-auto w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* 1. Greeting */}
              <GreetingWidget />

              {/* Dashboard Psychology order: Today → Progress → Action → History */}
              <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
                {/* 2. Today — spans 2 cols */}
                <div className="desktop:col-span-2">
                  <TodayWidget />
                </div>

                {/* 3. Progress / Readiness Score */}
                <div>
                  <ReadinessScore />
                </div>
              </div>

              {/* 4. Action + 5. History — side by side */}
              <div className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                <ActionWidget />
                <HistoryWidget />
              </div>

              {/* Bottom spacing */}
              <div className="h-8" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette isOpen={isOpen} onClose={close} />
    </div>
  );
}
