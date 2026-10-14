import React, { useState, useEffect } from 'react';
import { CoffeeBackground } from './components/CoffeeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

import { MenuItem, CartItem, SpecialOffer, Review } from './types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_OFFERS,
  INITIAL_REVIEWS,
} from './data/menuData';

export default function App() {
  // Menu items state with local persistence
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_cafe_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Special offers state with local persistence
  const [offers, setOffers] = useState<SpecialOffer[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_cafe_offers');
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  // Reviews state with local persistence
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_cafe_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Shopping cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amazon_cafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amazon_cafe_menu', JSON.stringify(menuItems));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('amazon_cafe_offers', JSON.stringify(offers));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem('amazon_cafe_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('amazon_cafe_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    customOptions?: {
      sugarLevel?: 'No Sugar' | 'Half Sugar' | 'Normal' | 'Extra Sweet';
      milkChoice?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'None (Black)';
      specialInstructions?: string;
    }
  ) => {
    const cartItemId = `${item.id}-${customOptions?.sugarLevel || 'default'}-${
      customOptions?.milkChoice || 'default'
    }-${customOptions?.specialInstructions || 'none'}`;

    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === cartItemId);
      if (existing) {
        return prev.map((ci) =>
          ci.id === cartItemId ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          quantity: 1,
          sugarLevel: customOptions?.sugarLevel,
          milkChoice: customOptions?.milkChoice,
          specialInstructions: customOptions?.specialInstructions,
        },
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Menu item price & description updates
  const handleUpdateMenuItem = (updated: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleResetMenu = () => {
    setMenuItems(INITIAL_MENU_ITEMS);
    localStorage.removeItem('amazon_cafe_menu');
  };

  // Special offer updates
  const handleUpdateOffer = (updated: SpecialOffer) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === updated.id ? updated : o))
    );
  };

  // Reviews update
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0908] text-[#e8ded3] relative selection:bg-amber-500 selection:text-stone-950">
      {/* Full-screen animated coffee graphics canvas */}
      <CoffeeBackground />

      {/* Main page content wrapper */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <Navbar
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <AboutSection />

        {/* Special Offers Section */}
        <SpecialOffers
          offers={offers}
          onUpdateOffer={handleUpdateOffer}
          onAddToCart={handleAddToCart}
        />

        {/* Our Menu Section (7 categories, search, customize, editable sample prices) */}
        <MenuSection
          menuItems={menuItems}
          onAddToCart={handleAddToCart}
          onUpdateItem={handleUpdateMenuItem}
          onResetMenu={handleResetMenu}
        />

        {/* Visual Gallery Section */}
        <GallerySection />

        {/* Customer Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Table Reservation Section */}
        <ReservationSection />

        {/* Contact & Location Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
