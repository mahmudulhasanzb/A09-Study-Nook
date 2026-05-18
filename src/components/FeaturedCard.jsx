import { CircleDollar } from '@gravity-ui/icons';
import { Button, Card } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedCard = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
        <Image
          width={400}
          height={400}
          className="w-full h-56 object-cover"
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
          alt="study room"
        />

        <div className="p-5">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#b5622a]/80 text-white mb-3">
            Floor 3
          </span>

          <h3 className="text-xl font-bold mb-2">Quiet Study Room</h3>

          <p className="text-slate-600 text-sm leading-6 mb-3">
            Perfect for focused studying in a peaceful and distraction-free
            environment.
          </p>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-slate-500">2–4 People</p>
            <p className="text-lg font-bold text-[#b5622a]">$5/hr</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="px-3 py-1 text-xs rounded-full bg-[#b5622a]/20">
              WiFi
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-[#b5622a]/20">
              Projector
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-[#b5622a]/30">
              +2 More
            </span>
          </div>

          <Link href="/rooms/dynamicid">
          <Button className="w-full bg-[#b5622a] hover:bg-[#a15323] text-white border border-[#b5622a] py-3 rounded-xl font-semibold transition-all cursor-pointer duration-300 hover:scale-101">
            View Details
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
