import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'px-5 py-2 rounded-full text-sm font-medium transition border flex items-center justify-center gap-2 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300 text-white border-transparent hover:from-purple-500 hover:to-indigo-400',
        ghost:
          'bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border-white/20',
        outline:
          'bg-transparent border-purple-400 text-purple-300 hover:bg-purple-400/10',
      },
      isLoading: {
        true: 'opacity-60 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      isLoading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  isLoading?: boolean;
  children: React.ReactNode;
  href?: string;
}

const Spinner = () => {
  return (
    <span className='inline-block w-4 h-4 rounded-[100%] border-l-4 border-l-white animate-spin' />
  )
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  isLoading = false,
  disabled,
  children,
  href,
  ...props
}) => {
  const className = buttonStyles({ variant, isLoading: !!isLoading });

  if (href) {
    return (
      <Link
        href={isLoading || disabled ? '#' : href}
        className={className}
        aria-disabled={isLoading || disabled}
        tabIndex={isLoading || disabled ? -1 : 0}
        {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        {children}
      </Link>
    );
  }

  return (
    <button
      className={className}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Spinner />        
      ) : children}
    </button>
  );
};

export default Button; 