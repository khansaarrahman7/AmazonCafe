import React from 'react';
import { ArrowRight, Sparkles, Coffee, Award, ShieldCheck, Heart } from 'lucide-react';
import heroCoffeeCupImg from '../assets/images/hero_coffee_cup_1791959467645.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Background radial gradient warmth */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-800/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand, Tagline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Location & Brand Kicker (No Pill Sandwich, clean unboxed metadata with separators) */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-400 tracking-widest uppercase">
              <span className="w-6 h-[1px] bg-amber-500/60 hidden sm:inline-block" />
              <span>Sherpur Sadar</span>
              <span aria-hidden="true" className="text-amber-500/50">·</span>
              <span>Boutique Cafe & Roastery</span>
              <span aria-hidden="true" className="text-amber-500/50">·</span>
              <span>Est. in Sherpur</span>
            </div>

            {/* Main Heading with luxury serif and subtle gold gradient text */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              AMAZON <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">CAFE</span>
            </h1>

            {/* Tagline */}
            <p className="font-serif-luxury text-xl sm:text-2xl text-amber-200/90 italic tracking-wide">
              “Taste the Moment. Feel the Magic.”
            </p>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Discover your perfect coffee, delicious bites and a relaxing cafe experience in Sherpur. From masterfully crafted espresso to decadent desserts and cozy ambient seating, every sip tells a story.
            </p>

            {/* Two Attractive Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold tracking-wider uppercase text-amber-200 hover:text-white bg-stone-900/80 hover:bg-stone-800/90 border border-amber-900/60 hover:border-amber-500/60 rounded-xl backdrop-blur-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
              </a>
            </div>

            {/* Quiet metadata credentials (no pill badges) */}
            <div className="pt-4 border-t border-stone-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-stone-400">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Coffee className="w-4 h-4 text-amber-400" />
                100% Arabica Beans
              </span>
              <span aria-hidden="true" className="text-stone-600 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Award className="w-4 h-4 text-amber-400" />
                Artisan Baristas
              </span>
              <span aria-hidden="true" className="text-stone-600 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Premium Sherpur Spot
              </span>
            </div>
          </div>

          {/* Right Column: Large Cinematic Coffee Cup Visual with Animated Steam & Beans */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 via-amber-500/10 to-transparent rounded-3xl blur-2xl transform scale-95 animate-glow" />

            {/* Coffee Frame Container */}
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl shadow-black/80 bg-stone-950 group">
              
              {/* Cinematic Coffee Image */}
              <img
                src={heroCoffeeCupImg}
                alt="Artisanal freshly pulled espresso with crema at Amazon Cafe Sherpur"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gentle Vignette & Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08] via-transparent to-black/20 pointer-events-none" />

              {/* Animated Rising Steam Wisps (CSS Keyframe Animations) */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-44 pointer-events-none overflow-hidden">
                <div className="absolute bottom-2 left-6 w-12 h-20 rounded-full bg-amber-200/15 blur-lg animate-steam" />
                <div className="absolute bottom-0 left-14 w-10 h-24 rounded-full bg-amber-100/20 blur-md animate-steam-delay-1" />
                <div className="absolute bottom-4 left-10 w-14 h-20 rounded-full bg-amber-300/10 blur-xl animate-steam-delay-2" />
              </div>

              {/* Floating Coffee Beans Overlay Elements */}
              <div className="absolute -top-3 -right-3 w-10 h-10 pointer-events-none animate-bean">
                <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
                  <ellipse cx="20" cy="20" rx="14" ry="10" transform="rotate(-30 20 20)" fill="#341f12" />
                  <path d="M 12 25 Q 20 18 28 15" stroke="#160c07" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              <div className="absolute bottom-16 -left-3 w-8 h-8 pointer-events-none animate-bean-alt">
                <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-md">
                  <ellipse cx="20" cy="20" rx="13" ry="9" transform="rotate(25 20 20)" fill="#422817" />
                  <path d="M 13 16 Q 20 20 27 24" stroke="#1c0f08" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              {/* Bottom Subtle Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-900/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                    Signature Roast
                  </p>
                  <p className="text-sm font-medium text-stone-200">
                    Freshly Ground Arabica Espresso
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-400 block">Sample Price</span>
                  <span className="font-serif-luxury text-lg font-bold text-amber-400 tabular-nums">
                    ৳140
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Feature Strip below the Hero Split */}
        <div className="mt-16 pt-8 border-t border-stone-800/70 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 text-amber-400 shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Single-Origin Roast</h4>
              <p className="text-xs text-stone-400 mt-0.5">Dialed in fresh every single morning</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Cozy Ambience</h4>
              <p className="text-xs text-stone-400 mt-0.5">Warm lighting, Wi-Fi & plush seats</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Gourmet Kitchen</h4>
              <p className="text-xs text-stone-400 mt-0.5">Burgers, desserts & artisan tea</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-stone-900/90 border border-stone-800 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Sherpur Hospitality</h4>
              <p className="text-xs text-stone-400 mt-0.5">Warm, courteous and attentive</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
