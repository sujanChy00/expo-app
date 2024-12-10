import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ItemVariationSchema, ItemVariationValues } from './item-variation-schema';

import { useAddItemVaritaions, useUpdateItemVariation } from '@/actions/item';
import { IItemVaritions } from '@/types';

/**
 * @description A custom hook that manages form data and submission for creating or editing an item variation. It interacts with `useUpdateItemVariation` and `useAddItemVaritaions` for data persistence.
 * @typedef {Object} IItemVaritions - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 * @typedef {object} ItemVariationValues - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {IItemVaritions} [data] - Optional initial data to populate the form if editing an existing variation.
 * @param {() => void} [close] - Optional callback function to close the form after successful submission.
 * @returns {ItemVariationFormHook} An object containing functions and state for managing the item variation form.
 */
export const UseItemVariationForm = (data?: IItemVaritions, close?: () => void) => {
  const params = useLocalSearchParams<{ itemId?: string }>();
  const { mutateAsync: updateItemVariation, isPending: updatingItemVariation } =
    useUpdateItemVariation();
  const { mutateAsync: addItemVariation, isPending: addingItemVariation } = useAddItemVaritaions();
  const form = useForm<ItemVariationValues>({
    defaultValues: {
      name: data?.name || '',
      price: String(data?.price || ''),
      stock: data?.stock,
      weight: data?.weight,
    },
    resolver: zodResolver(ItemVariationSchema),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    if (data) {
      await updateItemVariation({
        data: values,
        itemId: params.itemId as string,
        variationname: data.name,
      }).then(() => {
        close && close();
      });
    } else {
      await addItemVariation({
        data: [values],
        itemId: params.itemId as string,
      }).then(() => {
        close && close();
        form.reset();
      });
    }
  });

  return {
    handleSubmit,
    isLoading: addingItemVariation || updatingItemVariation,
    form,
  };
};
