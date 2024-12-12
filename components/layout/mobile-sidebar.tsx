import { Link } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';

import { LucideMenu } from '../icons/menu-icon';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet';
import Sidebar from './sidebar';

/**
 * @description A React component that renders a mobile-specific sidebar accessible through a menu icon trigger.
 *
 * @returns {JSX.Element} The rendered mobile sidebar component.
 */
export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <LucideMenu className="text-foreground" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link className="flex flex-row items-center gap-2" href="/">
            <Image
              style={{ height: 40, width: 40 }}
              source={require('@/assets/images/logo.png')}
              alt="Logo"
              resizeMode="contain"
            />
            <Image
              style={{ width: 100 }}
              source={require('@/assets/images/tetoteto.svg')}
              alt="tetoteto"
              resizeMode="contain"
            />
          </Link>
        </SheetHeader>
        <Sidebar setOpen={setOpen} className="h-full w-[80%] justify-center border-none pb-0" />
      </SheetContent>
    </Sheet>
  );
}
