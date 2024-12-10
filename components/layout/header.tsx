import { Link, usePathname } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import React from 'react';
import { Image, View } from 'react-native';

import { LanguageSelector } from '../home/language-selector';
import { ShopSelector } from '../home/shop-selector';
import { ThemeToggle } from '../theme-toggler';
import { Button } from '../ui/button';
import { Indicator } from '../ui/indicator';
import { MobileSidebar } from './mobile-sidebar';

import { useGetUnSeenCounts } from '@/api/chat-api';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * @description A React component that renders the application header, containing a logo (visible on large screens),
 * a mobile menu button, a shop selector, a language selector, a theme toggle, and a message notification button.
 * @typedef {Object} UnseenCounts
 * @property {number} unreadCount - The number of unseen messages.
 *
 *
 * @returns {JSX.Element} The rendered application header component.
 */
export const Header = () => {
  const { data: unseenCounts } = useGetUnSeenCounts();
  const { isDarkColorScheme } = useColorScheme();
  const pathname = usePathname();
  return (
    <div className="supports-backdrop-blur:bg-background/60 border-b-border bg-background/50 sticky top-0 z-20 w-full border-b px-8 py-2 backdrop-blur">
      <div className="flex h-16 flex-row items-center justify-between">
        <Link href="/" asChild>
          <View className="hidden cursor-pointer flex-row items-center gap-2 lg:flex">
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
          </View>
        </Link>
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        <div className="flex flex-row items-center gap-1">
          <ShopSelector />
          <LanguageSelector />
          <ThemeToggle />
          <Link href="/chat" asChild>
            <Button
              variant={
                pathname.includes('chat') || pathname.includes('messages') ? 'secondary' : 'ghost'
              }
              size="icon"
              className="rounded-full">
              <Indicator label={unseenCounts?.unreadCount}>
                <MessageCircle size={20} color={isDarkColorScheme ? 'white' : 'black'} />
              </Indicator>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
