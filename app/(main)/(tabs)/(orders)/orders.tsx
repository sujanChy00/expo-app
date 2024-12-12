import React from 'react';

import AppOrders from '@/components/orders/app-orders';
import { View } from 'react-native';

const OrdersScreen = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <AppOrders status="ORDER_PLACED" />
    </View>
  );
};

export default OrdersScreen;
