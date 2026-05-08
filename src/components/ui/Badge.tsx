import React from 'react';
import { cn } from '../../lib/utils';
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}
export function Badge({
  className,
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const variants = {
    success: 'bg-avocado-50 text-avocado-700 border-avocado-200',
    warning: 'bg-amber-50 text-status-warning border-amber-200',
    danger: 'bg-red-50 text-status-danger border-red-200',
    info: 'bg-blue-50 text-status-info border-blue-200',
    neutral: 'bg-soil-50 text-soil-700 border-soil-200'
  };
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props} />);


}