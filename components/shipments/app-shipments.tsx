import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { ShipmentCard } from './shipment-card';
import { SortShipments } from './sort-shipments';

import { useGetAllShipments } from '@/api/order-api';
import { P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { cn } from '@/lib/utils';

export const AppShipments = ({ className }: { className?: string }) => {
  const { getText } = useI18n();
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const params = useLocalSearchParams<{
    filter?: string;
  }>();

  useEffect(() => {
    setNumberOfColumns(width > 576 ? 2 : 1);
  }, [width]);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isPending, refetch } =
    useGetAllShipments({
      filter: params?.filter || 'current',
    });

  useRefreshOnFocus(refetch);

  const shipments = data ? data?.pages?.flatMap((item) => item?.content) : [];
  const isLoading = isPending || refreshing;
  return (
    <>
      <Stack.Screen
        options={{
          title: getText('shipments'),
          headerBackTitle: 'back',
        }}
      />
      <View className={cn('flex-1 gap-y-4 bg-background p-3', className)}>
        <View className="flex-row items-center justify-between">
          <P className="text-accent-foreground">
            {isLoading ? 'Loading...' : data?.pages[0].message}
          </P>
          <SortShipments />
        </View>

        <FlashList
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch().finally(() => setRefreshing(false));
          }}
          ListEmptyComponent={() => {
            if (isPending)
              return (
                <View className="flex-1 items-center justify-center bg-background">
                  <ActivityIndicator size="large" />
                </View>
              );
            return <FalllBackMesage message="No shipments found" />;
          }}
          showsVerticalScrollIndicator={false}
          key={numberOfColumns}
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          data={shipments}
          removeClippedSubviews
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="on-drag"
          estimatedItemSize={100}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(data, index) => data.orderId + index.toString()}
          renderItem={({ item: data }) => <ShipmentCard data={data} />}
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
      </View>
    </>
  );
};
