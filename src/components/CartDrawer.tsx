import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check, Tag, MessageCircle, Receipt } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'Dine-in' | 'Takeaway'>('Dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );

  const discountAmount = Math.round(subtotal * appliedDiscount);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'AMAZONCUP' || code === 'MAGICCOMBO' || code === 'EVENINGFEAST') {
      setAppliedDiscount(0.15); // 15% discount
      setDiscountMsg('15% Promo Discount Applied!');
    } else if (code === 'SHERPUR10') {
      setAppliedDiscount(0.10); // 10% discount
      setDiscountMsg('10% Sherpur Welcome Discount Applied!');
    } else {
      setDiscountMsg('Invalid code. Try AMAZONCUP or MAGICCOMBO');
      setAppliedDiscount(0);
    }
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    const itemList = items
      .map(
        (i) =>
          `• ${i.item.name} x${i.quantity} (৳${i.item.price * i.quantity})${
            i.sugarLevel ? ` [${i.sugarLevel}, ${i.milkChoice || ''}]` : ''
          }`
      )
      .join('%0A');

    const msg = `*AMAZON CAFE ORDER*%0A%0A*Customer:* ${customerName || 'Sherpur Guest'}%0A*Phone:* ${
      customerPhone || 'N/A'
    }%0A*Type:* ${orderType} ${orderType === 'Dine-in' ? `(${tableNumber})` : ''}%0A%0A*Items:*%0A${itemList}%0A%0A*Total Amount:* ৳${total} BDT%0A%0APlease prepare my order!`;

    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const handlePlaceOrderDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const confirmed = {
      orderId: `AMZ-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...items],
      total,
      subtotal,
      discountAmount,
      orderType,
      tableNumber: orderType === 'Dine-in' ? tableNumber : 'Takeaway Counter',
      customerName: customerName || 'Valued Guest',
      customerPhone: customerPhone || '017XXXXXXXX',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrderConfirmed(confirmed);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120c09] border-l border-amber-900/40 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Your Cafe Order
                </h3>
                <p className="text-xs text-stone-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in order bag
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: Order Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-lg text-stone-300">
                  Your order bag is empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our artisanal coffee, handcrafted burgers, and desserts to begin your culinary experience.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800/80 flex items-start gap-3 justify-between"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-stone-950 shrink-0 border border-stone-800"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-stone-100 truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="font-serif-luxury text-xs font-bold text-amber-400 tabular-nums">
                        ৳{cartItem.item.price} each
                      </p>

                      {/* Customization pills */}
                      {(cartItem.sugarLevel || cartItem.milkChoice || cartItem.specialInstructions) && (
                        <div className="text-[10px] text-stone-400 mt-1 space-y-0.5">
                          {cartItem.sugarLevel && <div>• Sugar: {cartItem.sugarLevel}</div>}
                          {cartItem.milkChoice && <div>• Milk: {cartItem.milkChoice}</div>}
                          {cartItem.specialInstructions && (
                            <div className="italic text-amber-300/70">
                              Note: {cartItem.specialInstructions}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.id, -1)}
                          className="p-1 rounded bg-stone-950 text-stone-400 hover:text-white border border-stone-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-200 w-5 text-center tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.id, 1)}
                          className="p-1 rounded bg-stone-950 text-stone-400 hover:text-white border border-stone-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between items-end h-16">
                      <span className="font-serif-luxury text-sm font-bold text-amber-300 tabular-nums">
                        ৳{cartItem.item.price * cartItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(cartItem.id)}
                        className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <div className="pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. AMAZONCUP)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs uppercase text-stone-200 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {discountMsg && (
                    <p
                      className={`text-[11px] mt-1.5 ${
                        appliedDiscount > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {discountMsg}
                    </p>
                  )}
                </div>

                {/* Order Type Toggle */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    Order Fulfillment
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setOrderType('Dine-in')}
                      className={`py-2 rounded-lg border text-center font-medium transition-all ${
                        orderType === 'Dine-in'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                          : 'bg-stone-950 border-stone-800 text-stone-400'
                      }`}
                    >
                      Dine-in Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('Takeaway')}
                      className={`py-2 rounded-lg border text-center font-medium transition-all ${
                        orderType === 'Takeaway'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                          : 'bg-stone-950 border-stone-800 text-stone-400'
                      }`}
                    >
                      Takeaway Counter
                    </button>
                  </div>
                </div>

                {/* Customer Details for Order */}
                <div className="space-y-2 pt-2 text-xs">
                  {orderType === 'Dine-in' && (
                    <div>
                      <label className="block text-stone-400 mb-1">Table Number</label>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 4 / Window Booth"
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:border-amber-400 outline-none"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Shakil"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:border-amber-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="017XXXXXXXX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer & Checkout Buttons */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-[#160e0a] space-y-4">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Subtotal:</span>
                  <span className="font-mono text-stone-200 tabular-nums">৳{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="font-mono tabular-nums">-৳{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-stone-800">
                  <span className="font-serif-luxury">Total Payable:</span>
                  <span className="font-serif-luxury text-xl text-amber-400 tabular-nums">
                    ৳{total} BDT
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handlePlaceOrderDirect}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Place Cafe Order (Get Receipt)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Instant Order Confirmation Receipt Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-stone-900 border border-amber-900/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
                Order Reference #{orderConfirmed.orderId}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Order Received!
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Our Sherpur baristas are preparing your freshly brewed order.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-400">Type:</span>
                <span className="font-semibold text-amber-300">
                  {orderConfirmed.orderType} · {orderConfirmed.tableNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Guest:</span>
                <span className="font-semibold text-stone-200">
                  {orderConfirmed.customerName} ({orderConfirmed.customerPhone})
                </span>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-1">
                {orderConfirmed.items.map((i: CartItem) => (
                  <div key={i.id} className="flex justify-between text-stone-300">
                    <span>
                      {i.item.name} x{i.quantity}
                    </span>
                    <span className="tabular-nums">৳{i.item.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-white">
                <span>Total:</span>
                <span className="text-amber-400 tabular-nums">৳{orderConfirmed.total} BDT</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setOrderConfirmed(null);
                  onClose();
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
