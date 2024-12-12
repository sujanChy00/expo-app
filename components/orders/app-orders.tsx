import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { OrderCard } from './order-card';
import { OrderCardSkeleton } from './order-card-skeleton';
import { OrderFilteredResultsText } from './orders-filter-results-text';

import { useGetAllOrders } from '@/api/order-api';
import { useWindow } from '@/hooks/use-window';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { cn } from '@/lib/utils';
import { IOrderProgress } from '@/types/ITransaction';

interface Props {
  type?: 'all';
  status?: IOrderProgress | 'all';
  className?: string;
}

const AppOrders = ({ status, className, type }: Props) => {
  const [refresing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { isXs } = useWindow();

  const params = useLocalSearchParams<{
    status?: string;
    startDate?: string;
    endDate?: string;
    query?: string;
  }>();

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, refetch } =
    useGetAllOrders({
      size: 30,
      sortBy: params?.status || status,
      from: params?.startDate,
      to: params.endDate,
      orderId: params?.query,
    });

  useRefreshOnFocus(refetch);

  const orders = data ? data?.pages?.flatMap((item) => item?.content) : [];

  return (
    <View className={cn('flex-1 bg-background', className)}>
      <RefreshingIcon refreshing={refresing} />
      {type === 'all' && (
        <OrderFilteredResultsText
          isPending={isPending}
          orders={data?.pages[0]?.totalElements || 0}
        />
      )}
      <FlashList
        refreshing={refresing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        showsVerticalScrollIndicator={false}
        key={numberOfColumns}
        automaticallyAdjustContentInsets
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustsScrollIndicatorInsets
        data={orders}
        removeClippedSubviews
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <OrderCardSkeleton />
              </View>
            );
          return <FalllBackMesage message="No orders found" />;
        }}
        keyboardDismissMode="on-drag"
        estimatedItemSize={100}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(order, index) => order.orderId + order.orderDateTimestamp + index}
        renderItem={({ item: order }) => <OrderCard order={order} key={order.orderId} />}
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
                <ActivityIndicator size="large" />
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default AppOrders;
