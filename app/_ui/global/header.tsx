import NavLink from '@/app/_ui/links/nav-link';
import FaSolidPeopleRoof from '@/app/_ui/icons/FaSolidPeopleRoof';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';

export const headerLinks: Navlinks[] = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/about-us' },
  { text: 'Blog', url: '/blog' },
  { text: 'Contact', url: '/contact' },
];

export default function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between overflow-hidden border-b px-4 py-2 sm:px-6 md:py-4 lg:border-0 lg:px-8 lg:py-5">
      <Link href="/" className="flex items-center gap-3">
        <FaSolidPeopleRoof size={2.5} />
        <h1 className="text-text-primary text-2xl font-bold">Ausome Parents</h1>
      </Link>

      <nav className="hidden items-center justify-between lg:flex">
        <ul className="flex w-full items-end justify-end gap-6">
          {headerLinks.map((link, ind) => (
            <NavLink
              key={`${link.text}-${ind}`}
              url={link.url}
              text={link.text}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}
