import React from 'react';
import { View } from 'react-native';

import { ExpiredItems } from '@/components/critical-items/expired-items';

const ExpiredItemsScreen = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <ExpiredItems />
    </View>
  );
};

export default ExpiredItemsScreen;
