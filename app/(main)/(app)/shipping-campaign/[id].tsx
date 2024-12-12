import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useGetShippingCampaignById } from '@/api/campaign-api';
import { ShippingCampaignForm } from '@/forms/shipping-campaign/shipping-campaign-form';
import useI18n from '@/hooks/useI81n';

const CampaignDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getText } = useI18n();
  const { data, isPending } = useGetShippingCampaignById(id as string);

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Stack.Screen
          options={{
            title: getText('edit'),
          }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  return (
    <View className="native:pb-5 flex-1 bg-background p-3 md:p-6">
      <Stack.Screen
        options={{
          title: getText('edit'),
          headerBackTitle: 'back',
        }}
      />
      <ShippingCampaignForm campaign={data} />
    </View>
  );
};

export default CampaignDetails;
