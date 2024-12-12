import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useGetShippingFee } from '@/api/shipping-fee-api';
import { ShippingFeeForm } from '@/forms/shippping-fee/shipping-fee-form';
import useI18n from '@/hooks/useI81n';

const ShippindFeeDetails = () => {
  const { data, isPending } = useGetShippingFee();
  const { getText } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background text-foreground">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const shippingFee =
    data && data.find((shippingFee) => String(shippingFee.sellerShippingId) === id);
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <Stack.Screen options={{ title: getText('edit') }} />
      <ShippingFeeForm shippingFee={shippingFee} />
    </View>
  );
};

export default ShippindFeeDetails;
