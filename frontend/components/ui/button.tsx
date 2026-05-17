import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/classnames';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
    'transition-all duration-200 whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-4',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-white shadow-sm',
          'hover:bg-primary-600 hover:shadow-md',
          'focus-visible:ring-primary-100',
        ].join(' '),
        accent: [
          'bg-accent-500 text-white shadow-sm',
          'hover:bg-accent-600 hover:shadow-md',
          'focus-visible:ring-accent-100',
        ].join(' '),
        secondary: [
          'bg-white text-primary-500 border-2 border-primary-500',
          'hover:bg-primary-50',
          'focus-visible:ring-primary-100',
        ].join(' '),
        ghost: [
          'text-neutral-700 bg-transparent',
          'hover:bg-neutral-100',
          'focus-visible:ring-neutral-200',
        ].join(' '),
        outline: [
          'bg-white text-neutral-700 border border-neutral-300',
          'hover:border-primary-500 hover:text-primary-500',
          'focus-visible:ring-primary-100',
        ].join(' '),
        destructive: [
          'bg-error-500 text-white',
          'hover:bg-error-700',
          'focus-visible:ring-error-100',
        ].join(' '),
        link: 'text-primary-500 underline-offset-4 hover:underline',
        default: [
          'bg-primary-500 text-white shadow-sm',
          'hover:bg-primary-600 hover:shadow-md',
          'focus-visible:ring-primary-100',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        default: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-7 w-7 text-sm',
        'icon-xs': 'h-6 w-6 text-xs',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading ?? props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Chargement...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
