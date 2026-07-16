import { Dumbbell, Heart, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Calculators', href: '#calculators' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
  ],
  Resources: [
    { label: 'Blog', href: '#blog' },
    { label: 'Guides', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Community', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@esifit.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--surface-border))] bg-[rgb(var(--surface-base))]">
      <div className="section-container py-12 tablet:py-16">
        <div className="grid grid-cols-2 tablet:grid-cols-4 gap-8 tablet:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 tablet:col-span-1 space-y-4">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-sm bg-gradient-cta flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-white" />
              </div>
              <span className="text-h4 font-heading font-bold tracking-tight">
                Esi<span className="text-brand-500">Fit</span>
              </span>
            </a>
            <p className="text-body-sm text-[rgb(var(--text-secondary))] leading-relaxed max-w-xs">
              Elevate your fitness journey with AI-powered insights, premium tracking, and a
              community that pushes you further.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--surface-raised))] transition-all duration-[var(--duration-fast)]"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-body-sm font-semibold uppercase tracking-wider text-[rgb(var(--text-primary))]">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--brand-primary))] transition-colors duration-[var(--duration-fast)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[rgb(var(--surface-border))] flex flex-col tablet:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-[rgb(var(--text-tertiary))]">
            &copy; {new Date().getFullYear()} EsiFit. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-body-sm text-[rgb(var(--text-tertiary))]">
            Made with <Heart size={14} className="text-fitness-rose" fill="currentColor" /> for
            every rep
          </div>
        </div>
      </div>
    </footer>
  );
}
