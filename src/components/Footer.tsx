import React from 'react';
import { Coffee, MapPin, Mail, Phone, Clock, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090705] border-t border-amber-950/60 pt-16 pb-12 relative z-10 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold text-white tracking-wider block">
                  AMAZON CAFE
                </span>
                <span className="text-[10px] tracking-[0.2em] text-amber-400 uppercase">
                  Sherpur Sadar · Bangladesh
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              “Taste the Moment. Feel the Magic.” Bringing specialty Arabica roasts, handcrafted burgers, and luxury dining moments to Sherpur.
            </p>

            <div className="space-y-1.5 pt-1 text-stone-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sherpur Sadar, Sherpur, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:khansaarrahman7@gmail.com"
                  className="hover:text-amber-300 underline font-mono"
                >
                  khansaarrahman7@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Open Everyday: 9:00 AM – 11:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold uppercase tracking-wider text-amber-200">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-amber-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  About Our Cafe
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">
                  Our Menu (7 Categories)
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-amber-300 transition-colors">
                  Featured Offers
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  Visual Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Menu Highlights */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold uppercase tracking-wider text-amber-200">
              Specialties
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>Single-Origin Espresso</li>
              <li>Velvet Swan Latte</li>
              <li>18-hr Iced Cold Brew</li>
              <li>Sherpur Mint Honey Cooler</li>
              <li>Prime Gourmet Brioche Burger</li>
              <li>Gold Leaf Truffle Cake</li>
            </ul>
          </div>

          {/* Visit & Connect */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-sm font-semibold uppercase tracking-wider text-amber-200">
              Reservations
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Book your cozy booth or order directly via WhatsApp for quick takeaway.
            </p>
            <div className="pt-1 flex flex-col gap-2">
              <a
                href="#reservation"
                className="px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Book a Table
              </a>
              <a
                href="https://wa.me/?text=Hello%20Amazon%20Cafe%20Sherpur"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900 rounded-lg transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} AMAZON CAFE. All rights reserved. Sherpur Sadar, Sherpur, Bangladesh.
          </div>

          <div className="flex items-center gap-6">
            <span>Contact: khansaarrahman7@gmail.com</span>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
