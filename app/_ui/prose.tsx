import React from 'react';
import clsx from 'clsx';

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export default function Prose({ children, className }: ProseProps) {
  return (
    <article
      className={clsx(
        'prose prose-neutral prose-p:m-0 prose-headings:m-0 prose-code:m-0',
        'prose-headings:font-bold prose-headings:text-text-secondary',
        'prose-a:text-blue-600 hover:prose-a:text-blue-800',
        'prose-img:rounded-xl prose-img:shadow-md',
        'mx-auto', // ✅ Horizontally center the article
        className,
      )}
    >
      {children}
    </article>
  );
}
