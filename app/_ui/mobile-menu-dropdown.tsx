'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';
import { ReactNode } from 'react';

export default function MobileMenuDropdown({
  headerLinks,
  setIsMobileMenuOpen,
  children,
}: {
  headerLinks: Navlinks[];
  setIsMobileMenuOpen: (arg: boolean) => void;
  children: ReactNode;
}) {
  const pathname = usePathname();

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
        {/* React Sign Out Form  */}
        {children}
      </div>
    </div>
  );
}
