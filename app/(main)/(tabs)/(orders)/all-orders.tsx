import { View } from 'react-native';
import AppOrders from '@/components/orders/app-orders';
import { SearchInput } from '@/components/ui/search-input';
import { OrderFilters } from '@/components/orders/order-filters';
import { OrderFilteredResultsText } from '@/components/orders/orders-filter-results-text';

const AllOrders = () => {
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <SearchInput placeholder="order_search_placeholder" className="mb-4" />
      <OrderFilters />
      <OrderFilteredResultsText />
      <AppOrders status="all" />
    </View>
  );
};

export default AllOrders;
