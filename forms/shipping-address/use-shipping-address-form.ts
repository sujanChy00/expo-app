import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ShippingAddressFormValues, ShippingAddressSchema } from './shipping-address-schema';

import { useChangeShippingAddress, useUpdateShippingAddress } from '@/actions/order';
import { useGetAddressInfo } from '@/api/profile-api';
import useI18n from '@/hooks/useI81n';
import { errorToast, successToast } from '@/lib/toast';
import { IShippingAddress } from '@/types/ITransaction';

export const useShippingAddressForm = (
  address?: (IShippingAddress & { sellerRequest?: boolean; prefecture: string }) | null
) => {
  const { getText } = useI18n();
  const { orderid } = useLocalSearchParams<{ orderid: string }>();

  const { mutateAsync: udpateShippingAddress, isPending: updatingShippingAddress } =
    useUpdateShippingAddress();
  const { mutateAsync: changeShippingAddress, isPending: changingShippingAddress } =
    useChangeShippingAddress();
  const form = useForm<ShippingAddressFormValues>({
    defaultValues: {
      address1: address?.address1 || '',
      address2: address?.address2 || '',
      city: address?.city || '',
      postalCode: address?.postalCode || '',
      prefecture: address?.prefecture || '',
    },
    resolver: zodResolver(ShippingAddressSchema),
  });
  const postalCode = form.watch('postalCode');
  const {
    data: addressInfo,
    refetch,
    isError,
    isPending: gettingAddressInfo,
    isRefetching,
  } = useGetAddressInfo(postalCode);

  const isValidAddress = addressInfo && address?.prefecture.includes(addressInfo.pref);

  useEffect(() => {
    if (postalCode.length == 7) {
      refetch().then(() => {
        if (isValidAddress) {
          form.setValue('city', addressInfo?.city as string);
          form.setValue('address1', addressInfo?.city as string);
          successToast(getText('fields_auto_filled'));
        } else {
          errorToast(getText('prefecture_error'));
        }
      });
    }
  }, [postalCode]);

  useEffect(() => {
    if (gettingAddressInfo || isRefetching) {
      successToast(getText('fetching_address_info'));
    }
  }, [gettingAddressInfo, isRefetching]);

  const onUpdate = form.handleSubmit(async (data) => {
    const canChange = address && address.sellerRequest;
    const { prefecture, ...rest } = data;
    const body = { orderid: Number(orderid), data: rest };

    if (canChange) {
      await changeShippingAddress(body);
      router.back();
    } else {
      await udpateShippingAddress(body);
    }
  });

  return {
    form,
    isPending: updatingShippingAddress || changingShippingAddress,
    onUpdate,
    gettingAddressInfo: gettingAddressInfo || isRefetching,
  };
};
