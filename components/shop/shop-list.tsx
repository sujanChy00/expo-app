import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import { P } from '../ui/typography';

import { useUser } from '@/hooks/use-user';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';

/**
 * @description A React component that renders a list of shops for the currently logged-in user, displaying only up to the first 6 shops and a "View All" button. The component is not rendered if the user is not logged in or has no shop details.

 * @returns {JSX.Element} The rendered `ShopList` component, or null if user is not logged in or has no shops.
 */

export const ShopList = () => {
  const router = useRouter();
  const { getText } = useI18n();
  const { user } = useUser();
  if (!user) return null;
  const shops = user?.shopDetails.length > 6 ? user?.shopDetails.slice(0, 6) : user?.shopDetails;
  return (
    <Card className="px-3 shadow-none">
      {shops?.map((shop, index) => (
        <View key={shop.shopId}>
          <Pressable
            className={cn('flex-row items-center justify-between py-3', {
              'p-0': index == user?.shopDetails?.length - 1,
            })}
            onPress={() => router.push(`/(main)/(app)/shops/${shop.shopId}`)}>
            <P className="text-sm font-semibold">{shop.shopName}</P>
            <ChevronRight className="text-muted-foreground" size={18} />
          </Pressable>
          <Separator />
        </View>
      ))}
      <Pressable
        onPress={() => router.push('/shops')}
        className="flex-row items-center justify-between py-3">
        <P className="text-sm font-semibold">{getText('view_all')}</P>
        <ChevronRight className="text-muted-foreground" size={18} />
      </Pressable>
    </Card>
  );
};
