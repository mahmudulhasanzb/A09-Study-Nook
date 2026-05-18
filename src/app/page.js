import Link from 'next/link';
import Image from 'next/image';
import coverImg from '@/assets/study-nook-cover.png';
import FeaturedRooms from '@/components/FeaturedRooms';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-orange-50/50 to-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#b5622a]/10 blur-3xl opacity-60"></div>
          <div className="absolute top-32 -left-24 w-72 h-72 rounded-full bg-orange-300/10 blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="flex flex-col space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/50 border border-orange-200/50 w-fit">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#b5622a]"></span>
                <span className="text-sm font-medium text-[#b5622a]">
                  The smartest way to study
                </span>
              </div>

              {/* Typography */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                  Find Your Perfect <br />
                  <span className="text-[#b5622a] relative inline-block">
                    Study Nook
                    {/* SVG Underline curve */}
                    <svg
                      className="absolute w-full h-3 -bottom-1 left-0 text-orange-200"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="max-w-lg text-lg text-[#5c5654] leading-relaxed">
                  Browse and book quiet, private study rooms and tables in your
                  local library or community. Need extra space? List your own
                  room and earn.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/rooms">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b5622a] text-white px-8 py-3.5 rounded-xl font-medium cursor-pointer hover:bg-[#a15323] hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 active:scale-[0.98] group">
                    Explore Rooms
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/add-room">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#5c5654] border-2 border-gray-200 px-8 py-3.5 rounded-xl font-medium cursor-pointer hover:border-[#b5622a]/30 hover:bg-orange-50/50 transition-all duration-300 active:scale-[0.98]">
                    List Your Space
                  </button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-6 mt-4 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative"
                    >
                      {/* Using unoptimized images from UI placeholders for quick design proof */}
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#5c5654]">
                    Trusted by 2,000+ students
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image/Visuals */}
            <div className="relative lg:ml-auto mt-10 lg:mt-0 w-full max-w-lg mx-auto lg:max-w-none">
              {/* Main Image Card */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 transform transition-transform hover:-translate-y-2 duration-500 bg-white">
                <Image
                  src={coverImg}
                  alt="Students studying in a bright, modern room"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-auto"
                  priority
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating Stat Card 1 */}
              <div
                className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:-left-8 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-gray-200/50 border border-white flex items-center gap-4 animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#b5622a]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">500+</p>
                  <p className="text-xs font-medium text-[#5c5654] uppercase tracking-wider">
                    Active Rooms
                  </p>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-6 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-gray-200/50 border border-white flex items-center gap-4 hidden sm:flex transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">10k+</p>
                  <p className="text-xs font-medium text-[#5c5654] uppercase tracking-wider">
                    Happy Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedRooms />
    </>
  );
}
