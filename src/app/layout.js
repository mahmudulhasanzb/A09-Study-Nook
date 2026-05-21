import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook | Library Study Room Bookings",
  description: "Book private, quiet study rooms in library spaces, equipped with screens, whiteboards, and other premium amenities.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <AuthProvider>
          <ThemeProvider>
            <Navbar/>
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
              {children}
            </main>
            <Footer/>
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
