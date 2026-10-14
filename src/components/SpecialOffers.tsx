import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Clock, Plus, Edit3 } from 'lucide-react';
import { SpecialOffer, MenuItem } from '../types';

interface SpecialOffersProps {
  offers: SpecialOffer[];
  onUpdateOffer: (updated: SpecialOffer) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  offers,
  onUpdateOffer,
  onAddToCart,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  const handleClaimOffer = (offer: SpecialOffer) => {
    // Construct a synthetic MenuItem to add directly to cart
    const comboItem: MenuItem = {
      id: offer.id,
      name: `${offer.title} (${offer.subtitle})`,
      category: 'Hot Coffee',
      price: offer.offerPrice,
      description: offer.description,
      image: offer.image,
      tags: ['Special Offer', offer.code],
      isSignature: true,
    };
    onAddToCart(comboItem);
  };

  return (
    <section id="offers" className="py-20 md:py-28 relative bg-[#0a0807]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Curated Cafe Promotions</span>
              <span aria-hidden="true">·</span>
              <span>Sherpur Sadar</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
              Featured Cafe Specials
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-xl">
              Handcrafted combinations designed to delight your palate at special seasonal prices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-500 italic">
              *Sample promotional offers (fully customizable)
            </span>
          </div>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const savings = offer.originalPrice - offer.offerPrice;
            return (
              <div
                key={offer.id}
                className="group relative rounded-2xl overflow-hidden bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                <div>
                  {/* Image Header with Scrim */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                    {/* Top Tag & Edit Button */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-200 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-900/60">
                        {offer.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingOffer(offer)}
                        className="p-1.5 rounded-lg bg-stone-950/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors"
                        title="Edit Offer Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Savings Tag */}
                    {savings > 0 && (
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60">
                        Save ৳{savings}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-serif-luxury text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-xs font-medium text-amber-400">
                        {offer.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Pricing Display */}
                    <div className="pt-2 flex items-baseline gap-3">
                      <span className="font-serif-luxury text-2xl font-bold text-amber-400 tabular-nums">
                        ৳{offer.offerPrice}
                      </span>
                      <span className="text-sm text-stone-500 line-through tabular-nums">
                        ৳{offer.originalPrice}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        (BDT)
                      </span>
                    </div>

                    {/* Validity metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                      <span>{offer.validUntil}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action & Coupon Code */}
                <div className="p-6 pt-0 space-y-3">
                  {/* Coupon Code Pill */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 text-xs">
                    <div className="flex items-center gap-2 text-stone-300">
                      <Tag className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono font-medium tracking-wider text-amber-200">
                        {offer.code}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Add Combo to Order */}
                  <button
                    type="button"
                    onClick={() => handleClaimOffer(offer)}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Claim & Add to Order</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Edit Offer Details for Cafe Owner */}
        {editingOffer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-stone-900 border border-amber-900/60 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-serif-luxury text-lg font-bold text-amber-200">
                  Edit Cafe Special Offer
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Offer Title
                  </label>
                  <input
                    type="text"
                    value={editingOffer.title}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, title: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Subtitle / Item Included
                  </label>
                  <input
                    type="text"
                    value={editingOffer.subtitle}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, subtitle: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">
                      Offer Price (৳ BDT)
                    </label>
                    <input
                      type="number"
                      value={editingOffer.offerPrice}
                      onChange={(e) =>
                        setEditingOffer({
                          ...editingOffer,
                          offerPrice: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-amber-300 font-bold focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-medium mb-1">
                      Original Price (৳ BDT)
                    </label>
                    <input
                      type="number"
                      value={editingOffer.originalPrice}
                      onChange={(e) =>
                        setEditingOffer({
                          ...editingOffer,
                          originalPrice: Number(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-400 line-through focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    value={editingOffer.code}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, code: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-amber-200 font-mono uppercase focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Validity Description
                  </label>
                  <input
                    type="text"
                    value={editingOffer.validUntil}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, validUntil: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateOffer(editingOffer);
                    setEditingOffer(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
