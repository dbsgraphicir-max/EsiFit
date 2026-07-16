import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Sparkles } from 'lucide-react';

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getMotivationalPhrase(): string {
  const phrases = [
    'Ready to crush your goals today?',
    'Another day, another opportunity to grow.',
    'Your future self will thank you.',
    'Small steps lead to big results.',
    'Progress, not perfection.',
    'You are capable of amazing things.',
  ];
  return phrases[Math.floor(Math.random() * phrases.length)] ?? 'Keep pushing forward!';
}

export function GreetingWidget() {
  const { user } = useAuth();
  const name = user?.name?.split(' ')[0] || 'Athlete';

  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-h2 tablet:text-h1 font-heading">
        {getTimeBasedGreeting()}, {name}
      </h1>
      <p className="text-body-lg text-[rgb(var(--text-secondary))] flex items-center gap-2">
        <Sparkles size={16} className="text-brand-500" />
        {getMotivationalPhrase()}
      </p>
    </motion.div>
  );
}
