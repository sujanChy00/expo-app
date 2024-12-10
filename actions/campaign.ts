import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShippingCampaignFormValues } from '@/forms/shipping-campaign/shipping-campaign-schema';
import { useAppRouter } from '@/hooks/use-app-router';
import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { IGeneralResponse } from '@/types/IGeneral';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles updating a shipping campaign for a shop. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request and displays success/error messages using `useToast`. It also invalidates relevant queries and navigates back using `useAppRouter` upon successful update.
 * @typedef {Object} ShippingCampaignFormValues
 *
 *
 * @param {Object} params - An object containing the following properties:
 *  - `params.campaignId` {number} (required): The ID of the shipping campaign to be updated.
 *  - `params.data` {ShippingCampaignFormValues} (required): An object containing the updated campaign data, excluding the `discountType` property.
 *
 * @returns {MutationFunction<Any, any, void>} A mutation function that can be used to update the shipping campaign.
 */
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async (
      body: Omit<ShippingCampaignFormValues, 'discountType'> & {
        campaignId: number;
      }
    ) => {
      const { campaignId, ...data } = body;
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}/${campaignId}`,
        method: 'PUT',
        data,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Shipping-Campaign'] });
      back(true);
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles creating a new shipping campaign for a shop. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request and displays success/error messages using `useToast`. It also invalidates relevant queries and navigates back using `useAppRouter` upon successful creation.
 * @typedef {Object} ShippingCampaignFormValues
 * @param {Object} params - An object containing the following property:
 *  - `params.data` {ShippingCampaignFormValues} (required): An object containing the new campaign data, excluding the `discountType` property.
 *
 * @returns {MutationFunction<Any, any, void>} A mutation function that can be used to create the shipping campaign.
 */

export const useAddCampaign = () => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async (body: Omit<ShippingCampaignFormValues, 'discountType'>) => {
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}`,
        data: body,
        method: 'POST',
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Shipping-Campaign'] });
      back();
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
