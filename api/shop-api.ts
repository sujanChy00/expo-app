import { useSelectedShop } from "@/providers/auth-provider";
import { IshopDetails } from "@/types/IShop";
import { IShopUser } from "@/types/IShopUsers";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetAllShopUsers = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery<IShopUser[]>({
    queryKey: ["ShopUsers", selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shop/assistant/seller/${selectedShop?.shopId}`,
      }),
  });
};

export const useGetShopDetails = (shopId?: string) => {
  return useQuery<IshopDetails>({
    queryKey: ["ShopDetails", shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shop/details/${shopId}`,
      }),
    enabled: !!shopId,
  });
};
