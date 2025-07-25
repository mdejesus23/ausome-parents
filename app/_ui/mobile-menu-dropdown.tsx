'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './button';
export default function MobileMenuDropdown({
  headerLinks,
  setIsMobileMenuOpen,
}: {
  headerLinks: Navlinks[];
  setIsMobileMenuOpen: (arg: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <div
      id="mobile-menu"
      className="absolute top-full right-0 left-0 z-50 origin-top transform border-t border-gray-100 bg-white shadow-lg transition-transform duration-200 ease-out lg:hidden"
      role="menu"
      aria-labelledby="mobile-menu-button"
    >
      {/* Navigation Links in Grid  */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {headerLinks.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== '/' && pathname.startsWith(item.url));

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`block rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors ${
                  isActive
                    ? 'border border-blue-200 bg-blue-50 text-blue-600'
                    : 'border border-transparent text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            );
          })}
        </div>

        {/* GitHub Link  */}
        <div className="mt-4 flex items-center justify-center border-t border-gray-100 pt-4">
          {status === 'loading' ? (
            <div className="loader"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              {/* <span>Welcome, {session.user?.name?.split(' ')[0]}</span> */}
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign Out
              </Button>
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
      </div>
    </div>
  );
}
