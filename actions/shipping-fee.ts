import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShippingFeeFormValues } from '@/forms/shippping-fee/shipping-fee-schema';
import { useAppRouter } from '@/hooks/use-app-router';
import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { IGeneralResponse } from '@/types/IGeneral';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles updating shipping fee information for a seller's shop. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request, invalidates relevant queries, navigates back, and displays success/error messages.
 * @typedef {Object} ShippingFeeFormValues
 * @param {Object} args - An object containing the following properties:
 *  - `args.shippingInfo` {ShippingFeeFormValues} (required): An object representing the updated shipping fee data. The structure of this object is defined by the `ShippingFeeFormValues` type (which is not provided).
 *  - `args.id` {number} (required): The ID of the shipping fee to be updated.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update shipping fee information.
 */
export const useUpdateShippingFee = () => {
  const { selectedShop } = useSelectedShop();
  const { back } = useAppRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: { shippingInfo: ShippingFeeFormValues; id: number }) =>
      await fetcher<IGeneralResponse>({
        url: `/shipping/seller/${args.id}/${selectedShop?.shopId}`,
        method: 'PATCH',
        data: args.shippingInfo,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['ShippingFee'] });
      successToast(data.message);
      back();
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
