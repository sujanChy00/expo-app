import { OrderTable } from '@/components/orders/order-table';
import { OrderTabs } from '@/components/orders/order-tabs';
import { useWindow } from '@/hooks/use-window';
import { View } from 'react-native';

const WebOrderPage = () => {
  const { isMd } = useWindow();
  return (
    <View className="flex-1 bg-background p-3 md:p-6">
      <OrderTable />
      {isMd && <OrderTabs />}
    </View>
  );
};

export default WebOrderPage;
