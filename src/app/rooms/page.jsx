import RoomCard from '@/components/RoomCard';
import RoomFilter from '@/components/RoomFilter';
import { getAllRooms } from '@/lib/data';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'StudyNook – Available Rooms',
};

const AllRoomsPage = async ({ searchParams }) => {
  const params = await searchParams;
  const allRooms = await getAllRooms(params);

  return (
    <div className="py-12 space-y-8 min-h-[80vh]">
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold text-[#1e1108] dark:text-white">All Study Rooms</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Browse the full catalog. Filter by amenity, price, or search by name.
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-8 items-start">
        <RoomFilter/>

        <div className="flex-grow w-full">
          {allRooms && allRooms.length > 0 ? (
            <RoomCard allRooms={allRooms} />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-150 dark:border-slate-800 p-16 text-center shadow-lg space-y-4 w-full">
              <span className="text-6xl block">🔍</span>
              <h2 className="text-2xl font-black text-[#1e1108] dark:text-white">No Study Rooms Found</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
                We couldn't find any rooms matching your search options. Try clearing filters or updating your keywords!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
