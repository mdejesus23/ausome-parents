'use client';

import NavLink from '@/app/_ui/links/nav-link';
import FaSolidPeopleRoof from '@/app/_ui/icons/FaSolidPeopleRoof';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';
import { MenuIcon, X } from 'lucide-react';
import MobileMenuDropdown from '../mobile-menu-dropdown';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../button';

export const headerLinks: Navlinks[] = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/about-us' },
  { text: 'Blog', url: '/blog' },
  { text: 'Contact', url: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-2 sm:px-6 md:py-4 lg:px-8 lg:py-6">
        <Link href="/" className="flex items-center gap-3">
          <FaSolidPeopleRoof size={2.5} />
          <h1 className="text-text-primary text-xl font-bold md:text-2xl">
            Ausome Parents
          </h1>
        </Link>

        {/* desktop navigation  */}
        <nav className="hidden items-center justify-between md:flex">
          <ul className="flex w-full items-center justify-center gap-6">
            {headerLinks.map((link, ind) => (
              <NavLink
                key={`${link.text}-${ind}`}
                url={link.url}
                text={link.text}
              />
            ))}

            <div>
              {status === 'loading' ? (
                <div className="loader"></div>
              ) : session ? (
                <div className="flex items-center gap-4">
                  {/* <span>Welcome, {session.user?.name?.split(' ')[0]}</span> */}
                  <Button onClick={() => signOut()}>Sign Out</Button>
                </div>
              ) : (
                // <p>test</p>
                <Button
                  size="sm"
                  onClick={() =>
                    signIn('google', {
                      callbackUrl: '/admin',
                    })
                  }
                >
                  Sign In
                </Button>
              )}
            </div>
          </ul>
        </nav>

        {/* Mobile Menu Button  */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="flex md:hidden"
          aria-label="Mobile menu button"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Mobile Menu Dropdown  */}

        {isMobileMenuOpen && (
          <MobileMenuDropdown
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            headerLinks={headerLinks}
          />
        )}
      </div>
    </header>
  );
}
