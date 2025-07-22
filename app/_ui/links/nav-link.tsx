import type { NavLink } from '@/types';
import Link from 'next/link';

export default function NavLink({
  url,
  text,
  isMobile = false,
}: {
  url: string;
  text: string;
  isMobile?: boolean;
}) {
  return (
    <li
      className={
        isMobile
          ? 'border-opacity-5 w-full border-b border-neutral-50 px-6 py-5'
          : ''
      }
    >
      <Link href={url}>{text}</Link>
    </li>
  );
}
