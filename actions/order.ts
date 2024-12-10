import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShipOrderFormValues } from '@/forms/order/ship-order-schema';
import { ShippingAddressFormValues } from '@/forms/shipping-address/shipping-address-schema';
import { useAppRouter } from '@/hooks/use-app-router';
import useI18n from '@/hooks/useI81n';
import { errorToast, successToast } from '@/lib/toast';
import { IGeneralResponse } from '@/types/IGeneral';
import { IOrderProgress, ITransactionById } from '@/types/ITransaction';
import { fetcher } from '@/utils/fetcher';

export const useApproveAddressUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/address/approve/${orderId}`,
        method: 'POST',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['TransactionById'] });
      successToast(data?.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useCancelAddressUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/address/${orderId}`,
        method: 'DELETE',
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['TransactionById'] });
      successToast(data?.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useUpdateShippingAddress = () => {
  const { back } = useAppRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      orderid,
    }: {
      orderid: number;
      data: Omit<ShippingAddressFormValues, 'prefecture'>;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/order/address/${orderid}`,
        method: 'POST',
        data,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['TransactionById'],
      });
      back(true);
      successToast(data?.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useChangeShippingAddress = () => {
  const { back } = useAppRouter();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      orderid,
    }: {
      orderid: number;
      data: Omit<ShippingAddressFormValues, 'prefecture'>;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/order/change-address/${orderid}`,
        method: 'PUT',
        data,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['TransactionById'],
      });
      back(true);
      successToast(data?.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ShipOrderFormValues }) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/ship/${id}`,
        method: 'PUT',
        data,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['Transactions'],
      });
      queryClient.invalidateQueries({ queryKey: ['Home'] });
      queryClient.invalidateQueries({ queryKey: ['TransactionById'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

export const useChangeOrderStatus = () => {
  const { getText } = useI18n();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, changeTo }: { orderId: number; changeTo: IOrderProgress }) => {
      return await fetcher<ITransactionById>({
        url: `/order/change-status/${orderId}`,
        method: 'PATCH',
        params: {
          changeTo,
        },
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['TransactionById'] });
      const message =
        variables.changeTo == 'SELLER_ACKNOWLEDGED'
          ? getText('order_changes_accepted_message')
          : getText('order_change_request_message');

      successToast(message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
