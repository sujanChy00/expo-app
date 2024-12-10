import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ShipOrderFormValues, ShipOrderSchema } from './ship-order-schema';

import { useUpdateTransaction } from '@/actions/order';
import { ITransactionById } from '@/types/ITransaction';

/**
 * @description A custom hook that manages form data and submission for updating a shipped order's tracking information.
 * It uses `useUpdateTransaction` for data persistence.
 * @typedef {Object} ITransactionById - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 * @typedef {object} ShipOrderFormValues - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {ITransactionById} [shipOrder] - Optional initial data to pre-populate the form if editing an existing shipped order.
 * @param {() => void} [close] - Optional callback function to close the form after successful submission.
 * @returns {ShippingOrderFormHook} An object containing functions and state for managing the shipping order form.
 */

export const useShippingOrderForm = (shipOrder?: ITransactionById, close?: () => void) => {
  const { mutateAsync, isPending } = useUpdateTransaction();

  const form = useForm<ShipOrderFormValues>({
    defaultValues: {
      trackingNumber: Number(shipOrder?.trackingNumber || ''),
      trackingUrl: shipOrder?.trackingUrl || '',
      shippingCompany: shipOrder?.trackingUrl ? 0 : undefined,
    },
    resolver: zodResolver(ShipOrderSchema),
  });

  const shippingCompany = form.watch('shippingCompany');

  const handleSubmit = form.handleSubmit((values) => {
    let data:
      | Omit<ShipOrderFormValues, 'shippingCompany'>
      | Omit<ShipOrderFormValues, 'trackingUrl'>;
    if (values.shippingCompany == 0) {
      data = {
        trackingNumber: values.trackingNumber,
        trackingUrl: values.trackingUrl,
      };
    } else {
      data = {
        trackingNumber: values.trackingNumber,
        shippingCompany: Number(shippingCompany),
      };
    }
    mutateAsync({
      id: Number(shipOrder?.transactionId),
      data,
    }).then(() => {
      form.reset();
      close && close();
    });
  });

  return {
    form,
    handleSubmit,
    isPending,
    shippingCompany,
  };
};
