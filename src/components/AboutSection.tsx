import React from 'react';
import { Coffee, MapPin, Users, Wifi, Sparkles, CheckCircle2 } from 'lucide-react';
import cafeInteriorImg from '../assets/images/cafe_interior_luxury_1791959467799.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden bg-[#0e0a08]/90">
      {/* Subtle border line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout: Interior Photography on one side, Narrative & Highlights on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Photography of Cafe Interior */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl shadow-black/80 group">
              <img
                src={cafeInteriorImg}
                alt="Amazon Cafe cozy interior, espresso bar and seating in Sherpur Sadar"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Float badge at bottom of photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-amber-800/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                      Our Living Space
                    </p>
                    <p className="text-sm font-medium text-stone-200">
                      Sherpur Sadar · Cozy Booths & Ambient Lighting
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Wifi className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative accent element */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Column: Story & Introduction */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span>Our Story & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Sherpur Sadar</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight text-balance">
              Welcome to AMAZON CAFE
            </h2>

            {/* Narrative text */}
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Founded with a passion for world-class coffee culture, <strong className="text-amber-200 font-medium">AMAZON CAFE</strong> brings a refined, cinematic cafe retreat to the heart of Sherpur Sadar. We believe that a true cup of coffee is an art form—from the meticulous roasting of premium beans to the gentle pour of velvety microfoam.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Step inside and unwind in our plush leather booths beneath warm Edison pendants. Whether you’re meeting close friends, discussing projects, or enjoying a serene personal escape with a novel, our warm hospitality, hand-crafted brews, and freshly prepared gourmet kitchen offerings make every visit unforgettable.
            </p>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/60">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">Artisanal Sourcing</h4>
                  <p className="text-xs text-stone-400">Selected Arabica beans roasted with precision</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/60">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">Scratch Kitchen</h4>
                  <p className="text-xs text-stone-400">Gourmet burgers, truffle cakes & fresh bites</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/60">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">Community Gathering</h4>
                  <p className="text-xs text-stone-400">A peaceful sanctuary for the people of Sherpur</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-stone-900/60 border border-stone-800/60">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">Work & Relax Ready</h4>
                  <p className="text-xs text-stone-400">Comfortable seating, outlets & fast Wi-Fi</p>
                </div>
              </div>
            </div>

            {/* Direct Call to Action */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#reservation"
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow hover:shadow-amber-400/20"
              >
                Reserve a Table
              </a>
              <span className="text-xs text-stone-400">
                Or walk in any day from 9:00 AM to 11:30 PM
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
