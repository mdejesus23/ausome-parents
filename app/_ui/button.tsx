import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  href?: string;
}

export default function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,

  ...rest
}: ButtonProps) {
  const baseStyles = [
    'inline-flex items-center justify-center gap-2',
    'font-sans text-base font-medium',
    'border-2 rounded-lg',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'min-h-[44px] min-w-[44px]', // Mobile touch target
    'transform hover:scale-105 active:scale-95',
  ];

  const sizeStyles = {
    xs: 'px-2 py-2 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: [
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600',
      'hover:from-blue-700 hover:to-blue-800 hover:border-blue-700',
      'active:from-blue-800 active:to-blue-900',
      'focus:ring-blue-500',
      'shadow-lg hover:shadow-xl',
    ].join(' '),
    secondary: [
      'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600',
      'hover:from-purple-700 hover:to-purple-800 hover:border-purple-700',
      'active:from-purple-800 active:to-purple-900',
      'focus:ring-purple-500',
      'shadow-lg hover:shadow-xl',
    ].join(' '),
    accent: [
      'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-500',
      'hover:from-orange-600 hover:to-orange-700 hover:border-orange-600',
      'active:from-orange-700 active:to-orange-800',
      'focus:ring-orange-500',
      'shadow-lg hover:shadow-xl',
    ].join(' '),
    outline: [
      'bg-white text-gray-800 border-gray-300',
      'hover:bg-gray-50 hover:border-gray-400',
      'active:bg-gray-100',
      'focus:ring-blue-500',
      'shadow-md hover:shadow-lg',
    ].join(' '),
  };

  const classes = [
    ...baseStyles,
    sizeStyles[size],
    variantStyles[variant],
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={clsx(classes, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" {...rest} className={clsx(classes, className)}>
      {children}
    </button>
  );
}
