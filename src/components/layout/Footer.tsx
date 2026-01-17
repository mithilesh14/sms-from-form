import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { href: '/residences', label: t('nav.residences') },
    { href: '/short-term', label: t('nav.shortTerm') },
    { href: '/long-term', label: t('nav.longTerm') },
    { href: '/for-sale', label: t('nav.forSale') },
  ];

  const companyLinks = [
    { href: '/about', label: t('common.about') || 'About Us' },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-earth-charcoal text-earth-sand relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Main Footer */}
      <div className="container-xl section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block">
              <h3 className="font-serif text-3xl mb-6">
                <span className="font-light">Terra</span>
                <span className="font-semibold">Luxe</span>
              </h3>
            </Link>
            <p className="text-earth-sand/70 text-sm leading-relaxed mb-8 max-w-sm">
              Discover exceptional living spaces where natural beauty meets architectural excellence. 
              Our residences are crafted for those who appreciate timeless design.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full border border-earth-sand/20 flex items-center justify-center 
                             text-earth-sand/60 hover:text-primary hover:border-primary transition-colors duration-300"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Properties</h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-earth-sand/70 hover:text-earth-sand transition-colors duration-300 
                             inline-flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 
                                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 
                                           transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Company</h4>
            <nav className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-earth-sand/70 hover:text-earth-sand transition-colors duration-300 
                             inline-flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 
                                           group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 
                                           transition-all duration-300" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-primary mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:hello@terraluxe.com" 
                className="flex items-center gap-3 text-sm text-earth-sand/70 hover:text-earth-sand transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-earth-sand/20 flex items-center justify-center 
                                group-hover:border-primary group-hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                hello@terraluxe.com
              </a>
              
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-3 text-sm text-earth-sand/70 hover:text-earth-sand transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-earth-sand/20 flex items-center justify-center 
                                group-hover:border-primary group-hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                +1 (234) 567-890
              </a>
              
              <div className="flex items-start gap-3 text-sm text-earth-sand/70">
                <div className="w-10 h-10 rounded-full border border-earth-sand/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="pt-2">
                  123 Luxury Avenue<br />
                  Minneapolis, MN 55401
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-earth-sand/10">
        <div className="container-xl py-6 flex flex-col md:flex-row justify-between items-center gap-4 
                        text-xs text-earth-sand/50">
          <p>© {new Date().getFullYear()} TerraLuxe. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-earth-sand transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="hover:text-earth-sand transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}