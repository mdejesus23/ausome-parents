'use client';

import type { NavLink } from '@/types';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function NavLink({ url, text }: { url: string; text: string }) {
  const pathname = usePathname();

  return (
    <li
      className={clsx('flex items-center justify-center text-base', {
        'text-text-primary': pathname == url,
      })}
    >
      <Link className="flex items-center justify-center" href={url}>
        {text}
      </Link>
    </li>
  );
}
