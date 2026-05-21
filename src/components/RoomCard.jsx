import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RoomCard = ({ allRooms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {allRooms.map(room => (
        <div
          key={room._id}
          className="w-full flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 h-full"
        >
          <div className="relative h-56 w-full">
            <Image
              fill
              className="object-cover"
              src={room?.image}
              alt={room?.name}
            />
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <span className="inline-block self-start px-3 py-1.5 text-xs font-bold rounded-xl bg-orange-50 dark:bg-orange-950/20 text-[#b5622a] mb-4 uppercase tracking-wider">
              {room?.floor}
            </span>

            <h3 className="text-xl font-bold mb-2 text-[#1e1108] dark:text-white line-clamp-1">{room?.name}</h3>

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {room?.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {room?.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#b5622a]/10 dark:bg-[#b5622a]/20 text-[#b5622a] dark:text-[#f8d0b5]"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6 mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/60">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Max Capacity: <span className="text-[#1e1108] dark:text-white font-black">{room?.capacity}</span></p>
              <p className="text-lg font-black text-[#b5622a]">
                ${room?.hourlyRate}/hr
              </p>
            </div>

            <Link href={`/rooms/${room._id}`} className="w-full block">
              <Button className="w-full bg-[#b5622a] hover:bg-[#a15323] text-white py-3.5 rounded-2xl font-bold transition-all cursor-pointer duration-300 hover:scale-[1.01] active:scale-[0.99] border-none">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomCard
