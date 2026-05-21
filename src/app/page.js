import Link from 'next/link';
import Image from 'next/image';
import coverImg from '@/assets/study-nook-cover.png';
import FeaturedRooms from '@/components/FeaturedRooms';
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react';

export default async function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-orange-50/50 to-white dark:from-slate-900/30 dark:to-slate-950 pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#b5622a]/10 blur-3xl opacity-60"></div>
          <div className="absolute top-32 -left-24 w-72 h-72 rounded-full bg-orange-300/10 dark:bg-orange-850/5 blur-3xl opacity-50"></div>
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
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
                <p className="max-w-lg text-lg text-[#5c5654] dark:text-slate-300 leading-relaxed">
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
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-[#5c5654] dark:text-slate-300 border-2 border-gray-200 dark:border-slate-800 px-8 py-3.5 rounded-xl font-medium cursor-pointer hover:border-[#b5622a]/30 hover:bg-orange-50/50 dark:hover:bg-[#b5622a]/10 transition-all duration-300 active:scale-[0.98]">
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
                  <span className="text-sm font-medium text-[#5c5654] dark:text-slate-400">
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
                className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:-left-8 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-white dark:border-slate-800 flex items-center gap-4 animate-bounce"
                style={{ animationDuration: '3s' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-[#b5622a]">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">500+</p>
                  <p className="text-xs font-medium text-[#5c5654] dark:text-slate-400 uppercase tracking-wider">
                    Active Rooms
                  </p>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-6 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-white dark:border-slate-800 flex items-center gap-4 hidden sm:flex transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">10k+</p>
                  <p className="text-xs font-medium text-[#5c5654] dark:text-slate-400 uppercase tracking-wider">
                    Happy Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedRooms />

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-slate-955 border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-bold text-[#b5622a] uppercase tracking-widest text-sm">
              Simple Process
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              How StudyNook Works
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Get your perfect study environment ready in just three quick steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Search Study Nooks',
                desc: 'Filter by floor, rate, or specific amenities (like whiteboard or HDMI) to find your perfect fit.',
                icon: '🔍',
              },
              {
                step: '02',
                title: 'Book Your Slot',
                desc: 'Select a date and choose an available hourly slot. Double-booking conflicts are automatically blocked.',
                icon: '📅',
              },
              {
                step: '03',
                title: 'Check In & Study',
                desc: 'Arrive at your nook, log in, and make progress in peace. Manage all your details from your personal dashboard.',
                icon: '✍️',
              },
            ].map((item, index) => (
              <div key={index} className="relative p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition duration-300 group">
                <div className="absolute top-6 right-8 text-5xl font-black text-slate-200/50 dark:text-slate-800 group-hover:text-[#b5622a]/10 transition-colors">
                  {item.step}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-955/40 flex items-center justify-center text-3xl mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/40 border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-bold text-[#b5622a] uppercase tracking-widest text-sm">
              User Reviews
            </h2>
            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">
              Hear From Our Students
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Discover how StudyNook is helping student groups focus and score higher.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Computer Science Major',
                quote: 'Finding private rooms for group projects used to be a nightmare during finals. StudyNook makes booking quick and reliable.',
                rating: 5,
                img: 'https://i.pravatar.cc/100?img=33'
              },
              {
                name: 'Marcus Vance',
                role: 'Pre-Med Student',
                quote: 'I list my private library desk whenever I am attending lectures. It helps other students find a spot and pays for my coffee!',
                rating: 5,
                img: 'https://i.pravatar.cc/100?img=12'
              },
              {
                name: 'Elena Rostova',
                role: 'Graduate Researcher',
                quote: 'The amenities filter is amazing. I can guarantee I get a room with a monitor and ethernet whenever I need to compile data.',
                rating: 5,
                img: 'https://i.pravatar.cc/100?img=47'
              }
            ].map((test, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex text-yellow-500 gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-350 italic">"{test.quote}"</p>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <img src={test.img} alt={test.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{test.name}</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
