import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { SortItems } from '../item/sort-items';
import { RefreshingIcon } from '../refreshing-icon';

import { getExpiredItems } from '@/api/item-api';
import { CriticalItemsCardSkeleton } from '@/components/critical-items/critical-item-card-skeleton';
import { CriticalItemsCard } from '@/components/critical-items/critical-items-card';
import { useWindow } from '@/hooks/use-window';
import useI18n from '@/hooks/useI81n';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';

export const ExpiredItems = ({ className }: { className?: string }) => {
  const { isXs } = useWindow();
  const { selectedShop } = useSelectedShop();
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { getText } = useI18n();
  const params = useLocalSearchParams<{
    order?: string;
    sort?: string;
  }>();
  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  const { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['ExpiredItems', selectedShop?.shopId, params],
      queryFn: ({ pageParam = 0 }) =>
        getExpiredItems(
          {
            size: 20,
            page: pageParam,
            sort: params?.sort,
            order: params?.order ? Number(params?.order) : undefined,
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
    <View className={cn('flex-1 bg-background', className)}>
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
                <CriticalItemsCardSkeleton numOfSkeletons={30} />
              </View>
            );
          return <FalllBackMesage message="No expired items found" />;
        }}
        estimatedItemSize={100}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().then(() => setRefreshing(false));
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        key={numberOfColumns}
        data={expiredItems}
        renderItem={({ item }) => <CriticalItemsCard item={item} />}
        keyExtractor={(item, index) => item.itemId + item.itemExpiryDateString + index}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
