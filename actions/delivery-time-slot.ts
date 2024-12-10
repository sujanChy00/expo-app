import { useMutation, useQueryClient } from '@tanstack/react-query';

import useI18n from '@/hooks/useI81n';
import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { fetcher } from '@/utils/fetcher';

/**
 *
 * @description A custom hook that handles updating delivery time settings for a shop. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request and displays success/error messages using `useToast`. It also invalidates relevant queries and navigates back using `useAppRouter` upon success.
 *
 * @param {Object} params - An object containing the following property:
 *  - `params.shippingCompanyId` {number | null} (optional): The ID of the shipping company associated with the new delivery time. Setting this to null removes any associated shipping company.
 *
 * @returns {MutationFunction<Any, any, void>} A mutation function that can be used to update the shop's delivery time.
 */

export const useUpdateShopDeliveryTime = () => {
  const { selectedShop } = useSelectedShop();
  const { getText } = useI18n();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { shippingCompanyId: number | null }) =>
      await fetcher({
        url: `/delivery-time/${selectedShop?.shopId}`,
        data,
        method: 'PATCH',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['shopAvailableDeliveries'],
      });
      successToast(getText('delivery_update_success_message'));
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
