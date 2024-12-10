import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { useUser } from '@/hooks/use-user';
import { errorToast, successToast } from '@/lib/toast';
import { IGeneralResponse } from '@/types/IGeneral';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles sending a password reset email to a shop assistant. It utilizes `useMutation` from a mutation library (likely `react-query`) to perform the request and displays success/error messages using `useToast`.
 * @typedef {Object} IGeneralResponse
 *
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to send the reset email.
 */

export const useSendResetEmail = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ reset_email }: { reset_email: string }) =>
      fetcher<IGeneralResponse>({
        url: '/shop/assistant/reset-password',
        method: 'POST',
        data: {
          reset_email,
        },
      }),
    onSuccess(data, { reset_email }) {
      let message: string = '';
      if ('message' in data) {
        message = data.message || 'otp verified successfully';
      }
      successToast(message);
      router.navigate({
        pathname: '/auth/otp',
        params: { email: reset_email },
      });
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles validating a password reset code for a shop assistant. It utilizes `useMutation` from a mutation library (likely `react-query`) to perform the request and displays success/error messages using `useToast`.
 * @typedef {Object} IGeneralResponse
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to validate the reset code.
 */

export const useValidateCode = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { deviceToken?: string; email: string; reset_code: number }) =>
      fetcher<IGeneralResponse>({
        url: '/shop/assistant/validate-code',
        method: 'POST',
        data,
      }),
    onSuccess(data, { email, reset_code }) {
      successToast('OTP verified successfully');

      router.navigate({
        pathname: '/auth/update-password',
        params: { email, otp: reset_code },
      });
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles the password reset process for a shop assistant. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with the new password and displays success/error messages using `useToast`.
 * @typedef {Object} IGeneralResponse
 *
 *
 * @param {Object} params - An object containing the following properties:
 *  - `params.new_password` {string} - The new password to be set.
 *  - `params.email` {string} - The email address of the shop assistant.
 *  - `params.code` {string} - The reset code received through the password reset process.
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to reset the password.
 */

export const useResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { newPassword: string; email: string; code: string }) =>
      fetcher<IGeneralResponse>({
        url: `/shop/assistant/change-password`,
        method: 'PUT',
        data,
      }),
    onSuccess(data) {
      successToast(data?.message);
      router.push('/auth/signin');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

export const useValidateLinkMutation = () => {
  return useMutation({
    mutationFn: async (token: string) =>
      await fetcher({
        url: 'shop/assistant/validate-token',
        method: 'POST',
        data: { token },
      }),
  });
};

/**
 * @description A custom hook that handles updating a user's password for different scenarios. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with the new password and displays success/error messages using `useToast`.
 * @typedef {Object} IGeneralResponse
 *
 * @param {Object} data - An object containing the relevant password update data:
 *  - `data.newPassword` {string} (required): The new password to be set.
 *  - `data.email` {string} (optional): The user's email address (used for password reset).
 *  - `data.code` {string} (optional): The reset code received through the password reset process.
 *  - `data.token` {string} (optional): An authentication token (used for authenticated password updates).
 *  - `data.oldPassword` {string | null} (optional): The user's current password (used for authenticated updates).
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update the password.
 */
export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (data: {
      newPassword: string;
      email?: string;
      code?: string;
      token?: string;
      oldPassword?: string | null;
    }) =>
      fetcher<IGeneralResponse>({
        url: `/shop/assistant/change-password`,
        method: 'PUT',
        data,
      }),
    onSuccess(data) {
      successToast(data?.message);
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 * @description A custom hook that handles the logout operation for a shop assistant. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a POST request and updates the user state using `setUser` from `useUser`.
 * @typedef {Object} Any
 *
 *
 * @returns {MutationFunction<Any, any, void>} A mutation function that can be used to perform the logout action.
 */
export const useLogoutMutation = () => {
  const { setUser } = useUser();

  return useMutation({
    mutationFn: async () =>
      await fetcher({
        url: '/shop/assistant/logout',
        method: 'POST',
      }),
    onSuccess() {
      setUser(null);
    },
  });
};
