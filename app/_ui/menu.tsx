'use client';

import MobileMenuDropdown from '@/app/_ui/mobile-menu-dropdown';
import { ReactNode, useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import type { NavLink as Navlinks } from '@/types';
export const headerLinks: Navlinks[] = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/about-us' },
  { text: 'Blog', url: '/blog' },
  { text: 'Contact', url: '/contact' },
];

export default function Menu({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
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
        >
          {children}
        </MobileMenuDropdown>
      )}
    </>
  );
}
