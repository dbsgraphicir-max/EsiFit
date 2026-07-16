import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, GlassCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import {
  ArrowRight,
  Brain,
  Zap,
  Heart,
  Dumbbell,
  TrendingUp,
  Sparkles,
  Target,
  ChevronRight,
  Star,
  Check,
  Activity,
  Flame,
  Apple,
} from 'lucide-react';

/* ─── Animation Variants ─── */
const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ─── Floating Particles ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-400/20 dark:bg-brand-400/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Feature Cards Data ─── */
const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description:
      'Get personalized recommendations and analysis powered by advanced AI that learns your body and goals.',
    color: 'from-brand-400 to-brand-600',
    glow: 'shadow-glow-primary',
  },
  {
    icon: Dumbbell,
    title: 'Smart Workout Tracking',
    description:
      'Track every rep, set, and PR with real-time form feedback and intelligent rest timer suggestions.',
    color: 'from-accent-400 to-accent-600',
    glow: 'shadow-glow-accent',
  },
  {
    icon: Apple,
    title: 'Nutrition Intelligence',
    description:
      'Log meals in seconds with AI-powered photo recognition and get macro-optimized meal suggestions.',
    color: 'from-fitness-ember to-orange-600',
    glow: 'shadow-glow-primary',
  },
  {
    icon: Activity,
    title: 'Recovery Readiness',
    description:
      'Know exactly when to push and when to recover with science-based readiness scoring and sleep analysis.',
    color: 'from-fitness-amethyst to-purple-600',
    glow: 'shadow-glow-accent',
  },
  {
    icon: Target,
    title: 'Goal-Based Coaching',
    description:
      'Whether you want to build muscle, lose fat, or improve endurance — EsiFit builds your perfect plan.',
    color: 'from-fitness-rose to-pink-600',
    glow: 'shadow-glow-primary',
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description:
      'Beautiful charts, muscle heatmaps, and trend analysis that show you exactly where you are progressing.',
    color: 'from-brand-400 to-accent-400',
    glow: 'shadow-glow-accent',
  },
];

/* ─── Calculators Data ─── */
const calculators = [
  { name: 'BMR', label: 'Basal Metabolic Rate', icon: Flame },
  { name: 'TDEE', label: 'Total Daily Energy Expenditure', icon: Activity },
  { name: '1RM', label: 'One-Rep Max', icon: Dumbbell },
  { name: 'Body Fat', label: 'Body Fat Percentage', icon: Target },
  { name: 'Macros', label: 'Macro Split Optimizer', icon: Apple },
  { name: 'Ideal Weight', label: 'Ideal Body Weight', icon: Heart },
];

/* ─── Blog Posts Data ─── */
const blogPosts = [
  {
    category: 'Training',
    title: 'The Science of Progressive Overload: A Complete Guide',
    excerpt:
      'Learn how to systematically increase your training volume and intensity for continuous muscle growth.',
    date: 'Mar 15, 2026',
    readTime: '8 min read',
    image: null,
  },
  {
    category: 'Nutrition',
    title: 'Macro Cycling: When and How to Adjust Your Intake',
    excerpt:
      'Master the art of timing your carbohydrate and protein intake around training sessions for optimal results.',
    date: 'Mar 12, 2026',
    readTime: '6 min read',
    image: null,
  },
  {
    category: 'Recovery',
    title: 'Sleep Optimization for Athletic Performance',
    excerpt:
      'Discover how small changes to your sleep routine can dramatically improve recovery and workout performance.',
    date: 'Mar 8, 2026',
    readTime: '5 min read',
    image: null,
  },
];

/* ─── Stats Data ─── */
const stats = [
  { value: 50000, label: 'Active Members', suffix: '+' },
  { value: 250000, label: 'Workouts Logged', suffix: '+' },
  { value: 98, label: 'Satisfaction Rate', suffix: '%' },
  { value: 16, label: 'Free Calculators', suffix: '' },
];

/* ─── Pricing Data ─── */
const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Everything you need to start your fitness journey.',
    features: [
      'All 16 calculators (basic mode)',
      'Basic workout logging (3 routines)',
      'Nutrition tracking (meals only)',
      'Progress dashboard',
      'Community access',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$12',
    period: '/month',
    description: 'Unlock the full EsiFit experience.',
    features: [
      'Unlimited workout routines & sets',
      'AI-powered insights & coaching',
      'Advanced analytics & muscle heatmaps',
      'Unlimited nutrition logging + AI meals',
      'Daily Readiness Score',
      'Priority community support',
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
  },
  {
    name: 'VIP+',
    price: '$29',
    period: '/month',
    description: 'For serious athletes and coaches.',
    features: [
      'Everything in Premium, plus:',
      'AI custom program generation',
      'Voice-powered workout logging',
      'Video form analysis',
      'Client management (coaches)',
      'Custom branded dashboard',
      'API access for custom tools',
    ],
    cta: 'Go VIP+',
    popular: false,
  },
];

/* ─── Section Wrapper ─── */
function Section({
  id,
  children,
  className = '',
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-16 tablet:py-24 desktop:py-32 ${
        dark ? 'bg-[rgb(var(--surface-raised))]' : ''
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ══════════════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white dark:from-brand-950/30 dark:via-surface-dark-base dark:to-surface-dark-base" />
      <div
        className="absolute inset-0 bg-hero-glow dark:bg-hero-glow-dark pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl" />
      <FloatingParticles />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div className="section-container relative z-10" style={{ y, opacity }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge variant="success" size="md" className="gap-1.5">
              <Sparkles size={14} />
              AI-Powered Fitness Ecosystem
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-display-sm tablet:text-display-md desktop:text-display font-heading font-bold leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your{' '}
            <span className="text-gradient">Body&apos;s Potential</span>
            <br />
            <span className="text-[rgb(var(--text-primary))]">
              Powered by Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-body-lg tablet:text-body-lg text-[rgb(var(--text-secondary))] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            EsiFit combines premium workout tracking, AI coaching, nutrition intelligence,
            and advanced analytics into one seamless ecosystem. Stop guessing — start
            transforming.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col mobile:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="gradient-glow" size="xl" icon={<Zap size={18} />}>
              Start Your Transformation
            </Button>
            <Button variant="secondary" size="xl" icon={<Heart size={18} />}>
              Explore Features
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex flex-col items-center gap-3 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[rgb(var(--surface-base))] bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-body-sm text-[rgb(var(--text-tertiary))]">
              <span className="font-semibold text-[rgb(var(--text-primary))]">50,000+</span>{' '}
              active members and growing
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-caption text-[rgb(var(--text-tertiary))]">Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-[rgb(var(--text-tertiary))] flex justify-center p-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[rgb(var(--text-tertiary))]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FEATURES SECTION
   ══════════════════════════════════════════════ */
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section id="features" dark>
      <div className="section-container space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            label="Features"
            title="Everything you need to transform"
            description="From AI coaching to advanced analytics — EsiFit is the last fitness tool you'll ever need."
          />
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6"
          variants={staggerChildren}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card variant="interactive" padding="lg" className="group h-full">
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-sm bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-h4 font-heading">{feature.title}</h3>
                  <p className="text-body-md text-[rgb(var(--text-secondary))] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   STATS SECTION
   ══════════════════════════════════════════════ */
function StatsSection() {
  return (
    <Section className="!py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 desktop:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCounter
                target={stat.value}
                duration={1200}
                suffix={stat.suffix}
                className="text-data-lg tablet:text-data-lg font-heading font-bold text-gradient"
              />
              <p className="text-body-sm text-[rgb(var(--text-secondary))]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   CALCULATORS PREVIEW SECTION
   ══════════════════════════════════════════════ */
function CalculatorsSection() {
  return (
    <Section id="calculators" dark>
      <div className="section-container space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Calculators"
            title="Science-based fitness calculators"
            description="16 powerful calculators to help you optimize every aspect of your training and nutrition — all free to use."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-6 gap-4"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {calculators.map((calc, index) => (
            <motion.div key={index} variants={scaleFade}>
              <Card
                variant="interactive"
                padding="md"
                className="flex flex-col items-center text-center gap-3 h-full group"
              >
                <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                  <calc.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-body-sm font-semibold">{calc.name}</p>
                  <p className="text-caption text-[rgb(var(--text-tertiary))] mt-0.5">
                    {calc.label}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="secondary" size="lg" icon={<ArrowRight />} iconPosition="right">
            View All 16 Calculators
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   BLOG PREVIEW SECTION
   ══════════════════════════════════════════════ */
function BlogSection() {
  return (
    <Section id="blog">
      <div className="section-container space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Blog"
            title="Evidence-based fitness insights"
            description="Deep dives into training science, nutrition strategies, and recovery protocols — written by experts, backed by research."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 tablet:grid-cols-3 gap-6"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogPosts.map((post, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card variant="interactive" padding="none" className="group h-full overflow-hidden">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-brand-100 via-accent-50 to-brand-50 dark:from-brand-950/30 dark:via-accent-950/20 dark:to-surface-dark-overlay flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-brand-500" />
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-caption text-[rgb(var(--text-tertiary))]">
                    <Badge variant="info" size="sm">
                      {post.category}
                    </Badge>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-h4 font-heading group-hover:text-brand-500 transition-colors duration-[var(--duration-fast)]">
                    {post.title}
                  </h3>
                  <p className="text-body-sm text-[rgb(var(--text-secondary))] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="ghost" size="lg" icon={<ChevronRight />} iconPosition="right">
            Read All Articles
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   PRICING SECTION
   ══════════════════════════════════════════════ */
function PricingSection() {
  return (
    <Section id="pricing" dark>
      <div className="section-container space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            label="Pricing"
            title="Start free, upgrade when you're ready"
            description="No hidden fees, no surprises. All core calculators are free forever."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 tablet:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeUp} className="flex">
              <Card
                variant={plan.popular ? 'glass-elevated' : 'default'}
                padding="lg"
                className={`relative flex flex-col w-full ${
                  plan.popular ? 'border-brand-500/30 ring-1 ring-brand-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="success" size="sm" className="gap-1">
                      <Star size={12} />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-h4 font-heading">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-display-sm font-heading font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-body-md text-[rgb(var(--text-secondary))]">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-body-sm text-[rgb(var(--text-secondary))]">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className="mt-0.5 text-brand-500 flex-shrink-0"
                      />
                      <span className="text-body-sm text-[rgb(var(--text-secondary))]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button
                    variant={plan.popular ? 'gradient-glow' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   CTA SECTION
   ══════════════════════════════════════════════ */
function CTASection() {
  return (
    <Section className="!py-20">
      <div className="section-container">
        <GlassCard className="relative overflow-hidden p-8 tablet:p-12 desktop:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Badge variant="success" size="md" className="gap-1.5">
                <Sparkles size={14} />
                Start Free — No Credit Card Required
              </Badge>
            </motion.div>

            <motion.h2
              className="text-h2 tablet:text-h1 font-heading font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to transform your fitness?
            </motion.h2>

            <motion.p
              className="text-body-lg text-[rgb(var(--text-secondary))] max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join 50,000+ members who have already elevated their training with EsiFit.
            </motion.p>

            <motion.div
              className="flex flex-col mobile:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="gradient-glow" size="xl" icon={<Zap size={18} />}>
                Start Your Free Account
              </Button>
              <Button variant="ghost" size="xl" icon={<Heart size={18} />}>
                Learn More
              </Button>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   LANDING PAGE (MAIN EXPORT)
   ══════════════════════════════════════════════ */
export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CalculatorsSection />
      <BlogSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
