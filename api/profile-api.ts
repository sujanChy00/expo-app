import { useUser } from "@/hooks/use-user";
import { IAddressInfo, IProfile } from "@/types/IProfile";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  const { setUser } = useUser();
  return useQuery({
    queryKey: ["Profile"],
    queryFn: async () => {
      const res = await fetcher<IProfile>({
        url: "/shop/assistant/profile",
      });
      if (res) {
        setUser(res);
      }
      return res;
    },
  });
};

export const useGetAddressInfo = (postalCode: string) => {
  return useQuery({
    queryKey: ["Address-info"],
    queryFn: async () => {
      return await fetcher<IAddressInfo>({
        url: "/prefecture/address-info",
        params: {
          postalCode,
        },
      });
    },
    enabled: !!postalCode,
  });
};
