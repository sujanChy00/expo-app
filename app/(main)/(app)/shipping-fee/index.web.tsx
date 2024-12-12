import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

import { AppShippingFees } from '@/components/shipping-fee/app-shipping-fees';
import { ShippingFeeTable } from '@/components/shipping-fee/shipping-fee-table';
import { ResetShop } from '@/components/shop/reset-shop';
import { useWindow } from '@/hooks/use-window';

const ShippingFee = () => {
  const { isMd } = useWindow();

  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <ShippingFeeTable />
      <View className="fixed bottom-2 right-1 z-40 flex md:hidden">
        <Animated.View entering={SlideInDown.duration(500)}>
          <ResetShop className="h-12 w-12 rounded-full">
            <Feather name="refresh-ccw" size={20} color="#fff" />
          </ResetShop>
        </Animated.View>
      </View>
      {isMd && <AppShippingFees />}
    </View>
  );
};

export default ShippingFee;
