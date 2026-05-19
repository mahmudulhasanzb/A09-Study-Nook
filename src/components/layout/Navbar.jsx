'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Avatar,
} from '@heroui/react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const BookIcon = () => (
  < svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
];

const privateLinks = [
  { label: 'Add Room', href: '/add-room' },
  { label: 'My Listings', href: '/my-listings' },
  { label: 'My Bookings', href: '/my-bookings' },
];

export default function Navbar() {
  const router = useRouter();

  // get session from better-auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log('session', session);
  console.log('user', user);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    < div className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 transition-all duration-300">
      <nav
        className={`w-full rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border border-black/10 shadow-lg py-2'
            : 'bg-white/80 backdrop-blur-md border border-black/5 shadow-sm py-3'
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4  ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b5622a] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
              <BookIcon />
            </span>
            <span className="text-xl font-bold tracking-tight text-[#1e1108] transition-colors">
              Study<span className="text-[#b5622a]">Nook</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1.5 md:flex">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[#1e1108]/70 transition-all duration-200 hover:bg-[#b5622a]/10 hover:text-[#b5622a] no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
            {user &&
              privateLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="rounded-full px-4 py-2 text-sm font-semibold text-[#1e1108]/70 transition-all duration-200 hover:bg-[#b5622a]/10 hover:text-[#b5622a] no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-full border border-black/10 bg-white p-1 pr-3 transition-all duration-200 hover:border-[#b5622a]/30 hover:bg-[#b5622a]/5 hover:shadow-sm"
                >
                  <Avatar
                    src={user.photoURL}
                    name={user.name}
                    size="sm"
                    className="h-8 w-8"
                  />
                  <span className="max-w-[100px] truncate text-sm font-semibold text-[#1e1108]">
                    {user.name}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`h-4 w-4 text-[#1e1108]/50 transition-transform duration-200 ${
                      showDropdown ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/5 bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-40 transition-all duration-200">
                      <Link
                        href="/my-listings"
                        onClick={() => setShowDropdown(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#1e1108]/85 hover:bg-[#b5622a]/10 hover:text-[#b5622a] no-underline"
                      >
                        My Listings
                      </Link>
                      <Link
                        href="/my-bookings"
                        onClick={() => setShowDropdown(false)}
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-[#1e1108]/85 hover:bg-[#b5622a]/10 hover:text-[#b5622a] no-underline"
                      >
                        My Bookings
                      </Link>
                      <hr className="my-1.5 border-black/5" />
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                        className="w-full text-left block rounded-lg px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button className="rounded-full px-5 py-2.5 text-sm font-bold text-[#1e1108] transition-all duration-200 hover:bg-black/5 no-underline">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-full bg-[#1e1108] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:shadow-lg no-underline">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#1e1108] transition-colors hover:bg-black/5 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen
              ? 'grid-rows-[1fr] opacity-100 mt-3'
              : 'grid-rows-[0fr] opacity-0 mt-0'
          }`}
        >
          <div className="min-h-0 border-t border-black/5 bg-white">
            <div className="px-4 py-4 sm:px-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block rounded-xl px-4 py-3 text-sm font-bold text-[#1e1108]/80 transition-all hover:bg-[#b5622a]/10 hover:text-[#b5622a] hover:pl-5 no-underline"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                {user && (
                  <>
                    <li className="my-2 border-t border-black/5" />
                    {privateLinks.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block rounded-xl px-4 py-3 text-sm font-bold text-[#1e1108]/80 transition-all hover:bg-[#b5622a]/10 hover:text-[#b5622a] hover:pl-5 no-underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <div className="mt-4 border-t border-black/5 pt-4">
                {user ? (
                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={user.photoURL}
                        name={user.name}
                        size="md"
                        className="h-10 w-10 border border-black/10"
                      />
                      <div>
                        <span className="block text-sm font-bold text-[#1e1108]">
                          {user.name}
                        </span>
                        <span className="block text-xs font-medium text-[#1e1108]/50">
                          {user.email || 'Student User'}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="md"
                      color="danger"
                      className="w-full font-bold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                      onPress={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 px-2">
                    <Link href="/login">
                      <Button
                        variant="flat"
                        size="md"
                        className="w-full font-bold bg-black/5 text-[#1e1108] hover:bg-black/10"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button
                        size="md"
                        className="w-full bg-[#1e1108] font-bold text-white hover:bg-black shadow-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
