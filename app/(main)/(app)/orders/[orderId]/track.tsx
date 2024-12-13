import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Platform, RefreshControl, ScrollView, View } from 'react-native';

import { useGetOrderTrackingDetails } from '@/api/order-api';
import { FalllBackMesage } from '@/components/fall-back-message';
import { OrderTrackingDetails } from '@/components/orders/order-tracking-details';
import { H3, P } from '@/components/ui/typography';
import useI18n from '@/hooks/useI81n';

const TrackOrderScreen = () => {
  const { getText } = useI18n();
  const [refreshing, setRefreshing] = useState(false);
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { data, isPending, refetch } = useGetOrderTrackingDetails(Number(orderId));

  if (isPending || refreshing) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Stack.Screen
          options={{
            title: 'Loading...',
            headerBackTitle: 'back',
          }}
        />
      </View>
    );
  }

  if (!data)
    return (
      <>
        <FalllBackMesage className="flex-1" message="Tracking details failed to load" />
        <Stack.Screen
          options={{
            title: getText('tracking_details'),
            headerBackTitle: 'back',
          }}
        />
      </>
    );
  console.log(data?.details);

  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <Stack.Screen
        options={{
          title: getText('tracking_details'),
          headerBackTitle: 'back',
        }}
      />
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
        className="flex-1">
        {Platform.OS === 'web' && (
          <View className="space-y-1 pb-6">
            <H3>{getText('tracking_details')}</H3>
          </View>
        )}
        {!!data?.shippingCompany && (
          <View className="flex-row items-center gap-x-6 pb-3">
            <P className="text-lg font-semibold text-foreground">{getText('shipping_company')}:</P>
            <P className="text-foreground">{data.shippingCompany}</P>
          </View>
        )}
        {!!data?.shippingCompany && (
          <View className="flex-row items-center gap-x-6 pb-3">
            <P className="text-lg font-semibold text-foreground">{getText('name')}:</P>
            <P className="text-foreground">{data.userFullName}</P>
          </View>
        )}

        <OrderTrackingDetails order={data} />
      </ScrollView>
    </View>
  );
};

export default TrackOrderScreen;
