import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Sherpur Sadar',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verifiedVisit: true,
    };

    onAddReview(newRev);
    setName('');
    setLocation('');
    setComment('');
    setRating(5);
    setModalOpen(false);

    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 relative bg-[#0e0a08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Overall Score Breakdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sherpur Community Love</span>
              <span aria-hidden="true">·</span>
              <span>Customer Stories</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Words From Our Guests
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl">
              See why coffee connoisseurs, students, professionals, and families in Sherpur make AMAZON CAFE their daily destination.
            </p>
          </div>

          {/* Rating Summary Card & Write Review Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
            <div className="flex items-center gap-3">
              <span className="font-serif-luxury text-4xl font-bold text-amber-400 tabular-nums">
                4.9
              </span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-stone-400 mt-0.5 block">
                  Based on 180+ guest ratings
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Share Experience</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-xl space-y-4"
            >
              <div className="space-y-3">
                {/* Star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500">{rev.date}</span>
                </div>

                {/* Comment quote */}
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed italic">
                  “{rev.comment}”
                </p>
              </div>

              {/* Reviewer identity */}
              <div className="flex items-center gap-3 pt-3 border-t border-stone-800/60">
                <div className="w-9 h-9 rounded-full bg-amber-900/30 border border-amber-600/40 flex items-center justify-center text-amber-300 font-bold text-xs uppercase">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-stone-200">
                      {rev.name}
                    </span>
                    {rev.verifiedVisit && (
                      <span title="Verified Sherpur Cafe Guest">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500 block">
                    {rev.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small disclaimer notice */}
        <div className="mt-8 text-center text-xs text-stone-500">
          *Sample customer reviews shown until official Google / social reviews are synchronized.
        </div>

        {/* Modal: Write a Review */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-stone-900 border border-amber-900/60 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <h3 className="font-serif-luxury text-xl font-bold text-amber-200">
                  Review Amazon Cafe
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Rating selection */}
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-stone-300 font-medium ml-2">
                      {rating} out of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Ahmed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Your Location in Sherpur
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sherpur Sadar / College Road"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Your Experience & Feedback
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the coffee, taste, service or ambiance..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-stone-100 placeholder:text-stone-600 focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 font-semibold text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 uppercase tracking-wider font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Feedback confirmation toast */}
        {submittedToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-stone-950 px-5 py-3 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Thank you! Your review has been added.</span>
          </div>
        )}

      </div>
    </section>
  );
};
