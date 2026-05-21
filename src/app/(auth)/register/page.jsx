'use client';

import React, { useEffect } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const { register, googleLogin } = useAuth();
  const [errorMsg, setErrorMsg] = React.useState('');

  useEffect(() => {
    document.title = 'StudyNook – Register';
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const signUpData = Object.fromEntries(formData.entries());

    const { name, email, password, image } = signUpData;

    // Password validation
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMsg('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMsg('Password must contain at least one lowercase letter.');
      return;
    }
    setErrorMsg('');

    try {
      await register({ name, email, image, password });
      router.push('/login');
    } catch (error) {
      // Handled by AuthContext
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
    } catch (error) {
      // Handled by AuthContext
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 dark:bg-slate-950 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b5622a]/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-[#1e1108] dark:text-white tracking-tight">
                Join <span className="text-[#b5622a]">StudyNook</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Create your account to start learning
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-[#5c5654] dark:text-slate-400" />
                  </div>
                  <input
                    id="name"
                    required
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-[#5c5654] dark:text-slate-400" />
                  </div>
                  <input
                    id="email"
                    required
                    placeholder="Enter your email"
                    type="email"
                    name="email"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-[#5c5654] dark:text-slate-300 ml-1"
                >
                  Profile Image URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="image"
                    placeholder="https://images.unsplash.com/..."
                    type="url"
                    name="image"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-[#5c5654] dark:text-slate-300 ml-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    id="password"
                    required
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-[#5c5654] dark:border-slate-700 hover:border-[#b5622a]/50 focus:border-[#b5622a] focus:ring-0 focus:outline-none transition-all duration-300 bg-white dark:bg-slate-850 text-slate-900 dark:text-white placeholder-slate-400 font-medium"
                  />
                </div>
                {errorMsg && (
                  <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                    {errorMsg}
                  </p>
                )}
              </div>

              <Button
                color="primary"
                type="submit"
                className="bg-[#b5622a] hover:bg-[#a15323] text-white w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-[#b5622a]/20 group"
              >
                Create Account{' '}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-slate-900 px-2 text-slate-500 dark:text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                type="button"
                color="primary"
                className="bg-white dark:bg-slate-850 hover:bg-[#f1f5f9] dark:hover:bg-slate-800 text-[#b5622a] dark:text-orange-400 border-2 border-[#5c5654] dark:border-slate-700 w-full h-14 text-lg font-black rounded-2xl shadow-lg hover:shadow-[#b5622a]/10 transition-all duration-300 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                  <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z" />
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.2 6.8l6.2 5.2C39.9 36.3 44 30.8 44 24c0-1.3-.1-2.7-.4-3.5z" />
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#b5622a] hover:text-[#a15323] dark:text-orange-400 dark:hover:text-orange-300 font-black hover:underline underline-offset-4 transition-all"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
