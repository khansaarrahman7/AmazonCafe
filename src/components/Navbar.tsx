import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Coffee, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Menu', href: '#menu' },
    { label: 'Offers', href: '#offers' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#140e0b] border-b border-[#2a1c14] text-[12px] text-stone-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Sherpur Sadar, Sherpur, Bangladesh
            </span>
            <span className="flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Open Daily: 9:00 AM – 11:30 PM
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Specialty Arabica & Fresh Gourmet Bites</span>
            <span>·</span>
            <a
              href="mailto:khansaarrahman7@gmail.com"
              className="text-amber-400/90 hover:text-amber-300 hover:underline transition-colors"
            >
              khansaarrahman7@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar adhering to 3-zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0b09]/95 backdrop-blur-md shadow-xl shadow-black/40 border-b border-[#2d1e16]'
            : 'bg-[#0f0b09]/80 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark with subtle botanical/coffee emblem */}
          <a
            href="#home"
            className="flex items-center gap-3 text-stone-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/30 via-amber-800/20 to-transparent border border-amber-500/40 flex items-center justify-center shadow-inner group-hover:border-amber-400 transition-colors">
              <Coffee className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-amber-100 block leading-tight">
                AMAZON CAFE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-amber-400/80 uppercase block">
                Sherpur · Bangladesh
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-400/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action (Cart Drawer + Order Now) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              type="button"
              className="relative p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 transition-all"
              aria-label="View Order Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md hover:shadow-amber-500/20 transition-all whitespace-nowrap shrink-0 active:scale-95"
            >
              Order Now
            </a>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800/80 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#140e0b]/98 border-b border-amber-950/60 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-stone-200 hover:text-amber-400 transition-colors py-1.5 border-b border-stone-800/50"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs uppercase tracking-wider font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
              >
                Explore Full Menu
              </a>
              <div className="text-xs text-stone-400 flex flex-col gap-1 pt-1">
                <span>📍 Sherpur Sadar, Sherpur, Bangladesh</span>
                <span>✉️ khansaarrahman7@gmail.com</span>
                <span>⏰ 9:00 AM – 11:30 PM Everyday</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
