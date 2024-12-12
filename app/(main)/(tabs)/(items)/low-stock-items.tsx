import React from 'react';
import { View } from 'react-native';

import { LowStockItems } from '@/components/critical-items/low-stock-items';

const LowStockItemsScreen = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <LowStockItems />
    </View>
  );
};

export default LowStockItemsScreen;
