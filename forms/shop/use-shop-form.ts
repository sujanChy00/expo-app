import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ShopFormValues, ShopSchema } from './shop-schema';

import { useUpdateShop, useUpdateShopImage } from '@/actions/shop';
import { IshopDetails } from '@/types/IShop';

/**
 * @description A custom hook that manages form data, validation, and submission for updating a shop. It interacts with `useUpdateShop` and `useUpdateShopImage` for persisting data and image updates.
 * @typedef {Object} IshopDetails
 *
 * @typedef {Object} ShopFormValues
 *
 *
 * @param {IshopDetails} [data] - Optional pre-filled shop data for editing.
 * @returns {ShopFormHook} An object containing functions and state for managing the shop form.
 */

export const useShopForm = (data?: IshopDetails) => {
  const { mutateAsync: updateShop, isPending: updatingShop } = useUpdateShop();
  const { mutateAsync: changeshopImage, isPending: changingshopImage } = useUpdateShopImage();
  const form = useForm<ShopFormValues>({
    defaultValues: {
      shopName: data?.shopName || '',
      orderAmount: data ? Number(data.orderAmount) : 0,
      lowStockThreshold: data ? Number(data.lowStockThreshold) : 0,
      shopAddress: data?.shopAddress || '',
      shopFacebookUrl: data?.shopFacebookUrl || '',
      shopIntroduction: data?.shopIntroduction || '',
      shopPhoneNumber: data?.shopPhoneNumber || '',
      shopPostalCode: data?.shopPostalCode || '',
      shopRegistrationNumber: data?.shopRegistrationNumber || '',
      shopTiktokUrl: data?.shopTiktokUrl || '',
      expiryThreshold: data ? Number(data?.expiryThreshold) : 0,
    },
    resolver: zodResolver(ShopSchema),
  });
  const updateShopImage = async (image: string) => {
    changeshopImage({ image, shopId: String(data?.shopId) });
  };

  const handleUpdateShop = form.handleSubmit(async (values: ShopFormValues) => {
    await updateShop({ shopId: data?.shopId as number, data: values });
  });

  return {
    updateShopImage,
    handleUpdateShop,
    isLoading: updatingShop,
    changingshopImage,
    form,
  };
};
