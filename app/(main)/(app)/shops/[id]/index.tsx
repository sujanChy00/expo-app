import { Link, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, View } from 'react-native';

import { useGetShopDetails } from '@/api/shop-api';
import { FalllBackMesage } from '@/components/fall-back-message';
import { RefreshingIcon } from '@/components/refreshing-icon';
import { ShopHeader } from '@/components/shop/shop-header';
import { ShopInfo } from '@/components/shop/shop-info';
import { ShopSupportedAreas } from '@/components/shop/shop-supported-areas';
import { Button } from '@/components/ui/button';
import { P } from '@/components/ui/typography';
import { isNative } from '@/constants/data';

const ShopDetailScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, refetch } = useGetShopDetails(params.id as string);
  if (isPending || refreshing)
    return (
      <View className="flex-1 items-center justify-center bg-background text-foreground">
        <ActivityIndicator size="large" className="items-center" />
        <Stack.Screen
          options={{
            headerTitle: 'Loading...',
            headerBackTitle: 'back',
          }}
        />
      </View>
    );
  if (!data)
    return (
      <>
        <FalllBackMesage className="flex-1" message="Something went wrong!" />
        <Stack.Screen
          options={{
            title: 'Opps!',
            headerBackTitle: 'back',
          }}
        />
      </>
    );
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <Stack.Screen
        options={{
          headerTitle: data.shopName,
          headerBackTitle: 'back',
        }}
      />
      <RefreshingIcon refreshing={refreshing} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => setRefreshing(false));
            }}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View className="gap-5">
          <ShopHeader shop={data} />
          <View className="flex-1 gap-2 md:gap-6 web:md:flex-row web:md:items-start">
            <ShopInfo shop={data} />
            <ShopSupportedAreas areas={data.shopSupportedAreas} />
          </View>
        </View>
        {isNative && (
          <Link href={`/shops/${data.shopId}/edit`} asChild>
            <Button
              className="h-9 flex-1 rounded-lg"
              style={{ backgroundColor: '#14532d' }}
              variant="tertiary">
              <P className="font-semibold text-white">Edit Shop</P>
            </Button>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default ShopDetailScreen;
