import React, { useState, useMemo } from 'react';
import { Search, Plus, Sparkles, SlidersHorizontal, Edit2, RotateCcw, Check, ShoppingBag, Flame } from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { CATEGORIES } from '../data/menuData';

interface MenuSectionProps {
  menuItems: MenuItem[];
  onAddToCart: (
    item: MenuItem,
    customOptions?: {
      sugarLevel?: 'No Sugar' | 'Half Sugar' | 'Normal' | 'Extra Sweet';
      milkChoice?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'None (Black)';
      specialInstructions?: string;
    }
  ) => void;
  onUpdateItem: (updated: MenuItem) => void;
  onResetMenu: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  menuItems,
  onAddToCart,
  onUpdateItem,
  onResetMenu,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Customization state
  const [sugar, setSugar] = useState<'No Sugar' | 'Half Sugar' | 'Normal' | 'Extra Sweet'>('Normal');
  const [milk, setMilk] = useState<'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'None (Black)'>('Whole Milk');
  const [instructions, setInstructions] = useState('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSugar('Normal');
    setMilk('Whole Milk');
    setInstructions('');
  };

  const handleConfirmCustomize = () => {
    if (!customizingItem) return;
    const isDrink =
      customizingItem.category === 'Hot Coffee' ||
      customizingItem.category === 'Cold Coffee' ||
      customizingItem.category === 'Cappuccino & Latte' ||
      customizingItem.category === 'Tea & Refreshments';

    onAddToCart(customizingItem, {
      sugarLevel: isDrink ? sugar : undefined,
      milkChoice: isDrink ? milk : undefined,
      specialInstructions: instructions || undefined,
    });

    setAddedToast(`Added ${customizingItem.name} to order`);
    setTimeout(() => setAddedToast(null), 2500);
    setCustomizingItem(null);
  };

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedToast(`Added ${item.name} to order`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section id="menu" className="py-20 md:py-28 relative bg-[#0d0907]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Handcrafted Culinary Menu</span>
            <span aria-hidden="true">·</span>
            <span>Sherpur Sadar</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Artisanal Menu
          </h2>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Freshly pulled single-origin coffee, handcrafted refreshments, gourmet burgers and luxury desserts. All prices in Bangladeshi Taka (৳).
          </p>

          <div className="pt-1 flex items-center justify-center gap-4 text-xs text-stone-500">
            <span>*Sample cafe prices shown (editable for management)</span>
            <span>·</span>
            <button
              type="button"
              onClick={onResetMenu}
              className="inline-flex items-center gap-1 text-stone-400 hover:text-amber-400 transition-colors underline"
              title="Reset any price changes to default sample values"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search coffee, burger, cake..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick results counter */}
          <div className="text-xs text-stone-400 self-end md:self-center">
            Showing <strong className="text-amber-300 font-semibold">{filteredItems.length}</strong> items in Sherpur
          </div>
        </div>

        {/* 7 Category Tabs (Segmented Buttons with working handlers, no static pill spam) */}
        <div className="overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max p-1.5 bg-stone-950/80 rounded-xl border border-stone-900">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900'
              }`}
            >
              All Categories
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-stone-950/40 rounded-2xl border border-stone-800/80 p-8 space-y-3">
            <p className="text-stone-300 text-base">No menu items found matching "{searchQuery}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-stone-900/60 border border-stone-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20" />

                    {/* Top action row */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {item.isSignature ? (
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-200 bg-stone-950/90 backdrop-blur-md px-2 py-0.5 rounded border border-amber-900/50 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          Signature
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium tracking-wider uppercase text-stone-300 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 rounded-lg bg-stone-950/80 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-800 transition-colors"
                        title="Edit Price or Details"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Calorie or size info */}
                    {item.calories && (
                      <span className="absolute bottom-3 left-3 text-[11px] text-stone-400 bg-stone-950/80 backdrop-blur-sm px-2 py-0.5 rounded font-mono">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif-luxury text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-amber-400/80 pt-1">
                        <span>{item.tags.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Price and Order Buttons */}
                <div className="p-5 pt-0 border-t border-stone-800/60 mt-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                      Price
                    </span>
                    <span className="font-serif-luxury text-xl font-bold text-amber-400 tabular-nums">
                      ৳{item.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenCustomize(item)}
                      className="px-3 py-2 text-xs font-semibold text-amber-300 hover:text-white bg-stone-950/90 hover:bg-stone-800 border border-amber-900/50 hover:border-amber-400 rounded-lg transition-all"
                      title="Customize order (Sugar, Milk, Notes)"
                    >
                      Customize
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(item)}
                      className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-all active:scale-95 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Toast confirmation */}
        {addedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-stone-950 px-4 py-3 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2 animate-in slide-in-from-bottom-5">
            <Check className="w-4 h-4" />
            <span>{addedToast}</span>
          </div>
        )}

        {/* Modal: Customize Item (Sugar, Milk, Notes) */}
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-stone-900 border border-amber-900/60 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-amber-200">
                    Customize Order
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {customizingItem.name} · ৳{customizingItem.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Show drink options for beverage categories */}
              {(customizingItem.category === 'Hot Coffee' ||
                customizingItem.category === 'Cold Coffee' ||
                customizingItem.category === 'Cappuccino & Latte' ||
                customizingItem.category === 'Tea & Refreshments') && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Sugar Level
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {(['No Sugar', 'Half Sugar', 'Normal', 'Extra Sweet'] as const).map(
                        (level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setSugar(level)}
                            className={`p-2 rounded-lg border text-center transition-all ${
                              sugar === level
                                ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold'
                                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            {level}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                      Milk Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {(['Whole Milk', 'Oat Milk', 'Almond Milk', 'None (Black)'] as const).map(
                        (m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMilk(m)}
                            className={`p-2 rounded-lg border text-center transition-all ${
                              milk === m
                                ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold'
                                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                            }`}
                          >
                            {m}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  Special Notes / Preparation Request
                </label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g., Extra hot, mild ice, takeaway packaging..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block">Total</span>
                  <span className="font-serif-luxury text-xl font-bold text-amber-400">
                    ৳{customizingItem.price}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomizingItem(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmCustomize}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Edit Item Price & Details (For Cafe Owner) */}
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-stone-900 border border-amber-900/60 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-serif-luxury text-lg font-bold text-amber-200">
                  Edit Menu Item (Management)
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Item Name</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, name: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Price in Bangladeshi Taka (৳ BDT)
                  </label>
                  <input
                    type="number"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        price: Number(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-amber-300 font-bold text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, description: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateItem(editingItem);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
