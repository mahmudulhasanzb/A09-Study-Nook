import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center w-full bg-gradient-to-b from-white to-orange-50/30">
      <div className="relative flex flex-col items-center">
        {/* Animated Icon */}
        <div className="w-20 h-20 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-lg shadow-orange-100/50 mb-6 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
          <BookOpen className="w-10 h-10 text-[#b5622a] animate-pulse" />
        </div>

        {/* Loading Text */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Preparing your space
        </h3>
        <p className="text-[#5c5654] font-medium flex items-center gap-1">
          Loading
          <span className="flex gap-0.5 ml-1">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#b5622a] animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#b5622a] animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#b5622a] animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></span>
          </span>
        </p>
      </div>
    </div>
  );
}
