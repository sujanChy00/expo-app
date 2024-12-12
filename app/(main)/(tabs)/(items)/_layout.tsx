import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import useI18n from '@/hooks/useI81n';
import { NAV_THEME } from '@/constants/colors';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const ItemsLayout = () => {
  const { isDarkColorScheme, colorScheme } = useColorScheme();
  const { top } = useSafeAreaInsets();
  const { getText } = useI18n();
  return (
    <MaterialTopTabs
      screenOptions={{
        lazy: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#14522d',
        },
        tabBarContentContainerStyle: {
          justifyContent: 'space-between',
        },
        tabBarStyle: {
          backgroundColor: isDarkColorScheme ? '#18181b' : '#e5e7eb',
          borderBottomWidth: 1,
          borderBottomColor: NAV_THEME[colorScheme].border,
          borderStyle: 'solid',
          paddingTop: top,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
      }}>
      <MaterialTopTabs.Screen
        name="items"
        options={{
          tabBarLabel: getText('items'),
        }}
      />
      <MaterialTopTabs.Screen
        name="stock-items"
        options={{
          tabBarLabel: getText('item_stock').toUpperCase(),
        }}
      />
      <MaterialTopTabs.Screen
        name="low-stock-items"
        options={{
          tabBarLabel: getText('low_stock').toUpperCase(),
        }}
      />
      <MaterialTopTabs.Screen
        name="expired-items"
        options={{
          tabBarLabel: getText('expired_items').toUpperCase(),
        }}
      />
    </MaterialTopTabs>
  );
};

export default ItemsLayout;
