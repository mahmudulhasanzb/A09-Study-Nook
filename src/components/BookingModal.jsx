'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const TIME_SLOTS = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00"
];

const parseHourlyRate = (rate) => {
  if (typeof rate === 'number') return rate;
  if (!rate) return 0;
  const clean = rate.toString().replace(/[^0-9.]/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};

const BookingModal = ({ room, currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!isOpen || !room?._id || !date) return;

    const fetchBookedSlots = async () => {
      try {
        const res = await fetch(`/api/server/rooms/${room._id}/booked-slots?date=${date}`);
        if (res.ok) {
          const data = await res.json();
          setBookedSlots(data);
          // Clear selected slots that are now booked
          setSelectedSlots(prev => prev.filter(slot => !data.includes(slot)));
        }
      } catch (err) {
        console.error('Error fetching booked slots:', err);
      }
    };

    fetchBookedSlots();
  }, [isOpen, date, room?._id]);

  const handleBookNowClick = () => {
    if (!currentUser) {
      toast.error("Please login to book a room");
      router.push('/login');
      return;
    }
    const isOwner = room.ownerId && (room.ownerId.toString() === currentUser._id?.toString() || room.ownerId.toString() === currentUser.id?.toString());
    if (isOwner) {
      toast.error("You cannot book your own room!");
      return;
    }
    setIsOpen(true);
  };

  const toggleSlot = (slot) => {
    if (bookedSlots.includes(slot)) return; // Already booked

    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one time slot');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/server/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room._id,
          date,
          slots: selectedSlots,
        }),
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      toast.success(data.message || 'Booking confirmed successfully!');
      setIsOpen(false);
      setSelectedSlots([]);
      router.refresh(); // Refresh page to update booking count
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rate = parseHourlyRate(room?.hourlyRate);
  const totalCost = selectedSlots.length * rate;
  const isOwner = currentUser && room?.ownerId && (room.ownerId.toString() === currentUser._id?.toString() || room.ownerId.toString() === currentUser.id?.toString());

  return (
    <>
      <button
        onClick={handleBookNowClick}
        disabled={isOwner}
        className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-md transition-all duration-300 active:scale-[0.98] border-none shadow-lg cursor-pointer ${
          isOwner
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shadow-none cursor-not-allowed'
            : 'bg-[#b5622a] hover:bg-[#a15323] text-white hover:shadow-orange-500/10'
        }`}
      >
        <Calendar className="w-5 h-5" />
        {isOwner ? 'Your Listing' : 'Book Now'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 space-y-6 overflow-hidden text-left">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-[#1e1108] dark:text-white">Book {room?.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Pick a date and hourly slots to lock your nook.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-[#5c5654] dark:text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-2 border-[#5c5654]/60 dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] outline-none p-3.5 pl-11 rounded-2xl transition-all font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800"
                  />
                  <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" /> Choose Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlots.includes(slot);

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => toggleSlot(slot)}
                        className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isBooked
                            ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/30 text-red-400 dark:text-red-450 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-[#b5622a] border-[#b5622a] text-white shadow-md'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-[#b5622a]/50 text-[#5c5654] dark:text-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Booking Pricing Summary */}
              <div className="p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Pricing Summary
                  </p>
                  <p className="text-sm text-[#5c5654] dark:text-slate-300 font-semibold">
                    {selectedSlots.length} slot{selectedSlots.length !== 1 && 's'} booked
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#b5622a] dark:text-orange-400">${totalCost}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block">Total Cost</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-1/3 py-3.5 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-300 font-bold rounded-2xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedSlots.length === 0}
                  className="w-2/3 py-3.5 bg-[#b5622a] hover:bg-[#a15323] text-white font-bold rounded-2xl shadow-xl shadow-[#b5622a]/15 transition-all active:scale-[0.98] disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingModal;
