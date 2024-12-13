import {
  useGetAvailableDeliveryTimes,
  useGetShopAvailableDeliveryTimes,
} from '@/api/delivery-slots-api';
import AppBack from '@/components/app-back';
import { DeliveryTimeCardSkeleton } from '@/components/delive-time-slots/delivery-time-card-skeleton';
import { DeliveryTimeCards } from '@/components/delive-time-slots/delivey-time-cards';
import { FalllBackMesage } from '@/components/fall-back-message';
import { H3 } from '@/components/ui/typography';
import { isweb, screenHeaderShown } from '@/constants/data';
import { getDeliveyTimeSlots } from '@/data/delivery-time-slots';
import useI18n from '@/hooks/useI81n';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

const DeliveryTimes = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { getText } = useI18n();
  const { data, isPending } = useGetAvailableDeliveryTimes();
  const {
    data: currentTimeSlot,
    isPending: isLoading,
    refetch,
  } = useGetShopAvailableDeliveryTimes();

  const Loading = isPending || isLoading || refreshing;
  const isDefault = !Loading && currentTimeSlot;

  const { isDataEmpty, timeSlots } = getDeliveyTimeSlots(Loading, data, currentTimeSlot);

  return (
    <View className="flex-1 bg-background p-3 text-foreground xs:p-6">
      <Stack.Screen
        options={{
          headerShown: screenHeaderShown,
          title: getText('delivery_time_slots'),
          headerBackVisible: false,
          headerLeft: () => {
            return <AppBack />;
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
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
        {isweb && <H3 className="hidden sm:flex">{getText('delivery_time')}</H3>}
        {isDataEmpty && <FalllBackMesage message="No delivery times available" />}
        <View className={'grid grid-cols-1 gap-3 xs:grid-cols-2 sm:pt-3 md:grid-cols-4'}>
          {isDefault && <DeliveryTimeCards timeSlots={currentTimeSlot} default />}
          {Loading ? (
            <DeliveryTimeCardSkeleton />
          ) : (
            timeSlots.map((timeSlots) => (
              <DeliveryTimeCards key={timeSlots.shippingCompanyId} timeSlots={timeSlots} />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DeliveryTimes;
