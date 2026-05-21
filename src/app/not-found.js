import Link from 'next/link';
import { Home, Search, Compass } from 'lucide-react';

export const metadata = {
  title: 'StudyNook – Page Not Found',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-orange-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="text-center max-w-lg mx-auto flex flex-col items-center z-10">
        {/* Icon / Visual */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center mx-auto shadow-2xl shadow-orange-200/40 border-8 border-white">
            <Compass className="w-16 h-16 text-[#b5622a]" />
          </div>
          <div
            className="absolute -bottom-4 -right-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span className="text-xl font-bold text-gray-900">404</span>
          </div>
        </div>

        {/* Text content */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Lost in the Stacks
        </h1>
        <p className="text-lg text-[#5c5654] mb-10 leading-relaxed">
          We couldn't find the page you're looking for. It might have been
          moved, renamed, or perhaps it never existed.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#b5622a] text-white px-8 py-3.5 rounded-xl font-medium cursor-pointer hover:bg-[#a15323] hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 active:scale-[0.98] group">
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Back to Home
            </button>
          </Link>
          <Link href="/rooms">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#5c5654] border-2 border-gray-200 px-8 py-3.5 rounded-xl font-medium cursor-pointer hover:border-[#b5622a]/30 hover:bg-orange-50/50 transition-all duration-300 active:scale-[0.98] group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Browse Rooms
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
