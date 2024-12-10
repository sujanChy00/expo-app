import { useSelectedShop } from "@/providers/auth-provider";
import { HomeResponse, SalesData } from "@/types/Ihome";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetSalesData = (params: { from: string; to: string }) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<SalesData>({
    queryKey: ["SalesData", shopId, params],
    queryFn: async () =>
      await fetcher({
        url: `/home/seller/sales/${shopId}`,
        params: params,
      }),
    enabled: !!shopId,
  });
};

export const useGetHomeData = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<HomeResponse>({
    queryKey: ["HomeData", shopId],
    queryFn: async () =>
      await fetcher({
        url: `/home/seller/${shopId}`,
      }),
    enabled: !!shopId,
  });
};
