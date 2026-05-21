'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Calendar, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const MyBookingsTable = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/server/api/bookings', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelConfirm = async () => {
    if (!cancelTargetId) return;
    setIsCancelling(true);

    try {
      const res = await fetch(`/api/server/api/bookings/${cancelTargetId}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to cancel booking');
      }

      toast.success(data.message || 'Booking cancelled successfully!');
      setCancelTargetId(null);
      // Refresh list
      await fetchBookings();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b5622a]"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-16 text-center shadow-lg space-y-4">
        <span className="text-6xl block">📅</span>
        <h2 className="text-2xl font-black text-[#1e1108] dark:text-white">No Bookings Found</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
          You haven't booked any study rooms yet. Explore the listings to find your ideal study space!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider">Room</th>
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider">Date</th>
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider">Time</th>
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider">Cost</th>
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider">Status</th>
              <th className="p-5 text-sm font-bold text-[#1e1108] dark:text-white uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    {booking.roomDetails?.image && (
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0">
                        <Image
                          src={booking.roomDetails.image}
                          alt={booking.roomDetails.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-[#1e1108] dark:text-white text-base block">
                        {booking.roomDetails?.name || 'Study Room'}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-bold block">
                        Floor: {booking.roomDetails?.floor || 'N/A'}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-[#5c5654] dark:text-slate-300 font-medium text-sm">
                  {booking.date}
                </td>
                <td className="p-5 text-[#5c5654] dark:text-slate-300 font-medium text-sm">
                  <div className="flex flex-col gap-1">
                    {booking.slots.map((slot, i) => (
                      <span key={i} className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" /> {slot}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-5 font-bold text-[#1e1108] dark:text-white text-sm">
                  ${booking.totalCost}
                </td>
                <td className="p-5">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30'
                        : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-900/30'
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-5 text-right">
                  {booking.status === 'confirmed' ? (
                    <button
                      onClick={() => setCancelTargetId(booking._id)}
                      className="px-4 py-2 text-xs font-bold border-2 border-red-100 dark:border-red-950/30 hover:border-red-200 text-red-500 hover:text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-bold italic">Cancelled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancellation Confirmation Modal */}
      {cancelTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#1e1108] dark:text-white">Cancel Booking?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Are you sure you want to cancel this booking? This will immediately free up the time slots for other students.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancelTargetId(null)}
                className="w-1/2 py-3.5 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-2xl transition-all cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleCancelConfirm}
                className="w-1/2 py-3.5 bg-red-500 hover:bg-red-650 text-white font-bold rounded-2xl shadow-xl shadow-red-500/15 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsTable;
