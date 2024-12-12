import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { FalllBackMesage } from '@/components/fall-back-message';
import { ShopCard } from '@/components/shop/shop-card';
import { screenHeaderShown } from '@/constants/data';
import { useUser } from '@/hooks/use-user';
import { useWindow } from '@/hooks/use-window';

const ShopScreen = () => {
  const [numberOfColumns, setNumberOfColumns] = useState(1);
  const { user } = useUser();
  const { isXs } = useWindow();

  useEffect(() => {
    setNumberOfColumns(isXs ? 2 : 1);
  }, [isXs]);

  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: 'My Shops',
          headerBackTitle: 'back',
        }}
      />
      <FlashList
        estimatedItemSize={100}
        ListEmptyComponent={() => <FalllBackMesage message="No shops found" />}
        data={user?.shopDetails}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item) => item.shopId.toString()}
        renderItem={({ item: shop }) => <ShopCard shop={shop} />}
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}
        {...(numberOfColumns > 1 && {
          numColumns: numberOfColumns,
          key: numberOfColumns,
        })}
      />
    </View>
  );
};

export default ShopScreen;
