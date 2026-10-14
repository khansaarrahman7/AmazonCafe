import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, MessageCircle, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative bg-[#0e0a08] overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <span>Find Us & Say Hello</span>
            <span aria-hidden="true">·</span>
            <span>Sherpur Sadar</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Contact AMAZON CAFE
          </h2>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            We are conveniently located in Sherpur Sadar, Sherpur, Bangladesh. Stop by for your daily brew or get in touch for custom catering, private events, or questions.
          </p>
        </div>

        {/* 2-Column Split: Direct Info & Location Card left, Inquiry Message Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Location */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Address Card */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">Cafe Location</h3>
                  <p className="text-sm text-stone-300">
                    Sherpur Sadar, Sherpur, Bangladesh
                  </p>
                  <p className="text-xs text-stone-500">
                    Central commercial zone with convenient parking & easy rickshaw access.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">Direct Email</h3>
                  <a
                    href="mailto:khansaarrahman7@gmail.com"
                    className="text-sm text-amber-300 hover:text-amber-200 underline block font-mono"
                  >
                    khansaarrahman7@gmail.com
                  </a>
                  <p className="text-xs text-stone-500">
                    For inquiries, catering, private bookings & feedback.
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/40 transition-all space-y-3">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-white">Cafe Timings</h3>
                  <p className="text-sm text-stone-200 font-medium">
                    Monday – Sunday: 9:00 AM – 11:30 PM
                  </p>
                  <p className="text-xs text-amber-400/80">
                    Kitchen serves warm food until 11:00 PM.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Quick Chat */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-stone-900/80 border border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">WhatsApp Direct Order</h4>
                    <p className="text-xs text-emerald-300/80">Instant cafe response in Sherpur</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/?text=Hello%20Amazon%20Cafe%20Sherpur,%20I%20would%20like%20to%20inquire%20about%20your%20menu%20and%20table%20seating."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-colors"
                >
                  Chat Now
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form & Stylized Map Pin */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Inquiry Form */}
            <div className="p-8 sm:p-10 rounded-3xl bg-stone-900/80 border border-stone-800 shadow-2xl backdrop-blur-md">
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Have a question, feedback, or custom party request? Drop a message directly to our Sherpur team.
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif-luxury text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-stone-300 max-w-sm mx-auto">
                    Thank you, {name || 'guest'}! Our team will respond to your email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shakil Khan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. shakil@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we assist you with coffee, events, or inquiries?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-sm text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Stylized Sherpur Location Visual Box */}
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    Sherpur Sadar Hub
                  </h4>
                  <p className="text-xs text-stone-400">
                    Coordinates: 25.0194° N, 90.0163° E · Sherpur, Mymensingh Division
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Sherpur+Sadar+Sherpur+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 underline whitespace-nowrap"
              >
                Open Google Maps ↗
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
