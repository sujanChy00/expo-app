import React from 'react';
import { View } from 'react-native';

import { AppShopUsers } from '@/components/shop-users/app-shop-users';
import { ShopUsersTable } from '@/components/shop-users/shop-users-table';

const WebShopUserPage = () => {
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <ShopUsersTable />
      <AppShopUsers className="flex md:hidden" />
    </View>
  );
};

export default WebShopUserPage;
