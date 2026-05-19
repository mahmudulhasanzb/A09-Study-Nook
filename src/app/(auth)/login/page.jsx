'use client';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (!error) {
      router.push('/');
    }

    console.log({ data, error });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-12">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b5622a]/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>

            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-[#1e1108] tracking-tight">
                Welcome to <span className="text-[#b5622a]">StudyNook</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
              </div>

              <Button
                color="primary"
                type="submit"
                className="bg-[#b5622a] hover:bg-[#a15323] text-white w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-[#b5622a]/20 group"
              >
                Sign In{' '}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-[#b5622a] hover:text-[#a15323] font-black hover:underline underline-offset-4 transition-all"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
