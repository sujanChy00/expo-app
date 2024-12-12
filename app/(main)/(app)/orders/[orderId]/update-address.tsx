import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { useGetOrderById } from '@/api/order-api';
import { ShippingAddressForm } from '@/forms/shipping-address/shipping-address-form';
import { IShippingAddress } from '@/types/ITransaction';

const UpdateAddress = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { data, isPending } = useGetOrderById({ id: Number(orderId) });

  if (isPending)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    );

  const shippingAddress: IShippingAddress & { prefecture: string } = {
    address1: (data?.updateAddressRequest?.address1 || data?.userDetail?.address1) as string,
    address2: (data?.updateAddressRequest?.address2 || data?.userDetail?.address2) as string,
    city: (data?.updateAddressRequest?.city || data?.userDetail?.city) as string,
    postalCode: (data?.updateAddressRequest?.postalCode || data?.userDetail?.postalCode) as string,
    prefecture:
      data?.updateAddressRequest?.prefecture.name || (data?.userDetail.prefecture as string),
  };

  const sellerRequest = !!data?.updateAddressRequest;

  return (
    <View className="flex-1 bg-background p-3 text-foreground xs:p-6">
      <Stack.Screen options={{ title: 'Update Address' }} />
      <ShippingAddressForm
        address={{
          ...shippingAddress,
          sellerRequest,
        }}
      />
    </View>
  );
};

export default UpdateAddress;
