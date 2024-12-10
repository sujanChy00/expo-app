import { useSelectedShop } from "@/providers/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { IShopDeliveryTimes } from "../types/IAvailableDeliveries";
import { fetcher } from "../utils/fetcher";

/**
 * @description A custom hook that fetches the available delivery times for a specific shop.
 * It utilizes `useQuery` from a query library (likely `react-query`)
 *  to retrieve data returning an `IShopDeliveryTimes` object containing delivery time information if successful.
 * @typedef {IShopDeliveryTimes} IShopDeliveryTimes - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @returns {UseQueryResult<IShopDeliveryTimes>} A React Query result object containing data, error, and loading state for the shop's available delivery times. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */
export const useGetShopAvailableDeliveryTimes = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery<IShopDeliveryTimes>({
    queryKey: ["shopAvailableDeliveries", selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: `/delivery-time/${selectedShop?.shopId}`,
      }),
  });
};

export const useGetAvailableDeliveryTimes = () => {
  return useQuery<IShopDeliveryTimes[]>({
    queryKey: ["availableDeliveryTimes"],
    queryFn: async () =>
      await fetcher({
        url: `/delivery-time/available`,
      }),
  });
};
