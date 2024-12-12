import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { ShopUsersCard } from './shop-users-card';
import { ShopUsersCardSkeleton } from './shop-users-card-skeleton';

import { useGetAllShopUsers } from '@/api/shop-api';
import { useWindow } from '@/hooks/use-window';
import { cn } from '@/lib/utils';

/**
 * @description A React component that renders a list of shop users in a grid layout, adapting the number of columns based on the screen size. It displays a loading skeleton while data is fetched, a "No Users" message if no data is found, and individual user cards otherwise.
 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} The rendered `AppShopUsers` component.
 */
export const AppShopUsers = ({ className }: { className?: string }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { data, isPending, refetch } = useGetAllShopUsers();
  const { isXs } = useWindow();
  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  return (
    <>
      <RefreshingIcon refreshing={refreshing} />
      <FlashList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        ListEmptyComponent={() => {
          if (isPending) {
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <ShopUsersCardSkeleton />
              </View>
            );
          }

          return <FalllBackMesage message="No Users" />;
        }}
        estimatedItemSize={100}
        data={data}
        showsVerticalScrollIndicator={false}
        key={numberOfColumns}
        removeClippedSubviews
        keyboardDismissMode="on-drag"
        className={cn('flex-1 bg-background', className)}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={({ sellerId, sellerEmail }) => sellerEmail + sellerId}
        renderItem={({ item: user }) => <ShopUsersCard user={user} />}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
      />
    </>
  );
};
