import { purifyObject } from "@/lib/purify-object";
import { useSelectedShop } from "@/providers/auth-provider";
import {
  IItemDescriptionResponse,
  IItemLowStockResponse,
  IItemResponse,
  IItemStockResponse,
  IPaginatedParams,
  IRecommendedItem,
} from "@/types";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const getAllItems = async (params: IPaginatedParams, shopId: number) =>
  await fetcher<IItemResponse>({
    url: `/seller/items/${shopId}`,
    params: purifyObject(params as Record<string, unknown>),
  });

export const getLowStockItems = async (
  params: IPaginatedParams,
  shopId: number
) =>
  await fetcher<IItemLowStockResponse>({
    url: `/seller/low-stock/${shopId}`,
    params,
  });

export const getExpiredItems = async (
  params: IPaginatedParams,
  shopId: number
) =>
  await fetcher<IItemLowStockResponse>({
    url: `/seller/expiring-items/${shopId}`,
    params,
  });

export const getStockItems = async (
  params: IPaginatedParams,
  shopId?: number
) => {
  return await fetcher<IItemStockResponse>({
    url: `/seller/item-stock/${shopId}`,
    params,
  });
};

/**
 *
 * @param itemId id of item whose detail is to be fetched
 * @description takes an itemId and returns the detail of item associated with the itemId
 * @returns IItemDescriptionResponse
 */
export const useGetItemDetail = (itemId?: string) => {
  return useQuery<IItemDescriptionResponse>({
    queryKey: ["ItemDetails", "RecommendedItems", itemId],
    queryFn: async () =>
      await fetcher({
        url: `/seller/item/${itemId}`,
      }),
    enabled: !!itemId,
  });
};

export const useGetRecommendedItems = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery<IRecommendedItem[]>({
    queryKey: ["RecommendedItems", selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: `/recommended/${selectedShop?.shopId}`,
      }),
    enabled: !!selectedShop,
  });
};
