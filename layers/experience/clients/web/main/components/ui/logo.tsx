import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const logoVariants = cva('flex items-center justify-center relative transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 shadow-sm',
      outline: 'bg-white border-2 border-gray-200',
      ghost: 'bg-transparent',
      modern:
        'bg-white shadow-[4px_4px_10px_0px_rgba(0,0,0,0.05),-4px_-4px_10px_0px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_0px_rgba(0,0,0,0.05),inset_-4px_-4px_10px_0px_rgba(255,255,255,0.9)] overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-br after:from-purple-500/10 after:via-transparent after:to-indigo-500/10 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500',
      glass:
        'bg-white/80 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/90 hover:border-white/30 transition-colors',
      neon: 'bg-gray-900 shadow-lg hover:shadow-indigo-500/20 before:absolute before:inset-0 before:bg-gradient-to-br before:from-indigo-500 before:to-purple-500 before:opacity-0 before:blur-xl hover:before:opacity-20 before:transition-opacity before:duration-500',
      minimal: 'bg-gray-50 hover:bg-gray-100 ring-1 ring-gray-200/50 hover:ring-gray-300/50',
    },
    size: {
      default: 'w-10 h-10',
      sm: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-14 h-14',
    },
    shape: {
      default: 'rounded-xl',
      square: 'rounded-lg',
      circle: 'rounded-full',
      blob: 'rounded-[28%_72%_77%_23%_/_28%_28%_72%_72%]',
      modern: 'rounded-2xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    shape: 'default',
  },
})

interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  iconClassName?: string
}

export function Logo({ className, variant, size, shape, iconClassName, ...props }: LogoProps) {
  return (
    <div className={cn(logoVariants({ variant, size, shape }), className)} {...props}>
      <svg
        viewBox="0 0 35 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          'w-6 h-6 relative z-10 transition-transform duration-300',
          {
            'w-5 h-5': size === 'sm',
            'w-7 h-7': size === 'lg',
            'w-8 h-8': size === 'xl',
          },
          variant === 'default' || variant === 'neon' ? 'text-white' : 'text-gray-900',
          variant === 'modern' && 'group-hover:scale-95',
          variant === 'neon' && 'drop-shadow-[0_0_3px_rgba(99,102,241,0.5)]',
          iconClassName
        )}
      >
        <g clipPath="url(#clip0_1172_5446)">
          <path
            d="M30.8646 16.9105C30.7695 17.1345 30.7291 17.3812 30.8171 17.6027C30.9158 17.853 32.6257 18.9655 32.1061 19.1739C30.8373 19.684 29.1226 19.6385 27.7813 19.4817C26.7693 19.3631 25.4863 18.8913 25.6979 17.6279C25.8026 17.0015 26.4197 16.5608 26.874 16.1884C27.8039 15.4256 28.1879 14.8939 27.8383 13.6424C27.5197 12.4976 26.7586 11.3467 26.7087 10.1384C26.6576 8.89896 27.8657 8.65466 28.8134 8.37563C29.4567 8.18642 30.0703 7.97805 30.3105 7.29904C30.4853 6.80804 30.3902 5.99611 29.7897 6.02844C28.9823 6.07155 28.635 7.35772 28.0738 7.75171C27.2688 8.31695 26.0642 8.37922 25.0594 8.80076C23.9143 9.28217 23.7858 10.0666 23.8786 11.1563C23.9547 12.0473 24.3174 13.2005 24.0986 14.137C23.8929 15.016 23.1937 15.41 22.4731 15.7597C21.3826 16.289 20.1234 16.7022 18.9069 16.974C18.1233 17.1488 17.329 17.2626 16.5489 17.1045C15.952 16.9836 15.55 16.7357 15.5156 16.1405C15.4977 15.8244 15.7248 15.5082 15.7248 15.1825C15.726 14.6747 15.468 14.1813 15.2635 13.7562C14.8271 12.8485 12.5642 9.74083 13.6712 8.95165C14.1516 8.60915 15.1172 8.44629 15.6178 8.04032C16.1826 7.58166 16.1815 6.79727 16.3206 6.14221C16.3955 5.79133 16.3135 5.34464 15.9639 5.16741C15.449 4.90634 15.003 5.46919 14.6986 5.84162C14.1968 6.45597 13.7545 7.33975 13.1028 7.81278C12.3573 8.35407 11.3501 8.37802 10.513 8.68939C8.11332 9.58156 9.59971 12.1012 9.64728 13.8616C9.67463 14.8627 8.93976 15.4819 8.15613 15.9537C7.72091 16.216 7.27143 16.5034 6.81481 16.7249C6.26068 16.9944 5.81833 17.441 5.34626 17.8446C5.17502 17.9895 4.99903 18.1428 4.90866 18.3488C4.76954 18.6673 4.86823 19.0422 5.02757 19.3511C5.18691 19.6601 5.40452 19.9403 5.51987 20.2684C5.68991 20.7475 5.62451 21.2768 5.5056 21.7714C5.46992 21.9199 5.41166 22.0528 5.33793 22.1725C5.18572 22.4168 4.96455 22.6073 4.71484 22.7785C4.03466 23.2432 3.28552 23.6084 2.49238 23.8276C1.9335 23.982 1.34132 24.0623 0.772924 23.9461C0.413812 23.8731 0.0178367 23.6503 -0.00475641 23.2827C-0.0178367 23.0707 0.103453 22.8719 0.253281 22.7222C0.40311 22.5725 0.582666 22.4576 0.734872 22.3103C1.3104 21.7522 1.23906 21.0229 1.05355 20.3104C0.595746 18.5572 0.542236 17.6698 2.23316 16.7034C3.45438 16.0052 5.02638 15.6316 5.30464 14.0795C5.59597 12.4533 4.51388 10.4857 5.31534 9.44983C6.05972 8.4882 8.40941 8.69418 9.62469 7.68225C10.5736 6.89187 11.255 5.51709 11.9435 4.49798C12.9435 3.01781 13.9554 1.24904 15.6012 0.416746C17.3515 -0.46824 19.8225 0.0419139 20.1555 2.16157C20.322 3.2214 20.1079 4.31116 19.9902 5.39973C19.8915 6.32184 20.0853 7.8535 19.0413 8.27743C17.895 8.74328 17.2481 9.05344 17.5644 10.2282C17.7392 10.8761 18.2814 11.5611 18.813 12.0748C20.1995 13.4161 20.2946 11.5958 20.5039 10.5707C20.7952 9.13607 21.8666 8.79717 23.1402 8.47862C24.1604 8.22354 24.8216 8.03313 25.4577 7.1685C25.8097 6.69188 26.0356 6.06557 26.3234 5.54942C27.0131 4.31236 27.7658 3.10284 28.7551 2.08493C29.6422 1.1724 30.873 0.647872 32.1441 0.835886C32.9063 0.948456 33.6614 1.26581 33.9979 2.01906C34.3892 2.89686 34.2988 3.92795 34.1537 4.85485C34.0146 5.74941 33.8731 6.79846 33.5354 7.54573C33.0978 8.51455 31.3843 8.34449 30.6185 9.09655C29.4603 10.2354 31.7672 13.1275 31.9634 14.3741C32.0989 15.24 31.3605 16.022 30.9562 16.7141C30.9193 16.7764 30.886 16.8423 30.8575 16.9105H30.8646Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_1172_5446">
            <rect width="34.2857" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
