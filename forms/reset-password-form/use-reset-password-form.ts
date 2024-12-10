import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUpdatePassword } from '@/actions/auth';

const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }).max(100),
    confirmNewPassword: z.string().min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export const useResetPasswordForm = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const { mutateAsync, isPending } = useUpdatePassword();
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {},
    resolver: zodResolver(ResetPasswordSchema),
  });

  const updatePassword = form.handleSubmit(async (values) => {
    await mutateAsync({
      newPassword: values.newPassword,
      oldPassword: null,
      token,
    });
  });

  return {
    form,
    isLoading: isPending,
    updatePassword,
  };
};
