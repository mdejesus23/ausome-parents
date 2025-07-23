'use client';

import type { NavLink } from '@/types';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function NavLink({
  url,
  text,
  isMobile = false,
}: {
  url: string;
  text: string;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  console.log('pathname', pathname);
  console.log('url', url);
  return (
    <li
      className={clsx('text-base', {
        'text-text-primary': pathname == url,
      })}
    >
      <Link href={url}>{text}</Link>
    </li>
  );
}
