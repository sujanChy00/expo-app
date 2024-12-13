import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AppShippingFees } from '@/components/shipping-fee/app-shipping-fees';
import { ResetShop } from '@/components/shop/reset-shop';
import { P } from '@/components/ui/typography';
import { screenHeaderShown } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import AppBack from '@/components/app-back';

const ShippingFee = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: getText('shipping_fees'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
          headerRight: () => (
            <ResetShop size="sm" variant="link">
              <P className="text-destructive">{getText('reset')}</P>
            </ResetShop>
          ),
        }}
      />
      <AppShippingFees />
    </View>
  );
};

export default ShippingFee;
