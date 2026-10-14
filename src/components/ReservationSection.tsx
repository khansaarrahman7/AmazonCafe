import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, Check, Phone, Mail } from 'lucide-react';
import { TableReservation } from '../types';

export const ReservationSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !date) return;

    const reservation: TableReservation = {
      id: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      phone,
      email: email || 'khansaarrahman7@gmail.com',
      date,
      time,
      guests,
      specialRequests,
      createdAt: new Date().toLocaleTimeString(),
    };

    setConfirmedReservation(reservation);
  };

  return (
    <section id="reservation" className="py-20 md:py-28 relative bg-[#0b0806]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Reserve Your Moment</span>
              <span aria-hidden="true">·</span>
              <span>Sherpur Sadar</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Book a Table at Amazon Cafe
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Planning a quiet study session, a lively catchup with friends, or an intimate birthday celebration? Secure your preferred seating in advance and enjoy priority barista service.
            </p>

            <div className="space-y-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Operating Hours: 9:00 AM – 11:30 PM (All 7 Days)</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Booth seating, group tables & quiet study corners available</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900/60 border border-stone-800">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Reservations confirmed instantly to email & WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-stone-900/70 border border-amber-900/40 shadow-2xl backdrop-blur-md">
              <h3 className="font-serif-luxury text-xl font-bold text-amber-200 mb-6">
                Reserve Your Seating
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asif Rahman"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Time Slot *
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 focus:border-amber-400 outline-none"
                    >
                      <option value="10:00">10:00 AM (Morning Brew)</option>
                      <option value="12:00">12:00 PM (Lunch & Bites)</option>
                      <option value="15:00">03:00 PM (Afternoon Coffee)</option>
                      <option value="17:00">05:00 PM (Sunset Chill)</option>
                      <option value="19:00">07:00 PM (Evening Special)</option>
                      <option value="21:00">09:00 PM (Late Night Mood)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value) || 1)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 focus:border-amber-400 outline-none tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Window booth, anniversary dessert candle, quiet laptop corner"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                  >
                    Confirm Table Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Confirmation Modal */}
        {confirmedReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-stone-900 border border-amber-900/80 rounded-2xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
                <Check className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
                  Confirmation #{confirmedReservation.id}
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                  Table Confirmed!
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  We look forward to welcoming you to Amazon Cafe in Sherpur Sadar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-400">Guest:</span>
                  <span className="font-semibold text-stone-200">{confirmedReservation.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Date & Time:</span>
                  <span className="font-semibold text-amber-300">
                    {confirmedReservation.date} at {confirmedReservation.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Party Size:</span>
                  <span className="font-semibold text-stone-200">{confirmedReservation.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Contact:</span>
                  <span className="font-semibold text-stone-200">{confirmedReservation.phone}</span>
                </div>
                {confirmedReservation.specialRequests && (
                  <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-400">
                    <span className="text-amber-400/90 font-medium">Notes:</span> {confirmedReservation.specialRequests}
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`https://wa.me/?text=Hello%20Amazon%20Cafe%20Sherpur,%20I%20have%20booked%20Table%20${confirmedReservation.id}%20for%20${confirmedReservation.fullName}%20on%20${confirmedReservation.date}%20at%20${confirmedReservation.time}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Notify via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmedReservation(null)}
                  className="w-full py-2.5 text-xs font-semibold text-stone-400 hover:text-white"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
