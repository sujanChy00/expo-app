import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useGetShopDetails } from '@/api/shop-api';
import { ShopForm } from '@/forms/shop/shop-form';
import useI18n from '@/hooks/useI81n';

const EditShop = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending } = useGetShopDetails(id as string);
  const { getText } = useI18n();

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="items-center" />
        <Stack.Screen
          options={{
            title: getText('Loading'),
            headerBackTitle: 'back',
          }}
        />
      </View>
    );
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <Stack.Screen
        options={{
          title: getText('edit_shop'),
          headerBackTitle: 'back',
        }}
      />
      <ShopForm shop={data} />
    </View>
  );
};

export default EditShop;
