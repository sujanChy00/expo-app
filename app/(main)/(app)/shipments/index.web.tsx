import { View } from 'react-native';

import { AppShipments } from '@/components/shipments/app-shipments';
import { ShipmentTable } from '@/components/shipments/shipment-table';

const TrackOrdersWebPage = () => {
  return (
    <View className="flex-1 bg-background p-3 xs:p-6">
      <ShipmentTable />
      <View className="flex flex-1 bg-background md:hidden">
        <AppShipments />
      </View>
    </View>
  );
};

export default TrackOrdersWebPage;
