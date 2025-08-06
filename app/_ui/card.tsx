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
      className={`group grid grid-cols-1 gap-0 bg-white transition md:grid-cols-2 ${className}`}
    >
      {/* Left: Image */}
      {image && (
        <figure className="relative h-60 w-full overflow-hidden rounded-xl md:h-auto">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </figure>
      )}

      {/* Right: Metadata */}
      <div className="relative flex flex-col justify-center gap-2 p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
        <div className="text-gray-700">{children}</div>
      </div>
    </Element>
  );
}
