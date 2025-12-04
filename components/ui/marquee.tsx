import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function Marquee({
  children,
  pauseOnHover = false,
  direction = 'left',
  speed = 30,
  className,
  ...props
}: MarqueeProps) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={cn('w-full overflow-hidden z-10', className)}
      {...props}
    >
      <div className="relative flex w-full overflow-hidden py-5">
        <div
          className={cn(
            'flex w-max animate-marquee gap-16',
            pauseOnHover && 'hover:[animation-play-state:paused]',
            direction === 'right' && 'animate-marquee-reverse'
          )}
          style={{ '--duration': `${speed}s` } as React.CSSProperties}
        >
          {items.map((child, index) => (
            <div key={`marquee-item-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
          {items.map((child, index) => (
            <div key={`marquee-item-duplicate-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

