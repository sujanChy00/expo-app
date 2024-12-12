import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { ItemStockCard } from './item-stock-card';
import { StockItemSkeleton } from './stock-item-skeleton';

import { getStockItems } from '@/api/item-api';
import { useWindow } from '@/hooks/use-window';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { cn } from '@/lib/utils';
import { useSelectedShop } from '@/providers/auth-provider';

export const AppStockItems = ({ className }: { className?: string }) => {
  const { isXs } = useWindow();
  const params = useLocalSearchParams<{
    query?: string;
  }>();
  const { selectedShop } = useSelectedShop();
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const [refresing, setRefreshing] = useState(false);
  const { data, hasNextPage, refetch, fetchNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ['infinite-item-stock', selectedShop?.shopId, params],
      queryFn: ({ pageParam = 0 }) =>
        getStockItems(
          {
            size: 20,
            page: pageParam,
            q: params?.query,
          },
          selectedShop?.shopId as number
        ),
      enabled: !!selectedShop?.shopId,
      initialPageParam: 0,
      getNextPageParam(res) {
        return res.last ? undefined : res.pageNumber + 1;
      },
    });

  useRefreshOnFocus(refetch);

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  const items = data?.pages.flatMap((item) => item.content);

  return (
    <SafeAreaView className={cn('flex-1 bg-background', className)}>
      <RefreshingIcon refreshing={refresing} />

      <FlashList
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        data={items}
        refreshing={refresing}
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <StockItemSkeleton />
              </View>
            );
          return <FalllBackMesage message="No items found" />;
        }}
        onRefresh={() => {
          setRefreshing(true);
          refetch().then(() => setRefreshing(false));
        }}
        keyboardDismissMode="on-drag"
        removeClippedSubviews
        onEndReachedThreshold={0.5}
        className="flex flex-1 bg-background"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.id + item.name}
        renderItem={({ item }) => <ItemStockCard item={item} />}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListFooterComponentStyle={{
          padding: 10,
          alignItems: 'center',
        }}
        ListFooterComponent={() => {
          if (isFetchingNextPage) {
            return (
              <View className="items-center justify-center py-4">
                <ActivityIndicator />
              </View>
            );
          }
          return null;
        }}
      />
    </SafeAreaView>
  );
};
