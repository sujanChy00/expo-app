'use client';
import { usePathname, useRouter } from 'expo-router';

import { P } from '../ui/typography';
import { navItems } from './nav-items';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { ILanguageTexts } from '@/types/ILanguageTexts';

interface DashboardNavProps {
  setOpen?: (open: boolean) => void;
}
/**
 * @description A React component that renders a list of navigation items for the dashboard.
 * When a navigation item is clicked, it navigates to the corresponding URL and optionally closes a sidebar (if `setOpen` is provided).
 *
 * @param {DashboardNavProps} props - Component props.
 * @property {*} props.setOpen (optional) - A function to close a sidebar (if applicable).
 * @returns {JSX.Element} The rendered dashboard navigation component.
 */
export function DashboardNav({ setOpen }: DashboardNavProps) {
  const url = usePathname();
  const { getText } = useI18n();
  const router = useRouter();

  if (!navItems?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-1">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive =
          (item.href !== '/' && url.includes(item.href)) || (item.href == '/' && url == '/');
        const activeStyle = isActive ? 'bg-secondary' : 'bg-transparent';
        return (
          item.href && (
            <div
              key={index}
              onClick={() => {
                router.push(item.href as any);
                if (setOpen) {
                  setOpen(false);
                }
              }}
              className={cn(
                'hover:bg-secondary group flex cursor-pointer items-center rounded-md px-3 py-3 font-medium',
                isActive ? 'bg-secondary' : 'bg-transparent'
              )}>
              <Icon
                size={16}
                className={cn(
                  'group-hover:text-secondary-foreground mr-2 text-sm',
                  isActive ? 'text-secondary-foreground' : 'text-foreground'
                )}
              />
              <P
                className={cn(
                  'hover:text-secondary-foreground text-sm capitalize',
                  isActive ? 'text-secondary-foreground' : 'text-foreground'
                )}>
                {getText(item.label as ILanguageTexts).toLowerCase()}
              </P>
            </div>
          )
        );
      })}
    </nav>
  );
}
