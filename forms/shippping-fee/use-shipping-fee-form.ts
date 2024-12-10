import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ShippingFeeFormValues, ShippingFeeSchema } from './shipping-fee-schema';

import { useUpdateShippingFee } from '@/actions/shipping-fee';
import { IshippingFee } from '@/types/IshippingFee';

/**
 * @description A custom hook that manages form data, validation, and submission for editing a shipping fee.
 * It utilizes `useUpdateShippingFee` for persisting the updated data.
 * @typedef {Object} IshippingFee - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 * @typedef {Object} ShippingFeeFormValues - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {IshippingFee} [shippingFee] - Optional shipping fee data used for pre-filling the form.
 * @returns {ShippingFeeFormHook} An object containing functions and state for managing the shipping fee form.
 */

export const useShippingFeeForm = (shippingFee?: IshippingFee) => {
  const { mutateAsync, isPending } = useUpdateShippingFee();
  const router = useRouter();
  const form = useForm<ShippingFeeFormValues>({
    defaultValues: {
      coolShippingFee: shippingFee?.sellerCoolShippingFee || undefined,
      frozenShippingFee: shippingFee?.sellerShippingFrozenShippingFee || undefined,
      shippingFee: shippingFee?.sellerShippingFee || undefined,
      weight: shippingFee?.sellerShippingWeight || undefined,
      feeWithTax: shippingFee?.sellerShippingFee || undefined,
    },
    resolver: zodResolver(ShippingFeeSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutateAsync({
      id: shippingFee?.sellerShippingId as number,
      shippingInfo: {
        ...values,
        fromAreaCode: shippingFee?.sellerShippingFromAreaCode,
        toAreaCode: shippingFee?.sellerShippingToAreaCode,
      },
    }).then(() => {
      router.back();
    });
  });
  return {
    handleSubmit,
    isLoading: isPending,
    form,
  };
};
