'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function DashboardLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/admin/dashboard"
      className={clsx('flex items-center justify-center text-base', {
        'text-text-primary': pathname == '/admin/dashboard',
      })}
    >
      Dashboard
    </Link>
  );
}
