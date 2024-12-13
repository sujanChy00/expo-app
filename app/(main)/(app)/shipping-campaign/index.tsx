import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AppCampaigns } from '@/components/shipping-campaign/app-campaigns';
import { screenHeaderShown } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import AppBack from '@/components/app-back';

const ShippingCampaign = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: getText('shipping_campaigns'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />
      <AppCampaigns />
    </View>
  );
};

export default ShippingCampaign;
