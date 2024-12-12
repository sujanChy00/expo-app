import React from 'react';
import { View } from 'react-native';

import { AppCampaigns } from '@/components/shipping-campaign/app-campaigns';
import { CampaignTable } from '@/components/shipping-campaign/campaign-table';
import { useWindow } from '@/hooks/use-window';

const WebShippingCampaignPage = () => {
  const { isMd } = useWindow();
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <View className="flex-1 bg-background p-2">
        <CampaignTable />
        {isMd && <AppCampaigns />}
      </View>
    </View>
  );
};

export default WebShippingCampaignPage;
