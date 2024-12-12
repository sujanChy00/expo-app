import { Link, Stack } from 'expo-router';
import { History, ShoppingCart, Truck } from 'lucide-react-native';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { useGetHomeData } from '@/api/home-api';
import { AnimatedArrowRight } from '@/components/home/animated-right-arrow';
import { SalesChart } from '@/components/home/sales-chart';
import { SalesData } from '@/components/home/sales-data';
import { ShopSelector } from '@/components/home/shop-selector';
import { MessagesList } from '@/components/messages/message-list';
import { RecommendedItems } from '@/components/recomended-items';
import { RecommendedItemsTable } from '@/components/recomended-items/recomended-items-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { H3, P } from '@/components/ui/typography';
import { isNative, isweb, screenHeaderShown } from '@/constants/data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useExitApp } from '@/hooks/useExitApp';
import useI18n from '@/hooks/useI81n';

export default function Screen() {
  const { isDarkColorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, isRefetching, refetch } = useGetHomeData();
  const { getText } = useI18n();
  useExitApp();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: getText('home'),
          headerStyle: {
            backgroundColor: isDarkColorScheme ? '#000' : '#fff',
          },
          headerTitleStyle: {
            color: isDarkColorScheme ? '#fff' : '#000',
          },
          headerShown: screenHeaderShown,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => setRefreshing(false));
            }}
          />
        }
        className="flex-1 bg-background"
        contentContainerClassName="md:p-6 p-3"
        showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-y-3">
          {isNative && <ShopSelector />}
          <SalesData />
          {isNative && (
            <View className="flex-row items-center gap-1">
              <Link href="/orders" asChild>
                <Button className="flex-1 flex-row gap-2 rounded-full">
                  <ShoppingCart color="white" size={18} />
                  <P className=" text-sm font-semibold text-white" style={{ fontSize: 14 }}>
                    {getText('view_orders')}
                  </P>
                  <AnimatedArrowRight />
                </Button>
              </Link>
              <Link href="/shipments" asChild>
                <Button className="flex-1 flex-row gap-2 rounded-full">
                  <Truck color="white" size={18} />
                  <P className=" text-sm font-semibold text-white" style={{ fontSize: 14 }}>
                    {getText('shipments')}
                  </P>
                </Button>
              </Link>
            </View>
          )}
          <SalesChart data={data} isPending={isPending || isRefetching} />
          {isweb && (
            <View className="flex-row items-start gap-4 web:sm:pt-10 md:pt-10">
              <View className="hidden flex-1 md:flex">
                <RecommendedItemsTable />
              </View>
              <View className="hidden gap-y-5 md:flex">
                <View className="flex-row items-center gap-x-2">
                  <H3>{getText('recent_messages')}</H3>
                  <History className="text-yellow-500" />
                </View>
                <Card className="h-auto p-2 pt-3">
                  <MessagesList className="h-auto p-0" messagesSize={6} />
                </Card>
              </View>
              <View className="flex flex-1 md:hidden">
                <RecommendedItems isPending={isPending || isRefetching} data={data} />
              </View>
            </View>
          )}
          {isNative && <RecommendedItems isPending={isPending || isRefetching} data={data} />}
        </View>
      </ScrollView>
    </>
  );
}
