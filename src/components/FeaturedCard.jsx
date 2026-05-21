import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCard = ({ featuredRooms }) => {
  return featuredRooms.map(room => (
    <div
      key={room._id}
      className="w-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100/50 dark:border-slate-800 transition duration-300 h-full"
    >
      <Image
        width={400}
        height={400}
        className="w-full h-56 object-cover"
        src={room?.image}
        alt={room?.name}
      />

      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block self-start px-3 py-1 text-sm font-medium rounded-full bg-[#b5622a] text-white mb-3">
          {room?.floor}
        </span>

        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{room?.name}</h3>

        <p className="text-slate-650 dark:text-slate-300 text-sm leading-6 mb-4">
          {room?.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {room?.amenities.map((amenitie, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-[#b5622a]/10 dark:bg-[#b5622a]/20 text-[#b5622a] dark:text-orange-300"
            >
              {amenitie}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4 mt-auto">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">{room?.capacity} Capacity</p>
          <p className="text-lg font-black text-[#b5622a]">${room?.hourlyRate}</p>
        </div>

        <Link href={`/rooms/${room._id}`} className="w-full block">
          <Button className="w-full bg-[#b5622a] hover:bg-[#a15323] text-white border border-[#b5622a] py-3 rounded-xl font-semibold transition-all cursor-pointer duration-300 hover:scale-101">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  ));
};

export default FeaturedCard;
