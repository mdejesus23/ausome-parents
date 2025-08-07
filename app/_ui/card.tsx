'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  image?: {
    src: string;
    alt: string;
  };
  href?: string;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  image,
  href,
  className = '',
  children,
}: CardProps) {
  const Element: typeof Link | 'div' = href ? Link : 'div';

  return (
    <Element
      href={href || ''}
      className={`group grid grid-cols-1 items-start bg-white transition md:grid-cols-[300px_1fr] ${className}`}
    >
      {/* Left: Image */}
      {image && (
        <figure className="flex items-start justify-center overflow-hidden rounded-md p-4 md:p-6">
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={300}
            className="h-auto w-full max-w-[300px] object-contain"
          />
        </figure>
      )}

      {/* Right: Metadata */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <div className="text-gray-700">{children}</div>
      </div>
    </Element>
  );
}
