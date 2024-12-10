import { useSelectedShop } from "@/providers/auth-provider";
import { IShippingCompany, IshippingFee } from "@/types/IshippingFee";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetShippingFee = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<IshippingFee[]>({
    queryKey: ["ShippingFee", shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shipping/shop/${shopId}`,
      }),
    enabled: !!shopId,
  });
};

export const useGetAllShippingCompany = () => {
  return useQuery<IShippingCompany[]>({
    queryKey: ["ShippingCompany"],
    async queryFn() {
      return fetcher({
        url: "/shipping/company/active",
      });
    },
  });
};
