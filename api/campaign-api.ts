import { useSelectedShop } from "@/providers/auth-provider";
import { IShippingArea } from "@/types/IGeneral";
import { IShipppingCampaign } from "@/types/IShippingCampaign";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

/**
 *
 * @returns
 * @description This hook returns the list of all shipping campaigns
 */

export const useGetAllShippingCampaigns = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<IShipppingCampaign[]>({
    queryKey: ["Shipping-Campaign", shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shipping-campaign/${shopId}`,
      }),
    enabled: !!shopId,
  });
};

/**
 * @description A custom hook that fetches all available shipping areas.
 * It utilizes `useQuery` from a query library (likely `react-query`) to retrieve data from the "/shippingArea" endpoint,
 * returning an array of `IShippingArea` objects if successful.
 * @typedef {IShippingArea[]} IShippingArea
 *
 * @returns {UseQueryResult<IShippingArea[]>} A React Query result object containing data, error, and loading state for the shipping areas. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */
export const useGetAllShippingArea = () => {
  return useQuery<IShippingArea[]>({
    queryKey: ["Shipping Area"],
    queryFn: async () =>
      await fetcher({
        url: "/shippingArea",
      }),
  });
};

export const useGetShippingCampaignById = (id: string) => {
  return useQuery({
    queryKey: ["Shipping-Campaign", id],
    queryFn: async () =>
      await fetcher<IShipppingCampaign>({
        url: `/shipping-campaign/get-campaign/${id}`,
      }),
    enabled: !!id,
  });
};
