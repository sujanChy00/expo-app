import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUpdatePassword } from '@/actions/auth';

const PasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: 'Old password is required' }),
  newPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one number and one special character',
  }),
});

export type PasswordFormData = z.infer<typeof PasswordSchema>;
/**
 * @description A custom hook that manages form data and submission for updating a user's password.
 * It handles validating user input against the `PasswordSchema` and utilizes `useUpdatePassword` for data persistence.
 * @typedef {Object} PasswordFormData - This type is not defined or imported. Please provide the definition or a link to its documentation.
 *
 *
 * @param {() => void} [close] - Optional callback function to close the password update modal upon successful submission.
 * @returns {PasswordFormHook} An object containing functions and state for managing the password update form.
 */

export const usePasswordForm = (close?: () => void, goBack?: boolean) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdatePassword();
  const form = useForm<PasswordFormData>({
    defaultValues: {},
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    mutateAsync(data).then(() => {
      close?.();
      if (goBack) {
        router.back();
      }
      if (!close && !goBack) {
        router.push('/auth/signin');
      }
    });
  });

  return { form, onSubmit, isPending };
};
