import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  AnimatedTab,
  AnimatedTabContent,
  AnimatedTabContentWrapper,
  AnimatedTabList,
  AnimatedTabTrigger,
} from '../ui/animated-tab';
import { SearchInput } from '../ui/search-input';
import { P } from '../ui/typography';
import AppOrders from './app-orders';
import { OrderFilters } from './order-filters';

import useI18n from '@/hooks/useI81n';

/**
 *
 * @description A React component that renders a tabbed interface for different order statuses.
 * Integrates with router for navigation and state management.
 *
 * @component
 * @returns {JSX.Element} The rendered OrderTabs component.
 */
export const OrderTabs = () => {
  const { getText } = useI18n();
  const router = useRouter();
  const params = useLocalSearchParams<{
    status?: string;
    startDate?: string;
    endDate?: string;
    query?: string;
  }>();

  return (
    <AnimatedTab
      numberOfTabs={4}
      onValueChange={(v) => {
        router.setParams({
          status: v,
          startDate: undefined,
          endDate: undefined,
        });
      }}>
      <AnimatedTabList>
        <AnimatedTabTrigger tabValue="ORDER_PLACED" index={0}>
          <P className="text-center">{getText('order_placed')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger className="flex-1" tabValue="WAITING_FOR_PAYMENT" index={1}>
          <P className="text-center">{getText('wait_payment')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger tabValue="PENDING_CHANGE" index={2}>
          <P className="text-center">{getText('pending_change')}</P>
        </AnimatedTabTrigger>
        <AnimatedTabTrigger tabValue="all" index={3}>
          <P className="text-center">{getText('all')}</P>
        </AnimatedTabTrigger>
      </AnimatedTabList>
      <AnimatedTabContentWrapper>
        <AnimatedTabContent tabValue="ORDER_PLACED" className="p-3 xs:p-6">
          <AppOrders status="ORDER_PLACED" />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="WAITING_FOR_PAYMENT" className="p-3 xs:p-6">
          <AppOrders status="WAITING_FOR_PAYMENT" />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="PENDING_CHANGE" className="p-3 xs:p-6">
          <AppOrders status="PENDING_CHANGE" />
        </AnimatedTabContent>
        <AnimatedTabContent tabValue="all" className="p-3 xs:p-6">
          <SearchInput placeholder="order_search_placeholder" className="mb-4" />
          <OrderFilters />
          <AppOrders type="all" status="all" />
        </AnimatedTabContent>
      </AnimatedTabContentWrapper>
    </AnimatedTab>
  );
};
