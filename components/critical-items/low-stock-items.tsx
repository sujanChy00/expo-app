import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';

import { getLowStockItems } from '@/api/item-api';
import { CriticalItemsCardSkeleton } from '@/components/critical-items/critical-item-card-skeleton';
import { CriticalItemsCard } from '@/components/critical-items/critical-items-card';
import { SortItems } from '@/components/item/sort-items';
import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';

export const LowStockItems = ({ className }: { className?: string }) => {
  const { isXs } = useWindow();
  const { selectedShop } = useSelectedShop();
  const [refreshing, setRefreshing] = useState(false);
  const { getText } = useI18n();

  const params = useLocalSearchParams<{
    order?: string;
    sort?: string;
  }>();

  const [numberOfColumns, setNumberOfColumns] = useState(1);
  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['LowstockItems', selectedShop?.shopId, params],
      queryFn: ({ pageParam = 0 }) =>
        getLowStockItems(
          {
            size: 20,
            page: pageParam,
            order: params?.order ? Number(params?.order) : undefined,
            sort: params?.sort,
          },
          selectedShop?.shopId as number
        ),
      enabled: !!selectedShop?.shopId,
      initialPageParam: 0,
      getNextPageParam(res) {
        return res.last ? undefined : res.pageNumber + 1;
      },
    });

  const expiredItems = data ? data?.pages.flatMap((page) => page.content) : [];

  return (
    <View className={cn('flex-1 bg-background text-foreground', className)}>
      <SortItems
        options={[
          {
            label: getText('stock'),
            value: 'stock',
          },
          {
            label: getText('expiry_date'),
            value: 'exp_date',
          },
        ]}
      />
      <RefreshingIcon refreshing={refreshing} />
      <FlashList
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <CriticalItemsCardSkeleton type="low-stock" numOfSkeletons={30} />
              </View>
            );
          return <FalllBackMesage message="No low stock items found" />;
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().then(() => setRefreshing(false));
        }}
        estimatedItemSize={100}
        keyboardDismissMode="on-drag"
        key={numberOfColumns}
        data={expiredItems}
        removeClippedSubviews
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => <CriticalItemsCard type="low-stock" item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => item.itemId + item.itemExpiryDateString + index}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          contentContainerClassName: 'gap-4',
          key: numberOfColumns,
        })}
        {...(numberOfColumns > 1 && {
          columnWrapperClassName: 'gap-4',
        })}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        ListFooterComponentStyle={{
          padding: 10,
          alignItems: 'center',
        }}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <View className="items-center justify-center py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
      />
    </View>
  );
};
