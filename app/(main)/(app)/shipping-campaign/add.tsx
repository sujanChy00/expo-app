import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { ShippingCampaignForm } from '@/forms/shipping-campaign/shipping-campaign-form';
import useI18n from '@/hooks/useI81n';

const AddCampaignScreen = () => {
  const { getText } = useI18n();
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <Stack.Screen options={{ title: getText('add'), headerBackTitle: 'back' }} />
      <ShippingCampaignForm />
    </View>
  );
};

export default AddCampaignScreen;
