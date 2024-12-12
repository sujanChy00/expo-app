import React from 'react';
import { View } from 'react-native';

import { AppItems } from '@/components/item/app-items';
import { SearchInput } from '@/components/ui/search-input';

const ItemsScreen = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <SearchInput placeholder="search_items" />
      <AppItems />
    </View>
  );
};

export default ItemsScreen;
