import React from 'react';
import { View } from 'react-native';

import { AppStockItems } from '@/components/stock-items/app-stock-items';

const StockItems = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <AppStockItems />
    </View>
  );
};

export default StockItems;
