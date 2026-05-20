import { getAllRooms } from '@/lib/data';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AllRoomsPage = async () => {
  const allRooms = await getAllRooms();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {allRooms.map(room => (
        <div
          key={room._id}
          className="w-full fl ex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full"
        >
          <Image
            width={400}
            height={400}
            className="w-full h-56 object-cover"
            src={room?.image}
            alt={room?.name}
          />

          <div className="p-5 flex flex-col flex-grow">
            <span className="inline-block self-start px-3 py-1 text-sm font-medium rounded-full bg-[#b5622a]/80 text-white mb-3">
              {room?.floor}
            </span>

            <h3 className="text-xl font-bold mb-2">{room?.name}</h3>

            <p className="text-slate-600 text-sm leading-6 mb-4">
              {room?.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {room?.amenities.map((amenitie, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs rounded-full bg-[#b5622a]/20"
                >
                  {amenitie}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 mt-auto">
              <p className="text-sm text-slate-500">{room?.capacity}</p>
              <p className="text-lg font-bold text-[#b5622a]">
                {room?.hourlyRate}
              </p>
            </div>

            < Link href={`/rooms/${room._id}`} className="w-full block">
              <Button className="w-full bg-[#b5622a] hover:bg-[#a15323] text-white border border-[#b5622a] py-3 rounded-xl font-semibold transition-all cursor-pointer duration-300 hover:scale-101">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRoomsPage;
