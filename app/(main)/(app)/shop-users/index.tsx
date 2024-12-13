import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AppShopUsers } from '@/components/shop-users/app-shop-users';
import { screenHeaderShown } from '@/constants/data';
import useI18n from '@/hooks/useI81n';
import AppBack from '@/components/app-back';

const ShopUsers = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: getText('shop_users'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />
      <AppShopUsers />
    </View>
  );
};

export default ShopUsers;
