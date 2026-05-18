import { Button } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import FeaturedCard from './FeaturedCard';
import Link from 'next/link';
import { getFeaturedRooms } from '@/lib/data';

const FeaturedRooms = async () => {

  const featuredRooms = await getFeaturedRooms()

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="font-bold text-[#b5622a] uppercase tracking-widest text-sm">
              Top Rated
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900">
              Featured Rooms
            </h3>
            <p className="text-slate-500 max-w-xl">
              Discover our top-rated study spaces, perfect for solo focus or group collaboration.
            </p>
          </div>
          <Link href="/rooms">
          <Button
            variant="flat"
            color="primary"
            className="rounded-full font-bold group hover:text-[#b5622a] transition-all duration-300 "
          >
            View All Rooms{' '}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeaturedCard featuredRooms={featuredRooms} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
