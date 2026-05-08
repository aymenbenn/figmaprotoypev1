import React from 'react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Tabs({ className, ...props }: TabsProps) {
  return (
    <div
      className={cn('flex space-x-6 border-b border-soil-100', className)}
      {...props} />);


}
interface TabProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  active?: boolean;
}
export function Tab({ className, href, active, children, ...props }: TabProps) {
  const location = useLocation();
  const isActive =
  active !== undefined ?
  active :
  location.pathname === href ||
  href !== '/production' && location.pathname.startsWith(href);
  return (
    <Link
      to={href}
      className={cn(
        'pb-3 text-sm font-medium transition-colors relative',
        isActive ? 'text-soil-600' : 'text-soil-400 hover:text-soil-600',
        className
      )}
      {...props}>
      
      {children}
      {isActive &&
      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-soil-500 rounded-t-full" />
      }
    </Link>);

}