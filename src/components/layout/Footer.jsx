const BookIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SOCIAL = [
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'X', href: '#', Icon: XIcon },
  { label: 'LinkedIn', href: '#', Icon: LinkedInIcon },
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
];

const USEFUL_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Rooms', href: '/rooms' },
  { label: 'Add a Room', href: '/add-room' },
  { label: 'About', href: '/about' },
];

const ACCOUNT_LINKS = [
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'My Bookings', href: '/my-bookings' },
  { label: 'My Listings', href: '/my-listings' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className= "bg-[#1e1108] font-sans relative overflow-hidden">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#b5622a] to-transparent opacity-80" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 relative z-10 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Brand */}
          <div className="flex flex-col items-start">
            <a href="/" className="mb-6 flex items-center gap-3 transition-transform hover:scale-105">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b5622a] text-white shadow-md">
                <BookIcon />
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                StudyNook
              </span>
            </a>

            <p className="max-w-[240px] text-[0.95rem] leading-relaxed text-white/60 font-medium">
              Quiet, private study rooms — bookable in minutes. Built for students who need focus.
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#b5622a] hover:bg-[#b5622a] hover:text-white hover:shadow-md"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-6">
              Explore
            </h3>
            
            <ul className="flex flex-col gap-4">
              {USEFUL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-[#b5622a] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-6">
              Account
            </h3>

            <ul className="flex flex-col gap-4">
              {ACCOUNT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center text-sm font-semibold text-white/60 transition-colors duration-200 hover:text-white"
                  >
                    <span className="mr-2 h-1 w-1 rounded-full bg-[#b5622a] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/80 mb-6">
              Contact
            </h3>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#b5622a] transition-colors group-hover:bg-[#b5622a] group-hover:text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="mt-1.5 text-sm font-semibold text-white/60 transition-colors group-hover:text-white">
                  hello@studynook.app
                </span>
              </li>

              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#b5622a] transition-colors group-hover:bg-[#b5622a] group-hover:text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.61 5.61l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="mt-1.5 text-sm font-semibold text-white/60 transition-colors group-hover:text-white">
                  +1 (555) 012-3456
                </span>
              </li>

              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#b5622a] transition-colors group-hover:bg-[#b5622a] group-hover:text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="mt-1 text-sm font-semibold text-white/60 leading-relaxed transition-colors group-hover:text-white">
                  University Library, 2nd Floor<br />
                  Reading Hall, Block C
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm font-medium text-white/40">
            © {year} StudyNook. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-white/40">
            <span>Built for students, by students.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
