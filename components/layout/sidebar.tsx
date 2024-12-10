import { LogOut as LogoutIcon } from 'lucide-react-native';

import { Logout } from '../profile/logout';
import { P } from '../ui/typography';
import { DashboardNav } from './nav';

import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  setOpen?: (open: boolean) => void;
}

/**
 * @description A React component that renders the application sidebar, containing navigation items via a `DashboardNav`
 * component and a logout button.
 * @typedef {Object} SidebarProps
 * @property {string} className (optional) - CSS class names to be applied to the sidebar.
 * @property {(open: boolean) => void} [setOpen] (optional) - A function to close a sidebar (if applicable).
 * @extends React.HTMLAttributes<HTMLDivElement> - Inherits all HTML attributes for the `<div>` element.
 *
 *
 * @param {SidebarProps} props - Component props.
 * @returns {JSX.Element} The rendered application sidebar component.
 */
export default function Sidebar({ className, setOpen }: SidebarProps) {
  const { getText } = useI18n();
  return (
    <div
      className={cn(
        'border-r-border flex w-[13%] flex-col border-r px-2 py-4 lg:pt-14',
        className
      )}>
      <div className="flex flex-col">
        <DashboardNav setOpen={setOpen} />
        <Logout className="hover:bg-secondary group mt-1 justify-start rounded-md bg-transparent px-3 py-3 text-sm font-medium">
          <LogoutIcon
            size={16}
            className="text-foreground group-hover:text-secondary-foreground mr-2"
          />
          <P className="text-foreground group-hover:text-secondary-foreground text-sm">
            {getText('logout')}
          </P>
        </Logout>
      </div>
    </div>
  );
}
