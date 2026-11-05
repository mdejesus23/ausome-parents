import NavLink from '@/app/_ui/links/nav-link';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';
import Menu from '../menu';

export const headerLinks: Navlinks[] = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/about-us' },
  { text: 'Posts', url: '/posts' },
  { text: 'Contact', url: '/contact' },
  { text: 'Admin', url: '/admin' },
];

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-2 sm:px-6 md:py-4 lg:px-8 lg:py-6">
        <Link href="/" className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1774 887"
            role="img"
            aria-label="Ausome Parents"
            className="h-16 w-auto"
          >
            <image
              href="/new-logo.png"
              width="1774"
              height="887"
              preserveAspectRatio="xMidYMid meet"
            />
          </svg>
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
          </ul>
        </nav>

        {/* Mobile Menu Button  */}
        <Menu />
      </div>
    </header>
  );
}
