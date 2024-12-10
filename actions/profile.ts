import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProfileFormValues } from '@/forms/profile/use-profile-form';
import { useAppRouter } from '@/hooks/use-app-router';
import { errorToast, successToast } from '@/lib/toast';
import { IGeneralResponse } from '@/types/IGeneral';
import { IProfile } from '@/types/IProfile';
import { fetcher } from '@/utils/fetcher';

/**
 * @description A custom hook that handles updating a user's profile. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PATCH request, invalidates a relevant query, and displays success/error messages.
 * @typedef {Object} ProfileFormValues
 *
 *
 * @param {Object} body - An object representing the updated profile data. The structure of this object is defined by the `ProfileFormValues` type (which is not provided).
 *
 * @returns {MutationFunction<any, any, any>} A mutation function that can be used to update a user's profile.
 */

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { back } = useAppRouter();

  return useMutation({
    mutationFn: async (body: ProfileFormValues) =>
      await fetcher<IGeneralResponse>({
        url: '/shop/assistant',
        method: 'PATCH',
        data: body,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['Profile'] });
      successToast(data?.message);
      back();
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};

/**
 *
 * @description A custom hook that handles updating a user's profile image. It utilizes `useMutation` from a mutation library (likely `react-query`) to send a PUT request with image URLs, invalidates a relevant query, and displays success/error messages.
 * @typedef {Object} IProfile
 *
 * @param {Object} args - An object containing the following property:
 *  - `args.data` {Object} - An object containing the updated profile image data:
 *    - `args.data.image_url` {string[]} (required): An array of strings representing the URLs of the new profile images.
 *
 * @returns {MutationFunction<IProfile, any, any>} A mutation function that can be used to update a user's profile image.
 */
export const useChangeProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: { image_url: string[] } }) =>
      await fetcher<IProfile>({
        url: '/shop/assistant/image',
        method: 'PUT',
        data,
      }),
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['Profile'] });
      successToast('Profile image updated successfully');
    },
    onError(error) {
      errorToast(error.message);
    },
  });
};
