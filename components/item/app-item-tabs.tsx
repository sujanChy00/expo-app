import { View } from 'react-native';

import { ExpiredItems } from '../critical-items/expired-items';
import { LowStockItems } from '../critical-items/low-stock-items';
import { AppStockItems } from '../stock-items/app-stock-items';
import {
  AnimatedTab,
  AnimatedTabContent,
  AnimatedTabContentWrapper,
  AnimatedTabList,
  AnimatedTabTrigger,
} from '../ui/animated-tab';
import { SearchInput } from '../ui/search-input';
import { P } from '../ui/typography';
import { AppItems } from './app-items';

import useI18n from '@/hooks/useI81n';

export const AppItemTabs = () => {
  const { getText } = useI18n();

  return (
    <AnimatedTab numberOfTabs={4}>
      <AnimatedTabList>
        <AnimatedTabTrigger tabValue="all" index={0}>
          <P className="text-center">{getText('all')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger tabValue="lowStock" index={1}>
          <P className="text-center">{getText('low_stock')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger tabValue="expired" index={2}>
          <P className="text-center">{getText('expired_items')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger tabValue="item-stock" index={3}>
          <P className="text-center">{getText('item_stock')}</P>
        </AnimatedTabTrigger>
      </AnimatedTabList>
      <AnimatedTabContentWrapper>
        <AnimatedTabContent tabValue="all">
          <View className="pt-3 ">
            <SearchInput placeholder="search_items" />
          </View>
          <AppItems />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="lowStock">
          <LowStockItems />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="expired">
          <ExpiredItems />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="item-stock">
          <View className="py-3 ">
            <SearchInput placeholder="search_items" />
          </View>
          <AppStockItems />
        </AnimatedTabContent>
      </AnimatedTabContentWrapper>
    </AnimatedTab>
  );
};
