import BookingModal from '@/components/BookingModal';
import OwnerActions from '@/components/OwnerActions';
import { getRoomById } from '@/lib/data';
import { ArrowLeft, Layers, Users, DollarSign } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/lib/auth';

const formatDate = dateStr => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
};

const RoomDetailsPage = async ({ params }) => {
  // BetterAuth server-side session check
  const headersList = await headers();
  let user = null;
  try {
    const session = await auth.api.getSession({ headers: headersList });
    user = session?.user ?? null;
  } catch (e) {
    console.error('Error fetching session in room details:', e);
  }


  const { roomId } = await params;
  const room = await getRoomById(roomId);

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-800">
        <h2 className="text-2xl font-bold text-[#1e1108]">Room not found</h2>
        <Link
          href="/rooms"
          className="mt-4 text-[#b5622a] hover:underline font-bold"
        >
          Return to Rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    image,
    floor,
    capacity,
    amenities = [],
    description,
    hourlyRate,
    bookingCount = 0,
    createdAt,
    ownerImage,
    ownerName,
    ownerEmail,
  } = room;

  return (
    <div className="w-full pb-16 pt-4 text-[#5c5654] dark:text-slate-300">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#b5622a] dark:text-slate-450 dark:hover:text-orange-400 transition-all duration-300 text-sm font-semibold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left side: Image & Main details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full h-[300px] sm:h-[450px] overflow-hidden rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-102"
              priority
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#1e1108] dark:text-white tracking-tight">
                {name}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-[#b5622a] dark:text-orange-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b5622a] dark:bg-orange-450 animate-pulse"></span>
                {bookingCount} bookings
              </span>
            </div>
            <p className="font-semibold text-[#b5622a] dark:text-orange-400 mt-2 text-lg">
              Listed {formatDate(createdAt)}
            </p>
          </div>

          <p className="text-[#5c5654] dark:text-slate-300 leading-relaxed text-[1.05rem]">
            {description}
          </p>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-serif font-bold text-xl text-[#1e1108] dark:text-white mb-2">
              Amenities
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/30 dark:border-orange-900/30 px-4 py-2 rounded-full text-sm text-[#5c5654] dark:text-slate-300 font-semibold transition-all hover:border-[#b5622a]/30 hover:text-[#b5622a] dark:hover:text-orange-455"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Booking and Owner info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Booking Card */}
          <div className="bg-white dark:bg-slate-900 border border-orange-100/50 dark:border-orange-900/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-orange-950/5">
            <div className="flex justify-between items-baseline">
              <span className="text-4xl font-bold text-[#b5622a] dark:text-orange-405">
                ${hourlyRate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-[#b5622a] dark:text-orange-300">
                per hour
              </span>
            </div>

            <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6 text-[#5c5654] dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#b5622a]/70 dark:text-[#b5622a]/80" />
                <span className="text-sm font-semibold">{floor}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#b5622a]/70 dark:text-[#b5622a]/80" />
                <span className="text-sm font-semibold">
                  Up to {capacity} {capacity === 1 ? 'person' : 'people'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-[#b5622a] dark:text-orange-450" />
                <span className="text-sm font-semibold">
                  {bookingCount} total bookings
                </span>
              </div>
            </div>

            {user && room.ownerId && (room.ownerId.toString() === user._id?.toString() || room.ownerId.toString() === user.id?.toString()) ? (
              <OwnerActions room={room} />
            ) : (
              <BookingModal room={room} currentUser={user} />
            )}
          </div>

          {/* Owner Card */}
          <div className="bg-white dark:bg-slate-900 border border-orange-100/50 dark:border-orange-900/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl shadow-orange-950/5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              LISTED BY
            </p>
            <div className="flex items-center gap-4">
              {ownerImage ? (
                <Image
                  src={ownerImage}
                  alt={ownerName}
                  width={50}
                  height={50}
                  className="rounded-full border border-orange-100 dark:border-slate-800 object-cover"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-orange-50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-[#b5622a] dark:text-orange-300 flex items-center justify-center font-bold text-lg">
                  {ownerName ? ownerName[0].toUpperCase() : 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold text-[#1e1108] dark:text-white text-md truncate leading-snug">
                  {ownerName || 'Owner Name'}
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-450 truncate leading-snug mt-0.5">
                  {ownerEmail || 'owner@gmail.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
