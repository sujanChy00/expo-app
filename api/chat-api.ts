import { useInfiniteQuery, useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSelectedShop } from '@/providers/auth-provider';
import { IChat, IChatParams, IPaginatedChatResponse, UnseenCount } from '@/types/IChat';
import { IPaginatedResponse } from '@/types/IPaginatedResponse';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that fetches the count of unread comments for a seller's shop.
 * It utilizes `useQuery` from a query library (likely `react-query`) with a refetch interval of 50 seconds to retrieve
 * @typedef {UnseenCount} UnseenCount
 *
 * @returns {UseQueryResult<UnseenCount>} A React Query result object containing data, error, and loading state for the unread comment count. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */

export const useGetUnSeenCounts = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: ['UnSeen', { shopId: selectedShop?.shopId }],
    queryFn: async () =>
      await fetcher<UnseenCount>({
        url: `/shop-message/unread/${selectedShop?.shopId}`,
      }),
    refetchInterval: 30000,
    enabled: !!selectedShop?.shopId,
  });
};

/**
 * @description A custom hook that fetches paginated chat messages for a seller's shop, considering optional
 * filtering parameters. It utilizes `useInfiniteQuery` from a query library (likely `react-query`)
 * to retrieve data returning an `IPaginatedResponse<IChat>` object containing chat messages and pagination information if successful.
 * @typedef {IChatParams} IChatParams
 * @typedef {IPaginatedResponse<IChat>} IPaginatedResponse
 * @typedef {IChat} IChat
 *
 *
 * @param {IChatParams} params (optional) - An object containing optional filtering parameters for the chat messages. The structure of this object is defined by the `IChatParams` type (which is not provided).
 *
 * @returns {UseInfiniteQueryResult<IPaginatedResponse<IChat>>} A React Query result object containing data, error, loading state, and additional properties specific to infinite queries, such as `fetchNextPage`, `isFetchingNextPage`, and `hasNextPage`. You can access the data using `result.data`, errors using `result.error`, and loading state using `result.isLoading`.
 */

export const useGetMessages = (params?: IChatParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: ['Chat', { shopId: selectedShop?.shopId, params }],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<IPaginatedResponse<IChat>>({
        url: '/shop-message/shop',
        params: { ...params, page: pageParam, shopId: selectedShop?.shopId },
      }),
    initialPageParam: 0,
    getNextPageParam: (page) => (page.last ? undefined : page.pageNumber + 1),
    enabled: !!selectedShop?.shopId,
  });
};

/**
 * Custom hook to fetch user messages for a specific shop using react-query.
 *
 * @param {number} userId - The ID of the user whose messages are to be fetched.
 * @param {IChatParams} [params] - Optional parameters for filtering or configuring the message fetch.
 *
 * @returns {UseQueryResult<IPaginatedChatResponse>} React Query result object for user messages.
 * - `data`: Contains the paginated chat messages
 * - `error`: Holds any error that occurred during fetching
 * - `isLoading`: Indicates the loading state of the query
 *
 * @description
 * - Uses `useInfiniteQuery` to support pagination of messages
 * - Queries are scoped to the currently selected shop
 * - Query is only enabled when both shop ID and user ID are available
 */

export const useGetUserMessagesById = (userId: number, params?: IChatParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: ['UserMessage', { shopId: selectedShop?.shopId, params, userId }],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<IPaginatedChatResponse>({
        url: `/shop-message/shop/${userId}`,
        params: {
          ...params,
          size: 20,
          page: pageParam,
          shopId: selectedShop?.shopId,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (page) => (page.last ? undefined : page.pageNumber + 1),
    enabled: !!selectedShop?.shopId && !!userId,
  });
};
