import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, Hourglass, Package, ShoppingCart } from 'lucide-react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { ExpiredItems } from '../critical-items/expired-items';
import { ExpiredItemsTable } from '../critical-items/expired-items-table';
import { LowStockItems } from '../critical-items/low-stock-items';
import { LowStockItemsTable } from '../critical-items/low-stock-items-table';
import { AppStockItems } from '../stock-items/app-stock-items';
import { ItemStockTable } from '../stock-items/item-stock-table';
import { SearchInput } from '../ui/search-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { P } from '../ui/typography';
import { AppItems } from './app-items';
import { ItemTable } from './items-table';

import useI18n from '@/hooks/useI81n';
import { useSelectedShop } from '@/providers/auth-provider';
import { tabStyle } from '@/utils/get-styles';

/**
 * @description A React component that renders a tabbed interface for managing items, including sections for all items, low stock items, and expired items.
 * @typedef {Object} SearchParams
 * @property {string} [view] - The current tab view (e.g., "items", "low-stock", "expired-items").
 *
 *
 * @param {} props - Component props (not explicitly defined).
 * @returns {JSX.Element} The rendered item tabs component.
 */
export const ItemTabs = () => {
  const { getText } = useI18n();
  const { isSastoSulavSelected } = useSelectedShop();
  const params = useLocalSearchParams<{ view?: string }>();
  const [value, setValue] = useState(params.view || 'items');
  const router = useRouter();
  return (
    <Tabs
      value={value}
      onValueChange={(view) => {
        setValue(view);

        router.push({
          pathname: '/items',
          params: {
            view,
          },
        });
      }}
      className="hidden pt-3 md:flex">
      <TabsList className="flex-row justify-start gap-x-5 rounded-none border-b border-b-border bg-transparent p-0 shadow-none">
        <TabsTrigger
          value="items"
          className="flex-row gap-x-2 rounded-none py-2 shadow-none"
          style={tabStyle(value, 'items')}>
          <ShoppingCart size={16} />
          <P className="font-medium capitalize">{getText('items').toLowerCase()}</P>
        </TabsTrigger>
        <TabsTrigger
          value="low-stock"
          className="flex-row gap-x-2 rounded-none py-2 shadow-none"
          style={tabStyle(value, 'low-stock')}>
          <Hourglass size={16} />
          <P className="font-medium">{getText('low_stock_items')}</P>
        </TabsTrigger>
        <TabsTrigger
          value="expired-items"
          className="flex-row gap-x-2 rounded-none py-2 shadow-none"
          style={tabStyle(value, 'expired-items')}>
          <AlertTriangle size={16} />
          <P className="font-medium">{getText('expired_items')}</P>
        </TabsTrigger>
        {isSastoSulavSelected && (
          <TabsTrigger
            value="item-stock"
            className="flex-row gap-x-2 rounded-none py-2 shadow-none"
            style={tabStyle(value, 'item-stock')}>
            <Package size={16} />
            <P className="font-medium">{getText('item_stock')}</P>
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="items" className="pt-10">
        <ItemTable className="hidden md:flex" />
        <View className="flex md:hidden">
          <SearchInput placeholder="search_items" />
        </View>
        <AppItems className="flex md:hidden" />
      </TabsContent>
      <TabsContent value="low-stock" className="pt-10">
        <LowStockItemsTable className="hidden md:flex" />
        <LowStockItems className="flex md:hidden" />
      </TabsContent>
      <TabsContent value="expired-items" className="pt-10">
        <ExpiredItemsTable className="hidden md:flex" />
        <ExpiredItems className="flex md:hidden" />
      </TabsContent>
      {isSastoSulavSelected && (
        <TabsContent value="item-stock" className="gap-6 pt-10">
          <ItemStockTable className="hidden md:flex" />
          <View className="flex md:hidden">
            <SearchInput placeholder="search_items" />
          </View>
          <AppStockItems className="flex md:hidden" />
        </TabsContent>
      )}
    </Tabs>
  );
};
