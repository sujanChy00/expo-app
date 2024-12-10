import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useChangeProfileImage, useUpdateProfile } from '@/actions/profile';
import { useUser } from '@/hooks/use-user';

const ProfileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  // phoneNumber: z.number().min(10, { message: "Phone number is required" }),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;

/**
 * @description A custom hook that manages form data and submission for updating a user's profile information,
 * including handling image uploads. It utilizes `useUser` to fetch the current user data, `useUpdateProfile`
 * for updating profile details, and `useChangeProfileImage` for uploading profile pictures.
 * @typedef {Object} ProfileFormValues - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {() => void} [onClose] - Optional callback function to close the profile update modal upon successful submission.
 * @returns {ProfileFormHook} An object containing functions and state for managing the profile update form.
 */

export const useProfileForm = (close?: () => void) => {
  const { user } = useUser();
  const { mutateAsync: changeProfileImage, isPending: isProfileImagePending } =
    useChangeProfileImage();
  const { mutateAsync, isPending } = useUpdateProfile();
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.profileDetails.shopAssistantName || '',
    },
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    mutateAsync(values).then(() => close && close());
  });

  const handleImageUpload = async (img: string) => {
    await changeProfileImage({ data: { image_url: [img] } });
  };

  return {
    form,
    user,
    isPending,
    onSubmit,
    handleImageUpload,
    isProfileImagePending,
  };
};
