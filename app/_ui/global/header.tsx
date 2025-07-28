import NavLink from '@/app/_ui/links/nav-link';
import Link from 'next/link';
import type { NavLink as Navlinks } from '@/types';
import { Power } from 'lucide-react';
import { auth, signOut } from '@/auth';
import clsx from 'clsx';
import Button from '../button';
import Image from 'next/image';
import Menu from '../menu';
import { Children } from 'react';

export const headerLinks: Navlinks[] = [
  { text: 'Home', url: '/' },
  { text: 'About Us', url: '/about-us' },
  { text: 'Blog', url: '/blog' },
  { text: 'Contact', url: '/contact' },
];

async function SignOutForm({ isMobile = false }: { isMobile?: boolean }) {
  const session = await auth();

  return (
    <div
      className={
        isMobile
          ? 'flex items-center justify-center border-t border-gray-100 pt-4'
          : ''
      }
    >
      {session && (
        <div className="flex items-center gap-4">
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button
              type="submit"
              // className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              {' '}
              <Power size={24} />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-2 sm:px-6 md:py-4 lg:px-8 lg:py-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ap-logo-blue.png"
            alt="brand logo image"
            width={50}
            height={50}
            className="hidden md:block"
          />

          <Image
            src="/ap-logo-blue.png"
            alt="brand logo image"
            width={40}
            height={40}
            className="block md:hidden"
          />
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

            <SignOutForm />
          </ul>
        </nav>

        {/* Mobile Menu Button  */}

        <Menu>
          <SignOutForm isMobile={true} />
        </Menu>
      </div>
    </header>
  );
}
