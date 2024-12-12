import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { AppShopUsers } from '@/components/shop-users/app-shop-users';
import { screenHeaderShown } from '@/constants/data';
import useI18n from '@/hooks/useI81n';

const ShopUsers = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: getText('shop_users'),
          headerBackTitle: 'back',
        }}
      />
      <AppShopUsers />
    </View>
  );
};

export default ShopUsers;
