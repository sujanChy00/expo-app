import React from 'react';
import { View } from 'react-native';

import { AppItemTabs } from '@/components/item/app-item-tabs';
import { ItemTabs } from '@/components/item/item-tabs';

const WebItemsPage = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <ItemTabs />
      <View className="flex flex-1 md:hidden">
        <AppItemTabs />
      </View>
    </View>
  );
};

export default WebItemsPage;
