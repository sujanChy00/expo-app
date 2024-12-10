import { useUser } from "@/hooks/use-user";
import { useLanguage, useSelectedShop } from "@/providers/auth-provider";
import { ICategory } from "@/types/ICategory";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

/**
 * @description A custom hook that fetches all categories for a specific shop, considering the current language. It utilizes `useQuery` from a query library (likely `react-query`) to retrieve data from the "/category" endpoint with appropriate parameters, returning an array of `ICategory` objects if successful.
 * @typedef {ICategory[]} ICategory
 *
 * @returns {UseQueryResult<ICategory[]>} A React Query result object containing data, error, and loading state for the shop categories. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */

export const useGetAllCategories = () => {
  const { selectedShop } = useSelectedShop();
  const { language } = useLanguage();

  return useQuery<ICategory[]>({
    queryKey: ["Category", language, selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: "/category",
        params: {
          sellerId: selectedShop?.shopId,
        },
      }),
  });
};

/**
 * @description A custom hook that fetches all categories for a specific country and language, considering the current user and shop's details. It utilizes `useQuery` from a query library (likely `react-query`) to retrieve data from the "/category" endpoint with relevant parameters, returning an array of `ICategory` objects if successful.
 * @typedef {ICategory[]} ICategory
 *
 * @returns {UseQueryResult<ICategory[]>} A React Query result object containing data, error, and loading state for the categories. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */

export const useGetAllCategoriesByCountryAndLanguage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const { selectedShop } = useSelectedShop();
  return useQuery<ICategory[]>({
    queryKey: ["CategoriesByLan"],
    queryFn: async () =>
      await fetcher({
        url: `/category`,
        params: {
          country: user?.profileDetails.shopAssistantCountry,
          language,
          sellerId: selectedShop?.shopId,
        },
      }),
  });
};
