import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/menuData';

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
  };

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex(
      (activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  return (
    <section id="gallery" className="py-20 md:py-28 relative bg-[#0b0806]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Visual Showcase</span>
            <span aria-hidden="true">·</span>
            <span>Amazon Cafe Atmosphere</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Cinematic Cafe Gallery
          </h2>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Take a visual tour through our artisanal coffee rituals, delicate barista art, sumptuous culinary creations, and cozy Sherpur ambience.
          </p>
        </div>

        {/* Masonry / Bento Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((item, index) => {
            // Give 1st and 4th items a slightly taller or featured aspect for visual interest
            const isFeatured = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-stone-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 ${
                  isFeatured ? 'sm:col-span-1 lg:row-span-1' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top category label */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-medium tracking-wider uppercase text-amber-300 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-amber-900/40">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-stone-950/70 text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                  </div>

                  {/* Caption on hover/bottom */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-1 mt-0.5 opacity-80 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {activeImageIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 transition-all z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-400 border border-stone-800 transition-all z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-amber-400 border border-stone-800 transition-all z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image and Caption Container */}
            <div
              className="max-w-4xl w-full flex flex-col items-center max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-amber-900/50 shadow-2xl max-h-[75vh]">
                <img
                  src={GALLERY_IMAGES[activeImageIndex].image}
                  alt={GALLERY_IMAGES[activeImageIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[75vh] object-contain bg-black"
                />
              </div>

              {/* Caption Bar */}
              <div className="mt-4 text-center space-y-1 max-w-xl">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                  {GALLERY_IMAGES[activeImageIndex].category} · Image {activeImageIndex + 1} of{' '}
                  {GALLERY_IMAGES.length}
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  {GALLERY_IMAGES[activeImageIndex].title}
                </h4>
                <p className="text-xs text-stone-300">
                  {GALLERY_IMAGES[activeImageIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
