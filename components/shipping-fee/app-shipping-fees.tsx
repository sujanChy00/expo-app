import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { FalllBackMesage } from '../fall-back-message';
import { RefreshingIcon } from '../refreshing-icon';
import { ShippingFeeCard } from './shipping-fee-card';
import { ShippingFeeCardSkeleton } from './shipping-fee-card-skeleton';

import { useGetShippingFee } from '@/api/shipping-fee-api';
import { useWindow } from '@/hooks/use-window';

/**
 * @description A React component that renders a list of shipping fees in a grid or list layout, adapting to the available screen width:
 *   - On web platforms (widths above 576px), it displays two `ShippingFeeCard` components per row in a grid layout.
 *   - On mobile platforms (widths below or equal to 576px), it presents a single `ShippingFeeCard` component per row in a list layout.
 * The component handles loading states, empty data scenarios, and utilizes `FlashList` for optimized rendering and performance, especially on larger datasets.
 *
 * @returns {JSX.Element} The rendered `AppShippingFees` component.
 */

export const AppShippingFees = () => {
  const { isXs } = useWindow();
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { data, isPending, refetch } = useGetShippingFee();
  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  return (
    <View className="flex-1 bg-background">
      <RefreshingIcon refreshing={refreshing} />
      <FlashList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          refetch().finally(() => setRefreshing(false));
        }}
        ListEmptyComponent={() => {
          if (isPending)
            return (
              <View className="flex-row flex-wrap items-center justify-center gap-4">
                <ShippingFeeCardSkeleton />
              </View>
            );
          return <FalllBackMesage message="No shipping fees found" />;
        }}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        key={numberOfColumns}
        data={data}
        keyboardDismissMode="on-drag"
        removeClippedSubviews
        keyExtractor={(fee, index) => fee.sellerShippingId.toString() + index}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item: shippingFee }) => <ShippingFeeCard shippingFee={shippingFee} />}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          contentContainerClassName: 'gap-4',
          key: numberOfColumns,
        })}
        {...(numberOfColumns > 1 && {
          columnWrapperClassName: 'gap-4',
        })}
      />
    </View>
  );
};
