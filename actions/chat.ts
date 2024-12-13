import { useMutation, useQueryClient } from '@tanstack/react-query';

import { errorToast, successToast } from '@/lib/toast';
import { useSelectedShop } from '@/providers/auth-provider';
import { IMessageInput } from '@/types/IChat';
import { IGeneralResponse } from '@/types/IGeneral';
import { IOrderComment } from '@/types/ITransaction';
import { addLocalFileToFormData } from '@/utils/addLocalFileToFormData';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles deleting an order comment. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a DELETE request and displays success/error messages using `useToast`. It also invalidates relevant queries and performs optimistic updates using `useQueryClient`.
 *
 * @typedef {Object} IOrderComment
 *
 * @param {number} id - The ID of the order comment to be deleted.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to delete the order comment.
 */

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) =>
      await fetcher<IGeneralResponse>({
        url: `/shop-message/${id}`,
        method: 'DELETE',
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['UserMessage'] });
      queryClient.invalidateQueries({ queryKey: ['TransactionById'] });
      successToast(data.message);
    },
    onMutate: async (args) => {
      await queryClient.cancelQueries({ queryKey: ['UserMessage'] });
      const prevMsg = queryClient.getQueryData(['UserMessage']) as IOrderComment;
      queryClient.setQueryData(['UserMessage'], (oldMsg: IOrderComment[]) =>
        oldMsg
          ? (oldMsg as IOrderComment[]).filter((order) => order.orderCommentId !== args)
          : oldMsg
      );
      return { prevMsg };
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['UserMessage'] });
      queryClient.invalidateQueries({ queryKey: ['Chat'] });
    },
    onError(error, _, context) {
      if (context?.prevMsg) {
        queryClient.setQueryData(['UserMessage'], context.prevMsg);
      }
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles sending a new order comment.
 * It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request,
 * includes optimistic updates, and displays success/error messages using `useToast`.
 * @typedef {Object} IMessageInput
 * @typedef {Object} IOrderComment
 *
 *
 * @param {IMessageInput} data - An object containing the message data, including:
 *  - `orderId` {number} (required): The ID of the order associated with the comment.
 *  - `commentText` {string} (optional): The text content of the comment.
 *  - `image` {string | Blob} (optional): The path to a local image file or a Blob representing an image.
 *  - `itemId` {number} (optional): The ID of an item associated with the comment.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to send the message.
 */

export const useSendMessage = () => {
  const { selectedShop } = useSelectedShop();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IMessageInput) => {
      const { userId, text, image, itemId } = data;
      const formData = new FormData();
      if (text) {
        formData.append('text', text.trim());
      }
      if (itemId) {
        formData.append('itemId', itemId);
      }
      formData.append('userId', String(userId));

      if (image) {
        if (typeof image === 'string') {
          addLocalFileToFormData(image, formData, 'image');
        } else {
          formData.append('image', image);
        }
      }

      await fetcher({
        url: `/shop-message/${selectedShop?.shopId}`,
        method: 'POST',
        data: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['UserMessage'] });
      const prevMsg = queryClient.getQueryData(['UserMessage']);
      const newMessage = {
        orderCommentOrderId: +data.userId,
        orderCommentId: Math.random(),
        orderCommentIsUser: true,
        orderCommentSeen: false,
        orderCommentByAdmin: false,
        orderCommentText: data?.text,
        itemId: data?.itemId,
        orderCommentCreatedAt: new Date().toISOString(),
        orderCommentImage: data?.image,
      } as IOrderComment;

      queryClient.setQueryData(['UserMessage'], (oldMsg) =>
        oldMsg ? [...(oldMsg as IOrderComment[]), newMessage] : [newMessage]
      );

      return { prevMsg };
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['UserMessage'] });
      queryClient.invalidateQueries({ queryKey: ['Chat'] });
    },
    onError(error, _, context) {
      if (context?.prevMsg) {
        queryClient.setQueryData(['UserMessage'], context.prevMsg);
      }
      errorToast(error.message);
    },
  });
};
