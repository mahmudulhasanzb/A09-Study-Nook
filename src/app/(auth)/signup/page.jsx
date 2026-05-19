'use client';
import React from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { error } from 'better-auth/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = React.useState('');

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

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        image,
      },
      {
        onSuccess: () => {
          toast.success('User created successfully');
          router.push('/');
        },
        onError: ctx => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
      onSuccess: () => {
        toast.success('User signed In successfully');
      },
      onError: ctx => {
        toast.error(ctx.error.message);
      },
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b5622a]/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-[#1e1108] tracking-tight">
                Join <span className="text-[#b5622a]">StudyNook</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Create your account to start learning
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  startContent={<User className="w-5 h-5 text-[#5c5654]" />}
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  startContent={<Mail className="w-5 h-5 text-[#5c5654]" />}
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-[#5c5654] ml-1"
                >
                  Profile Image URL
                </label>
                <Input
                  id="image"
                  required
                  placeholder="https://images.unsplash.com/..."
                  type="url"
                  name="image"
                  startContent={<User className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-[#5c5654] ml-1"
                >
                  Password
                </label>
                <Input
                  id="password"
                  required
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  startContent={<Lock className="w-5 h-5 text-slate-400" />}
                  className="border-2 border-[#5c5654] hover:border-[#b5622a]/50 focus-within:border-[#b5622a] transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
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
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                type="button"
                color="primary"
                className="bg-white hover:bg-[#f1f5f9] text-[#b5622a] border-2 border-[#5c5654] w-full h-14 text-lg font-black rounded-2xl shadow-lg hover:shadow-[#b5622a]/10 transition-all duration-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="48"
                  height="48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12
       s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4
       12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12
       c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4
       16.3 4 9.7 8.3 6.3 14.7z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2
       C29.2 35.1 26.7 36 24 36
       c-5.3 0-9.7-3.3-11.3-8l-6.5 5
       C9.5 39.5 16.2 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.6 20.5H42V20H24v8h11.3
       c-1.1 3-3.3 5.3-6.2 6.8l6.2 5.2
       C39.9 36.3 44 30.8 44 24
       c0-1.3-.1-2.7-.4-3.5z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#b5622a] hover:text-[#a15323] font-black hover:underline underline-offset-4 transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
