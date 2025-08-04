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
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100',
        'prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-200',
        'prose-img:rounded-xl prose-img:shadow-md',
        className,
      )}
    >
      {children}
    </article>
  );
}
