import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Linking } from 'react-native';

import { purifyObject } from '@/lib/purify-object';
import { errorToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { IPaginatedParams } from '@/types';
import { IGeneralResponse } from '@/types/IGeneral';
import { IPaginatedResponse } from '@/types/IPaginatedResponse';
import {
  IInvoiceResponse,
  IOrderComment,
  ITransactionById,
  ITransactionResponse,
  OrderTrackingResponse,
} from '@/types/ITransaction';
import { fetcher } from '@/utils/fetcher';

export const getAllOrders = async (params: IPaginatedParams, shopId: number) =>
  await fetcher<ITransactionResponse>({
    url: `/order/list/shop/${shopId}`,
    params: purifyObject(params as Record<string, unknown>),
  });

export const getAllShipments = async (params: IPaginatedParams, shopId: number) => {
  return await fetcher<IPaginatedResponse<OrderTrackingResponse>>({
    url: `/order/track-shipments/${shopId}`,
    params: purifyObject(params as Record<string, unknown>),
  });
};

export const useGetAllOrders = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useInfiniteQuery<ITransactionResponse>({
    queryKey: ['Transactions', params, shopId],
    queryFn: async ({ pageParam = 0 }) =>
      fetcher({
        url: `/order/list/shop/${shopId}`,
        params: {
          ...purifyObject(params as Record<string, unknown>),
          page: pageParam,
        },
      }),
    enabled: !!selectedShop,
    initialPageParam: 0,
    getNextPageParam(page) {
      return page.last ? undefined : page.pageNumber + 1;
    },
  });
};

export const useGetAllShipments = (params: { filter?: string }) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useInfiniteQuery<IPaginatedResponse<OrderTrackingResponse>>({
    queryKey: ['infinite-shipments', params, shopId],
    queryFn: async ({ pageParam = 0 }) =>
      fetcher({
        url: `/order/track-shipments/${shopId}`,
        params: { ...params, page: pageParam },
      }),
    enabled: !!selectedShop,
    initialPageParam: 0,
    getNextPageParam(page) {
      return page.last ? undefined : page.pageNumber + 1;
    },
  });
};

export const useGetOrderById = ({ id, enabled = true }: { id?: number; enabled?: boolean }) => {
  return useQuery<ITransactionById>({
    queryKey: ['TransactionById', id],
    queryFn: async () => {
      return fetcher({
        url: `/order/detail/${id}`,
      });
    },
    enabled: !!id && enabled,
  });
};

export const useGetOrderComment = (id: number) => {
  return useQuery({
    queryKey: ['OrderComment', id],
    queryFn: async () =>
      await fetcher<IOrderComment[]>({
        url: `/order/comment/order/${id}`,
      }),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useGetInvoiceInfo = (id: number) => {
  return useQuery({
    queryKey: [id],
    queryFn: async () =>
      await fetcher<IInvoiceResponse>({
        url: `/invoice/id/${id}`,
      }),
  });
};

export const useGenerateInvoice = (orderId?: number, close?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const getInvoice = () => {
    if (!orderId) {
      errorToast("Couldn't get invoice for this order");
      return;
    }
    setIsLoading(true);
    fetcher<IGeneralResponse>({
      url: `/invoice/${orderId}`,
    })
      .then((res) => {
        if (res.message) {
          Linking.openURL(res.message);
          close?.();
        }
      })
      .catch(() => {
        errorToast("Couldn't get invoice for this order");
      })
      .finally(() => setIsLoading(false));
  };

  return { getInvoice, isLoading };
};

export const useGetOrderTrackingDetails = (orderId: number) => {
  return useQuery({
    queryKey: ['TrackingOrderDetails', orderId],
    queryFn: async () =>
      await fetcher<OrderTrackingResponse>({
        url: `/order/track/${orderId}`,
      }),
  });
};
