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

const OrderLayout = () => {
  const { getText } = useI18n();
  const { top } = useSafeAreaInsets();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

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
        name="orders"
        options={{
          tabBarLabel: getText('order_placed').toUpperCase(),
        }}
      />
      <MaterialTopTabs.Screen
        name="waiting-orders"
        options={{
          tabBarLabel: getText('wait_payment').toUpperCase(),
        }}
      />
      <MaterialTopTabs.Screen
        name="pending-orders"
        options={{
          tabBarLabel: getText('pending_change').toUpperCase(),
        }}
      />
      <MaterialTopTabs.Screen
        name="all-orders"
        options={{
          tabBarLabel: getText('all').toUpperCase(),
        }}
      />
    </MaterialTopTabs>
  );
};

export default OrderLayout;
