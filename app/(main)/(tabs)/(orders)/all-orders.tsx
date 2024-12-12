import { View } from 'react-native';
import React from 'react';
import AppOrders from '@/components/orders/app-orders';

const AllOrders = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <AppOrders status="all" />
    </View>
  );
};

export default AllOrders;
