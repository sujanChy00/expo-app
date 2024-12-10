import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getUser } from '@/api/user';
import { ShopFormValues } from '@/forms/shop/shop-schema';
import { useAppRouter } from '@/hooks/use-app-router';
import { useUser } from '@/hooks/use-user';
import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { IGeneralResponse } from '@/types/IGeneral';
import { IProfile } from '@/types/IProfile';
import { IshopDetails } from '@/types/IShop';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles resetting a shop's shipping company to a specific one. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with the company ID, invalidates relevant queries, and displays success/error messages.
 * @typedef {number} companyId
 *
 *
 * @param {companyId} companyId - The ID of the shipping company to reset to.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to reset a shop's shipping company.
 */
export const useResetShop = () => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  return useMutation({
    mutationFn: async (companyId: number) =>
      await fetcher<IGeneralResponse>({
        url: `/shipping/shop/${selectedShop?.shopId}/reset?company=${companyId}`,
        method: 'PUT',
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['ShippingCompany', 'ShippingFee'],
      });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles updating a shop's legal information. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with the updated data, invalidates a relevant query, and displays success/error messages.
 * @typedef {string} body - The updated legal information for the shop.
 * @typedef {number} shopId - The ID of the shop whose legal information is being updated.
 * @typedef {IshopDetails} IshopDetails
 *
 *
 * @param {Object} args - An object containing the following properties:
 *  - `args.body` {body} (required): The updated legal information for the shop.
 *  - `args.shopId` {shopId} (required): The ID of the shop whose legal information is being updated.
 *
 * @returns {MutationFunction<IshopDetails, any, any>} A mutation function that can be used to update a shop's legal information.
 */
export const useUpdateShopLegalInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body, shopId }: { body: string; shopId: number }) =>
      await fetcher<IshopDetails>({
        url: `/shop/${shopId}`,
        method: 'PUT',
        data: { shopInfo: body },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ShopDetails'] });
      successToast('Shop legal information updated successfully');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles updating a shop's details. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with the updated shop data, invalidates a relevant query, navigates back, and displays success/error messages.
 * @typedef {ShopFormValues} ShopFormValues
 * @typedef {number} shopId - The ID of the shop to be updated.
 * @typedef {IshopDetails} IshopDetails
 *
 *
 * @param {Object} args - An object containing the following properties:
 *  - `args.data` {ShopFormValues} (required): An object representing the updated shop data. The structure of this object is defined by the `ShopFormValues` type (which is not provided).
 *  - `args.shopId` {shopId} (required): The ID of the shop to be updated.
 *
 * @returns {MutationFunction<IshopDetails, any, any>} A mutation function that can be used to update a shop's details.
 */
export const useUpdateShop = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUser();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async ({ data, shopId }: { shopId: number; data: ShopFormValues }) =>
      await fetcher<IGeneralResponse>({
        url: `/shop/${shopId}`,
        method: 'PUT',
        data,
      }),
    onSuccess: (data) => {
      getUser().then((user) => setUser(user));
      queryClient.invalidateQueries({ queryKey: ['ShopDetails'] });
      back(true);
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles updating a shop's image. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request with the image URL, invalidates a relevant query, and displays success/error messages.
 * @typedef {string} image - The URL of the new shop image.
 * @typedef {string} shopId - The ID of the shop whose image is being updated.
 * @typedef {IProfile} IProfile
 *
 * @param {Object} args - An object containing the following
 */

export const useUpdateShopImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ image, shopId }: { shopId: string; image: string }) =>
      await fetcher<IProfile>({
        url: `/shop/shop-image/${shopId}`,
        method: 'PATCH',
        data: { image_url: [image] },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ShopDetails'] });
      successToast('Shop image updated successfully');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
