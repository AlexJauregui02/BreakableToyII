import * as React from 'react'

import { cn } from '../../../lib/utils'

type CardProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export default function Card({
    className,
    children,
    ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white flex flex-col rounded p-10 shadow-md border border-gray-300',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}