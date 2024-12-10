import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

import { ItemVariationValues } from '@/forms/item-variation/item-variation-schema';
import { useAppRouter } from '@/hooks/use-app-router';
import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import {
  AddImagesResponse,
  IItemAddBody,
  IItemAddRequest,
  IItemUpdateRequest,
  IItemVaritions,
} from '@/types';
import { IGeneralResponse } from '@/types/IGeneral';
import { addLocalFileToFormData } from '@/utils/addLocalFileToFormData';
import { fetcher } from '@/utils/fetcher';

/**
 *
 * @description A custom hook that handles toggling the disabled state of an item. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request and displays success/error messages using `useToast`. It also invalidates relevant queries to ensure updated data across the application.
 *
 * @param {string} itemId - The ID of the item to be toggled.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to toggle the item's disabled state.
 */

export const useToggleItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) =>
      fetcher<IGeneralResponse>({
        url: `/item/toggle-disable/${itemId}`,
        method: 'PATCH',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['ItemDetails'] });
      queryClient.invalidateQueries({ queryKey: ['RecommendedItems'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 *
 * @description A custom hook that handles adding an item to the recommended items list. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request, invalidates relevant queries using `useQueryClient`, and displays success/error messages using `useToast`.
 *
 * @param {Object} args - An object containing the following property:
 *  - `args.itemId` {string} (required): The ID of the item to be added to the recommended list.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to add the item to recommended items.
 */
export const useAddRecommendedItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: { itemId: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/recommended`,
        method: 'POST',
        data: {
          itemId: args.itemId,
        },
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 *
 * @description A custom hook that handles removing an item from the recommended items list. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a DELETE request, invalidates relevant queries, and displays success/error messages.
 *
 * @param {Object} args - An object containing the following property:
 *  - `args.itemId` {string} (required): The ID of the item to be removed from the recommended list.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to remove the item from recommended items.
 */

export const useRemoveRecommendedItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: { itemId: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/recommended/${args.itemId}`,
        method: 'DELETE',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      queryClient.invalidateQueries({ queryKey: ['RecommendedItems'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles adding a new item. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request, invalidates relevant queries, navigates back using `useAppRouter`, and displays success/error messages.
 * @typedef {Object} IItemAddRequest
 *
 *
 * @param {Object} params - An object containing the item data as defined by `IItemAddRequest`.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to add the item.
 */
export const useAddItem = () => {
  const { back } = useAppRouter();
  const { selectedShop } = useSelectedShop();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body }: IItemAddRequest) => {
      const { indianShop, ...rest } = body;
      return await fetcher<IGeneralResponse>({
        url: `/item`,
        method: 'POST',
        data: {
          shopId: selectedShop?.shopId,
          ...rest,
        },
        params: {
          indianShop: indianShop == 'true',
        },
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      back(true);
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles updating an existing item. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request, invalidates relevant queries, navigates back using `useAppRouter`, and displays success/error messages.
 * @typedef {Object} IItemUpdateRequest
 *
 *
 * @param {Object} params - An object containing the update data as defined by `IItemUpdateRequest` and the item ID.
 *  - `params.body` {Object}: The update data for the item.
 *  - `params.itemId` {string}: The ID of the item to be updated.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update the item.
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ body, itemId }: IItemUpdateRequest) => {
      const { item_images, ...data } = body;
      return await fetcher<IGeneralResponse>({
        url: `/item/${itemId}`,
        method: 'PATCH',
        data,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['ItemDetails'],
      });
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['LowstockItems'] });
      queryClient.invalidateQueries({ queryKey: ['ExpiredItems'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 *
 * @description A custom hook that handles deleting an item. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a DELETE request, invalidates relevant queries, navigates back using `useAppRouter`, and displays success/error messages.
 *
 * @param {string} itemId - The ID of the item to be deleted.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to delete the item.
 */
export const useDeleteItem = () => {
  const { back } = useAppRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) =>
      await fetcher<IGeneralResponse>({
        url: `/item/${itemId}`,
        method: 'DELETE',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      back();
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
/**
 * @description A custom hook that handles updating an item's thumbnail image. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request, invalidates relevant queries, and displays success/error messages.
 * @typedef {Object} IItemResponse
 *
 *
 * @param {Object} args - An object containing the following properties:
 *  - `args.img` {string} (required): The base64 encoded image data or URL of the new thumbnail image.
 *  - `args.id` {string} (required): The ID of the item whose thumbnail needs to be updated.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update the item's thumbnail.
 */

export const useUpdateItemThumbnail = () => {
  const queryClient = useQueryClient();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async (args: { img: string; id: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/item/${args.id}`,
        method: 'PATCH',
        data: {
          thumbnail_image: args.img,
        },
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      back();
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles adding new variations for an item. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request, invalidates relevant queries, and displays success/error messages.
 * @typedef {Object} ItemVariationValues
 * @typedef {Object} IItemVaritions
 *
 *
 * @param {Object} args - An object containing the following properties:
 *  - `args.itemId` {string} (required): The ID of the item for which variations are being added.
 *  - `args.data` {ItemVariationValues[]} (required): An array of objects representing the new item variations, where each object has the following properties:
 *    - `name` {string} (optional): The name of the variation.
 *    - `price` {number} (required): The price of the variation.
 *    - `quantity` {number} (required): The quantity of the variation available.
 *    - `image` {string} (optional): The URL or base64 encoded data of the variation image.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to add new item variations.
 */
export const useAddItemVaritaions = () => {
  const { back } = useAppRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: { itemId: string; data: ItemVariationValues[] }) =>
      await fetcher<IItemVaritions[]>({
        url: `/items/${args.itemId}/variations`,
        method: 'POST',
        data: args.data,
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['ItemDetails'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      back(true);
      successToast('item variations added successfully');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles updating an existing item variation. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request, invalidates relevant queries, and displays success/error messages.
 * @typedef {Object} ItemVariationValues
 * @typedef {Object} IItemVaritions
 *
 * @param {Object} args - An object containing the following properties:
 *  - `args.itemId` {string} (required): The ID of the item whose variation needs to be updated.
 *  - `args.data` {ItemVariationValues} (required): An object representing the updated data for the item variation. This object can have the same properties as defined in `ItemVariationValues` for `useAddItemVaritaions`.
 *  - `args.variationname` {string} (required): The name of the variation to be updated.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update an item variation.
 */
export const useUpdateItemVariation = () => {
  const queryClient = useQueryClient();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async (args: {
      itemId: string;
      data: ItemVariationValues;
      variationname: string;
    }) =>
      await fetcher<IItemVaritions[]>({
        url: `/items/${args.itemId}/variations/${args.variationname}`,
        method: 'PATCH',
        data: args.data,
      }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['ItemVariations'] });
      queryClient.invalidateQueries({ queryKey: ['ItemDetails'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      back(true);
      successToast('item variations updated successfully');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles deleting an existing item variation. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a DELETE request, invalidates relevant queries, and displays success/error messages.
 * @typedef {Object} IItemVaritions
 * @param {Object} args - An object containing the following properties:
 *  - `args.itemId` {string} (required): The ID of the item whose variation needs to be deleted.
 *  - `args.variationName` {string} (required): The name of the variation to be deleted.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to delete an item variation.
 */
export const useDeleteItemVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, variationName }: { itemId: string; variationName: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/items/${itemId}/variations/${variationName}`,
        method: 'DELETE',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['ItemDetails'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

export const useCopyItem = () => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async ({
      itemId,
      data,
    }: {
      itemId: string;
      data: IItemAddBody & {
        newImage: boolean;
      };
    }) => {
      const { indianShop, ...body } = data;
      return await fetcher<IGeneralResponse>({
        url: `/item/copy/${itemId}`,
        method: 'POST',
        data: {
          shopId: selectedShop?.shopId,
          ...body,
        },
        params: {
          indianShop: indianShop == 'true',
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      back(true);
      successToast(data.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

export const useDeleteItemImage = () => {
  return useMutation({
    mutationFn: async (image: string) => {
      const formData = new FormData();
      formData.append('image', image);
      return await fetcher<IGeneralResponse>({
        url: '/image/temp',
        method: 'DELETE',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (data) => {
      successToast(data.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useUploadItemImage = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return await fetcher<string[]>({
        url: '/image/temp',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};

export const useAddItemImages = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async ({ itemId, images }: { itemId: string; images: string[] }) => {
      const formData = new FormData();

      if (Platform.OS == 'web') {
        await Promise.all(
          images.map(async (uri, index) => {
            const blob = await uriToBlob(uri);
            formData.append('images', blob, `image_${index}.jpg`);
          })
        );
      } else {
        images.forEach((uri) => addLocalFileToFormData(uri, formData, 'images'));
      }

      return await fetcher<AddImagesResponse>({
        url: `/item/image/${itemId}`,
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ItemDetails'],
      });
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      successToast('Images added successfully');
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

export const useUpdateItemImages = () => {
  const queryClient = new QueryClient();
  const { back } = useAppRouter();
  return useMutation({
    mutationFn: async ({
      itemId,
      ...data
    }: {
      itemId: string;
      images: string[];
      thumbnailImage: string;
    }) => {
      return await fetcher<AddImagesResponse>({
        url: `/item/image/${itemId}`,
        method: 'PUT',
        data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ItemDetails'],
      });
      queryClient.invalidateQueries({ queryKey: ['Items'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-items'] });
      queryClient.invalidateQueries({ queryKey: ['HomeData'] });
      successToast('Images updated successfully');

      back();
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};

const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error('Could not convert URI to Blob'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export const useUpdateItemStock = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: async ({ itemId, stock }: { itemId: string; stock: number }) => {
      return await fetcher<IGeneralResponse>({
        url: `/item/change-stock/${itemId}`,
        method: 'PATCH',
        params: {
          stock,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['item-stock'] });
      queryClient.invalidateQueries({ queryKey: ['infinite-item-stock'] });
      queryClient.invalidateQueries({ queryKey: ['LowstockItems'] });
      successToast(data.message);
    },
    onError: (error) => {
      errorToast(error.message);
    },
  });
};
